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
  
  // define message array
  var messageContent = [];
  
  // get random value for selecting random glossary item
  var glossaryRand = Math.floor(Math.random() * glossary.effects.length);
  
  // initialize random variable for finding random replication
  var replicationsRand;
  var name = glossary.effects[glossaryRand].name;
  
  // push glossary info to message
  messageContent.push(glossary.effects[glossaryRand].name);
  messageContent.push(glossary.effects[glossaryRand].body);
  messageContent.push(glossary.effects[glossaryRand].url);
  
  // loop through replications json to find matching effect
  for (let i = 0; i < replications.effects.length; i++) {
    // if effect is found and has replications add to message
    if (replications.effects[i].name.toLowerCase() === name.toLowerCase()) {
      replicationsRand = Math.floor(Math.random() * replications.effects[i].replications.length)
      messageContent.push("Replication: " + replications.effects[i].replications[replicationsRand].url)
    }
  }
  
  // if has replications construct message
  if (messageContent[3]) {
    message.channel
    .send("**[:exclamation:] " + messageContent[0] + "**" + 
    "\n" + 
    "```" + messageContent[1] + "```" +
    "\n" + 
    "**More information: **" + messageContent[2] +
    "\n\n" +
    messageContent[3]) 
    .catch(console.error);
  } else {
    // if no replications construct message
    message.channel
    .send("**[:exclamation:] " + messageContent[0] + "**" + 
    "\n" + 
    "```" + messageContent[1] + "```" +
    "\n" + 
    "**More information: **" + messageContent[2])
    .catch(console.error);
  } 
}