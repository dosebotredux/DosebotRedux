// praxis message
exports.run = (client, message, args) => {
  console.log(`**********Executing praxis**********`);
  // message.channel.send();
  //350132819307003905 praxis
  //332288651394547712 SED
  let str = message.content.replace(`--info `, ``, -1).replace(`-`, ``, -1);
  let servers = client.guilds;

  servers.forEach(guild => {
    if (guild.id == "332288651394547712") {
      console.log(`we're in the guild`);
      let channels = guild.channels;
      channels.forEach(channel => {
        if (channel.id == "370014438222331915") {
          channel.send(`Hello`);
        }
      });
    }
  });
};
