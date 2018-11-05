// Bootcamp motivation message
exports.run = (client, message, args) => {
  console.log(
    `**********Executing bootcamp on ${message.guild.name}**********`
  );
  var endOfYear = 'January 4 2019 23:59:59 GMT-0800';

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

  const channelMessage = `${countdown.days} days, ${countdown.hours} hours, ${
    countdown.minutes
  } minutes, ${countdown.seconds} seconds until KAT MEETUP!`;

  message.channel.send(channelMessage).catch(console.error);
};
