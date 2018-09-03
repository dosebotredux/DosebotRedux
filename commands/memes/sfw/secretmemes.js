const Discord = require('discord.js');
var fs = require('fs');
// Displays list of memes
exports.run = (client, message, args) => {
  console.log(
    `**********Displaying secretmemes on ${message.guild.name}**********`
  );
  const SFW_MEMES_ARR = [];
  const NSFW_MEMES_ARR = [];

  fs.readdir('../../../../commands/memes/sfw', function(items) {
    for (let i = 0; i < items.length; i++) {
      SFW_MEMES_ARR.push(`--${items[i].replace(/.js$/, '')}`);
    }
  });
  fs.readdir('../../../../commands/memes/nsfw', function(items) {
    for (let i = 0; i < items.length; i++) {
      NSFW_MEMES_ARR.push(`--${items[i].replace(/.js$/, '')}`);
    }
  });

  const embed = new Discord.RichEmbed()
    .setTitle('DoseBot Memes')
    .setAuthor('DoseBot', 'https://i.imgur.com/7R8WDwE.png')
    .setColor('747474')
    .setFooter(
      'Please use drugs responsibly',
      'https://i.imgur.com/7R8WDwE.png'
    )
    .setThumbnail('https://i.imgur.com/7R8WDwE.png')
    .setTimestamp()
    .setURL('http://www.dosebot.org')
    .addField('SFW Memes', generateSFWMemes(SFW_MEMES_ARR))
    .addField('NSFW Memes', generateNSFWMemes(NSFW_MEMES_ARR));

  message.channel.send({ embed }).catch(console.error);

  function generateSFWMemes(arr) {
    return arr.sort().join('\n');
  }

  function generateNSFWMemes(arr) {
    return arr.sort().join('\n');
  }
};
