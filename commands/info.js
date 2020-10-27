const sanitizeSubstanceName = require('../include/sanitize-substance-name.js');
const Discord = require('discord.js');
const customsJSON = require('../include/customs.json');

const infoQuery = require('../queries/info.js');

const rp = require('request-promise');

const Helpers = require('../helpers.js')

const fetchAndParseURL = async url => {
  try {
    const responseData = await rp(url);

    return JSON.parse(responseData);
  } catch (err) {
    console.error(err);
  }

  return null;
}

const fetchPWSubstanceData = async substanceName => {
  const query = infoQuery.info(substanceName);

  const encodedQuery = encodeURIComponent(query);

  return fetchAndParseURL(
    `https://api.psychonautwiki.org/?query=${encodedQuery}`
  );
}

exports.run = async (client, message, args) => {
  // For keeping track of whether or not a substance is found in the custom sheets
  var hasCustom;

  // Capture messages posted to a given channel and remove all symbols and put everything into lower case
  var str = message.content;
  var substanceName = parseSubstanceName(str);

  // Checks to see if drug is on the customs list
  if (checkIfCustomSheet(substanceName)) {
    console.log('Pulling from custom');
    hasCustom = true;

    // Find the location of the substance object in the JSON and set substance
    let substance = locateCustomSheetLocation(substanceName);

    createPWChannelMessage(substance, message);
  } else {
    console.log('Pulling from PW');
    hasCustom = false;
  }

  if (hasCustom == false) {
    console.log(`Requesting info for ${substanceName}`);
    // Loads GraphQL query as "query" variable

    try {
      const { data } = await fetchPWSubstanceData(substanceName);

      // Logs API's returned object of requested substance
      console.log("Substances response: " + JSON.stringify(data));

      // Send a message to channel if there are zero or more than one substances returned by the API
      // Not sure if the API in its current configuration can return more than one substance
      if (data.substances.length === 0) {
        console.log('Pulling from TS');

        let tripSitURL = `http://tripbot.tripsit.me/api/tripsit/getDrug?name=${substanceName}`;

        const responseData = await fetchAndParseURL(tripSitURL);

        if (responseData.err === true) {
          message.channel.send(`Error: No API data available for **${substanceName}**`);
        } else {
          let substance = responseData.data[0];

          createTSChannelMessage(substance, message);
        }

        return;
      } else if (data.substances.length > 1) {
        message.channel
          .send(`There are multiple substances matching \`${substanceName}\` on PsychonautWiki.`)
          .catch(console.error);
        return;
      } else {
        // Set substance to the first returned substance from PW API
        var substance = data.substances[0];
        createPWChannelMessage(substance, message);
      }
    } catch (err) {
      console.log('Promise rejected/errored out');
      console.log(err);
    }

    // Reset hasCustom
    hasCustom = false;
  }
};

// Functions
//// Create a MessageEmbed powered message utilizing the various field builder functions
function createPWChannelMessage(substance, message) {
  const embed = Helpers.TemplatedMessageEmbed()
    .setTitle(`**${capitalize(substance.name)} drug information**`)
    .addField(
      ':telescope: __Class__',
      buildChemicalClassField(substance) +
      '\n' +
      buildPsychoactiveClassField(substance)
    )
    .addField(':scales: __Dosages__', `${buildDosageField(substance)}\n`, true)
    .addField(
      ':clock2: __Duration__',
      `${buildDurationField(substance)}\n`,
      true
    )
    .addField(
      ':warning: __Addiction potential__',
      buildAddictionPotentialField(substance),
      true
    )
    .addField(
      ':chart_with_upwards_trend: __Tolerance__',
      `${buildToleranceField(substance)}\n`,
      true
    )
    .addField(':globe_with_meridians: __Links__', buildLinksField(substance));

  message.channel.send({ embed });
}
// Custom sheet functions
//// Check if the requested substance is in the customs.json file
function checkIfCustomSheet(drug) {
  console.log('drug: ' + drug);
  if (
    drug == 'ayahuasca' ||
    drug == 'datura' ||
    drug == 'salvia' ||
    drug == 'lsa'
  ) {
    return true;
  } else {
    return false;
  }
}

//// Find the location of a given substance in the customs.json file
function locateCustomSheetLocation(drug) {
  var locationsArray = [];
  var loc;

  // Loop through the JSON file and add all of the names and locations to locationsArray
  for (let i = 0; i < customsJSON.data.substances.length; i++) {
    locationsArray.push({
      name: customsJSON.data.substances[i].name,
      location: i
    });
  }

  // Loop through the locationsArray to find the location of a given substance
  for (let i = 0; i < locationsArray.length; i++) {
    if (locationsArray[i].name == drug) {
      loc = i;
    }
  }

  // Set substance equal to the correct substance in the JSON file
  return customsJSON.data.substances[loc];
}

// Capitalization function
function capitalize(name) {
  if (name === 'lsa') {
    return name.toUpperCase();
  } else {
    return name[0].toUpperCase() + name.slice(1);
  }
}

// Message builders
function buildToleranceField(substance) {
  let tolerances = substance.tolerance;
  let toleranceArr = [];

  if (tolerances) {
    let createToleranceString = function(string, tolerance) {
      return `**${capitalize(string)}**: ${tolerance}`;
    };

    let pushToleranceToArray = function(toleranceTier, tolerance) {
      if (tolerance) {
        toleranceArr.push(createToleranceString(toleranceTier, tolerance));
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

function buildDosageField(substance) {
  var messages = [];

  for (let i = 0; i < substance.roas.length; i++) {
    let roa = substance.roas[i];
    let dose = roa.dose;
    let name = capitalize(roa.name);

    // Convert dosage object into a string
    let dosageObjectToString = function(dosageTier) {
      // Set substance dose units
      let unit = dose.units;

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
    let createMessageString = function(string, dosage) {
      return `**${capitalize(string)}**: ${dosageObjectToString(dosage)}`;
    };

    // Function to push dosage message to array
    let pushDosageToMessageArray = function(phaseString, phase) {
      if (phase) {
        messages.push(createMessageString(phaseString, phase));
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

function buildDurationField(substance) {
  var messages = [];

  for (let i = 0; i < substance.roas.length; i++) {
    let roa = substance.roas[i];
    let name = capitalize(roa.name);

    // Parses duration object and returns string
    let durationObjectToString = function(phaseDuration) {
      // If there's a duration range return it + units
      if (phaseDuration) {
        return `${phaseDuration.min} - ${phaseDuration.max} ${
          phaseDuration.units
        }`;
      }
      return undefined;
    };

    // Function for creating message string
    let createMessageString = function(string, phase) {
      return `**${capitalize(string)}**: ${durationObjectToString(phase)}`;
    };

    // Function for pushing dosage message to array
    let pushDurationToMessageArray = function(durationString, phase) {
      if (phase) {
        messages.push(createMessageString(durationString, phase));
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
function buildChemicalClassField(substance) {
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
function buildPsychoactiveClassField(substance) {
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
function buildAddictionPotentialField(substance) {
  if (substance.addictionPotential !== null) {
    return `${capitalize(substance.addictionPotential)}\n`;
  } else {
    return 'No addiction potential information.';
  }
}

// Builds the link field
function buildLinksField(substance) {
  return `[PsychonautWiki](https://psychonautwiki.org/wiki/${ substance.name.replace(/ /g, '_',) }) - [Effect Index](https://www.effectindex.com) - [Drug combination chart](https://wiki.tripsit.me/images/3/3a/Combo_2.png)`;
}

function createTSChannelMessage(substance, message) {
  const embed = Helpers.TemplatedMessageEmbed()
    .setTitle(`**${substance.pretty_name} drug information**`)
    .addField(
      ':scales: __Dosages__',
      `${buildTSDosageField(substance)}\n`,
      true
    )
    .addField(
      ':clock2: __Duration__',
      `${buildTSDurationField(substance)}\n`,
      true
    )
    .addField(':globe_with_meridians: __Links__', buildTSLinksField(substance));

  message.channel.send({ embed }).catch(console.error);
}

// Capitalization function
function capitalize(name) {
  if (name === 'lsa') {
    return name.toUpperCase();
  } else {
    return name[0].toUpperCase() + name.slice(1);
  }
}

// Build TS dosage field
function buildTSDosageField(substance) {
  console.log(`in buildTSDosageField -- ${JSON.stringify(substance.formatted_dose)}`)

  if ((typeof substance.formatted_dose != undefined) &&
      (substance.formatted_dose != null))
  {
    // try fancy formatting
    let substanceName = Object.keys(substance.formatted_dose)[0];
    return Object.entries(substance.formatted_dose[substanceName]).map(([intensity, dosageRange]) => {
      return `**${capitalize(intensity)}**: ${dosageRange}`;
    }).join("\n");
  }

  return `${substance.properties.dose}`;
}

// Build TS duration field
function buildTSDurationField(substance) {
  return `${substance.properties.duration}`;
}

// Build TS links field
function buildTSLinksField(substance) {
  return `[PsychonautWiki](https://psychonautwiki.org/wiki/${
    substance.name
  })\n[Effect Index](https://www.effectindex.com)\n[Drug combination chart](http://wiki.tripsit.me/images/3/3a/Combo_2.png)\n[TripSit](http://www.tripsit.me)\n\nInformation sourced from TripSit`;
}

// Parses and sanitizes substance name
function parseSubstanceName(string) {
  let unsanitizedDrugName = string
    .toLowerCase()
    .replace(/^[^\s]+ /, '', -1) // remove first word
    .replace(/-/g, '', -1)
    .replace(/ /g, '', -1);

  // Sanitizes input names to match PsychonautWiki API names
  return sanitizeSubstanceName(unsanitizedDrugName);
}
