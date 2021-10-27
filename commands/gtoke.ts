import Discord from 'discord.js';

export async function run(client: Discord.Client, message: Discord.Message, args: string[]) {

    const emoji = client.emojis.cache.find((x) => x.name === "skeletonchair");
    if (!emoji) { console.log("could not find emoji!"); return; }

    const firstMessage = await message.channel.send(`${message.member?.nickname ?? "Someone"} has started a group toke. Toke up in two minutes! Use the reaction button to join in.`);
    const firstReaction = await firstMessage.react(emoji);

    await new Promise((resolve) => { setTimeout(resolve, 60 * 1000) })

    const secondMessage = await message.channel.send("Toke up in one minute! Use the reaction button to join in.");
    const secondReaction = await secondMessage.react(emoji);

    await new Promise((resolve) => { setTimeout(resolve, 30 * 1000) });

    const thirdMessage = await message.channel.send("Toke up in 30 seconds! Use the reaction button to join in.");
    const thirdReaction = await thirdMessage.react(emoji);

    await new Promise((resolve) => { setTimeout(resolve, 25 * 1000) });

    const countdownMessage = await message.channel.send("5..");
    for (let i = 4; i > 0; i--) {
        await new Promise((resolve) => { setTimeout(resolve, 1 * 1000) });
        countdownMessage.edit(`${i}..`);
    }
    await new Promise((resolve) => { setTimeout(resolve, 1 * 1000) });
    countdownMessage.delete();

    const allUsers = [
        await (await firstReaction.fetch()).users.fetch(),
        await (await secondReaction.fetch()).users.fetch(),
        await (await thirdReaction.fetch()).users.fetch()
    ]
    .map(x => Array.from(x.values()))
    .reduce((x, y) => x.concat(y))
    .filter(u => u.id != client.user?.id)
    .map(u => `<@${u.id}>`);

    console.log(allUsers);
    await message.channel.send("Toke up " + Array.from(new Set(allUsers)).join(", ") + "!");
}
