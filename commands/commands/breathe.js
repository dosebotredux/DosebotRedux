const Discord = require('discord.js');

// Panic attack command
exports.run = (client, message, args) => {
  console.log(`**********Executing breathe on ${message.guild.name}**********`);

  message.channel.send('https://i.imgur.com/RSoEEL0.gif');
};
