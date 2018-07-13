//Josie message
exports.run = (client, message, args) => {
  console.log(`**********Executing josildo on ${message.guild.name}**********`);

  message.channel
  .send(
    "https://kek.gg/i/6M5RxC.jpg"
  )
  .catch(console.error);
};
