//Shay message
exports.run = (client, message, args) => {
  console.log(`**********Executing shay on ${message.guild.name}**********`);

  message.channel
  .send(
    "SHAAAAAAAAAAAAAAYYYYYYYYYYYYYYYY, <@236819661549862923>! YOU ARE SUMMONED BY THE DRUG LORDS"
  )
  .catch(console.error);
};
