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
  
  var glossaryRand = Math.floor(Math.random() * glossary.effects.length);
  var replicationsRand;
  var name = glossary.effects[glossaryRand].name;
  
  messageContent.push(glossary.effects[glossaryRand].name);
  messageContent.push(glossary.effects[glossaryRand].body);
  messageContent.push(glossary.effects[glossaryRand].url);
  
  for (let i = 0; i < replications.effects.length; i++) {
    console.log(replications.effects[i].name.toLowerCase());
    if (replications.effects[i].name.toLowerCase() === name.toLowerCase()) {
      replicationsRand = Math.floor(Math.random() * replications.effects[i].replications.length)
      messageContent.push("Replication: " + replications.effects[i].replications[replicationsRand].url)
    }
  }
  
  if (messageContent[3]) {
    message.channel
    .send("**" + messageContent[0] + "**" + 
    "\n" + 
    "```" + messageContent[1] + "```" +
    "\n" + 
    "More information: " + messageContent[2] +
    "\n\n" +
    messageContent[3]) 
    .catch(console.error);
  } else {
    message.channel
    .send("**" + messageContent[0] + "**" + 
    "\n" + 
    "```" + messageContent[1] + "```" +
    "\n" + 
    "More information: " + messageContent[2])
    .catch(console.error);
  } 
}