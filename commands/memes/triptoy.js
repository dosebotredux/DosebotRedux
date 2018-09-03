// sends a random triptoy to the server
const toys = require("../include/triptoys.json");

exports.run = (client, message, args) => {
  console.log(`**********Executing triptoy on ${message.guild.name}**********`);

  var str = message.content;
  var result = str.split(" ");
  var effect = str
    .toLowerCase()
    .replace("--triptoy ", "", -1)
    .replace(/-/g, "", -1);

  var messageContent = [];

  var rand = Math.floor(Math.random() * toys.toys.length);
  console.log(rand);

  messageContent.push(toys.toys[rand].url);

  message.channel
    .send("Have a triptoy!" + "\n" + messageContent[0])
    .catch(console.error);
};
