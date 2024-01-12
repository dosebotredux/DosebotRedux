import Discord from 'discord.js';

// mock for simulate
var _simulatedEmbed: Discord.MessageEmbed | null = null;
export function simulateEmbed(simulatedEmbed: Discord.MessageEmbed) {
  _simulatedEmbed = simulatedEmbed;
}

export function TemplatedMessageEmbed(): Discord.MessageEmbed {
  return (_simulatedEmbed ?? new Discord.MessageEmbed())
    .setTimestamp()
    
    // .attachFiles(["./assets/logo.png"])
    .setAuthor('DoseBot Redux', 'attachment://logo.png')
    .setThumbnail('attachment://logo.png')
    .setColor('#747474')
    .setURL("https://github.com/dosebotredux")
    .setFooter('Please use drugs responsibly', 'attachment://logo.png')
}
