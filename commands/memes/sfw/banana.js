exports.run = (client, message, args) => {
  console.log(`**********Executing banana on ${message.guild.name}**********`);
  message.channel
    .send(
      "https://i.imgur.com/G5ONL5i.jpg"
    )
    .catch(console.error);
};
