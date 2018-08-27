//Kat message
exports.run = (client, message, args) => {
  console.log(`**********Executing Kat on ${message.guild.name}**********`);

  message.channel
    .send(
      'ALL HAIL KAT, <@371151824331210755>\nKAT APPRECIATION DAY\nKAT APPRECIATION DAY\nKAT APPRECIATION DAY\nKAT APPRECIATION DAY'
    )
    .catch(console.error);
};
