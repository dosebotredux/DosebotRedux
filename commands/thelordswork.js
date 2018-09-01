// Lords Work message
exports.run = (client, message, args) => {
  console.log(
    `**********Executing Lord's Work on ${message.guild.name}**********`
  );

  message.channel.send('https://i.imgur.com/HsQRjwB.png').catch(console.error);
};
