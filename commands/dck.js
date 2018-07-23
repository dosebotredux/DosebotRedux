// About message
const Discord = require("discord.js");

exports.run = (client, message, args) => {
  console.log(`**********Executing about on ${message.guild.name}**********`);

  message.channel.send(
    `DID SOMEBODY MENTION DICK???\n\nhttps://i.imgur.com/9jhNhKC.png`
  );
};
