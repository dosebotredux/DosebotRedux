// Searches library and returns results
const library = require('../include/output.json')

exports.run = (client, message, args) => {
  // Capture messages posted to a given channel and remove all symbols and put everything into lower case
  var str = message.content;
  var search = str
  .toLowerCase()
  .replace("--library ", "", -1)
  .replace(/-/g, "", -1)
  
  console.log("Search: " + search);
  
  var testArr = [];
  
  for (let i = 0; i < library.library.length; i++) {
    if (library.library[i].toLowerCase().includes(search.toLowerCase())) {
      var strForwardSlash = library.library[i].replace(/\\/g, "/");
      var strSpaces = strForwardSlash.replace(/ /g, "%20");
      
      testArr.push(strSpaces);
    }
  }
  
  const theEye = "http://the-eye.eu/public/Psychedelics/Psychedelic%20Praxis%20Library%203.0";
  
  for (let i = 0; i < testArr.length; i++) {
    testArr[i] = testArr[i] + "\n" + theEye + testArr[i];
  }
  
  console.log(testArr);
  
  message.channel
  .send(buildMessage())
  .catch(console.error);
  
  function buildMessage() {
    var results = [`Search results for: ${search}`];
    
    if (testArr.length > 5) {
      for (let i = 0; i < 5; i++) {
        results.push(testArr[i]);
      }
    } else {
      for (let i = 0; i < testArr.length; i++) {
        results.push(testArr[i]);
      }
    }
    return results.join("\n\n");
  }
};
