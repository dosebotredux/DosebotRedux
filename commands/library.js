// Searches library and returns results
const Discord = require("discord.js");
const library = require("../include/output.json");

exports.run = (client, message, args) => {
  console.log(`**********Executing library on ${message.guild.name}**********`);

  // Capture messages posted to a given channel and remove all symbols and put everything into lower case
  var str = message.content;
  var search = str
    .toLowerCase()
    .replace("--library ", "", -1)
    .replace(/-/g, "", -1);

  console.log(`Search: ${search}`);
  // Create an array to hold search results
  var librarySearchResultsArray = [];

  // Loop through the library and push all matching results to librarySearchResultsArray
  for (let i = 0; i < library.library.length; i++) {
    if (library.library[i].toLowerCase().includes(search.toLowerCase())) {
      // Replace backslashes with forward slash
      var strForwardSlash = library.library[i].replace(/\\/g, "/");

      // Filename for search results
      var fileName = strForwardSlash.substring(
        strForwardSlash.lastIndexOf("/") + 1
      );

      // Replace spaces for URL
      var strSpaces = strForwardSlash.replace(/ /g, "%20");

      // librarySearchResultsArray.push(strSpaces);
      librarySearchResultsArray.push({
        name: fileName,
        location: strSpaces
      });
    }
  }

  // The-Eye library URL
  const theEye =
    "http://the-eye.eu/public/Psychedelics/Psychedelic%20Praxis%20Library%203.0";
  // The-Eye search URL
  const theEyeSearch = `https://the-eye.eu/search/?s=`;

  // Overwrite librarySearchResultsArray with markdown formatted links to results
  for (let i = 0; i < librarySearchResultsArray.length; i++) {
    librarySearchResultsArray[i] = `[${
      librarySearchResultsArray[i].name
    }](${theEye}${librarySearchResultsArray[i].location})`;
  }

  // Create an embed to be sent to the server
  const embed = new Discord.RichEmbed()
    .setTitle(`Library search results`)
    .setAuthor("DoseBot", "https://kek.gg/i/JGVVV.png")
    .setColor("747474")
    .setFooter("Please use drugs responsibly", "https://kek.gg/i/JGVVV.png")
    .setThumbnail("https://kek.gg/i/svRNH.png")
    .setTimestamp()
    .setURL("http://www.dosebot.org")
    .addField(`Description`, buildMessageField())
    .addField(`Full results`, buildMoreResultsField());

  // Send embed as a message
  message.channel.send({ embed }).catch(console.error);

  //// Functions
  // Logic for building the message field
  // Note that embeds have a 1024 character limits
  // and as such only 3 results can be displayed
  function buildMessageField() {
    var results = [];

    if (librarySearchResultsArray.length > 0) {
      // If more than three search items push first three results
      if (librarySearchResultsArray.length > 3) {
        for (let i = 0; i < 3; i++) {
          results.push(librarySearchResultsArray[i]);
        }
      } else {
        // If less than three items push all results
        for (let i = 0; i < librarySearchResultsArray.length; i++) {
          results.push(librarySearchResultsArray[i]);
        }
      }
      // Return a string of the joined array separated by new lines
      return results.join("\n");
    } else {
      console.log(`Search returned no results`);
      return `No results`;
    }
  }

  // Build function for building the more results link
  // Note that this feature is mostly broken due to the
  // The-Eye's case sensitivity in search results
  function buildMoreResultsField() {
    search = search.split(" ");
    let searchArr = [];
    search.forEach(word => {
      searchArr.push(capitalize(word));
    });
    search = searchArr.join(" ");
    search = search.replace(/ /g, "-", -1);
    return `[More results](${theEyeSearch}${search})\nNote: TheEye searches are case sensitive`;
  }

  // Capitalization function
  function capitalize(name) {
    return name[0].toUpperCase() + name.slice(1);
  }
};
