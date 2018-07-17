const sanitizeSubstanceName = require("../include/sanitize-substance-name.js");
const Discord = require("discord.js");
const request = require("request");

// Mascot lol
exports.run = (client, message, args) => {
  console.log(`**********Executing TS on ${message.guild.name}**********`);

  let tripSitURL = "http://tripbot.tripsit.me/api/tripsit/getDrug?name=lsd";
  let queryResults;
  request(tripSitURL, function(error, response, body) {
    queryResults = JSON.parse(body);
    console.log(body.data.summary);
  });

  // message.channel.send(response).catch(console.error);
};
