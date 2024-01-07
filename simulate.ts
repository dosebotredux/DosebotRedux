
import { CommandInteraction } from "discord.js";
import * as CommandSystem from "./command-system";

const commandInteraction = {
    commandName: "info",
    options: {
        getString: (key: string) => {
            switch (key) {
                case "substance": return "lsd";
                default: throw new Error();
            }
        }
    },
    reply: (arg: any) => {
        console.log({ invoke: "interaction.reply", arg });
    }
};

CommandSystem.executeCommandInteraction(commandInteraction as CommandInteraction);
