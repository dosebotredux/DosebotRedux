//Josie message
exports.run = (client, message, args) => {
  console.log(`**********Executing Apple on ${message.guild.name}**********`);
  message.channel
    .send(
      "<@198667544930811905> https://en.wikipedia.org/wiki/Cycle_of_abuse"
    )
    .catch(console.error);
};
