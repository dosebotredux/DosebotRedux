const Discord = require("discord.js");
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

    // loops through effects and add their name to the message variable
    for (let i = 0; i < 10; i++) {
      messages.push(effects[i].name)
    }

    let effectsJoined = messages.join("\n")

    const embed = new Discord.RichEmbed()
    .setTitle(`${substance.name} effect information`)
    .setAuthor("DoseBot", "https://kek.gg/i/JGVVV.png")
    .setColor("747474")
    .setFooter("Please use drugs responsibly", "https://kek.gg/i/JGVVV.png")
    .setThumbnail("https://kek.gg/i/svRNH.png")
    .setTimestamp()
    .setURL("http://www.dosebot.org")
    .addField(`Effects`, effectsJoined)
    .addField(`More information`, createFullEffectListLink(substance))

    message.channel.send({embed}).catch(console.error);
  }).catch(console.log)
}

function createFullEffectListLink(substance) {
  return `[See all effects](https://psychonautwiki.org/wiki/${substance.name}#Subjective_effects)`;
}