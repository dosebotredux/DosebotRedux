// Josildo 2 message
exports.run = (client, message, args) => {
  console.log(`**********Executing math on ${message.guild.name}**********`);

  message.channel
    .send("<@295422447887450114> https://i.imgur.com/BFRxECB.jpg")
    .catch(console.error);
};
