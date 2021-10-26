import Discord from 'discord.js';

export function run(client: Discord.Client, message: Discord.Message, args: string[]) {
  message.channel
    .send('Want to invite Dosebot Redux to your server? Click this: https://discord.com/oauth2/authorize?client_id=799165497710084116&scope=bot&permissions=268815552')
    .catch(console.error);
}
