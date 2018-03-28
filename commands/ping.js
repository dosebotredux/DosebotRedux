//ping pong
exports.run = (client, message, args) => {
    message.channel.send("pong!").catch(console.error);
}