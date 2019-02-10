const Discord = require('discord.js');

// Avatar message
exports.run = (client, message, args) => {
  let avatar = message.author.avatarURL;
  const mentionedUsers = [];

  if (message.mentions) {
    message.mentions.users.forEach(function(user) {
      avatar = user.avatarURL;
    });
  }

  const embed = new Discord.RichEmbed()
    .setTitle('DoseBot Avatar Service')
    .setAuthor('DoseBot Redux', 'https://i.imgur.com/7R8WDwE.png')
    .setColor('747474')
    .setURL('http://www.dosebot.org')
    .setImage(avatar);

  message.channel.send({ embed });
};
