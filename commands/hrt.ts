import Discord from "discord.js";

export function run(client: Discord.Client, message: Discord.Message, args: string[]) {
  message.reply({ files: ["./assets/hrtguide.png"] });
}
