// EvebNire message
exports.run = (client, message, args) => {
  console.log(
    `**********Executing EvebNire on ${message.guild.name}**********`
  );

  message.channel.send("https://i.imgur.com/I0gfF12.jpg").catch(console.error);
};
