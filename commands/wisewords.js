const quotes = require("../include/quotes.json");
const Discord = require("discord.js");
const wiseWords = require("wisdom-of-chopra");

// wisewords message
exports.run = (client, message, args) => {
  console.log(
    `**********Executing wisewords on ${message.guild.name}**********`
  );
  let msgString = message.content
    .replace(`--wisewords`, ``, -1)
    .replace(/-/g, ``, -1);
  let msgArr = msgString.split(` `);

  // Creat richembed to send
  const embed = new Discord.RichEmbed()
    .setAuthor("DoseBot", "https://i.imgur.com/7R8WDwE.png")
    .setColor("747474")
    .setFooter(
      "Please use drugs responsibly",
      "https://i.imgur.com/7R8WDwE.png"
    )
    .setTimestamp()
    .setURL("http://www.dosebot.org")
    .setThumbnail(generateThumbnail())
    .addField("Wise Words", `*${generateQuote()}*\n-${generateName()}`);

  // SEND IT
  message.channel.send({ embed }).catch(console.error);

  // Function for getting random thumbnail
  function generateThumbnail() {
    let thumbArr = [
      "https://i.imgur.com/WkYo3vd.png",
      message.author.avatarURL,
      "https://i.imgur.com/7uI3ri3.png",
      "https://i.imgur.com/yTVmFhb.png",
      "https://i.imgur.com/OmuI74P.png",
      "https://i.imgur.com/q87TndD.png",
      "https://i.imgur.com/ovxmB8L.png",
      "https://i.imgur.com/7gf6ERz.jpg"
    ];
    let thumbRand = Math.floor(Math.random() * thumbArr.length);
    return thumbArr[thumbRand];
  }

  // Function for getting random name
  function generateName() {
    let randomUserNumber = Math.floor(Math.random() * quotes.names.length);

    if (msgString.length < 10) {
      return quotes.names[randomUserNumber];
    } else {
      return msgArr.splice(1, msgArr.length).join(` `);
    }
  }

  // Function for getting random quote
  function generateQuote() {
    return wiseWords.getQuote();
  }
};
