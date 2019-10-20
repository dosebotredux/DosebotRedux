exports.run = (client, message, args) => {
  message.channel
    .send({ files: ["./assets/hrtguide.png"] })
    .catch(console.error);
}
