//grabs glossary info from local json and builds message based on arg
const glossary = require("../glossary.json");

exports.run = (client, message, args) => {
  var str = message.content;
  var result = str.split(" ");
  // var effect = result
  //   .toLowerCase()
  //   .replace("--glossary ", "", -1);
  var drug = str
  .toLowerCase()
  .replace("--glossary ", "", -1)
  .replace(/-/g, "", -1)
  .replace(/ /g, "", -1); //removes all symbols and puts everything in lower case so bot finds the images easier
  console.log("str: " + str);
  console.log("result: " + drug);
  
  for (let i = 0; i < glossary.length; i++) {
    console.log(glossary[i].name);
  }
  
  message.channel
  .send("ヽ༼ຈل͜ຈ༽ﾉ raise your dongers ヽ༼ຈل͜ຈ༽ﾉ")
  .catch(console.error);
};
