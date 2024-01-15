import Discord from 'discord.js';
import { SlashCommandBuilder } from "@discordjs/builders";
import rp from 'request-promise';

import { sanitizeSubstanceName } from '../include/sanitize-substance-name';
import { customs as customsJSON } from '../include/customs';
import { infoQuery } from '../queries/info';
import * as Helpers from '../include/helpers';

interface PsychonautWikiSubstance {
  name: string;
  tolerance: any;
  roas: {
    name: string;
    dose: {
      dosage?: string | null;
      units?: string | null ;
      threshold?: MinMax<number> | number | null;
      light?: MinMax<number> | number | null;
      common?: MinMax<number> | number | null;
      strong?: MinMax<number> | null;
      heavy?: number | null;
    } | null;
    duration: {
      onset: MinMaxUnits<number> | null;
      comeup: MinMaxUnits<number> | null;
      peak: MinMaxUnits<number> | null;
      offset: MinMaxUnits<number> | null;
      afterglow: MinMaxUnits<number> | null;
      total: MinMaxUnits<number> | null;
    } | null;
  }[];
  class: {
    chemical: string[] | null;
    psychoactive: string[] | null;
  } | null;
  addictionPotential: string | null;
}

// $ curl "https://tripbot.tripsit.me/api/tripsit/getDrug?name=LSD"
type TripsafeSubstance = {
  name: string;
  properties: {
    dose: string;
    duration: string;
    onset: string;
    effects: string;
    avoid: string;
    aliases: string[];
    marquis: string;
    summary: string;
    categories: string[];
    "half-life": string;
    "after-effects": string;
    ora: string;
  };
  aliases: string[];
  categories: string[];
  formatted_dose: {
    [key: string]: {
      [intensity: string]: string;
    }
  };
  // formatted_duration: any;
  // formatted_onset: any;
  // formatted_aftereffects: any;
  pretty_name: string;
  combos: any[];
  dose_note: string;
  links: {
    experiences: string;
    tihkal: string;
  };
  // sources: any;
  pweffects: {
    [key: string]: string;
  }
};



const fetchAndParseURL = async (url: string) => {
  try {
    const responseData = await rp(url);

    return JSON.parse(responseData);
  } catch (err) {
    console.error(err);
  }

  return null;
}

const fetchPWSubstanceData = async (substanceName: string) => {
  const result = await rp({
    method: 'POST',
    uri: 'https://api.psychonautwiki.org/',
    body: {
      query: infoQuery(substanceName),
    },
    json: true,
  });
  // console.log({ location: "fetchPWSubstanceData", data: result.data });
  return result?.data?.substances as PsychonautWikiSubstance[];
}

export const applicationCommandData = new SlashCommandBuilder()
  .setName("info")
  .setDescription("Get basic info about a substance")
  .addStringOption(option => option
    .setName("substance")
    .setDescription("The substance you want information about")
    .setRequired(true))
  .toJSON() as Discord.ApplicationCommandData;

export async function performInteraction(interaction: Discord.CommandInteraction) {
  // Capture messages posted to a given channel and remove all symbols and put everything into lower case

  const substanceName = parseSubstanceName(interaction.options.getString("substance", true));
  console.log({
    action: "info command",
    rawName: interaction.options.getString("substance", true),
    parsedName: substanceName
  });

  // Find the location of the substance object in the JSON and set substance
  const customSubstance = fetchCustomSubstanceData(substanceName);
  // Checks to see if drug is on the customs list
  if (!!customSubstance) {
    console.log({ action: "using custom substance override", customSubstance });
    await interaction.reply({ embeds: [ createPWChannelMessage(customSubstance) ], files: ["./assets/logo.png"] });
    return;
  }

  await interaction.deferReply();
  
  console.log({ action: "psychonautwiki api request", substanceName });
  const pwSubstances = await fetchPWSubstanceData(substanceName)
    .then((value) => {
      console.log({ action: "psychonautwiki api response", value });
      return value;
    })
    .catch(reason => {
      console.log({ action: "psychonautwiki api error", reason});
      return [] as PsychonautWikiSubstance[];
    });
  if (pwSubstances?.length > 1) {
    await interaction.editReply(`There are multiple substances matching '${substanceName}' on PsychonautWiki: ${pwSubstances.map(s => s.name).join(", ")}.`);
    return;
  } else if (pwSubstances?.length == 1) {
    // single substance -- send it
    await interaction.editReply({ embeds: [ createPWChannelMessage(pwSubstances[0]) ], files: ["./assets/logo.png"] });
    return;
  }

  console.log({ action: "tripsit api request", substanceName });
  const tsResponse = await fetchAndParseURL(`http://tripbot.tripsit.me/api/tripsit/getDrug?name=${substanceName}`);
  console.log({ action: "tripsit api response", tsResponse });
  if (tsResponse?.data?.length) {
    const substance = tsResponse.data[0];
    await interaction.editReply({ embeds: [ createTSChannelMessage(substance) ], files: ["./assets/logo.png"] });
    return;
  }

  await interaction.editReply(`Error: No API data available for **${substanceName}**`);
}

// Functions
//// Create a MessageEmbed powered message utilizing the various field builder functions
function createPWChannelMessage(substance: PsychonautWikiSubstance): Discord.MessageEmbed {
  return Helpers.TemplatedMessageEmbed()
    .setTitle(`**${capitalize(substance.name)} drug information**`)
    .addField(':telescope: __Class__', buildChemicalClassField(substance) + '\n' + buildPsychoactiveClassField(substance))
    .addField(':scales: __Dosages__', `${buildPWDosageField(substance)}\n`, true)
    .addField(':clock2: __Duration__', `${buildPWDurationField(substance)}\n`, true)
    .addField(':warning: __Addiction potential__', buildAddictionPotentialField(substance), true)
    .addField(':chart_with_upwards_trend: __Tolerance__', `${buildPWToleranceField(substance)}\n`, true)
    .addField(':globe_with_meridians: __Links__', buildLinksField(substance));
}

function fetchCustomSubstanceData(substanceName: string) {
  const matchingSubstances = customsJSON.data.substances.filter(s => s.name.toLowerCase() == substanceName);
  console.log({ debug: "finding matching custom substances", substanceName, matchingSubstances });
  if (matchingSubstances.length) {
    return matchingSubstances[0];
  } else {
    return null;
  }
}

// Capitalization function
function capitalize(name: string) {
  if (name === 'lsa') {
    return name.toUpperCase();
  } else {
    return name[0].toUpperCase() + name.slice(1);
  }
}

// Message builders
function buildPWToleranceField(substance: PsychonautWikiSubstance) {
  const tolerances = substance.tolerance;
  const toleranceArr: string[] = [];

  if (tolerances) {
    const createToleranceString = function(label: string, value: string) {
      return `**${capitalize(label)}**: ${value}`;
    };

    const pushToleranceToArray = function(label: string, value: string) {
      if (value) {
        toleranceArr.push(createToleranceString(label, value));
      }
    };

    // If substance does not have standard tolerances return the custom tolerance
    if (substance.name == 'ayahuasca' || substance.name == 'salvia') {
      return substance.tolerance.tolerance;
    } else {
      // return standard tolerances
      pushToleranceToArray('full', tolerances.full);
      pushToleranceToArray('half', tolerances.half);
      pushToleranceToArray('baseline', tolerances.zero);

      return toleranceArr.join('\n');
    }
  } else {
    return 'No information';
  }
}

function buildPWDosageField(substance: PsychonautWikiSubstance) {
  const messages = [];

  for (let i = 0; i < substance.roas.length; i++) {
    const roa = substance.roas[i];
    const dose = roa.dose;
    const name = capitalize(roa.name);

    // Convert dosage object into a string
    const dosageObjectToString = function(dosageTier: MinMax<number> | number) {
      // Set substance dose units
      const unit = dose?.units;

      // If there's a dose return dose + unit
      if (dosageTier) {
        if (typeof dosageTier === 'number') {
          return `${dosageTier}${unit}`;
        }
        // If there's a dose range return dose range + unit
        return `${dosageTier.min} - ${dosageTier.max}${unit}`;
      }
    };

    // Function for creating dosage message string
    const createMessageString = function(label: string, value: MinMax<number> | number) {
      return `**${capitalize(label)}**: ${dosageObjectToString(value)}`;
    };

    // Function to push dosage message to array
    const pushDosageToMessageArray = function(label: string, value: MinMax<number> | number | undefined | null) {
      if (value) {
        messages.push(createMessageString(label, value));
      }
    };

    if (substance.name == 'ayahuasca' || substance.name == 'datura') {
      // Ayahuasca hardcoded message (can really be used for any substance without standard dosage information)
      messages.push(`*(${name})*`);

      // If nonstandard dose add dosage information to messages array
      if (dose) {
        messages.push(`${dose.dosage}`);
        messages.push('');
      } else {
        // This should really never happen
        messages.push('No dosage information.');
      }
    } else {
      messages.push(`*(${name})*`);

      // Add all dosage information
      // Uses double conditional to prevent massive no information walls
      if (dose) {
        pushDosageToMessageArray('threshold', dose.threshold);
        pushDosageToMessageArray('light', dose.light);
        pushDosageToMessageArray('common', dose.common);
        pushDosageToMessageArray('strong', dose.strong);
        pushDosageToMessageArray('heavy', dose.heavy);
        messages.push('');
      } else {
        // Or none if there is none
        messages.push('No dosage information.');
      }
    }
  }
  // Join the message array into a string
  return messages.length > 0 ? messages.join("\n") : "No dosage info."
}

type MinMax<T> = {
  min: T | null;
  max: T | null;
}

type MinMaxUnits<T> = {
  min: T | null;
  max: T | null;
  units: string | null;
}

function buildPWDurationField(substance: PsychonautWikiSubstance) {
  const messages = [];

  for (let i = 0; i < substance.roas.length; i++) {
    const roa = substance.roas[i];
    const name = capitalize(roa.name);

    // Parses duration object and returns string
    const durationObjectToString = function(phaseDuration: MinMaxUnits<number>) {
      // If there's a duration range return it + units
      if (phaseDuration) {
        return `${phaseDuration.min} - ${phaseDuration.max} ${
          phaseDuration.units
        }`;
      }
      return undefined;
    };

    // Function for creating message string
    const createMessageString = function(label: string, phase: MinMaxUnits<number>) {
      return `**${capitalize(label)}**: ${durationObjectToString(phase)}`;
    };

    // Function for pushing dosage message to array
    const pushDurationToMessageArray = function(label: string, phase: MinMaxUnits<number> | null) {
      if (phase) {
        messages.push(createMessageString(label, phase));
      }
    };

    if (substance.name) {
      // Duration
      messages.push(`*(${name})*`);

      if (roa.duration) {
        pushDurationToMessageArray('onset', roa.duration.onset);
        pushDurationToMessageArray('comeup', roa.duration.comeup);
        pushDurationToMessageArray('peak', roa.duration.peak);
        pushDurationToMessageArray('offset', roa.duration.offset);
        pushDurationToMessageArray('afterglow', roa.duration.afterglow);
        pushDurationToMessageArray('total', roa.duration.total);
        messages.push(' ');
      } else {
        messages.push('No duration information.');
      }
    } else {
      console.log('Not sure why this would ever happen');
      messages.push('An unknown error has occurred <@278301453620084736>');
    }
  }
  return messages.length > 0 ? messages.join("\n") : "No duration info."
}

// Builds the chemical class field
function buildChemicalClassField(substance: PsychonautWikiSubstance) {
  if ((typeof substance.class != undefined) &&
      (substance.class !== null) &&
      (typeof substance.class.chemical != undefined) &&
      (substance.class.chemical != null))
  {
    return `**Chemical**: ${substance.class.chemical[0]}`;
  } else {
    return 'No chemical class information.';
  }
}

// Builds the psychoactive class field
function buildPsychoactiveClassField(substance: PsychonautWikiSubstance) {
  if ((typeof substance.class != undefined) &&
      (substance.class !== null) &&
      (typeof substance.class.psychoactive != undefined) &&
      (substance.class.psychoactive != null))
  {
    return `**Psychoactive**: ${substance.class.psychoactive[0]}`;
  } else {
    return 'No psychoactive class information.';
  }
}

// Builds the addiction potential field
function buildAddictionPotentialField(substance: PsychonautWikiSubstance) {
  if (substance.addictionPotential !== null) {
    return `${capitalize(substance.addictionPotential)}\n`;
  } else {
    return 'No addiction potential information.';
  }
}

// Builds the link field
function buildLinksField(substance: PsychonautWikiSubstance) {
  return `[PsychonautWiki](https://psychonautwiki.org/wiki/${ substance.name.replace(/ /g, '_',) }) - [Effect Index](https://www.effectindex.com) - [Drug combination chart](https://wiki.tripsit.me/images/3/3a/Combo_2.png)`;
}

function createTSChannelMessage(substance: TripsafeSubstance): Discord.MessageEmbed {
  return Helpers.TemplatedMessageEmbed()
    .setTitle(`**${substance.pretty_name} drug information**`)
    .addField(':scales: __Dosages__', `${buildTSDosageField(substance)}\n`, true)
    .addField(':clock2: __Duration__', `${buildTSDurationField(substance)}\n`, true)
    .addField(':globe_with_meridians: __Links__', buildTSLinksField(substance));
}

// Build TS dosage field
function buildTSDosageField(substance: TripsafeSubstance) {
  console.log(`in buildTSDosageField -- ${JSON.stringify(substance.formatted_dose)}`)

  if ((typeof substance.formatted_dose != undefined) &&
      (substance.formatted_dose != null))
  {
    // try fancy formatting
    const substanceName = Object.keys(substance.formatted_dose)[0];
    return Object.entries(substance.formatted_dose[substanceName]).map(([intensity, dosageRange]) => {
      return `**${capitalize(intensity)}**: ${dosageRange}`;
    }).join("\n");
  }

  return `${substance.properties.dose}`;
}

// Build TS duration field
function buildTSDurationField(substance: TripsafeSubstance) {
  return `${substance.properties.duration}`;
}

// Build TS links field
function buildTSLinksField(substance: TripsafeSubstance) {
  return `[PsychonautWiki](https://psychonautwiki.org/wiki/${
      substance.name
  })\n[Effect Index](https://effectindex.com)\n[Drug combination chart](https://wiki.tripsit.me/images/3/3a/Combo_2.png)\n[TripSit](https://tripsit.me)\n\nInformation sourced from TripSit`;
}

// Parses and sanitizes substance name
function parseSubstanceName(str: string) {
  // Sanitizes input names to match PsychonautWiki API names
  return sanitizeSubstanceName(str.toLowerCase().replace(/\s/g, ''));
}
