const quotes = require("../include/quotes.json");
const Discord = require("discord.js");

// quote message
exports.run = (client, message, args) => {
  console.log(`**********Executing quote on ${message.guild.name}**********`);
  let msgString = message.content
    .replace(`--quote`, ``, -1)
    .replace(/-/g, ``, -1);
  let msgArr = msgString.split(` `);
  console.log(msgArr);
  let name;

  let randomQuoteNumber = Math.floor(Math.random() * quotes.quotes.length);
  let quote = quotes.quotes[randomQuoteNumber];

  let randomUserNumber = Math.floor(Math.random() * quotes.names.length);
  console.log(msgString.length);
  if (msgString.length < 7) {
    name = quotes.names[randomUserNumber];
  } else {
    name = msgArr.splice(0, msgArr.length).join(` `);
  }

  const embed = new Discord.RichEmbed()
    .setAuthor("DoseBot", "https://i.imgur.com/7R8WDwE.png")
    .setColor("747474")
    .setFooter(
      "Please use drugs responsibly",
      "https://i.imgur.com/7R8WDwE.png"
    )
    .setTimestamp()
    .setURL("http://www.dosebot.org")
    .addField("Wise Words", `*"${quote}"*\n-${name}`);

  message.channel.send({ embed }).catch(console.error);
};
