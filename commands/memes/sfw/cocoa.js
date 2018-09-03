//Cocoa message
exports.run = (client, message, args) => {
  console.log(`**********Executing cocoa on ${message.guild.name}**********`);

  message.channel
    .send(
      "Long live the right hand of the revolution, <@278301453620084736>\nThe lightkeeper\nThe brilliant flame\nThe lord of the first ember"
    )
    .catch(console.error);
};
