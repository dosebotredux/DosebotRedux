const Discord = require('discord.js');

// Panic attack command
exports.run = (client, message, args) => {
  console.log(`**********Executing breathe on ${message.guild.name}**********`);

  const embed = new Discord.RichEmbed()
    .setTitle('DoseBot Coin Flipping Service')
    .setAuthor('DoseBot', 'https://i.imgur.com/7R8WDwE.png')
    .setColor('747474')
    .addField('Results', flipCoin(message));

  message.channel.send({ embed });

  function flipCoin(message) {
    const author = message.author.username;
    const rand = Math.floor(Math.random() * 100);

    const coin = rand > 50 ? 'heads' : 'tails';

    const channelMessage = `**${author}** tossed a coin and got **${coin.toUpperCase()}**`;

    return channelMessage;
  }
};
