// About message
const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const embed = new Discord.RichEmbed()
    .setAuthor('DoseBot Redux', 'https://i.imgur.com/7R8WDwE.png')
    .setColor('747474')
    .setFooter(
      'Please use drugs responsibly',
      'https://i.imgur.com/7R8WDwE.png'
    )
    .setThumbnail('https://i.imgur.com/7R8WDwE.png')
    .setTimestamp()
    .setURL('http://www.dosebot.org')
    .addField(
      'Assistance',
      `DoseBot Redux automatically sources dosage, duration, tolerance, and harm reduction information from [PsychonautWiki](http://www.psychonautwiki.org) and [Effect Index](https://effectindex.com).

      It was created with the goal of raising awareness of harm reduction best practices, as well as the Subjective Effect Index. For a complete list of commands type \'--help\'.

      For more information about the original Dosebot, see [DoseBot on Effect Index](https://effectindex.com/dosebot) or join the Subjective Effect Documentation [Discord server](https://discord.gg/2J5XBfX).`
    );

  message.channel.send({ embed });
};
