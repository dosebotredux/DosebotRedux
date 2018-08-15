const quotes = require("../include/quotes.json");

// quote message
exports.run = (client, message, args) => {
  console.log(`**********Executing quote on ${message.guild.name}**********`);
  let random = Math.random() * quotes.quotes.length;

  message.channel.send(quotes.quotes[random]).catch(console.error);
};
