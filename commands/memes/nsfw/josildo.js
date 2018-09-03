//Josie message
exports.run = (client, message, args) => {
  console.log(`**********Executing josildo on ${message.guild.name}**********`);

  message.channel.send("https://i.imgur.com/yxr6kQ6.jpg").catch(console.error);
};
