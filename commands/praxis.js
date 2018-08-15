// praxis message
exports.run = (client, message, args) => {
  console.log(`**********Executing praxis**********`);
  //350132819307003905 praxis
  //332288651394547712 SED
  let str = message.content.replace(`--praxis `, ``, -1).replace(`-`, ``, -1);
  // server channel message
  let strSplit = str.split(` `);

  let guildID;
  let channelID;
  let msg;

  if (typeof strSplit[0] === `number`) {
    console.log(`num`);
    guildID = strSplit[0];
    channelID = strSplit[1];
    msg = strSplit.splice(1, strSplit.length).join(` `);
  } else if (strSplit[0] === `praxis`) {
    console.log(`prax`);
    guildID = `350132819307003905`;
    channelID = `433004930433810442`;
    msg = strSplit.splice(1, strSplit.length).join(` `);
  } else if (strSplit[0] === `SED`) {
    console.log(`SED`);
    guildID = `331288651394547712`;
    channelID = `332288651394547712`;
    msg = strSplit.splice(1, strSplit.length).join(` `);
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
