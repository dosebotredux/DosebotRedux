const Discord = require('discord.js');
//displays list of memes. in future should scan commands directory and display info for each programmatically/dynamically
exports.run = (client, message, args) => {
  console.log(
    `**********Displaying secretmemes on ${message.guild.name}**********`
  );
  const SFW_MEMES_ARR = [
    '--alexis',
    '--apple',
    '--catfeud',
    '--catgirl',
    '--cocoa',
    '--communism',
    '--deepgraham',
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
    '--josie',
    '--justicio',
    '--kaylee',
    '--kayleetriggered',
    '--lordswork',
    '--luxury',
    '--mascot',
    '--rob',
    '--sadgraham',
    '--shay',
    '--uwotm8',
    '--zen',
    '--dust',
    '--obligatory',
    '--wisewords',
    '--kat',
    '--kat2',
    '--apple',
    '--ivey',
    '--doris',
    '--donot',
    '--deeplord',
    '--bootcamp',
    '--katcase [text]',
    '--sponge [text]'
  ];
  const NSFW_MEMES_ARR = ['--dck', '--dong', '--nsfwmascot'];

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
