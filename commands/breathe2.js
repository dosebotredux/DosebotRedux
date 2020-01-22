const Discord = require('discord.js');

// Panic attack command
exports.run = (client, message, args) => {
  message.channel.send({ files: ["./assets/breathe2.gif"] });
};
