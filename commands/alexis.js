//Alexis message
exports.run = (client, message, args) => {
    console.log(`**********Executing Alexis on ${message.guild.name}**********`);
    message.channel
    .send(
        "<@284095754686038016> Alexis is okay I guess"
    )
    .catch(console.error);
};
