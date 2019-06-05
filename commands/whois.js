//displays list of commands. in future should scan commands directory and display info for each programmatically/dynamically
exports.run = (client, message, args) => {
  const Discord = require('discord.js');

  const mentionedUsers = [];

  if (message.mentions) {
    message.mentions.users.forEach(user => {
      mentionedUsers.push(user);
    });
  }

  if (mentionedUsers.length > 0) {
    mentionedUsers.forEach(user => {
      const embed = new Discord.RichEmbed()
        .setTitle('DoseBot Redux Intelligence Service')
        .attachFile("./assets/logo.png")
        .setAuthor('DoseBot Redux', 'attachment://logo.png')
        .setColor('747474')
        .setThumbnail(user.avatarURL)
        .setURL("https://github.com/dosebotredux")
        .addField('Name', user.username)
        .addField('Status', user.presence.status)
        .addField('Registered', user.createdAt)
        .addField('Last seen', user.lastMessage.createdAt)
        .addField('Discord ID', user.id);

      message.channel.send({ embed });
    });
  } else {
    message.channel.send('Error: No mentioned users detected');
  }

};
