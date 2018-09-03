//triggered kaylee
exports.run = (client, message, args) => {
  console.log(`**********Executing catfeud on ${message.guild.name}**********`);

  message.channel
    .send("<@183993728178978818> https://i.imgur.com/YSJEVXT.png")
    .catch(console.error);
};
