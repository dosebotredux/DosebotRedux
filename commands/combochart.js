//tripsit combo chart message
exports.run = (client, message, args) => {
  message.channel
    .send({ files: ["./assets/combochart.png"] })
    .catch(console.error);
};
