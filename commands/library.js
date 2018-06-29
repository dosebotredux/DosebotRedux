// Searches library and returns results
const library = require('../include/output.json')

exports.run = (client, message, args) => {
  // Capture messages posted to a given channel and remove all symbols and put everything into lower case
  var str = message.content;
  var search = str
  .toLowerCase()
  .replace("--info ", "", -1)
  .replace(/-/g, "", -1)
  // .replace(/ /g, "", -1); 

  console.log("Search: " + search);

  var testArr = [];

  for (let i = 0; i < library.library.length; i++) {
    if (library.library[i].toLowerCase().includes(search.toLowerCase())) {
      testArr.push(library.library[i]);
    }
  }

  console.log(testArr);
  
  // message.channel
  // .send(
  //   "ALL HAIL THE GLORIOUS CATGIRL, <@183993728178978818>\nKAYLEE APPRECIATION DAY\nKAYLEE APPRECIATION DAY\nKAYLEE APPRECIATION DAY\nKAYLEE APPRECIATION DAY\n"
  // )
  // .catch(console.error);
};
