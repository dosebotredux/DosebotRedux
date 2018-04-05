//gets and links effects for a given substance
exports.run = (client, message, args) => {
  const { request } = require("graphql-request");
  
  var str = message.content;
  var result = str.split(" ");
  var _drug = str
  .toLowerCase()
  .replace("--effects ", "", -1)
  .replace(/-/g, "", -1)
  .replace(/ /g, "", -1); //removes all symbols and puts everything in lower case so bot finds the images easier
  
  // Temporary hardcoded solution to redirect problem
  if (_drug === "2fdck") {
    _drug = "2-Fluorodeschloroketamine";
  }
  if (_drug === "dck") {
    _drug = "deschloroketamine";
  }
  if (_drug === "pce") {
    _drug = "Eticyclidine";
  }
  if (_drug === "mxe") {
    _drug = "Methoxetamine";
  }
  if (_drug === "PCP") {
    _drug = "Phencyclidine";
  }
  if (_drug === "mxp") {
    _drug = "Methoxphenidine";
  }
  if (_drug === "xanax") {
    _drug = "Alprazolam";
  }
  if (_drug === "klonopin") {
    _drug = "Clonazepam";
  }
  if (_drug === "valium") {
    _drug = "Diazepam";
  }
  if (_drug === "ativan") {
    _drug = "Lorazepam";
  }
  if (_drug === "odsmt") {
    _drug = "O-Desmethyltramadol";
  }
  if (_drug === "oxytontin") {
    _drug = "Oxycodone";
  }
  if (_drug === "14bdo") {
    _drug = "1,4-Butanediol";
  }
  if (_drug === "14bdo") {
    _drug = "1,4-Butanediol";
  }
  if (_drug === "quaalude") {
    _drug = "Methaqualone";
  }
  if (_drug === "seroquel") {
    _drug = "Quetiapine";
  }
  if (_drug === "2ai") {
    _drug = "2-Aminoindane";
  }
  if (_drug === "vyvanse") {
    _drug = "Lisdexamfetamine";
  }
  if (_drug === "eph") {
    _drug = "Ethylphenidate";
  }
  if (_drug === "ipph") {
    _drug = "Isopropylphenidate";
  }
  if (_drug === "hdmp28") {
    _drug = "Methylnaphthidate";
  }
  if (_drug === "ritalin") {
    _drug = "Methylphenidate";
  }
  if (_drug === "ethcat") {
    _drug = "Ethcathinone";
  }
  if (_drug === "khat") {
    _drug = "Cathinone";
  }
  if (_drug === "hexen") {
    _drug = "N-Ethylhexedrone";
  }
  if (_drug === "4mmc") {
    _drug = "Mephedrone";
  }
  if (_drug === "benzedrex") {
    _drug = "Propylhexedrine";
  }
  if (_drug === "bkmdma") {
    _drug = "Methylone";
  }
  if (_drug === "theanine") {
    _drug = "L-Theanine";
  }
  if (_drug === "dxm") {
    _drug = "dextromethorphan";
  }
  if (_drug === "dph") {
    _drug = "diphenhydramine";
  }
  if (_drug === "3meopcp") {
    _drug = "3-meo-pcp";
  }
  if (_drug === "3meopce") {
    _drug = "3-meo-pce";
  }
  if (_drug === "ghb") {
    _drug = "GHB";
  }
  if (_drug === "dom") {
    _drug = "DOM";
  }
  
  if (_drug != undefined) {
    // loads graphql query from separate file as "query" variable
    var query = require("../queries/effects.js").effect(_drug);
    
    let substanceRequest = function(data) {
      return request("https://api.psychonautwiki.org", query).then(data => {
      return data;
    });
  };
  
  let results = substanceRequest();
  
  console.log(results); // Promise { <pending> }
  
  results
  .then(function(data) {
    console.log(data.substances); //will log results.
    
    var substance = data.substances[0];
    
    //now that we've grabbed the substance object, we can dissect further
    var effects = substance.effects;
    
    // create new variable with proper wiki name for linking (wiki names sometimes differ from api names)
    if (!isNaN(_drug.charAt(0))) {
      pw_drug = _drug
      .toUpperCase()
      .replace(/ACO/g, "-AcO-")
      .replace(/MEO/g, "-MeO-");
    } else {
      pw_drug = _drug.charAt(0).toUpperCase() + _drug.slice(1);
    }
    
    if (pw_drug.length == 3) pw_drug = pw_drug.toUpperCase();
    
    if (pw_drug == "Dipt") pw_drug = "DiPT";
    if (pw_drug == "Moxy") pw_drug = "5-MeO-MiPT";
    if (pw_drug == "Molly") pw_drug = "MDMA";
    if (pw_drug == "Mdma") pw_drug = "MDMA";
    
    // message construction
    var effectMessage =
    "**" + substance.name + " effect information**" + "\n```\n";
    
    // loops through effects and add their name to the message variable
    for (let i = 0; i < effects.length; i++) {
      effectMessage += effects[i].name + "\n";
      
      // if last message then close code block and link PW article subsection
      if (i === effects.length - 1) {
        effectMessage += "```\n";
        effectMessage +=
        "More information: <https://psychonautwiki.org/wiki/" +
        pw_drug +
        "#Subjective_effects>";
      }
    }
    
    if (effectMessage != undefined) {
      var channelMessage = effectMessage;
    } else {
      var channelMessage = "Error: " + console.error;
    }
    
    message.channel.send(channelMessage).catch(console.error);
  })
  .catch(function(error) {
    console.log("promise rejected/errored out");
    console.log(error);
  });
}
};
