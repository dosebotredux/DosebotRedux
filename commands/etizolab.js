// Etizolab message
exports.run = (client, message, args) => {
  console.log(
    `**********Executing Etizolab on ${message.guild.name}**********`
  );

  message.channel.send("https://i.imgur.com/2rOpmbU.jpg").catch(console.error);
};
