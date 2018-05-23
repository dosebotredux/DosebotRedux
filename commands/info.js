const sanitizeSubstanceName = require("../include/sanitize-substance-name.js")
const Discord = require("discord.js");
const customsJSON = require("../customs.json")

exports.run = (client, message, args) => {
  const { request } = require("graphql-request");
  
  // For keeping track of whether or not a substance is found in the custom sheets
  var hasCustom;
  
  // Capture messages posted to a given channel and remove all symbols and put everything into lower case
  var str = message.content;
  var result = str.split(" ");
  var drug = str
  .toLowerCase()
  .replace("--info ", "", -1)
  .replace(/-/g, "", -1)
  .replace(/ /g, "", -1); 
  
  // Sanitizes input names to match PsychonautWiki API names
  drug = sanitizeSubstanceName(drug)
  
  // Checks to see if drug is on the customs list
  if (checkIfCustomSheet(drug)) {
    console.log("Pulling from custom");
    
    hasCustom = true;
    
    // Find the location of the substance object in the JSON and set substance
    var location;
    substance = locateCustomSheetLocation(drug);
    
    createChannelMessage(substance, message);
  } else {
    console.log("Pulling from PW");
    
    hasCustom = false;
  }
  
  if (hasCustom == false) {
    console.log(`Requesting info for ${drug}`); 
    // Loads GraphQL query as "query" variable
    let query = require("../queries/info.js").info(drug);
    request("https://api.psychonautwiki.org", query).then(data => {
    // Logs API's returned object of requested substance
    console.log(data) 
    
    // Send a message to channel if there are zero or more than one substances returned by the API 
    // Not sure if the API in its current configuration can return more than one substance
    if (data.substances.length == 0) {
      message.channel.send(`There are no substances matching \`${drug}\` on PsychonautWiki.`).catch(console.error);
      return;
    } else if (data.substances.length > 1) {
      message.channel.send(`There are multiple substances matching \`${drug}\` on PsychonautWiki.`).catch(console.error);
      return;
    }
    // Set substance to the first returned substance from PW API
    var substance = data.substances[0];
    
    createChannelMessage(substance, message);
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
function createChannelMessage(substance, message) {
  const embed = new Discord.RichEmbed()
  .setTitle(`**${capitalize(substance.name)} drug information**`)
  .setAuthor("DoseBot", "https://kek.gg/i/JGVVV.png")
  .setColor("747474")
  .setFooter("Please use drugs responsibly", "https://kek.gg/i/JGVVV.png")
  .setThumbnail("https://kek.gg/i/svRNH.png")
  .setTimestamp()
  .setURL("http://www.dosebot.org")
  .addField(":telescope: __Class__", buildChemicalClassField(substance) + buildPsychoactiveClassField(substance))
  .addField(":scales: __Dosages__", `${buildDosageField(substance)}\n`)
  .addField(":clock2: __Duration__", `${buildDurationField(substance)}\n`)
  .addField(":warning: __Addiction potential__", buildAddictionPotentialField(substance))
  .addField(":chart_with_upwards_trend: __Tolerance__", `${buildToleranceField(substance)}\n`)
  .addField(":globe_with_meridians: __Links__", buildLinksField(substance))
  
  message.channel.send({embed});
}
// Custom sheet functions
//// Check if the requested substance is in the customs.json file
function checkIfCustomSheet(drug) {
  console.log("drug: " + drug)
  if (drug == "ayahuasca" || drug == "datura" || drug == "salvia" || drug == "lsa") {
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
    locationsArray.push({"name": customsJSON.data.substances[i].name, "location": i})
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
  let tolerances = substance.tolerance
  
  if (!!tolerances) {
    // If substance does not have standard tolerances return the custom tolerance
    if (substance.name == "ayahuasca" || substance.name == "salvia") {
      return substance.tolerance.tolerance;
    } else {
      // return standard tolerances
      return `**Full**: ${tolerances.full}\n**Half**: ${tolerances.half}\n**Baseline**: ${tolerances.zero}`
    }
  }
}

function buildDosageField(substance) {
  var messages = []
  
  var i
  for (i = 0; i < substance.roas.length; i++) {
    let roa = substance.roas[i];
    let dose = roa.dose;
    let name = capitalize(roa.name);
    
    let dosageObjectToString = function(x) {
      // console.log(x)
      let unit = dose.units
      if (!!x) {
        if (typeof x == "number") {
          return  `${x}${unit}`
        }
        return `${x.min} - ${x.max}${unit}`
      }
    }
    
    if (substance.name !== "ayahuasca") {
      messages.push(`*(${name})*`)
      
      if (!!dose) {
        messages.push(`**Threshold**: ${dosageObjectToString(dose.threshold) || "no information"}`)
        messages.push(`**Light**: ${dosageObjectToString(dose.light) || "no information"}`)
        messages.push(`**Common**: ${dosageObjectToString(dose.common) || "no information"}`)
        messages.push(`**Strong**: ${dosageObjectToString(dose.strong) || "no information"}`)
        messages.push(`**Heavy**: ${dosageObjectToString(dose.heavy) || "no information"}`)
        messages.push("")
      } else {
        messages.push("No dosage information.")
      }
    } else {
      // Ayahuasca hardcoded message
      messages.push(`*(${name})*`)
      
      if (!!dose) {
        messages.push(`${dose.dosage}`)
        messages.push("")
      } else {
        messages.push("No dosage information.")
      }
    }
  }
  // console.log(messages)
  return messages.join("\n")
}

function buildDurationField(substance) {
  var messages = []
  
  var i
  for (i = 0; i < substance.roas.length; i++) {
    let roa = substance.roas[i];
    let dose = roa.dose;
    let name = capitalize(roa.name);
    
    let durationObjectToString = function(x) {
      // console.log(x)
      // { max: 48, min: 12, units: 'hours' }
      if (!!x) {
        return `${x.min} - ${x.max} ${x.units}`
      }
      return undefined
    }
    
    if (substance.name !== "ayahuasca") {
      // Duration
      messages.push(`*(${name})*`)
      
      if (!!roa.duration) {
        messages.push(`**Onset**: ${durationObjectToString(roa.duration.onset) || "no information"}`)
        messages.push(`**Comeup**: ${durationObjectToString(roa.duration.comeup) || "no information"}`)
        messages.push(`**Peak**: ${durationObjectToString(roa.duration.peak) || "no information"}`)
        messages.push(`**Offset**: ${durationObjectToString(roa.duration.offset) || "no information"}`)
        messages.push(`**Afterglow**: ${durationObjectToString(roa.duration.afterglow) || "no information"}`)
        messages.push(`**Total**: ${durationObjectToString(roa.duration.total) || "no information"}`)
        messages.push("")
      } else {
        messages.push("No duration information.")
      }
    } else {
      messages.push(`*(${name})*`)
      
      if (!!roa.duration) {
        messages.push(`**Onset**: ${durationObjectToString(roa.duration.onset) || "no information"}`)
        messages.push(`**Comeup**: ${durationObjectToString(roa.duration.comeup) || "no information"}`)
        messages.push(`**Peak**: ${durationObjectToString(roa.duration.peak) || "no information"}`)
        messages.push(`**Offset**: ${durationObjectToString(roa.duration.offset) || "no information"}`)
        messages.push(`**Afterglow**: ${durationObjectToString(roa.duration.afterglow) || "no information"}`)
        messages.push(`**Total**: ${durationObjectToString(roa.duration.total) || "no information"}`)
        messages.push("")
      } else {
        messages.push("No duration information.")
      }
    }
  }
  // console.log(messages)
  return messages.join("\n")
}

function buildChemicalClassField(substance) {
  if (substance.class !== null) {
    return `**Chemical**: ${substance.class.chemical[0]}`;
  } else {
    return "No information";
  }
}

function buildPsychoactiveClassField(substance) {
  if (substance.class !== null) {
    return `\n**Psychoactive**: ${substance.class.psychoactive[0]}`;
  } else {
    return "No information";
  }
}

function buildAddictionPotentialField(substance) {
  if (substance.addictionPotential !== null) {
    console.log(substance);
    return `${capitalize(substance.addictionPotential)}\n`
  } else {
    return "No information";
  }
}

function buildLinksField(substance) {
  return `[PsychonautWiki](https://psychonautwiki.org/wiki/${substance.name}) \n[Drug combination chart](https://wiki.tripsit.me/images/3/3a/Combo_2.png)`
}