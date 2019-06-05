const Discord = require('discord.js');

exports.TemplatedRichEmbed = function () {
  return new Discord.RichEmbed()
    .setTimestamp()
    .attachFile("./assets/logo.png")
    .setAuthor('DoseBot Redux', 'attachment://logo.png')
    .setThumbnail('attachment://logo.png')
    .setColor('747474')
    .setURL("https://github.com/dosebotredux")
    .setFooter('Please use drugs responsibly', 'attachment://logo.png')
}
