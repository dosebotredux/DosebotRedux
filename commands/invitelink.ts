import Discord from 'discord.js';

export function run(client: Discord.Client, message: Discord.Message, args: string[]) {
  message.reply('Want to invite Dosebot Redux to your server? Click this: https://discord.com/api/oauth2/authorize?client_id=799165497710084116&permissions=2416299200&scope=applications.commands%20bot');
}
