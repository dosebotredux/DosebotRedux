const quotes = require("../include/quotes.json");

// quote message
exports.run = (client, message, args) => {
  console.log(`**********Executing quote on ${message.guild.name}**********`);
  let random = Math.floor(Math.random() * quotes.quotes.length);
  let quote = quotes.quotes[random];

  message.channel
    .send(
      `Let us contemplate upon this wise quote by Deepak Chopra:\n\n${quote}`
    )
    .catch(console.error);
};
