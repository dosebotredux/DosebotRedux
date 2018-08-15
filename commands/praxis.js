// praxis message
exports.run = (client, message, args) => {
  console.log(`**********Executing praxis**********`);
  //350132819307003905 praxis
  //332288651394547712 SED
  let str = message.content.replace(`--praxis `, ``, -1).replace(`-`, ``, -1);
  // server channel message
  let strSplit = str.split(` `);
  let guildID = strSplit[0];
  let channelID = strSplit[1];
  let msg = strSplit.splice(2, strSplit.length).join(``);
  console.log(`Guild: ${guildID} Channel: ${channelID} Message: ${msg}`);

  let servers = client.guilds;

  servers.forEach(guild => {
    if (guild.id == guildID) {
      console.log(`we're in the guild`);
      let channels = guild.channels;

      channels.forEach(channel => {
        if (channel.id == channelID) {
          channel.send(msg);
        }
      });
    }
  });
};
