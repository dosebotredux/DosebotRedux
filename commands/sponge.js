// spongebob-ify text
exports.run = (client, message, args) => {
  console.log(`**********Executing sponge on ${message.guild.name}**********`);

  let str = message.content
    .toLowerCase()
    .replace(`--sponge `, ``, -1)
    .replace(/-/g, ``, -1);

  let strArr = str.toLowerCase().split(``);

  if (message.content.startsWith(`@`)) {
    strArr = message.content.split(` `);
    strArr.shift();
    let newStr = strArr.join(` `);
    strArr = newStr.split(``);
  } else {
    strArr = message.content.split(``);
  }

  let outputArr = [];

  if (!!message.mentions) {
    message.mentions.users.forEach(function(user, id) {
      outputArr.push(`<@${id}> `);
    });
  }

  for (let i = 0; i < strArr.length; i++) {
    const letter = strArr[i];
    if (i % 2 === 0) {
      outputArr.push(letter);
    } else {
      outputArr.push(letter.toUpperCase());
    }
  }

  message.channel.send(outputArr.join(``)).catch(console.error);
};
