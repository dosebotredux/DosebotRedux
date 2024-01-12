import Discord from 'discord.js';
import { CommandInteraction } from "discord.js";
import * as CommandSystem from "./command-system";
import * as Helpers from "./include/helpers";

var simulatedEmbed = {config: {}, fields: []} as any;
simulatedEmbed['setTimestamp'] = function(timestamp: any) {
    simulatedEmbed.config['timestamp'] = timestamp;
    return simulatedEmbed;
}
simulatedEmbed['setAuthor'] = function(author: any) {
    simulatedEmbed.config['author'] = author;
    return simulatedEmbed;
}
simulatedEmbed['setThumbnail'] = function(thumbnail: any) {
    simulatedEmbed.config['thumbnail'] = thumbnail;
    return simulatedEmbed;
}
simulatedEmbed['setColor'] = function(color: any) {
    simulatedEmbed.config['color'] = color;
    return simulatedEmbed;
}
simulatedEmbed['setURL'] = function(url: any) {
    simulatedEmbed.config['url'] = url;
    return simulatedEmbed;
}
simulatedEmbed['setFooter'] = function(footer: any) {
    simulatedEmbed.config['footer'] = footer;
    return simulatedEmbed;
}
simulatedEmbed['setTitle'] = function(title: any) {
    simulatedEmbed.config['title'] = title;
    return simulatedEmbed;
}
simulatedEmbed['addField'] = function(...field: any) {
    simulatedEmbed.fields.push(field);
    return simulatedEmbed;
}
Helpers.simulateEmbed(simulatedEmbed as Discord.MessageEmbed);

const commandInteraction = {
    commandName: "info",
    options: {
        getString: (key: string) => {
            switch (key) {
                case "substance": return "asdkksds";
                default: throw new Error();
            }
        }
    },
    deferReply: async () => {
        console.log({
            invoke: "interaction.deferReply",
        });
    },
    editReply: async (arg: any) => {
        console.log({
            invoke: "interaction.editReply",
            arg,
            embeds: arg.embeds?.map((embed: typeof simulatedEmbed) => JSON.stringify({
                config: embed.config,
                fields: embed.fields
            }))
        });
    },
    reply: async (arg: any) => {
        console.log({
            invoke: "interaction.reply",
            arg,
            embeds: arg.embeds?.map((embed: typeof simulatedEmbed) => JSON.stringify({
                config: embed.config,
                fields: embed.fields
            }))
        });
    }
};

CommandSystem.executeCommandInteraction(commandInteraction as any as CommandInteraction);
