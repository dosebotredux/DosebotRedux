const Discord = require('discord.js');
const Helpers = require('../helpers.js');

// Avatar message
exports.run = (client, message, args) => {
  let avatar = message.author.avatarURL({size: 2048});
  const mentionedUsers = [];

  if (message.mentions) {
    message.mentions.users.forEach(function(user) {
      avatar = user.avatarURL({size: 2048});
    });
  }

  const embed = Helpers.TemplatedMessageEmbed()
    .setTitle('DoseBot Redux Avatar Service')
    .setImage(avatar);

  message.channel.send({ embed });
};
