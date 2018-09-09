//displays list of commands. in future should scan commands directory and display info for each programmatically/dynamically
exports.run = (client, message, args) => {
  const Discord = require('discord.js');
  console.log(`**********Executing help on ${message.guild.name}**********`);

  const embed = new Discord.RichEmbed()
    .setTitle('DoseBot Whois Service')
    .setAuthor('DoseBot', 'https://i.imgur.com/7R8WDwE.png')
    .setColor('747474')
    .setThumbnail('https://i.imgur.com/7R8WDwE.png')
    .setTimestamp()
    .setURL('http://www.dosebot.org')
    .setImage(message.author.avatarURL)
    .addField('Name', message.author.displayName)
    .addField('Status', message.author.presence.status)
    .addField('Joined', message.author.joinedAt)
    .addField('Registered', message.author.createdAt)
    .addField('Last message', message.author.lastMessage)
    .addField('ID', message.author.id);

  message.channel.send({ embed });
};
