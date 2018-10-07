//colourful devvo meme
exports.run = (client, message, args) => {
  console.log(`**********Executing doris on ${message.guild.name}**********`);

  message.channel.send(
    'https://cdn.discordapp.com/attachments/433004930433810442/498207550248845329/591be855eb306c752d821164ac7805cdcf7a7164.png'
  );
  message.channel
    .send('<@118117307514880000> DEVVO MAAAAYYYYTE')
    .catch(console.error);
};
