// Graham message
exports.run = (client, message, args) => {
  console.log(`**********Executing HRT on ${message.guild.name}**********`);

  message.channel
    .send(
      "https://cdn.discordapp.com/attachments/332288651394547712/456265911825989633/transguide4chan.png"
    )
    .catch(console.error);
};
