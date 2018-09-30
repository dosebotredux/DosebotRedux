// Confuse someone message
exports.run = (client, message, args) => {
  console.log(`**********Executing Confuse on ${message.guild.name}**********`);
  message.channel
    .send(
      'Has anyone really been far even as decided to use even go want to do look more like?'
    )
    .catch(console.error);
};
