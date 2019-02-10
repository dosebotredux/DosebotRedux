// Sends a random TDC video to the channel
exports.run = (client, message, args) => {
  let response = `<@${
    message.author.id
  }> - Enjoy a random episode of The Drug Classroom: <https://kek.gg/u/LP7h>`;

  message.channel.send(response).catch(console.error);
};
