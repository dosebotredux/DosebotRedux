exports.effect = function(substance) {
  return `{
    substances(query: "${substance}") {
      name

      effects {
        name url
      }
    }
  }`;
};
