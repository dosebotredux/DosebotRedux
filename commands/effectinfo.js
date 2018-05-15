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
  
  // loop through glossary to find matching effect 
  for (let i = 0; i < glossary.effects.length; i++) {
    if (glossary.effects[i].name.toLowerCase() === effect) {
      // build message components
      console.log(glossary.effects[i].name);
      messageContent.push(glossary.effects[i].name);
      messageContent.push(glossary.effects[i].body);
      messageContent.push(glossary.effects[i].url);
    }
  }
  
  // variables for matching to replications.json
  var rand;
  var locationOfEffect;
  
  // loop through replications.json to find matching effect
  for (let i = 0; i < replications.effects.length; i++) {
    if (replications.effects[i].name.toLowerCase() === effect) {
      // generate random number for pulling replications
      rand = Math.floor(Math.random() * replications.effects[i].replications.length);
      
      // store location
      locationOfEffect = i;
    }
  }
  
  // if effect has replications add to messageContent array
  if (replications.effects[locationOfEffect] !== undefined) {
    messageContent.push(replications.effects[locationOfEffect].replications[rand].url);
  }
  console.log(messageContent);
  
  // messageBuilder();
  var messages = [];
  
  // build message
  if (messageContent[3] !== undefined) {
    messages.push(`**${messageContent[0]}**`);
    messages.push(`\`\`\``);
    messages.push(messageContent[1]);
    messages.push(`\`\`\``);
    messages.push(`More information: ${messageContent[2]}`);
    messages.push(`Replication: ${messageContent[3]}`);
  } else if (messageContent[0] !== undefined) {
    messages.push(`**${messageContent[0]}**`);
    messages.push(`\`\`\``);
    messages.push(messageContent[1]);
    messages.push(`\`\`\``);
    messages.push(`More information: ${messageContent[2]}`);
  } else {
    messages.push(`**Error**: Undefined effect`);
  }

  message.channel.send(messages.join("\n")).catch(console.error);
  
  // messages.push(`**DoseBot DXM calculator recommends:**`);
  // messages.push(`\`\`\``);
  // messages.push(`1st plateau: ${lightMin} - ${lightMaxCommonMin}mg`);
  // messages.push(`2nd plateau: ${lightMaxCommonMin} - ${commonMaxStrongMin}mg`);
  // messages.push(`3rd plateau: ${commonMaxStrongMin} - ${strongMaxHeavy}mg`);
  // messages.push(`4th plateau: ${strongMaxHeavy}mg+\n`);
  // messages.push(`\`\`\``)
  // messages.push("**Warning:** These recommendations are an approximation, please take into account your own personal tolerance and start with lower dosages. Doses exceeding 1500mg are potentially fatal.");
  
  // // join message with new lines
  // message.channel.send(messages.join("\n")).catch(console.error);
  
  // spaghetti message builder
//   if (messageContent[3] !== undefined) {
//     message.channel
//     .send("**[:exclamation:] " + messageContent[0] + "**" +
//     "\n" +
//     "```" + "\n" + messageContent[1] + "\n" + "```" +
//     "\n" +
//     "**More information:** " + messageContent[2] +
//     "\n\n" +
//     "**Replication:** " + messageContent[3]
//   )
//   .catch(console.error);
// } else if (messageContent[0] !== undefined) {
//   message.channel
//   .send("**" + messageContent[0] + "**" +
//   "\n" +
//   "```" + messageContent[1] + "```" +
//   "\n" +
//   "**More information:** " + messageContent[2])
// } else {
//   message.channel
//   .send("**Error**: Undefined effect")
//   .catch(console.error);
// }
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