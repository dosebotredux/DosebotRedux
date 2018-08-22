// Bootcamp motivation message
exports.run = (client, message, args) => {
  console.log(
    `**********Executing bootcamp on ${message.guild.name}**********`
  );
  var endOfYear = 'December 31 2018 23:59:59 GMT-0800';

  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }
  let countdown = getTimeRemaining(endOfYear);
  console.log(
    `${countdown.days} days, ${countdown.hours} hours, ${
      countdown.minutes
    } minutes, ${
      countdown.seconds
    } seconds until <@278301453620084736>'s bootcamp is finished!`
  );

  const motivation = [
    'You can do it Cocoa!',
    'You\'re going to snort so much ketamine when you\'re done!',
    'Big salty dollar bills are waiting for you in Utah!',
    'You\'ll build amazing things!',
    'You can finally make Mongo WEB SCALE!',
    'If it works ship it!',
    'You can go to Ireland when you\'ve finished!',
    'Almost done with Seattle partner!',
    'DoseBot believes in you!',
    'THE GREAT SALT AWAITS YOU',
    'You\'ll finally know why your code doesn\'t compile!',
    'You\'ll finally understand how to work with promises!',
    'Meetup 2019 - enough said',
    'The lord\'s work awaits you comrade!',
    'You\'ll finally experience four seasons!',
    'https://www.youtube.com/watch?v=TVcLIfSC4OE',
    'https://www.youtube.com/watch?v=SY-KGRjOM08'
  ];
  const random = Math.floor(Math.random() * motivation.length);

  const channelMessage = `${countdown.days} days, ${countdown.hours} hours, ${
    countdown.minutes
  } minutes, ${
    countdown.seconds
  } seconds until <@278301453620084736>'s bootcamp is finished!`;

  message.channel.send(channelMessage).catch(console.error);
  message.channel.send(`${motivation[random]}`);
};
