const Discord = require("discord.js");
const sanitizeSubstanceName = require("../include/sanitize-substance-name.js");
const rp = require("request-promise");

exports.run = (client, message, args) => {
  console.log(`**********Executing effects on ${message.guild.name}**********`);

  const { request } = require("graphql-request");

  var str = message.content;
  var drug = str
    .toLowerCase()
    .replace("--combo ", "", -1)
    .replace(/-/g, "", -1);

  let drugArr = drug.split(" ");
  console.log(drugArr);
  let tripSitURL = `http://tripbot.tripsit.me/api/tripsit/getDrug?name=${
    drugArr[0]
  }`;

  drugArr[0] = sanitizeSubstanceName(drugArr[0], message, name);

  rp(tripSitURL)
    .then(function(response) {
      let queryResults = JSON.parse(response);
      let name = queryResults.data[0].pretty_name;
      let combos = queryResults.data[0].combos;
      let comboArr = [];

      Object.keys(combos).forEach(key => {
        comboArr.push(`${capitalize(key)}: ${combos[key].status}`);
      });

      let channelMessage = comboArr.join("\n");
      createComboMessage(channelMessage, message, name);
    })
    .catch(function(err) {
      console.log(err);
    });
  //// Functions
  // Create combo message
  function createComboMessage(combos, message, name) {
    const embed = new Discord.RichEmbed()
      .setTitle(`**${name} combo information**`)
      .setAuthor("DoseBot", "https://kek.gg/i/JGVVV.png")
      .setColor("747474")
      .setFooter("Please use drugs responsibly", "https://kek.gg/i/JGVVV.png")
      .setThumbnail("https://kek.gg/i/svRNH.png")
      .setTimestamp()
      .setURL("http://www.dosebot.org")
      .addField(`Combos`, combos);

    message.channel.send({ embed });
  }
};
