// Searches library and returns results
const library = require('../include/output.json')

exports.run = (client, message, args) => {
  // Capture messages posted to a given channel and remove all symbols and put everything into lower case
  var str = message.content;
  var search = str
  .toLowerCase()
  .replace("--library ", "", -1)
  .replace(/-/g, "", -1)
  // .replace(/ /g, "", -1); 

  console.log("Search: " + search);

  var testArr = [];

  for (let i = 0; i < library.library.length; i++) {
    if (library.library[i].toLowerCase().includes(search.toLowerCase())) {
      testArr.push(library.library[i]);

      var strForwardSlash = library.library[i].replace(/\/\//g, "/");
      console.log("forward slash: " + strForwardSlash);
      var strSpaces = strForwardSlash.replace(/ /g, "%20");
      console.log("spaces: " + strSpaces);

      testArr.push(strSpaces);
    }
  }

  // console.log(testArr);
  
  // message.channel
  // .send()
  // .catch(console.error);
};

// function parseURL(str) {
//   const theEye = "http://the-eye.eu/public/Psychedelics/Psychedelic%20Praxis%20Library%203.0";
//   //returns
//   // \\Collections by Author\\Alan Watts\\1960 - Alan Watts - The New Alchemy.pdf

// }

//http://the-eye.eu/public/Psychedelics/Psychedelic%20Praxis%20Library%203.0/
//https://the-eye.eu/public/Psychedelics/texts%20by%20author/Alan%20Watts/1960%20-%20Alan%20Watts%20-%20The%20New%20Alchemy.pdf