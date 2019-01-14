//Josie message
exports.run = (client, message, args) => {
  console.log(`**********Executing abuse on ${message.guild.name}**********`);
  message.channel
    .send(
      "https://en.wikipedia.org/wiki/Cycle_of_abuse"
    )
    .catch(console.error);
};
