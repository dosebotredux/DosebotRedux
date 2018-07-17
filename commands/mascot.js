// Mascot lol
exports.run = (client, message, args) => {
  console.log(`**********Executing bobross on ${message.guild.name}**********`);

  let response = `Hello <@${
    message.author.id
  }> I'm DoseBot! Nice to meet you ^_^`;

  message.channel.send(response).catch(console.error);
};
