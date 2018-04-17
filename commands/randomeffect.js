//grabs glossary info from local json and builds message based on random effect
const glossary = require("../glossary.json");
const replications = require("../replications.json");

exports.run = (client, message, args) => {
  var str = message.content;
  var result = str.split(" ");
  var effect = str
  .toLowerCase()
  .replace("--randomeffect ", "", -1)
  .replace(/-/g, "", -1)

  var messageContent = [];

  // var rand = Math.floor(Math.random() * glossary.effects.length);
  var rand = 2;
  var name = glossary.effects[rand].name;
  console.log(name);
  console.log(replications.effects[2].name);

  messageContent.push(glossary.effects[rand].name);
  messageContent.push(glossary.effects[rand].body);
  messageContent.push(glossary.effects[rand].url);

  for (let i = 0; i < replications.length; i++) {
    console.log(replications.effects[i].name.toLowerCase());
    if (replications.effects[i].name.toLowerCase() === name.toLowerCase()) {
      console.log("Match found");
    }
  }
  
  message.channel
  .send("**" + messageContent[0] + "**" + 
  "\n" + 
  "```" + messageContent[1] + "```" +
  "\n" + 
  "More information: " + messageContent[2])
  .catch(console.error);
};
