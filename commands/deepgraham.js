// Graham message
exports.run = (client, message, args) => {
  console.log(
    `**********Executing deepgraham on ${message.guild.name}**********`
  );

  message.channel
    .send("<@200986075705901056> https://i.imgur.com/nzbIIIZ.jpg")
    .catch(console.error);
};
