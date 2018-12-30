// Bootcamp motivation message
exports.run = (client, message, args) => {
  console.log(`**********Executing move on ${message.guild.name}**********`);
  const timeOfMove = 'May 1 2019 23:59:59 GMT-0800';

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
  let countdown = getTimeRemaining(timeOfMove);
  console.log(
    `${countdown.days} days, ${countdown.hours} hours, ${
      countdown.minutes
    } minutes, ${
      countdown.seconds
    } seconds until <@278301453620084736> makes her move!`
  );

  const motivation = [
    'The great salt awaits you!',
    'The long road is ahead!',
    'Take off the mask to feel free!',
    'You will find your very own Zion',
    'LED light strips. LED. Light. Strips.',
    'THINK OF THE KETAMINE',
    'THINK OF THE PCP',
    'THINK OF THE FUTURE!',
    'Endless sand as far as the eye can see...',
    'Hello you are Cocoa!',
    'Cococococococococococococococococcococoa!'
  ];
  const random = Math.floor(Math.random() * motivation.length);

  const channelMessage = `${countdown.days} days, ${countdown.hours} hours, ${
    countdown.minutes
  } minutes, ${
    countdown.seconds
  } seconds until <@278301453620084736> makes her move!`;

  message.channel.send(channelMessage).catch(console.error);
  message.channel.send(`${motivation[random]}`);
};
