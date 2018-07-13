//grabs glossary info from local json and builds message based on random effect
const Discord = require("discord.js");
const glossary = require("../glossary.json");
const replications = require("../replications.json");

exports.run = (client, message, args) => {
  console.log(`**********Executing randomeffect on ${message.guild.name}**********`);

  var str = message.content;
  var result = str.split(" ");
  var effect = str
  .toLowerCase()
  .replace("--randomeffect ", "", -1)
  .replace(/-/g, "", -1)
  
  // define message array
  var messageContent = [];
  
  // get random value for selecting random glossary item
  var glossaryRand = Math.floor(Math.random() * glossary.effects.length);
  
  // initialize random variable for finding random replication
  var replicationsRand;
  var name = glossary.effects[glossaryRand].name;
  
  // push glossary info to message
  messageContent.push(glossary.effects[glossaryRand].name);
  messageContent.push(glossary.effects[glossaryRand].body);
  messageContent.push(glossary.effects[glossaryRand].url);
  
  // loop through replications json to find matching effect
  for (let i = 0; i < replications.effects.length; i++) {
    // if effect is found and has replications add to message
    if (replications.effects[i].name.toLowerCase() === name.toLowerCase()) {
      replicationsRand = Math.floor(Math.random() * replications.effects[i].replications.length)
      messageContent.push(replications.effects[i].replications[replicationsRand].url)
    }
  }

  // If has replication(s) construct message
  if (messageContent[3]) {
    const embed = new Discord.RichEmbed()
    .setTitle(`${messageContent[0]} effect information`)
    .setAuthor("DoseBot", "https://kek.gg/i/JGVVV.png")
    .setColor("747474")
    .setFooter("Please use drugs responsibly", "https://kek.gg/i/JGVVV.png")
    .setThumbnail("https://kek.gg/i/svRNH.png")
    .setTimestamp()
    .setURL("http://www.dosebot.org")
    .addField(`Description`, messageContent[1])
    .addField(`More information`, messagecontent[2])
    .setImage(messageContent[3])

    message.channel.send({embed});
  } else {
    // If no replication(s) construct message
    const embed = new Discord.RichEmbed()
    .setTitle(`${messageContent[0]} effect information`)
    .setAuthor("DoseBot", "https://kek.gg/i/JGVVV.png")
    .setColor("747474")
    .setFooter("Please use drugs responsibly", "https://kek.gg/i/JGVVV.png")
    .setThumbnail("https://kek.gg/i/svRNH.png")
    .setTimestamp()
    .setURL("http://www.dosebot.org")
    .addField(`Description`, messageContent[1])
    .addField(`More information`, messagecontent[2])

    message.channel.send({embed});
  }
}