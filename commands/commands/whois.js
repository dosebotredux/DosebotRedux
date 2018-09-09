//displays list of commands. in future should scan commands directory and display info for each programmatically/dynamically
exports.run = (client, message, args) => {
  const Discord = require('discord.js');
  console.log(`**********Executing help on ${message.guild.name}**********`);

  const embed = new Discord.RichEmbed()
    .setTitle('DoseBot Intelligence Service')
    .setAuthor('DoseBot', 'https://i.imgur.com/7R8WDwE.png')
    .setColor('747474')
    .setThumbnail(message.author.avatarURL)
    .setURL('http://www.dosebot.org')
    .addField('Name', message.author.username)
    .addField('Status', message.author.presence.status)
    .addField('Registered', message.author.createdAt)
    .addField('Last message', message.author.lastMessage)
    .addField('ID', message.author.id);

  message.channel.send({ embed });
};
