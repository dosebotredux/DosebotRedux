const sanitizeSubstanceName = require("../include/sanitize-substance-name.js");
const Discord = require("discord.js");
const rp = require("request-promise");

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
  rp(tripSitURL)
    .then(function(response) {
      // console.log(response);
      let queryResults = JSON.parse(response);
      let substance = queryResults.data[0];

      createTSChannelMessage(substance, message);
    })
    .catch(function(err) {
      console.log(err);
    });

  //// TS functions
  // Create TS message
  function createTSChannelMessage(substance, message) {
    const embed = new Discord.RichEmbed()
      .setTitle(`**${substance.pretty_name} drug information**`)
      .setAuthor("DoseBot", "https://i.imgur.com/7R8WDwE.png")
      .setColor("747474")
      .setFooter(
        "Please use drugs responsibly",
        "https://i.imgur.com/7R8WDwE.png"
      )
      .setThumbnail("https://i.imgur.com/7R8WDwE.png")
      .setTimestamp()
      .setURL("http://www.dosebot.org")
      .addField(":scales: __Dosages__", `${buildTSDosageField(substance)}\n`)
      .addField(":clock2: __Duration__", `${buildTSDurationField(substance)}\n`)
      .addField(
        ":globe_with_meridians: __Links__",
        buildTSLinksField(substance)
      );
    message.channel.send({ embed }).catch(console.error);

    // Capitalization function
    function capitalize(name) {
      if (name === "lsa") {
        return name.toUpperCase();
      } else {
        return name[0].toUpperCase() + name.slice(1);
      }
    }

    // Build TS dosage field
    function buildTSDosageField(substance) {
      return `${substance.properties.dose}`;
    }

    // Build TS duration field
    function buildTSDurationField(substance) {
      return `${substance.properties.duration}`;
    }

    // Build TS links field
    function buildTSLinksField(substance) {
      return `[PsychonautWiki](https://psychonautwiki.org/wiki/${
        substance.name
      })\n[Effect Index](https://www.effectindex.com)\n[Drug combination chart](https://wiki.tripsit.me/images/3/3a/Combo_2.png)\n[TripSit](https://www.tripsit.me)\n\nInformation sourced from TripSit`;
    }
  }
};
