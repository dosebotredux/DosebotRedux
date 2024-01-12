import Discord from 'discord.js';

import * as Helpers from '../include/helpers';

//displays list of commands. in future should scan commands directory and display info for each programmatically/dynamically
export function run(client: Discord.Client, message: Discord.Message, args: string[]) {
  const embed = Helpers.TemplatedMessageEmbed()
    .addField('Available commands', buildCommandList());

  message.reply({ embeds: [embed], files: ["./assets/logo.png"] });
}

function buildCommandList() {
  const commands = [
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
