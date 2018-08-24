const Discord = require('discord.js');
const wiseWords = require('wisdom-of-chopra');

// wisewords message
exports.run = (client, message, args) => {
  console.log(
    `**********Executing wisewords on ${message.guild.name}**********`
  );
  let msgString = message.content
    .replace('--wisewords', '', -1)
    .replace(/-/g, '', -1);
  let randomUser;
  getRandomUser();

  // Create richembed to send
  const embed = new Discord.RichEmbed()
    .setAuthor('DoseBot', 'https://i.imgur.com/7R8WDwE.png')
    .setColor('747474')
    .setFooter(
      'Please use drugs responsibly',
      'https://i.imgur.com/7R8WDwE.png'
    )
    .setTimestamp()
    .setURL('http://www.dosebot.org')
    .setThumbnail(generateThumbnail())
    .addField('Wise Words', `*${generateQuote()}*\n-${generateName()}`);

  // SEND IT
  message.channel.send({ embed }).catch(console.error);

  // Function for getting a random user from the guild
  function getRandomUser() {
    let users = message.guild.members;
    let usersWithRank = [];

    users.forEach(user => {
      let roles = user.roles;
      roles.forEach(role => {
        if (role.calculatedPosition > 0) {
          usersWithRank.push({
            snowflake: {
              data: user
            }
          });
        }
      });
    });
    let rand = Math.floor(Math.random() * usersWithRank.length);
    let randomUserArr = [usersWithRank[rand]];

    randomUserArr.forEach(user => {
      console.log(user.snowflake.data);
      randomUser = user.snowflake.data;
    });
  }

  // Function for getting random thumbnail
  function generateThumbnail() {
    return randomUser.avatarURL;
  }

  // Function for getting random name
  function generateName() {
    return randomUser.displayName;
  }

  // Function for getting random quote
  function generateQuote() {
    return wiseWords.getQuote();
  }
};
