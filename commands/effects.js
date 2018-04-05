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
    console.log(_drug);
    
    // loads graphql query from separate file as "query" variable
    var query = require("../queries/effects.js").effect(_drug);
    
    console.log(query);
    
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
    console.log(effects);
    
    var effectMessage = substance.name + "\n```\n";

    for (let i = 0; i < effects.length; i++) {
      console.log(effects[i].name);
    }

    for (let i = 0; i < effects.length; i++) {
      effectMessage += effects[i].name + "\n";

      if (i === effects.length -1) {
        effectMessage += "```";
      }
    }

    console.log(effectMessage);

    if (effectMessage != undefined) {
      var channelMessage = effectMessage;
    } else {
      var channelMessage = "Error: " + console.error;
    }

    message.channel.send(channelMessage).catch(console.error);


    // //this block cobbles together the dosage information section
    // //first check if there is dosage information for first (eventually preferred!!!) roa
    // //required, some substances (salvia for example) return null for dose object
    // if (roa.dose) {
    //   var dosage_message = buildDosageMessage(substance);
    // }
    
    // //this block cobbles together the duration information section
    // //first check if there is duration information for (eventually preferred!!!) roa
    // //required, some substances (salvia for example) return null for duration object
    
    // //fill out tolerance section if tolerance exists
    // if (substance.tolerance) {
    //   var tolerance_message = buildToleranceMessage(substance);
    // } else {
    //   var tolerance_message = "";
    // }
    
    // //HERE'S WHERE ALL THE MAGIC COMES TOGETHER
    // if (dosage_message != undefined) {
    //   var channel_message =
    //   "**" +
    //   substance.name +
    //   " information**\n\n" +
    //   // // These are broken in the API
    //   // "**Psychoactive class: **" +
    //   // "insert psychoactive class\n" +
    //   // "**Chemical class: **\n\n" +
    //   dosage_message +
    //   "**Addiction potential: **\n```\n" +
    //   substance.addictionPotential +
    //   "```" +
    //   tolerance_message;
    // } else {
    //   var channel_message = "Error " + console.error;
    // }
    
    // message.channel.send(channel_message).catch(console.error);
    
    // // // DXM calculator message temporarily disabled
    // // if (message.content.toLowerCase().includes("dxm")) {
    // //   message.channel
    // //   .send("To calculate DXM dose:\n```-dxmcalc [weight in pounds]```")
    // //   .catch(console.error);
    // // }
    
    // if (!isNaN(_drug.charAt(0))) {
    //   pw_drug = _drug
    //   .toUpperCase()
    //   .replace(/ACO/g, "-AcO-")
    //   .replace(/MEO/g, "-MeO-");
    // } else {
    //   pw_drug = _drug.charAt(0).toUpperCase() + _drug.slice(1);
    // }
    
    // if (pw_drug.length == 3) pw_drug = pw_drug.toUpperCase();
    
    // if (pw_drug == "Dipt") pw_drug = "DiPT";
    // if (pw_drug == "Moxy") pw_drug = "5-MeO-MiPT";
    // if (pw_drug == "Molly") pw_drug = "MDMA";
    // if (pw_drug == "Mdma") pw_drug = "MDMA";
  })
  .catch(function(error) {
    console.log("promise rejected/errored out");
    console.log(error);
  });
}
};