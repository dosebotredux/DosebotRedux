// Have an array of acceptable roles to apply
const acceptableTemporaryRoles = [
  'tripping',
  'stimmed',
  'barred',
  'nodding',
  'drunk',
  'dissod',
  'rolling',
  'stoned',
  'hungover',
  'delirious',
  'altered',
  'baked🔥',
  'tripping💓'
];

// Have an array of acceptable permanent roles to apply
const acceptablePermanentRoles = [
  'he/him',
  'she/her',
  'they/them',
  'any pronouns',
  've/ver',
  'e/em/eir',
  'earthling',
  'pup/pupself',
  'shi/hir',
  'kit/kitself',
  'fel/feline',
  'it/its',
  'per/perself',
  'meow',
  'rib/ribbit'
];

function getTemporaryRoles() {
  return acceptableTemporaryRoles;
}

function getPermanentRoles() {
  return acceptablePermanentRoles;
}

module.exports.getTemporaryRoles = getTemporaryRoles;
module.exports.getPermanentRoles = getPermanentRoles;
