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
      '**Error:** No weight specified | Usage: --ketaminecalc [weight]<optional: lbs/kg'
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
    .addField(
      'Insufflated',
      generateInsufflatedDosages(weight, weightIsKilos),
      true
    )
    .addField(
      'Intramuscular',
      generateIntramuscularDosages(weight, weightIsKilos),
      true
    )
    .addField('Oral', generateOralDosage(weight, weightIsKilos), true)
    .addField('Rectal', generateRectalDosage(weight, weightIsKilos), true);

  message.channel.send({ embed });

  function calculateWeight(weight, isKilos) {
    let weightInLbs;

    if (isKilos) {
      weightInLbs = Math.floor(weight * 2.2);
    } else {
      weightInLbs = weight;
    }

    return weightInLbs;
  }

  function generateInsufflatedDosages(weight, isKilos) {
    const weightInLbs = calculateWeight(weight, isKilos);
    const dosageArray = [];

    dosageArray.push(`Dosages for: ${weight}${isKilos ? 'kg' : 'lbs'}`);

    dosageArray.push(`**Threshold**: ${weightInLbs * 0.1}mg`);
    dosageArray.push(`**Light**: ${weightInLbs * 0.15}mg`);
    dosageArray.push(`**Common**: ${weightInLbs * 0.3}mg`);
    dosageArray.push(
      `**Strong**: ${weightInLbs * 0.5}-${weightInLbs * 0.75}mg`
    );
    dosageArray.push(`**K-hole**: ${weightInLbs}mg`);

    return dosageArray.join('\n');
  }

  function generateIntramuscularDosages(weight, isKilos) {
    const weightInLbs = calculateWeight(weight, isKilos);
    const dosageArray = [];

    dosageArray.push(`**Threshold**: ${weightInLbs * 0.1}mg`);
    dosageArray.push(`**Light**: ${weightInLbs * 0.15}mg`);
    dosageArray.push(`**Common**: ${weightInLbs * 0.2}mg`);
    dosageArray.push(`**Strong**: ${weightInLbs * 0.5}mg`);
    dosageArray.push(`**K-hole**: ${weightInLbs * 0.75}mg`);
    dosageArray.push(`**Anesthetic**: ${weightInLbs}mg`);

    return dosageArray.join('\n');
  }

  function generateOralDosage(weight, isKilos) {
    const weightInLbs = calculateWeight(weight, isKilos);
    const dosageArray = [];

    dosageArray.push(`**Threshold**: ${weightInLbs * 0.3}mg`);
    dosageArray.push(`**Light**: ${weightInLbs * 0.6}mg`);
    dosageArray.push(`**Common**: ${weightInLbs * 0.75}-${weightInLbs * 2}mg`);
    dosageArray.push(`**Strong**: ${weightInLbs * 2}-${weightInLbs * 2.5}mg`);
    dosageArray.push(`**K-hole**: ${weightInLbs * 3}-${weightInLbs * 4}mg`);

    return dosageArray.join('\n');
  }

  function generateRectalDosage(weight, isKilos) {
    const weightInLbs = calculateWeight(weight, isKilos);
    const dosageArray = [];

    dosageArray.push(`**Threshold**: ${weightInLbs * 0.3}mg`);
    dosageArray.push(`**Light**: ${weightInLbs * 0.6}mg`);
    dosageArray.push(`**Common**: ${weightInLbs * 0.75}-${weightInLbs * 2}mg`);
    dosageArray.push(`**Strong**: ${weightInLbs * 2}-${weightInLbs * 2.5}mg`);
    dosageArray.push(`**K-hole**: ${weightInLbs * 3}-${weightInLbs * 4}mg`);

    return dosageArray.join('\n');
  }
};
