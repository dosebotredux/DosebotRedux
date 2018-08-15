// add quote
exports.run = (client, message, args) => {
  console.log(
    `**********Executing addquote on ${message.guild.name}**********`
  );

  const MongoClient = require("mongodb").MongoClient;
  const url = `mongodb://${process.env.MONGO_DB_USER}:${
    process.env.MONGO_DB_PASS
  }@ds121282.mlab.com:21282/dosebot_quotes`;
  const dbName = "dosebot_quotes";

  // --addquote murty this is a quote
  let str = message.content.replace(`--addquote`, ``, -1).replace(/-/g, ``, -1);
  // [murty, this, is, a, quote]
  let strArr = str.split(` `);
  let author = strArr[1];
  let quoteToAddArr = strArr.splice(2, strArr.length);
  let quote = quoteToAddArr.join(` `);

  if (message.content.length >= 9) {
    console.log(`Adding quote - Author: ${author} Quote: ${quote}`);

    MongoClient.connect(
      url,
      function(err, client) {
        console.log(`Connected to Mongo`);
        const db = client.db(dbName);
        const collection = db.collection("quotes");

        collection.insertOne({ quote: quote, author: author });

        client.close();

        message.channel.send(`Added quote - Author: ${author} Quote: ${quote}`);
      }
    );
  } else {
    message.channel.send(
      `**Error**: No quote provided - Syntax: --addquote <author> <quote>`
    );
  }
};
