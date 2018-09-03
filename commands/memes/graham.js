// Graham message
exports.run = (client, message, args) => {
  console.log(`**********Executing graham on ${message.guild.name}**********`);

  message.channel
    .send("<@200986075705901056> https://i.imgur.com/xdXHnPC.jpg")
    .catch(console.error);
};
