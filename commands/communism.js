// harm reduction message
exports.run = (client, message, args) => {
  console.log(
    `**********Executing communism on ${message.guild.name}**********`
  );

  message.channel.send("https://i.imgur.com/WLXffYk.jpg").catch(console.error);
};
