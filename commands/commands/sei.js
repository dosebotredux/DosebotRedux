// SEI blurb
exports.run = (client, message, args) => {
  console.log(`**********Executing sei on ${message.guild.name}**********`);

  message.channel
    .send(
      "The Subjective Effect Index - https://www.effectindex.com/effects \nFounded by <@!295422447887450114>"
    )
    .catch(console.error);
};
