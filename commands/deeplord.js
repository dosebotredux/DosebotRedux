// Lords Work message
exports.run = (client, message, args) => {
  console.log(
    `**********Executing Deep Lord's Work on ${message.guild.name}**********`
  );

  message.channel.send('https://i.imgur.com/LdlTjXF.jpg').catch(console.error);
};
