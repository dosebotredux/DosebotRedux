const Discord = require("discord.js");

// get quote
exports.run = (client, message, args) => {
  console.log(`**********Executing quote on ${message.guild.name}**********`);

  const MongoClient = require("mongodb").MongoClient;
  const url = `mongodb://${process.env.MONGO_DB_USER}:${
    process.env.MONGO_DB_PASS
  }@ds121282.mlab.com:21282/dosebot_quotes`;
  const dbName = "dosebot_quotes";

  MongoClient.connect(
    url,
    function(err, client) {
      console.log(`Connected to Mongo`);
      const db = client.db(dbName);
      const collection = db.collection("quotes");
      collection.count().then(data => {
        let count = data;
        const rand = function() {
          return Math.floor(Math.random() * count);
        };

        collection
          .find()
          .limit(-1)
          .skip(rand())
          .next()
          .then(data => {
            let author = data.author;
            let quote = data.quote;

            const embed = new Discord.RichEmbed()
              .setAuthor("DoseBot", "https://i.imgur.com/7R8WDwE.png")
              .setColor("747474")
              .setFooter(
                "Please use drugs responsibly",
                "https://i.imgur.com/7R8WDwE.png"
              )
              .setTimestamp()
              .setURL("http://www.dosebot.org")
              .addField("Quote", `*${quote}*\n-${author}`);

            message.channel.send({ embed }).catch(console.error);
          });
      });
    }
  );
};
