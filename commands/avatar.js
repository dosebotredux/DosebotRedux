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
    .setTitle('DoseBot Redux Avatar Service')
    .attachFile("./assets/logo.png")
    .setAuthor('DoseBot Redux', 'attachment://logo.png')
    .setColor('747474')
    .setURL('https://github.com/dosebotredux')
    .setImage(avatar);

  message.channel.send({ embed });
};
