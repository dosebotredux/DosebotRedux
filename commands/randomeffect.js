//grabs glossary info from local json and builds message based on random effect
const glossary = require("../glossary.json");

exports.run = (client, message, args) => {
  var str = message.content;
  var result = str.split(" ");
  var effect = str
  .toLowerCase()
  .replace("--randomeffect ", "", -1)
  .replace(/-/g, "", -1)

  var messageContent = [];

  var rand = Math.floor(Math.random() * glossary.effects.length);
  console.log(rand);

  messageContent.push(glossary.effects[rand].name);
  messageContent.push(glossary.effects[rand].body;
  messageContent.push(glossary.effects[rand].url);
  
  message.channel
  .send("**" + messageContent[0] + "**" + 
  "\n" + 
  "```" + messageContent[1] + "```" +
  "\n" + 
  "More information: " + messageContent[2])
  .catch(console.error);
};
