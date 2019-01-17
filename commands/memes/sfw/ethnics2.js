// Sad ethnics message
exports.run = (client, message, args) => {
  console.log(`**********Executing ethnics on ${message.guild.name}**********`);

  message.channel.send('https://i.imgur.com/NFpCJbr.png').catch(console.error);
};
