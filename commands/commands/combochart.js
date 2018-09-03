//tripsit combo chart message
exports.run = (client, message, args) => {
  console.log(
    `**********Executing combochart on ${message.guild.name}**********`
  );

  message.channel
    .send(
      "Drug combination chart: https://wiki.tripsit.me/images/3/3a/Combo_2.png"
    )
    .catch(console.error);
};
