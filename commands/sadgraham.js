// Sad Graham message
exports.run = (client, message, args) => {
  console.log(`**********Executing sadgraham on ${message.guild.name}**********`);

  message.channel
  .send(
    "<@200986075705901056> https://kek.gg/i/89J7Jh.png"
  )
  .catch(console.error);
};
