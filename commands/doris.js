// Sad doris message
exports.run = (client, message, args) => {
  console.log(`**********Executing doris on ${message.guild.name}**********`);

  message.channel
    .send("<@179807481248088064> https://i.imgur.com/7gf6ERz.jpg")
    .catch(console.error);
};
