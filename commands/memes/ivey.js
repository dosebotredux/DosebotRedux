//Cocoa message
exports.run = (client, message, args) => {
  console.log(
    `**********Executing greentea on ${message.guild.name}**********`
  );

  message.channel.send('https://i.imgur.com/mh3gkaz.png').catch(console.error);
};
