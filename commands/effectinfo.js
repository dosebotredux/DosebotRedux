const Discord = require("discord.js");

//grabs glossary info from local json and builds message based on arg
const glossary = require("../include/glossary.json");
const replications = require("../include/replications.json");

exports.run = (client, message, args) => {
  console.log(`**********Executing effectinfo on ${message.guild.name}**********`);

  var str = message.content;
  var result = str.split(" ");
  var effect = str
  .toLowerCase()
  .replace("--effectinfo ", "", -1)
  .replace(/-/g, "", -1)
  console.log("str: " + str);
  console.log("result: " + effect);
  var messageContent = [];
  var finalMessage;
  
  // loop through glossary to find matching effect 
  for (let i = 0; i < glossary.effects.length; i++) {
    if (glossary.effects[i].name.toLowerCase() === effect) {
      // build message components
      console.log(glossary.effects[i].name);
      messageContent.push(glossary.effects[i].name);
      messageContent.push(glossary.effects[i].body);
      messageContent.push(glossary.effects[i].url);
    }
  }
  
  // variables for matching to replications.json
  var rand;
  var locationOfEffect;
  
  // loop through replications.json to find matching effect
  for (let i = 0; i < replications.effects.length; i++) {
    if (replications.effects[i].name.toLowerCase() === effect) {
      // generate random number for pulling replications
      rand = Math.floor(Math.random() * replications.effects[i].replications.length);
      
      // store location
      locationOfEffect = i;
    }
  }
  
  // if effect has replications add to messageContent array
  if (replications.effects[locationOfEffect] !== undefined) {
    messageContent.push(replications.effects[locationOfEffect].replications[rand].url);
  }
  console.log(messageContent);
  
  // messageBuilder();
  var messages = [];
  
  // build message
  if (messageContent[3] !== undefined) {
    const embed = new Discord.RichEmbed()
    .setAuthor("DoseBot", "https://kek.gg/i/JGVVV.png")
    .setColor("747474")
    .setFooter("Please use drugs responsibly", "https://kek.gg/i/JGVVV.png")
    .setThumbnail("https://kek.gg/i/svRNH.png")
    .setTimestamp()
    .setURL("http://www.dosebot.org")
    .addField(messageContent[0], `${messageContent[1]}\n\n**More information**: ${messageContent[2]}`)
    .setImage(messageContent[3])

    message.channel.send({embed}).catch(console.error);
  } else if (messageContent[0] !== undefined) {
    const embed = new Discord.RichEmbed()
    .setAuthor("DoseBot", "https://kek.gg/i/JGVVV.png")
    .setColor("747474")
    .setFooter("Please use drugs responsibly", "https://kek.gg/i/JGVVV.png")
    .setThumbnail("https://kek.gg/i/svRNH.png")
    .setTimestamp()
    .setURL("http://www.dosebot.org")
    .addField(messageContent[0], `${messageContent[1]}\n\n**More information**: ${messageContent[2]}`)

    message.channel.send({embed}).catch(console.error);
  } else {
    const embed = new Discord.RichEmbed()
    .setAuthor("DoseBot", "https://kek.gg/i/JGVVV.png")
    .setColor("747474")
    .setFooter("Please use drugs responsibly", "https://kek.gg/i/JGVVV.png")
    .setThumbnail("https://kek.gg/i/svRNH.png")
    .setTimestamp()
    .setURL("http://www.dosebot.org")
    .addField("Error", "Undefined effect")

    message.channel.send({embed}).catch(console.error);
  }
  
};
