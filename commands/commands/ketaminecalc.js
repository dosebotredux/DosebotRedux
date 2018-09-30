exports.run = (client, message, args) => {
  const Discord = require('discord.js');
  console.log(
    `**********Executing ketaminecalc on ${message.guild.name}**********`
  );

  // Message variables
  const str = message.content
    .toLowerCase()
    .replace('--ketaminecalc', '', -1)
    .replace(/-/g, '', -1);

  // parse weight from result
  let weight = parseInt(str);
  let weightIsKilos = false;

  if (str.includes('kg')) {
    weightIsKilos = true;
  }

  // check to see if weight is a number and terminate if false
  if (isNaN(weight)) {
    message.channel.send(
      '**Error:** No weight specified | Usage: --ketaminecalc [weight in lbs]'
    );
    return;
  }

  const embed = new Discord.RichEmbed()
    .setTitle('Ketamine Dosage Calculator')
    .setAuthor('DoseBot', 'http://www.dosebot.org/images/dose.png')
    .setColor('747474')
    .setFooter(
      'Please use drugs responsibly',
      'http://www.dosebot.org/images/dose.png'
    )
    .setThumbnail('https://i.imgur.com/7R8WDwE.png')
    .setTimestamp()
    .setURL('http://www.dosebot.org')
    .addField('[:scales:] Dosages')
    .addField('Insufflated', generateInsufflatedDosages(weight), true)
    .addField('Intramuscular', generateIntramuscularDosages(weight), true)
    .addField('Oral', generateOralDosage(weight), true)
    .addField('Rectal', generateRectalDosage(weight), true);

  message.channel.send({ embed });

  function generateInsufflatedDosages(weight) {
    return `**Threshold**: ${weight * 0.1}mg
    **Light**: ${weight * 0.15}mg
    **Common**: ${weight * 0.3}mg
    **Strong**: ${weight * 0.5}-${weight * 0.75}mg
    **K-hole**: ${weight}mg`;
  }

  function generateIntramuscularDosages(weight) {
    return `**Threshold**: ${weight * 0.1}mg
    **Light**: ${weight * 0.15}mg
    **Common**: ${weight * 0.2}mg
    **Strong**: ${weight * 0.5}mg
    **K-hole**: ${weight * 0.75}mg
    **Anesthetic**: ${weight}mg`;
  }

  function generateOralDosage(weight) {
    return `**Threshold**: ${weight * 0.3}mg
    **Light**: ${weight * 0.6}mg
    **Common**: ${weight * 0.75}-${weight * 2}mg
    **Strong**: ${weight * 2}-${weight * 2.5}mg
    **K-hole**: ${weight * 3}-${weight * 4}mg`;
  }

  function generateRectalDosage(weight) {
    return `**Threshold**: ${weight * 0.3}mg
    **Light**: ${weight * 0.6}mg
    **Common**: ${weight * 0.75}-${weight * 2}mg
    **Strong**: ${weight * 2}-${weight * 2.5}mg
    **K-hole**: ${weight * 3}-${weight * 4}mg`;
  }
};
