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
    .setAuthor({
      name: 'DoseBot Redux',
      url: "https://github.com/dosebotredux",
      iconURL: 'attachment://logo.png'
    })
    .setThumbnail('attachment://logo.png')
    .setColor('#747474')
    .setURL("https://github.com/dosebotredux")
    .setFooter({text: 'Please use drugs responsibly', iconURL: 'attachment://logo.png'})
}
