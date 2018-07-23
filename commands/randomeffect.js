// Grabs glossary info from local json and builds message based on random effect
// This code is honestly a disaster and requires a complete refactor at some point
const Discord = require("discord.js");
const glossary = require("../include/glossary.json");
const replications = require("../include/replications.json");

exports.run = (client, message, args) => {
  console.log(
    `**********Executing randomeffect on ${message.guild.name}**********`
  );
  // define message array
  var messageContent = [];

  // get random value for selecting random glossary item
  var glossaryRand = Math.floor(Math.random() * glossary.effects.length);

  // initialize random variable for finding random replication
  var replicationsRand;
  var name = glossary.effects[glossaryRand].name;

  // push glossary info to message
  messageContent.push(glossary.effects[glossaryRand].name); // messsageContent[0] = effect name
  messageContent.push(glossary.effects[glossaryRand].body); // messageContent[1] = effect body
  messageContent.push(glossary.effects[glossaryRand].url); // messageContent[2] = effect url

  // loop through replications json to find matching effect
  for (let i = 0; i < replications.effects.length; i++) {
    // if effect is found and has replications add to message
    if (replications.effects[i].name.toLowerCase() === name.toLowerCase()) {
      // Get a random number for finding random replication
      replicationsRand = Math.floor(
        Math.random() * replications.effects[i].replications.length
      );
      // Push the URL to the messageContent array
      messageContent.push(
        replications.effects[i].replications[replicationsRand].url
      );
    }
  }

  // If has replication(s) construct message
  if (messageContent[3]) {
    const embed = new Discord.RichEmbed()
      .setTitle(`${messageContent[0]} effect information`)
      .setAuthor("DoseBot", "https://i.imgur.com/7R8WDwE.png")
      .setColor("747474")
      .setFooter(
        "Please use drugs responsibly",
        "https://i.imgur.com/7R8WDwE.png"
      )
      .setThumbnail("https://i.imgur.com/7R8WDwE.png")
      .setTimestamp()
      .setURL("http://www.dosebot.org")
      .addField(`Description`, messageContent[1])
      .addField(`More information`, messageContent[2])
      .setImage(messageContent[3]);

    message.channel.send({ embed });
  } else {
    // If no replication(s) construct message
    const embed = new Discord.RichEmbed()
      .setTitle(`${messageContent[0]} effect information`)
      .setAuthor("DoseBot", "https://i.imgur.com/7R8WDwE.png")
      .setColor("747474")
      .setFooter(
        "Please use drugs responsibly",
        "https://i.imgur.com/7R8WDwE.png"
      )
      .setThumbnail("https://i.imgur.com/7R8WDwE.png")
      .setTimestamp()
      .setURL("http://www.dosebot.org")
      .addField(`Description`, messageContent[1])
      .addField(`More information`, messageContent[2]);

    message.channel.send({ embed });
  }
};
