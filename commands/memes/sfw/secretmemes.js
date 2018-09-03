const Discord = require('discord.js');
// Displays list of memes
exports.run = (client, message, args) => {
  console.log(
    `**********Displaying secretmemes on ${message.guild.name}**********`
  );
  const SFW_MEMES_ARR = [
    '--alexis',
    '--apple',
    '--bootcamp',
    '--catfeud',
    '--cocoa',
    '--communism',
    '--deepgraham',
    '--deeplord',
    '--donot',
    '--doris',
    '--dust',
    '--etizolab',
    '--evebnire',
    '--fourthdimension',
    '--frogmodai',
    '--geometry',
    '--graham',
    '--greentea',
    '--harmreduction',
    '--heart',
    '--illusion',
    '--ivey',
    '--josie',
    '--justicio',
    '--kat',
    '--kat2',
    '--katcase',
    '--kaylee',
    '--kayleetriggered',
    '--lordswork',
    '--luxury',
    '--mascot',
    '--rob',
    '--sadgraham',
    '--secretmemes',
    '--shay',
    '--sponge',
    '--thelordswork',
    '--triptoy',
    '--uwotm8',
    '--video',
    '--wisewords',
    '--zen'
  ];
  const NSFW_MEMES_ARR = [
    '--dck',
    '--dong',
    '--josildo',
    '--math',
    '--nsfwmascot'
  ];

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
