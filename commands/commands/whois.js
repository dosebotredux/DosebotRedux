//displays list of commands. in future should scan commands directory and display info for each programmatically/dynamically
exports.run = (client, message, args) => {
  const Discord = require('discord.js');
  console.log(`**********Executing help on ${message.guild.name}**********`);

  const mentionedUsers = [];

  if (message.mentions) {
    message.mentions.users.forEach(user => {
      mentionedUsers.push(user);
    });
  }

  if (mentionedUsers.length > 0) {
    mentionedUsers.forEach(user => {
      const embed = new Discord.RichEmbed()
        .setTitle('DoseBot Intelligence Service')
        .setAuthor('DoseBot', 'https://i.imgur.com/7R8WDwE.png')
        .setColor('747474')
        .setThumbnail(user.avatarURL)
        .setURL('http://www.dosebot.org')
        .addField('Name', user.username)
        .addField('Status', user.presence.status)
        .addField('Registered', user.createdAt)
        .addField('Last message', user.lastMessage.content)
        .addField('ID', user.id);

      message.channel.send({ embed });
    });
  } else {
    message.channel.send('Error: No mentioned users detected');
  }

  // const embed = new Discord.RichEmbed()
  //   .setTitle('DoseBot Intelligence Service')
  //   .setAuthor('DoseBot', 'https://i.imgur.com/7R8WDwE.png')
  //   .setColor('747474')
  //   .setThumbnail(message.author.avatarURL)
  //   .setURL('http://www.dosebot.org')
  //   .addField('Name', message.author.username)
  //   .addField('Status', message.author.presence.status)
  //   .addField('Registered', message.author.createdAt)
  //   .addField('Last message', message.author.lastMessage)
  //   .addField('ID', message.author.id);

  // message.channel.send({ embed });
};
