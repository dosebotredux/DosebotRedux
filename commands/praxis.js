// praxis message
exports.run = (client, message, args) => {
  console.log(`**********Executing praxis**********`);
  //350132819307003905 praxis
  //332288651394547712 SED
  let str = message.content.replace(`--praxis `, ``, -1).replace(`-`, ``, -1);
  // server channel message
  let strSplit = str.split(` `);

  if (typeof strSplit[0] === `number`) {
    var guildID = strSplit[0];
    var channelID = strSplit[1];
    var msg = strSplit.splice(2, strSplit.length).join(` `);
  } else if (strSplit[0] === `praxis`) {
    var guildID = `350132819307003905`;
    var channelID = `433004930433810442`;
  } else if (strSplit[1] === `SED`) {
    var guildID = `332288651394547712`;
    var channelID = `332288651394547712`;
  }
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
