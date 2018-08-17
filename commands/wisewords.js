const quotes = require("../include/quotes.json");
const Discord = require("discord.js");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const request = require("request");

// wisewords message
exports.run = (client, message, args) => {
  console.log(
    `**********Executing wisewords on ${message.guild.name}**********`
  );
  let msgString = message.content
    .replace(`--wisewords`, ``, -1)
    .replace(/-/g, ``, -1);
  let msgArr = msgString.split(` `);
  console.log(msgArr);
  let name;

  let randomUserNumber = Math.floor(Math.random() * quotes.names.length);
  console.log(msgString.length);
  if (msgString.length < 10) {
    name = quotes.names[randomUserNumber];
  } else {
    name = msgArr.splice(1, msgArr.length).join(` `);
  }

  let thumbArr = [
    "https://i.imgur.com/WkYo3vd.png",
    message.author.avatarURL,
    "https://i.imgur.com/7uI3ri3.png",
    "https://i.imgur.com/yTVmFhb.png",
    "https://i.imgur.com/OmuI74P.png",
    "https://i.imgur.com/q87TndD.png",
    "https://i.imgur.com/ovxmB8L.png"
  ];
  let thumbRand = Math.floor(Math.random() * thumbArr.length);
  let thumbnail = thumbArr[thumbRand];

  request("http://wisdomofchopra.com/iframe.php", function(
    error,
    response,
    html
  ) {
    if (!error && response.statusCode == 200) {
      const dom = new JSDOM(html, { runScripts: `dangerously` });
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
        .setThumbnail(thumbnail)
        .addField("Wise Words", `*${quote}*\n-${name}`);

      message.channel.send({ embed }).catch(console.error);
    } else {
      message.channel.send(`Error: The universe's wisdom processor is offline`);
    }
  });
};
