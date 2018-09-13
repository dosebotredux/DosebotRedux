const Discord = require('discord.js');

// get quote
exports.run = (client, message, args) => {
  console.log(
    `**********Executing findquote on ${message.guild.name}**********`
  );

  const MongoClient = require('mongodb').MongoClient;
  const url = `mongodb://${process.env.MONGO_DB_USER}:${
    process.env.MONGO_DB_PASS
  }@ds121282.mlab.com:21282/dosebot_quotes`;
  const dbName = 'dosebot_quotes';

  MongoClient.connect(
    url,
    function(err, client) {
      console.log('Connected to Mongo');
      const db = client.db(dbName);
      const collection = db.collection('quotes');

      const foundQuotes = collection
        .find({ author: 'Kaylee' })
        .then(data => console.log(data));
      console.log(foundQuotes);
    }
  );
};
