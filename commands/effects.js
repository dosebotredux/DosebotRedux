const sanitizeSubstanceName = require("../include/sanitize-substance-name.js")

exports.run = (client, message, args) => {
  const { request } = require("graphql-request");

  var str = message.content;
  var result = str.split(" ");
  var drug = str
    .toLowerCase()
    .replace("--effects ", "", -1)
    .replace(/-/g, "", -1)
    .replace(/ /g, "", -1); //removes all symbols and puts everything in lower case so bot finds the images easier
  drug = sanitizeSubstanceName(drug)

  // loads graphql query from separate file as "query" variable
  const query = require("../queries/effects.js").effect(drug)

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

    const substance = data.substances[0]
    const effects = substance.effects

    var messages = []

    messages.push(`**${substance.name} effect information**`)
    messages.push("```")

    // loops through effects and add their name to the message variable
    for (let i = 0; i < effects.length; i++) {
      messages.push(effects[i].name)
    }

    messages.push("```")
    messages.push(`More information: <https://psychonautwiki.org/wiki/${substance.name}#Subjective_effects>`)

    let channelMessage = messages.join("\n")

    message.channel.send(channelMessage).catch(console.error)
  }).catch(console.log)
}
