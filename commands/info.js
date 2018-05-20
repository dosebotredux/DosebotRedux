const sanitizeSubstanceName = require("../include/sanitize-substance-name.js")
const Discord = require("discord.js");
const customsJSON = require("../customs.json")

exports.run = (client, message, args) => {
  const { request } = require("graphql-request");
  
  var str = message.content;
  var result = str.split(" ");
  var drug = str
  .toLowerCase()
  .replace("--info ", "", -1)
  .replace(/-/g, "", -1)
  .replace(/ /g, "", -1); //removes all symbols and puts everything in lower case so bot finds the images easier
  drug = sanitizeSubstanceName(drug)
  console.log(`Requesting info for ${drug}`);
  
  // loads graphql query from separate file as "query" variable
  let query = require("../queries/info.js").info(drug);
  request("https://api.psychonautwiki.org", query).then(data => {
  
  console.log(data) // SHOW ME WHAT YOU GOT
  
  if (data.substances.length == 0) {
    message.channel.send(`There are no substances matching \`${drug}\` on PsychonautWiki.`).catch(console.error);
    return;
  } 
  if (data.substances.length > 1) {
    message.channel.send(`There are multiple substances matching \`${drug}\` on PsychonautWiki.`).catch(console.error);
    return;
  }
  
  // Checks to see if drug is on the customs list
  if (checkIfCustomSheet(drug)) {
    var location;
    // Find the location of the substance object in the JSON and set substance
    substance = locateCustomSheetLocation(drug);
    console.log("pulling from custom");
  } else {
    console.log("pulling from PW")
    // Sets to PW API query results
    var substance = data.substances[0];
  }
  
  createChannelMessage(substance, message);
  
  
})
.catch(function(error) {
  console.log("promise rejected/errored out");
  console.log(error);
});
};

// Functions
function createChannelMessage(substance, message) {
  const embed = new Discord.RichEmbed()
  .setTitle(`**${capitalize(substance.name)} drug information**`)
  .setAuthor("DoseBot", "https://kek.gg/i/JGVVV.png")
  .setColor("747474")
  .setFooter("Please use drugs responsibly", "https://kek.gg/i/JGVVV.png")
  .setThumbnail("https://kek.gg/i/svRNH.png")
  .setTimestamp()
  .setURL("http://www.dosebot.org")
  .addField(":telescope: __Class__", buildChemicalClassMessage(substance) + buildPsychoactiveClassMessage(substance))
  .addField(":scales: __Dosages__", `${buildDosageMessage(substance)}\n`)
  .addField(":clock2: __Duration__", `${buildDurationMessage(substance)}\n`)
  .addField(":warning: __Addiction potential__", buildAddictionPotentialMessage(substance))
  .addField(":chart_with_upwards_trend: __Tolerance__", `${buildToleranceMessage(substance)}\n`)
  .addField(":globe_with_meridians: __Links__", buildLinksMessage(substance))
  
  message.channel.send({embed});
}
//// Custom sheet functions
function checkIfCustomSheet(drug) {
  console.log("drug: " + drug)
  if (drug == "ayahuasca" || drug == "datura" || drug == "salvia" || drug == "lsa") {
    return true;
  } else {
    return false;
  }
}

function locateCustomSheetLocation(drug) {
  for (let i = 0; i < customsJSON.data.substances.length; i++) { 
    console.log("name: " + customsJSON.data.substances[i].name)   
    if (customsJSON.data.substances[i].name = drug) {
      location = i;
    }
    var substance = customsJSON.data.substances[location];
    console.log("SUBSTANCE: " + substance)
    console.log("correct: " + customsJSON.data.substances[3])
  }
  return substance;
}

//// Capitalization function
function capitalize(name) {
  return name[0].toUpperCase() + name.slice(1);
}

//// Message builders
function buildToleranceMessage(substance) {
  let tolerances = substance.tolerance
  // console.log(t)
  if (!!tolerances && substance.name !== "ayahuasca" || "salvia") {
    return `**Full**: ${tolerances.full}\n**Half**: ${tolerances.half}\n**Baseline**: ${tolerances.zero}`
  } else if (substance.name == "ayahuasca") {
    return substance.tolerance.tolerance;
  } else {
    return "No information";
  }
}

function buildDosageMessage(substance) {
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

function buildDurationMessage(substance) {
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

function buildChemicalClassMessage(substance) {
  if (substance.class !== null) {
    return `**Chemical**: ${substance.class.chemical[0]}`;
  } else {
    return "No information";
  }
}

function buildPsychoactiveClassMessage(substance) {
  if (substance.class !== null) {
    return `\n**Psychoactive**: ${substance.class.psychoactive[0]}`;
  } else {
    return "No information";
  }
}

function buildAddictionPotentialMessage(substance) {
  if (substance.addictionPotential !== null) {
    console.log(substance);
    return `${capitalize(substance.addictionPotential)}\n`
  } else {
    return "No information";
  }
}

function buildLinksMessage(substance) {
  return `[PsychonautWiki](https://psychonautwiki.org/wiki/${substance.name}) \n[Drug combination chart](https://wiki.tripsit.me/images/3/3a/Combo_2.png)`
}