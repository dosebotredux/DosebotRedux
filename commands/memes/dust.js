// dust message
exports.run = (client, message, args) => {
  console.log(`**********Executing dust on ${message.guild.name}**********`);

  message.channel
    .send(
      "DID SOMEONE MENTION THE DUST?\n\nhttps://www.youtube.com/watch?v=4efHq3dVGiM"
    )
    .catch(console.error);
  message.channel.send(
    `Can I get a shoutout to my boy Nolan for his excellent cinematography?`
  );
};
