const sanitizeSubstanceName = require("../include/sanitize-substance-name.js");
const Discord = require("discord.js");
const request = require("request-promise");

// Mascot lol
exports.run = (client, message, args) => {
  console.log(`**********Executing TS on ${message.guild.name}**********`);
  // Capture messages posted to a given channel and remove all symbols and put everything into lower case
  var str = message.content;
  var result = str.split(" ");
  var drug = str
    .toLowerCase()
    .replace("--ts ", "", -1)
    .replace(/-/g, "", -1)
    .replace(/ /g, "", -1);

  // Sanitizes input names to match PsychonautWiki API names
  drug = sanitizeSubstanceName(drug);

  let tripSitURL = `http://tripbot.tripsit.me/api/tripsit/getDrug?name=${drug}`;
  console.log(tripSitURL);
  let queryResults;
  // request(tripSitURL, function(error, response, body) {
  //   queryResults = JSON.parse(body);
  //   console.log(queryResults.data[0].summary);
  // });
  request(tripSitURL)
    .then(function(response) {
      console.log(response);
      queryResults = JSON.parse(response);
    })
    .catch(function(err) {
      console.log(err);
    });

  message.channel
    .send(queryResults.data[0].properties.summary)
    .catch(console.error);
};
