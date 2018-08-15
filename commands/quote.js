const quotes = require("../include/quotes.json");
const Discord = require("discord.js");

// quote message
exports.run = (client, message, args) => {
  console.log(`**********Executing quote on ${message.guild.name}**********`);
  let random = Math.floor(Math.random() * quotes.quotes.length);
  let quote = quotes.quotes[random];

  const embed = new Discord.RichEmbed()
    .setAuthor("DoseBot", "https://i.imgur.com/7R8WDwE.png")
    .setColor("747474")
    .setFooter(
      "Please use drugs responsibly",
      "https://i.imgur.com/7R8WDwE.png"
    )
    .setTimestamp()
    .setURL("http://www.dosebot.org")
    .addField(`*${quote}*\n\n-Cocoa`);

  message.channel.send({ embed }).catch(console.error);
};
