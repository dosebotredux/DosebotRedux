module.exports.insertQuote = insertQuote;
// MongoDB stuff
const MongoClient = require('mongodb').MongoClient;
const url = `mongodb://${process.env.MONGO_DB_USER}:${
  process.env.MONGO_DB_PASS
}@ds121282.mlab.com:21282/dosebot_quotes`;
const dbName = 'dosebot_quotes';

// Function for inserting into database
function insertQuote(message, quote, author) {
  MongoClient.connect(
    url,
    function(err, client) {
      console.log('Connected to Mongo');
      const db = client.db(dbName);
      const collection = db.collection('quotes');

      collection.insertOne({ quote: quote, author: author });

      client.close();

      message.channel.send(
        `Added quote - **Author:** ${author} **Quote:** ${quote}`
      );
    }
  );
}
