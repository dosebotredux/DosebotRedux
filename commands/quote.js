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
      const count = collection.count().then(data => {
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

            message.channel.send(`Quote: ${quote}\nAuthor: ${author}`);
          });
      });
      client.close();
    }
  );
};
