// harm reduction message
exports.run = (client, message, args) => {
  console.log(
    `**********Executing harm reduction on ${message.guild.name}**********`
  );

  message.channel
    .send(
      "Are you practicing H A R M  R E D U C T I O N???\n\nhttps://i.imgur.com/nIpaz1y.png"
    )
    .catch(console.error);
};
