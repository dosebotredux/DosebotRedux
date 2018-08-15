// praxis message
exports.run = (client, message, args) => {
  console.log(`**********Executing praxis**********`);
  // message.channel.send();
  //350132819307003905 praxis
  //332288651394547712 SED
  client.guilds
    .get(`332288651394547712`)
    .channel.get(`370014438222331915`)
    .send(`test`);
};
