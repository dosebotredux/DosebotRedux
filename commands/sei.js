// SEI blurb
exports.run = (client, message, args) => {
  message.channel
    .send(
      "The Subjective Effect Index - https://www.effectindex.com/effects \nFounded by <@!295422447887450114>"
    )
    .catch(console.error);
};
