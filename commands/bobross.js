//mity.io/y/cDIn

//Josie message
exports.run = (client, message, args) => {
  message.channel.send(`<@${message.author.id}> Enjoy a random episode of The Joy of Painting: https://mityurl.com/y/cDIn/r\n`).catch(console.error);
}
