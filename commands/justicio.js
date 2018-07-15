//justice
exports.run = (client, message, args) => {
  console.log(
    `**********Executing justicio on ${message.guild.name}**********`
  );

  message.channel
    .send("https://i.imgur.com/uDkFxgf.jpg\n***THIS CHANNEL IS UNACCEPTABLE***")
    .catch(console.error);
};
