// obligatory message
exports.run = (client, message, args) => {
  console.log(
    `**********Executing obligatory on ${message.guild.name}**********`
  );

  message.channel
    .send("*obligatory DoseBot role management mention*")
    .catch(console.error);
};
