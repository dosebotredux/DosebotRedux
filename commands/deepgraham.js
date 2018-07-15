// Graham message
exports.run = (client, message, args) => {
  console.log(
    `**********Executing deepgraham on ${message.guild.name}**********`
  );

  message.channel
    .send("<@200986075705901056> https://kek.gg/i/4XYhFB.jpg")
    .catch(console.error);
};
