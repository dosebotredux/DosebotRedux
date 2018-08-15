const quotes = require("../include/quotes.json");

// quote message
exports.run = (client, message, args) => {
  console.log(`**********Executing quote on ${message.guild.name}**********`);
  let random = Math.floor(Math.random() * quotes.quotes.length);
  console.log(quotes);
  console.log(quotes.quotes[random]);
  console.log(random);

  message.channel.send(quotes.quotes[random]).catch(console.error);
};
