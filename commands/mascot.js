exports.run = (client, message, args) => {
  let response = `Hello <@${ message.author.id }> I'm DoseBot https://i.imgur.com/Rabwdwx.png Nice to meet you ^_^`;
  message.channel.send(response).catch(console.error);
};

