const request = require('request');


exports.run = (client, message, args) => {
  console.log(`**********Executing replicaiton on ${message.guild.name}**********`);

  const url =
    "https://www.reddit.com/r/replications.json";
  request.get(url, (error, response, body) => {
    let json = JSON.parse(body);
    console.log(json.data.children[0]);
  });

// message.channel
// .send(
// )
// .catch(console.error);
};
