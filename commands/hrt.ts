import Discord from "discord.js";

export function run(client: Discord.Client, message: Discord.Message, args: string[]) {
  message.channel
    .send({ files: ["./assets/hrtguide.png"] })
    .catch(console.error);
}
