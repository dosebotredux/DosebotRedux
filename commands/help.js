const Discord = require('discord.js');

//displays list of commands. in future should scan commands directory and display info for each programmatically/dynamically
exports.run = (client, message, args) => {
  const embed = new Discord.RichEmbed()
    .setTitle('DoseBot Redux Help')
    .setAuthor('DoseBot Redux', 'https://i.imgur.com/7R8WDwE.png')
    .setColor('747474')
    .setFooter(
      'Please use drugs responsibly',
      'https://i.imgur.com/7R8WDwE.png'
    )
    .setThumbnail('https://i.imgur.com/7R8WDwE.png')
    .setTimestamp()
    .addField('Available commands', buildCommandList());

  message.channel.send({ embed });
};

function buildCommandList() {
  var commands = [
    '--about',
    "--avatar",
    '--badtrip',
    '--bobross',
    "--breathe",
    '--combochart',
    '--combos [drug]',
    '--dxmcalc [weight in lbs]',
    '--effectinfo [effect]',
    '--effects [substance]',
    "--help (you are here)",
    '--info [substance]',
    '--ketaminecalc [weight in lbs]',
    '--psychtolerance [days]',
    '--randomtdc',
    '--role [rolename]',
    "--roles",
    '--sei',
    '--whois [@user]'
  ];

  return commands.join('\n');
}
