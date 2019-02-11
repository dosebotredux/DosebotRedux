const Discord = require('discord.js');

exports.TemplatedRichEmbed = function () {
  return new Discord.RichEmbed()
    .setTimestamp()
    .attachFile("./assets/logo.png")
    .setAuthor('DoseBot Redux', 'attachment://logo.png')
    .setThumbnail('attachment://logo.png')
    .setColor('747474')
    .setURL('http://www.effectindex.com')
    .setFooter('Please use drugs responsibly', 'attachment://logo.png')
}
