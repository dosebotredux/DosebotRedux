//grabs glossary info from local json and builds message based on arg
const glossary = require("../glossary.json");
const replications = require("../replications.json");

exports.run = (client, message, args) => {
  var str = message.content;
  var result = str.split(" ");
  var effect = str
  .toLowerCase()
  .replace("--effectinfo ", "", -1)
  .replace(/-/g, "", -1)
  console.log("str: " + str);
  console.log("result: " + effect);
  var messageContent = [];
  var finalMessage;
  
  for (let i = 0; i < glossary.effects.length; i++) {
    if (glossary.effects[i].name.toLowerCase() === effect) {
      console.log(glossary.effects[i].name);
      messageContent.push(glossary.effects[i].name);
      messageContent.push(glossary.effects[i].body);
      messageContent.push(glossary.effects[i].url);
      
    }
  }
  
  var rand;
  var locationOfEffect;
  
  for (let i = 0; i < replications.effects.length; i++) {
    if (replications.effects[i].name.toLowerCase() === effect) {
      rand = Math.floor(Math.random() * replications.effects[i].replications.length);
      
      locationOfEffect = i;
      
    }
  }
  
  if (replications.effects[locationOfEffect] !== undefined) {
    messageContent.push(replications.effects[locationOfEffect].replications[rand].url);
  }
  console.log(messageContent);
  
  // messageBuilder();
  
  if (messageContent[3] !== undefined) {
    message.channel
    .send("**" + messageContent[0] + "**" +
    "\n" +
    "```" + messageContent[1] + "```" +
    "\n" +
    "More information: " + messageContent[2] +
    "\n\n" +
    "Replication: " + messageContent[3]
  )
  .catch(console.error);
} else if (messageContent[0] !== undefined) {
  message.channel
  .send("Fallback")
} else {
  message.channel
  .send("**Error**: Undefined effect")
  .catch(console.error);
}
};

// // functions
// function messageBuilder() {
//   // message = "**" + messageContent[0] + "**" +
//   // "\n" +
//   // "```" + messageContent[1] + "```" +
//   // "\n" +
//   // "More information: " + messageContent[2];

//   // if (messageContent[3] !== undefined) {
//   //   message + "\n\n" + "Replication: " + messageContent[3];
//   // }
//   message = messageContent[0];
// }