// Server-specific trigger overrides
// Limitations:
// - Triggers cannot contain spaces, because commands don't know how to replace
// triggers other than to split on the first space. Commands should be reworked
// to take a sanitized array of arguments.
function triggerForGuild(guild: Discord.Guild | null | undefined) {
    if (null != (process.env.TRIGGER)) {
        return process.env.TRIGGER;
    }
    if (null == guild || undefined == guild) {
      return "--";
    }
    switch (guild.id) {
      // case "253612214148136981": return "."; // Drugs Community
      default:                   return "--";
    }
}

import Discord from "discord.js";
import * as __commands from "./commands/index";
const commands = __commands as {[key: string]: (client: Discord.Client, message: Discord.Message, args: string[]) => void}

export function execute(client: Discord.Client, message: Discord.Message) {
  if (message.author.bot) {
    // console.log("Message author is bot")
    return;
  }

  // undo some autocorrects to fix triggers
  const content = message.content.replace(/^[—─]/, '--')

  const trigger = triggerForGuild(message.guild);

  if (!content.startsWith(trigger)) {
    return;
  }

  const args: string[] = content.slice(trigger.length).trim().split(/ +/g);
  const commandName = args.shift()?.toLowerCase();
  if (!commandName) { return; }

  const commandFunction = commands[commandName];
  if (!commandFunction) {
    console.log(`no command named ${commandName} exists, try ${JSON.stringify(Object.keys(commands))}`);
    return;
  }

  try {
    console.log(`executing command ${message.content}`);
    commandFunction(client, message, args);
  } catch (err) {
    console.error(`Encountered error trying to execute command: ${commandName}`, err);
  }
}
