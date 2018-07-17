const Discord = require("discord.js");
const sanitizeSubstanceName = require("../include/sanitize-substance-name.js");
const rp = require("request-promise");

exports.run = (client, message, args) => {
  console.log(`**********Executing effects on ${message.guild.name}**********`);

  const { request } = require("graphql-request");
  let tripSitURL = `http://tripbot.tripsit.me/api/tripsit/getDrug?name=${
    drug[0]
  }`;

  var str = message.content;
  var drug = str
    .toLowerCase()
    .replace("--combos ", "", -1)
    .replace(/-/g, "", -1);

  drugArr = drug.split(" ");
  console.log(drugArr);

  if (drugArr.length > 1) {
    drugArr[0] = sanitizeSubstanceName(drugArr[0]);

    rp(tripSitURL)
      .then(function(response) {
        let queryResults = JSON.parse(response);
        let combos = queryResults.data[0].combos;

        combos.forEach(combo => {
          if (combo === drugArr[1]) {
            message.channel.send(`${combo.status}`);
          }
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  } else if (drugArr.length === 1) {
    drugArr[0] = sanitizeSubstanceName(drugArr[0]);

    rp(tripSitURL)
      .then(function(response) {
        let queryResults = JSON.parse(response);
        let combos = queryResults.data[0].combos;
        let comboArr = [];

        combos.forEach(combo => {
          comboArr.push(combo.status);
        });

        let channelMessage = comboArr.join("\n");

        message.channel.send(channelMessage);
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
