import Discord from 'discord.js';

function shuffleArray<T>(ary: T[]): T[] {
    for (let i = ary.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * ary.length);
        [ary[i], ary[j]] = [ary[j], ary[i]];
    }
    return ary;
}

export async function run(client: Discord.Client, message: Discord.Message, args: string[]) {

    const emoji = shuffleArray([
        '<:Weeed:581023462534021120>', '<:weed:255964645561466880>', '<:smoke:478661373417619476>',
        '<:pepetoke:502604660927102977>', '<:musky:487937634157461505>', '<:joint:585773581980663811>',
        '<:blunt:585774074094026763>', '<:bongface:456821076387823626>', '<a:bong:585769584888512521>',
        '<:smonke:777647646684610620>'
    ]).map((emojislug) => {
        return client.emojis.cache.find((candidate) => emojislug == `<:${candidate.name}:${candidate.id}>`) ?? null
    }).filter(x => {
        return x instanceof Discord.GuildEmoji;
    }) as Discord.GuildEmoji[];
    

    if (!emoji) { console.log("could not find emoji!"); return; }

    const firstMessage = await message.channel.send(`${message.member?.nickname ?? "Someone"} has started a group toke. Toke up in two minutes! Use the reaction button to join in.`);
    const firstReaction = await firstMessage.react(emoji[0]);

    await new Promise((resolve) => { setTimeout(resolve, 60 * 1000) })

    const secondMessage = await message.channel.send("Toke up in one minute! Use the reaction button to join in.");
    const secondReaction = await secondMessage.react(emoji[1]);

    await new Promise((resolve) => { setTimeout(resolve, 30 * 1000) });

    const thirdMessage = await message.channel.send("Toke up in 30 seconds! Use the reaction button to join in.");
    const thirdReaction = await thirdMessage.react(emoji[2]);

    await new Promise((resolve) => { setTimeout(resolve, 25 * 1000) });

    const countdownMessage = await message.channel.send("5..");
    for (let i = 4; i > 0; i--) {
        await new Promise((resolve) => { setTimeout(resolve, 1 * 1000) });
        countdownMessage.edit(`${i}..`);
    }
    await new Promise((resolve) => { setTimeout(resolve, 1 * 1000) });
    countdownMessage.delete();

    const automaticUsers = [ message.author ];
    if (Math.random() > 0.95 && !!client.user) {
        automaticUsers.push(client.user);
    }

    const allUsers = [
        await (await firstReaction.fetch()).users.fetch(),
        await (await secondReaction.fetch()).users.fetch(),
        await (await thirdReaction.fetch()).users.fetch()
    ]
    .map(x => Array.from(x.values()))
    .reduce((x, y) => x.concat(y), automaticUsers)
    .filter(u => u.id != client.user?.id)
    .map(u => `<@${u.id}>`);

    console.log(allUsers);
    await message.channel.send("Toke up " + shuffleArray(Array.from(new Set(allUsers))).join(", ") + "!");
}
