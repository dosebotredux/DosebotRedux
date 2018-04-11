const sanitizeSubstanceName = require("../include/sanitize-substance-name.js")

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
      message.channel.send(`There are no substances matching \`${drug}\` on PsychonautWiki.`).catch(console.error)
      return
    }

    if (data.substances.length > 1) {
      message.channel.send(`There are multiple substances matching \`${drug}\` on PsychonautWiki.`).catch(console.error)
      return
    }

    let substance = data.substances[0]

    var messages = []
    messages.push(`**${substance.name} information**`)
    messages.push("")
    messages.push(buildDosageMessage(substance))
    messages.push("**Addiction potential**")
    messages.push("```" + (substance.addictionPotential || "No information") + "```")
    messages.push("**Tolerance**")
    messages.push(buildToleranceMessage(substance))

    message.channel.send(messages.join("\n")).catch(console.error)

    message.channel.send(`More information: <https://psychonautwiki.org/wiki/${substance.name}>`).catch(console.error)
  })
  .catch(function(error) {
    console.log("promise reected/errored out");
    console.log(error);
  });
};

// Functions
function buildToleranceMessage(substance) {
  let t = substance.tolerance
  // console.log(t)
  if (!!t) {
    return `\`\`\`Full: ${t.full}\nHalf: ${t.half}\nBaseline: ${t.zero}\`\`\``
  } else {
    return "```No information.```"
  }
}

function buildDosageMessage(substance) {
  var messages = []

  var i
  for (i = 0; i < substance.roas.length; i++) {
    let roa = substance.roas[i]
    let dose = roa.dose

    let dosageObjectToString = function(x) {
      // console.log(x)
      let unit = dose.units
      if (!!x) {
        if (typeof x == "number") {
          return  `${x} ${unit}`
        }
        return `${x.min} - ${x.max}${unit}`
      }
    }
    let durationObjectToString = function(x) {
      // console.log(x)
      // { max: 48, min: 12, units: 'hours' }
      if (!!x) {
        return `${x.min} - ${x.max} ${x.units}`
      }
      return undefined
    }

    messages.push(`**Dosage** (${roa.name})`)
    messages.push("```")
    messages.push(`Threshold: ${dosageObjectToString(dose.threshold) || "no information"}`)
    messages.push(`Light: ${dosageObjectToString(dose.light) || "no information"}`)
    messages.push(`Common: ${dosageObjectToString(dose.common) || "no information"}`)
    messages.push(`Strong: ${dosageObjectToString(dose.strong) || "no information"}`)
    messages.push(`Heavy: ${dosageObjectToString(dose.heavy) || "no information"}`)
    messages.push("```")

    // Duration
    messages.push(`**Duration** (${roa.name})`)
    if (!!roa.duration) {
      messages.push("```")
      messages.push(`Onset: ${durationObjectToString(roa.duration.onset) || "no information"}`)
      messages.push(`Comeup: ${durationObjectToString(roa.duration.comeup) || "no information"}`)
      messages.push(`Peak: ${durationObjectToString(roa.duration.peak) || "no information"}`)
      messages.push(`Offset: ${durationObjectToString(roa.duration.offset) || "no information"}`)
      messages.push(`Afterglow: ${durationObjectToString(roa.duration.afterglow) || "no information"}`)
      messages.push(`Total: ${durationObjectToString(roa.duration.total) || "no information"}`)
      messages.push("```")
    } else {
      messages.push("```No duration information .```")
    }

  }

  // console.log(messages)
  return messages.join("\n")
}
