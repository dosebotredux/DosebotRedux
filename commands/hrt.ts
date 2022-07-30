import Discord from "discord.js";

export function run(client: Discord.Client, message: Discord.Message, args: string[]) {
  message.reply("Please see https://diyhrt.wiki for an HRT information resource.");
}
