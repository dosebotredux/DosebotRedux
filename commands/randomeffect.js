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

  var rand = Math.random();
  console.log(rand);
  // for (let i = 0; i < glossary.effects.length; i++) {
  //   if (glossary.effects[i].name.toLowerCase() === effect) {
  //     messageContent.push(glossary.effects[i].name);
  //     messageContent.push(glossary.effects[i].body);
  //     messageContent.push(glossary.effects[i].url);

  //     console.log(messageContent);
  //   }
  // }
  
  message.channel
  .send("**" + messageContent[0] + "**" + 
  "\n" + 
  "```" + messageContent[1] + "```" +
  "\n" + 
  "More information: " + messageContent[2])
  .catch(console.error);
};
