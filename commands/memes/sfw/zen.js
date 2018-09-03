// Graham message
exports.run = (client, message, args) => {
  console.log(`**********Executing zen on ${message.guild.name}**********`);

  message.channel
    .send('<@254029997323452416> "Wyoming is flat"')
    .catch(console.error);
};
