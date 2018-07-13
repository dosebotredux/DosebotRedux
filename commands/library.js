// Searches library and returns results
const Discord = require("discord.js")
const library = require('../include/output.json')

exports.run = (client, message, args) => {
  console.log(`**********Executing library on ${message.guild.name}**********`);

  // Capture messages posted to a given channel and remove all symbols and put everything into lower case
  var str = message.content;
  var search = str
  .toLowerCase()
  .replace("--library ", "", -1)
  .replace(/-/g, "", -1)
  
  console.log("Search: " + search);
  
  var librarySearchResultsArray = [];
  
  for (let i = 0; i < library.library.length; i++) {
    if (library.library[i].toLowerCase().includes(search.toLowerCase())) {
      // Replace backslashes with forward slash
      var strForwardSlash = library.library[i].replace(/\\/g, "/");

      // Filename for search results
      var fileName = strForwardSlash.substring(strForwardSlash.lastIndexOf("/") + 1);

      // Replace spaces for URL
      var strSpaces = strForwardSlash.replace(/ /g, "%20");
      
      // librarySearchResultsArray.push(strSpaces);
      librarySearchResultsArray.push(
        {
          "name": fileName,
          "location": strSpaces
        }
      )
    }
  }
  
  const theEye = "http://the-eye.eu/public/Psychedelics/Psychedelic%20Praxis%20Library%203.0";
  
  for (let i = 0; i < librarySearchResultsArray.length; i++) {
    librarySearchResultsArray[i] = `[${librarySearchResultsArray[i].name}](${theEye}${librarySearchResultsArray[i].location})\n`;
  }

  const embed = new Discord.RichEmbed()
  .setTitle(`Library search results`)
  .setAuthor("DoseBot", "https://kek.gg/i/JGVVV.png")
  .setColor("747474")
  .setFooter("Please use drugs responsibly", "https://kek.gg/i/JGVVV.png")
  .setThumbnail("https://kek.gg/i/svRNH.png")
  .setTimestamp()
  .setURL("http://www.dosebot.org")
  .addField(`Description`, buildMessage())

  message.channel.send({embed}).catch(console.error);
    
  // message.channel
  // .send(buildMessage())
  // .catch(console.error);
  
  function buildMessage() {
    var results = [];
    
    if (librarySearchResultsArray.length > 5) {
      for (let i = 0; i < 5; i++) {
        results.push(librarySearchResultsArray[i]);
      }
    } else {
      for (let i = 0; i < librarySearchResultsArray.length; i++) {
        results.push(librarySearchResultsArray[i]);
      }
    }
    console.log(results.join("\n"));
    return results.join("\n");
  }
};
