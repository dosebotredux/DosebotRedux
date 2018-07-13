//KAYLEE message
exports.run = (client, message, args) => {
  console.log(`**********Executing catgirl on ${message.guild.name}**********`);

  message.channel
  .send(
    "ALL HAIL THE GLORIOUS CATGIRL, <@183993728178978818>\nKAYLEE APPRECIATION DAY\nKAYLEE APPRECIATION DAY\nKAYLEE APPRECIATION DAY\nKAYLEE APPRECIATION DAY\n"
  )
  .catch(console.error);
};
