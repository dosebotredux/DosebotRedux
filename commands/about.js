// About message
const Discord = require("discord.js");

exports.run = (client, message, args) => {
  console.log(`**********Executing about on ${message.guild.name}**********`);

  message.channel.send({ generateAboutMessage });

  function generateAboutMessage() {
    const embed = new Discord.RichEmbed()
      .setAuthor("DoseBot", "https://i.imgur.com/7R8WDwE.png")
      .setColor("747474")
      .setFooter(
        "Please use drugs responsibly",
        "https://i.imgur.com/7R8WDwE.png"
      )
      .setThumbnail("https://i.imgur.com/7R8WDwE.png")
      .setTimestamp()
      .setURL("http://www.dosebot.org")
      .addField(
        "Assistance",
        "DoseBot automatically sources dosage, duration, tolerance, and harm reduction information from [PsychonautWiki](http://www.psychonautwiki.org) and [Effect Index](https://effectindex.com).\n\nIt was created by <@278301453620084736>, <@295422447887450114>, <@249800037050220545>, <@183993728178978818>, and <@247965158364676104> with the goal of raising awareness of harm reduction best practices, as well as the Subjective Effect Index. Based on KGB by Stas Constantine\n\nFor a complete list of commands type '--help'.\n\nFor more information see [DoseBot on Effect Index](https://effectindex.com/dosebot) or join the Subjective Effect Documentation [Discord server](https://discord.gg/2J5XBfX)."
      );

    return embed;
  }
};
