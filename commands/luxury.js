// harm reduction message
exports.run = (client, message, args) => {
  console.log(
    `**********Executing harm reduction on ${message.guild.name}**********`
  );

  message.channel.send("https://i.imgur.com/0PUfswk.jpg").catch(console.error);
};
