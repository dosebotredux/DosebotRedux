const Discord = require("discord.js");
const sanitizeSubstanceName = require("../include/sanitize-substance-name.js")

exports.run = (client, message, args) => {
  console.log(`**********Executing effects on ${message.guild.name}**********`);

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
  console.log(data); // SHOW ME WHAT YOU GOT
  
  if (data.substances.length == 0) {
    message.channel.send(`There are no substances matching \`${drug}\` on PsychonautWiki.`).catch(console.error);
    return;
  }
  
  if (data.substances.length > 1) {
    message.channel.send(`There are multiple substances matching \`${drug}\` on PsychonautWiki.`).catch(console.error);
    return;
  }
  const substance = data.substances[0];
  
  const embed = new Discord.RichEmbed()
  .setTitle(`${substance.name} effect information`)
  .setAuthor("DoseBot", "https://kek.gg/i/JGVVV.png")
  .setColor("747474")
  .setFooter("Please use drugs responsibly", "https://kek.gg/i/JGVVV.png")
  .setThumbnail("https://kek.gg/i/svRNH.png")
  .setTimestamp()
  .setURL("http://www.dosebot.org")
  .addField(`Effects (randomly selected)`, createEffectsList(substance))
  .addField(`More information`, createFullEffectListLink(substance))
  
  message.channel.send({embed}).catch(console.error);
}).catch(console.log)
}

function createEffectsList(substance) {
  // const substance = data.substances[0];
  const effects = substance.effects;
  const numberOfEffects = effects.length;
  let randomNumberArray = [];
  let namesUnderscoresRemovedArray = []; 
  
  while (randomNumberArray.length < 10) {
    randomNumberArray.push(Math.floor(Math.random() * numberOfEffects));
  }

  randomNumberArray.forEach(element => {
    namesUnderscoresRemovedArray.push(effects[element].name.replace(/ /g, "_"));
  });

  var messages = [];

  // loops through effects and add their name to the message variable
  for (let i = 0; i < randomNumberArray.length; i++) {
    messages.push(`-[${effects[randomNumberArray[i]].name}](https://psychonautwiki.org/wiki/${namesUnderscoresRemovedArray[i]})`);
  }
  return messages.join("\n");
}

function createFullEffectListLink(substance) {
  return `These effects were randomly selected from a larger list - [see all effects](https://psychonautwiki.org/wiki/${substance.name}#Subjective_effects)`;
}