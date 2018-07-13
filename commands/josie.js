//Josie message
exports.run = (client, message, args) => {
  console.log(`**********Executing josie on ${message.guild.name}**********`);

  message.channel
  .send(
    "ALL HAIL THE GLORIOUS SUPREME LEADER, <@295422447887450114>\nJOSIE APPRECIATION DAY\nJOSIE APPRECIATION DAY\nJOSIE APPRECIATION DAY\nJOSIE APPRECIATION DAY\n"
  )
  .catch(console.error);
};
