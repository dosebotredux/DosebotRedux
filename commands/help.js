const Discord = require('discord.js');

//displays list of commands. in future should scan commands directory and display info for each programmatically/dynamically
exports.run = (client, message, args) => {
  const embed = new Discord.RichEmbed()
    .setTitle('DoseBot Redux Help')
    .attachFile("./assets/logo.png")
    .setThumbnail('attachment://logo.png')
    .setAuthor('DoseBot Redux', 'attachment://logo.png')
    .setColor('747474')
    .setFooter('Please use drugs responsibly', 'attachment://logo.png')
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
    "--invitelink",
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
