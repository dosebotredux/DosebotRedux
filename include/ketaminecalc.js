// Calculate weight in pounds
function calculateWeight(weight, isKilos) {
  if (isKilos) {
    return Math.floor(weight * 2.2);
  } else {
    return weight;
  }
}

// Calculate insufflated dosages
function generateInsufflatedDosages(weight, isKilos) {
  const weightInLbs = calculateWeight(weight, isKilos);
  const dosageArray = [];

  dosageArray.push(`**Threshold**: ${weightInLbs * 0.1}mg`);
  dosageArray.push(`**Light**: ${weightInLbs * 0.15}mg`);
  dosageArray.push(`**Common**: ${weightInLbs * 0.3}mg`);
  dosageArray.push(`**Strong**: ${weightInLbs * 0.5}-${weightInLbs * 0.75}mg`);
  dosageArray.push(`**K-hole**: ${weightInLbs}mg`);

  return dosageArray.join('\n');
}

// Calculate intramuscular dosages
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

// Calculate oral dosages
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

// Calculate rectal dosages
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

module.exports = {
  generateInsufflatedDosages,
  generateIntramuscularDosages,
  generateOralDosage,
  generateRectalDosage
};
