const Discord = require('discord.js');
const Helpers = require('../helpers.js');

//displays list of commands. in future should scan commands directory and display info for each programmatically/dynamically
exports.run = (client, message, args) => {
  const embed = Helpers.TemplatedMessageEmbed()
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
    "--hrt",
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
