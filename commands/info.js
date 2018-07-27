const sanitizeSubstanceName = require("../include/sanitize-substance-name.js");
const Discord = require("discord.js");
const customsJSON = require("../include/customs.json");

exports.run = (client, message, args) => {
  console.log(`**********Executing info on ${message.guild.name}**********`);

  const { request } = require("graphql-request");
  const rp = require("request-promise");

  // For keeping track of whether or not a substance is found in the custom sheets
  var hasCustom;

  // Capture messages posted to a given channel and remove all symbols and put everything into lower case
  var str = message.content;
  var drug = parseDrugName(str);

  // Checks to see if drug is on the customs list
  if (checkIfCustomSheet(drug)) {
    console.log("Pulling from custom");
    setHasCustom(true);

    // Find the location of the substance object in the JSON and set substance
    let substance = locateCustomSheetLocation(drug);

    createPWChannelMessage(substance, message);
  } else {
    console.log("Pulling from PW");
    setHasCustom(false);
  }

  if (hasCustom == false) {
    console.log(`Requesting info for ${drug} on ${message.guild.name}`);
    // Loads GraphQL query as "query" variable
    let query = require("../queries/info.js").info(drug);
    request("https://api.psychonautwiki.org", query)
      .then(data => {
        // Logs API's returned object of requested substance
        console.log(data);

        // Send a message to channel if there are zero or more than one substances returned by the API
        // Not sure if the API in its current configuration can return more than one substance
        if (data.substances.length === 0) {
          console.log(`Pulling from TS`);
          let tripSitURL = `http://tripbot.tripsit.me/api/tripsit/getDrug?name=${drug}`;
          rp(tripSitURL)
            .then(function(response) {
              // console.log(response);
              let queryResults = JSON.parse(response);
              let substance = queryResults.data[0];

              createTSChannelMessage(substance, message);
            })
            .catch(function(err) {
              console.log(err);
            });

          return;
        } else if (data.substances.length > 1) {
          message.channel
            .send(
              `There are multiple substances matching \`${drug}\` on PsychonautWiki.`
            )
            .catch(console.error);

          return;
        } else {
          // Set substance to the first returned substance from PW API
          var substance = data.substances[0];
          createPWChannelMessage(substance, message);
        }
      })
      .catch(function(error) {
        console.log("Promise rejected/errored out");
        console.log(error);
      });

    // Reset hasCustom
    hasCustom = false;
  }
};

// Functions
//// Create a RichEmbed powered message utilizing the various field builder functions
function createPWChannelMessage(substance, message) {
  const embed = new Discord.RichEmbed()
    .setTitle(`**${capitalize(substance.name)} drug information**`)
    .setAuthor("DoseBot", "https://i.imgur.com/7R8WDwE.png")
    .setColor("747474")
    .setThumbnail("https://i.imgur.com/7R8WDwE.png")
    .setFooter(
      "Please use drugs responsibly",
      "https://i.imgur.com/7R8WDwE.png"
    )
    .setTimestamp()
    .setURL("http://www.dosebot.org")
    .addField(
      ":telescope: __Class__",
      buildChemicalClassField(substance) +
        buildPsychoactiveClassField(substance)
    )
    .addField(":scales: __Dosages__", `${buildDosageField(substance)}\n`, true)
    .addField(
      ":clock2: __Duration__",
      `${buildDurationField(substance)}\n`,
      true
    )
    .addField(
      ":warning: __Addiction potential__",
      buildAddictionPotentialField(substance),
      true
    )
    .addField(
      ":chart_with_upwards_trend: __Tolerance__",
      `${buildToleranceField(substance)}\n`,
      true
    )
    .addField(":globe_with_meridians: __Links__", buildLinksField(substance));

  message.channel.send({ embed });
}
// Custom sheet functions
//// Check if the requested substance is in the customs.json file
function checkIfCustomSheet(drug) {
  console.log("drug: " + drug);
  if (
    drug == "ayahuasca" ||
    drug == "datura" ||
    drug == "salvia" ||
    drug == "lsa"
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
  var substance;

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
  substance = customsJSON.data.substances[loc];
  return substance;
}

// Capitalization function
function capitalize(name) {
  if (name === "lsa") {
    return name.toUpperCase();
  } else {
    return name[0].toUpperCase() + name.slice(1);
  }
}

// Message builders
function buildToleranceField(substance) {
  let tolerances = substance.tolerance;

  if (!!tolerances) {
    // If substance does not have standard tolerances return the custom tolerance
    if (substance.name == "ayahuasca" || substance.name == "salvia") {
      return substance.tolerance.tolerance;
    } else {
      // return standard tolerances
      let toleranceArr = [];
      if (!!tolerances.full) {
        toleranceArr.push(`**Full:** ${tolerances.full}`);
      }
      if (!!tolerances.half) {
        toleranceArr.push(`**Half**: ${tolerances.half}`);
      }
      if (!!tolerances.zero) {
        toleranceArr.push(`**Baseline:** ${tolerances.zero}`);
      }
      return toleranceArr.join("\n");
    }
  } else {
    return `No information`;
  }
}

function buildDosageField(substance) {
  var messages = [];

  var i;
  for (i = 0; i < substance.roas.length; i++) {
    let roa = substance.roas[i];
    let dose = roa.dose;
    let name = capitalize(roa.name);

    let dosageObjectToString = function(x) {
      // Set substance dose units
      let unit = dose.units;

      // If there's a dose return dose + unit
      if (!!x) {
        if (typeof x == "number") {
          return `${x}${unit}`;
        }
        // If there's a dose range return dose range + unit
        return `${x.min} - ${x.max}${unit}`;
      }
    };

    if (substance.name == "ayahuasca" || substance.name == "datura") {
      // Ayahuasca hardcoded message (can really be used for any substance without standard dosage information)
      messages.push(`*(${name})*`);

      // If nonstandard dose add dosage information to messages array
      if (!!dose) {
        messages.push(`${dose.dosage}`);
        messages.push("");
      } else {
        // This should really never happen
        messages.push("No dosage information.");
      }
    } else {
      messages.push(`*(${name})*`);

      // Add all dosage information
      // Uses double conditional to prevent massive no information walls
      if (!!dose) {
        if (!!dose.threshold) {
          messages.push(
            `**Threshold**: ${dosageObjectToString(dose.threshold)}`
          );
        }
        if (!!dose.light) {
          messages.push(`**Light**: ${dosageObjectToString(dose.light)}`);
        }
        if (!!dose.common) {
          messages.push(`**Common**: ${dosageObjectToString(dose.common)}`);
        }
        if (!!dose.strong) {
          messages.push(`**Strong**: ${dosageObjectToString(dose.strong)}`);
        }
        if (!!dose.heavy) {
          messages.push(`**Heavy**: ${dosageObjectToString(dose.heavy)}`);
        }
        messages.push("");
      } else {
        // Or none if there is none
        messages.push("No dosage information.");
      }
    }
  }
  // Join the message array into a string
  return messages.join("\n");
}

function buildDurationField(substance) {
  var messages = [];

  for (let i = 0; i < substance.roas.length; i++) {
    let roa = substance.roas[i];
    let name = capitalize(roa.name);

    let durationObjectToString = function(phaseDuration) {
      // If there's a duration range return it + units
      if (!!phaseDuration) {
        return `${phaseDuration.min} - ${phaseDuration.max} ${
          phaseDuration.units
        }`;
      }
      return undefined;
    };

    let createMessageString = function(string, phase) {
      return `**${capitalize(string)}**: ${durationObjectToString(phase)}`;
    };

    if (substance.name !== "ayahuasca") {
      // Duration
      messages.push(`*(${name})*`);

      if (!!roa.duration) {
        if (!!roa.duration.onset) {
          messages.push(createMessageString(`onset`, roa.duration.onset));
        }
        if (!!roa.duration.comeup) {
          messages.push(
            `**Comeup**: ${durationObjectToString(roa.duration.comeup)}`
          );
        }
        if (!!roa.duration.peak) {
          messages.push(
            `**Peak**: ${durationObjectToString(roa.duration.peak)}`
          );
        }
        if (!!roa.duration.offset) {
          messages.push(
            `**Offset**: ${durationObjectToString(roa.duration.offset)}`
          );
        }
        if (!!roa.duration.afterglow) {
          messages.push(
            `**Afterglow**: ${durationObjectToString(roa.duration.afterglow)}`
          );
        }
        if (!!roa.duration.total) {
          messages.push(
            `**Total**: ${durationObjectToString(roa.duration.total)}`
          );
        }
        messages.push(" ");
      } else {
        messages.push("No duration information.");
      }
    } else {
      messages.push(`*(${name})*`);

      if (!!roa.duration) {
        if (!!roa.duration.onset) {
          messages.push(
            `**Onset**: ${durationObjectToString(roa.duration.onset)}`
          );
        }
        if (!!roa.duration.comeup) {
          messages.push(
            `**Comeup**: ${durationObjectToString(roa.duration.comeup)}`
          );
        }
        if (!!roa.duration.peak) {
          messages.push(
            `**Peak**: ${durationObjectToString(roa.duration.peak)}`
          );
        }
        if (!!roa.duration.offset) {
          messages.push(
            `**Offset**: ${durationObjectToString(roa.duration.offset)}`
          );
        }
        if (!!roa.duration.afterglow) {
          messages.push(
            `**Afterglow**: ${durationObjectToString(roa.duration.afterglow)}`
          );
        }
        if (!!roa.duration.total) {
          messages.push(
            `**Total**: ${durationObjectToString(roa.duration.total)}`
          );
        }
        messages.push(" ");
      } else {
        messages.push("No duration information.");
      }
    }
  }
  return messages.join("\n");
}

// Builds the chemical class field
function buildChemicalClassField(substance) {
  if (substance.class !== null) {
    if (substance.class.chemical !== null) {
      return `**Chemical**: ${substance.class.chemical[0]}`;
    }
  } else {
    return "No information";
  }
}

// Builds the psychoactive class field
function buildPsychoactiveClassField(substance) {
  if (substance.class !== null) {
    if (substance.class.psychoactive !== null) {
      return `\n**Psychoactive**: ${substance.class.psychoactive[0]}`;
    }
  } else {
    return "No information";
  }
}

// Builds the addiction potential field
function buildAddictionPotentialField(substance) {
  if (substance.addictionPotential !== null) {
    console.log(substance);
    return `${capitalize(substance.addictionPotential)}\n`;
  } else {
    return "No information";
  }
}

// Builds the link field
function buildLinksField(substance) {
  return `[PsychonautWiki](https://psychonautwiki.org/wiki/${
    substance.name
  })\n[Effect Index](https://beta.effectindex.com)\n[Drug combination chart](https://wiki.tripsit.me/images/3/3a/Combo_2.png)`;
}

function createTSChannelMessage(substance, message) {
  const embed = new Discord.RichEmbed()
    .setTitle(`**${substance.pretty_name} drug information**`)
    .setAuthor("DoseBot", "https://i.imgur.com/7R8WDwE.png")
    .setColor("747474")
    .setThumbnail("https://i.imgur.com/7R8WDwE.png")
    .setFooter(
      "Please use drugs responsibly",
      "https://i.imgur.com/7R8WDwE.png"
    )
    .setTimestamp()
    .setURL("http://www.dosebot.org")
    .addField(
      ":scales: __Dosages__",
      `${buildTSDosageField(substance)}\n`,
      true
    )
    .addField(
      ":clock2: __Duration__",
      `${buildTSDurationField(substance)}\n`,
      true
    )
    .addField(":globe_with_meridians: __Links__", buildTSLinksField(substance));

  message.channel.send({ embed }).catch(console.error);
}

// Capitalization function
function capitalize(name) {
  if (name === "lsa") {
    return name.toUpperCase();
  } else {
    return name[0].toUpperCase() + name.slice(1);
  }
}

// Build TS dosage field
function buildTSDosageField(substance) {
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
  })\n[Effect Index](https://beta.effectindex.com)\n[Drug combination chart](https://wiki.tripsit.me/images/3/3a/Combo_2.png)\n[TripSit](https://www.tripsit.me)\n\nInformation sourced from TripSit`;
}

// Parses and sanitizes substance name
function parseDrugName(string) {
  let unsanitizedDrugName = string
    .toLowerCase()
    .replace(`--info `, ``, -1)
    .replace(/-/g, ``, -1)
    .replace(/ /g, ``, -1);

  // Sanitizes input names to match PsychonautWiki API names
  return sanitizeSubstanceName(unsanitizedDrugName);
}

// Sets hasCustom depending on bool arg
function setHasCustom(bool) {
  hasCustom = bool;
}
