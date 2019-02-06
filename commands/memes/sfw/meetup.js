exports.run = (client, message, args) => {
  console.log(`**********Executing move on ${message.guild.name}**********`);
  const timeOfMove = 'June 9 2019 23:59:59 GMT-0800';

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }
  const countdown = getTimeRemaining(timeOfMove);

  const channelMessage = `${countdown.days} days, ${countdown.hours} hours, ${
    countdown.minutes
  } minutes, ${
    countdown.seconds
  } seconds until THE GREAT SALT MEETUP OF OUR TIME!`;

  message.channel.send(channelMessage).catch(console.error);
};
