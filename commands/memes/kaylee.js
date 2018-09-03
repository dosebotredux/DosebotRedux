//Kaylee message
exports.run = (client, message, args) => {
  console.log(`**********Executing kaylee on ${message.guild.name}**********`);

  message.channel
    .send(
      "<@183993728178978818> Cat girls unite under the banner of anarcho-communism!"
    )
    .catch(console.error);
};
