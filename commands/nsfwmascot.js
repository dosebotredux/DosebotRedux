// Mascot lol
exports.run = (client, message, args) => {
  console.log(`**********Executing mascot on ${message.guild.name}**********`);

  let response = `Hello <@${
    message.author.id
  }> I'm DoseBot https://i.imgur.com/havaZ3s.png Nice to meet you ^_^`;

  message.channel.send(response).catch(console.error);
};
