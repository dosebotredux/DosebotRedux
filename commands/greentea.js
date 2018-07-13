//Cocoa message
exports.run = (client, message, args) => {
  console.log(`**********Executing greentea on ${message.guild.name}**********`);

  message.channel
  .send(
    "<@260992449671856128> https://i.imgur.com/2OQ7LIS.jpg"
  )
  .catch(console.error);
};
