// Sad ethnics message
exports.run = (client, message, args) => {
  console.log(`**********Executing ethnics on ${message.guild.name}**********`);

  message.channel
    .send('<@371151824331210755> https://i.imgur.com/NFpCJbr.png')
    .catch(console.error);
};
