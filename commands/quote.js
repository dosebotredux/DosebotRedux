const quotes = require("../include/quotes.json");
const Discord = require("discord.js");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");
const request = require("request");

// quote message
exports.run = (client, message, args) => {
  console.log(`**********Executing quote on ${message.guild.name}**********`);
  let msgString = message.content
    .replace(`--quote`, ``, -1)
    .replace(/-/g, ``, -1);
  let msgArr = msgString.split(` `);
  console.log(msgArr);
  let name;
  // let randomQuoteNumber = Math.floor(Math.random() * quotes.quotes.length);
  // let quote = quotes.quotes[randomQuoteNumber];

  let randomUserNumber = Math.floor(Math.random() * quotes.names.length);
  console.log(msgString.length);
  if (msgString.length < 7) {
    name = quotes.names[randomUserNumber];
  } else {
    name = msgArr.splice(1, msgArr.length).join(` `);
  }

  request("http://wisdomofchopra.com/iframe.php", function(
    error,
    response,
    html
  ) {
    if (!error && response.statusCode == 200) {
      virtualConsole.on("error"),
        () => {
          console.log(`jsdom error`);
        };
      const dom = new JSDOM(
        html,
        { runScripts: `dangerously` },
        { virtualConsole }
      );
      let quote = dom.window.document.querySelector(`h2`).textContent;

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
    } else {
      message.channel.send(`Error: The universe's wisdom processor is offline`);
    }
  });
};
