//gets and links effects for a given substance
exports.run = (client, message, args) => {
  const { request } = require("graphql-request");
  
  var str = message.content;
  var result = str.split(" ");
  var drug = str
  .toLowerCase()
  .replace("--effects ", "", -1)
  .replace(/-/g, "", -1)
  .replace(/ /g, "", -1); //removes all symbols and puts everything in lower case so bot finds the images easier
  
  // Temporary hardcoded solution to redirect problem
  if (drug === "2fdck") {
    drug = "2-Fluorodeschloroketamine";
  }
  if (drug === "dck") {
    drug = "deschloroketamine";
  }
  if (drug === "pce") {
    drug = "Eticyclidine";
  }
  if (drug === "mxe") {
    drug = "Methoxetamine";
  }
  if (drug === "PCP") {
    drug = "Phencyclidine";
  }
  if (drug === "mxp") {
    drug = "Methoxphenidine";
  }
  if (drug === "xanax") {
    drug = "Alprazolam";
  }
  if (drug === "klonopin") {
    drug = "Clonazepam";
  }
  if (drug === "valium") {
    drug = "Diazepam";
  }
  if (drug === "ativan") {
    drug = "Lorazepam";
  }
  if (drug === "odsmt") {
    drug = "O-Desmethyltramadol";
  }
  if (drug === "oxytontin") {
    drug = "Oxycodone";
  }
  if (drug === "14bdo") {
    drug = "1,4-Butanediol";
  }
  if (drug === "14bdo") {
    drug = "1,4-Butanediol";
  }
  if (drug === "quaalude") {
    drug = "Methaqualone";
  }
  if (drug === "seroquel") {
    drug = "Quetiapine";
  }
  if (drug === "2ai") {
    drug = "2-Aminoindane";
  }
  if (drug === "vyvanse") {
    drug = "Lisdexamfetamine";
  }
  if (drug === "eph") {
    drug = "Ethylphenidate";
  }
  if (drug === "ipph") {
    drug = "Isopropylphenidate";
  }
  if (drug === "hdmp28") {
    drug = "Methylnaphthidate";
  }
  if (drug === "ritalin") {
    drug = "Methylphenidate";
  }
  if (drug === "ethcat") {
    drug = "Ethcathinone";
  }
  if (drug === "khat") {
    drug = "Cathinone";
  }
  if (drug === "hexen") {
    drug = "N-Ethylhexedrone";
  }
  if (drug === "4mmc") {
    drug = "Mephedrone";
  }
  if (drug === "benzedrex") {
    drug = "Propylhexedrine";
  }
  if (drug === "bkmdma") {
    drug = "Methylone";
  }
  if (drug === "theanine") {
    drug = "L-Theanine";
  }
  if (drug === "dxm") {
    drug = "dextromethorphan";
  }
  if (drug === "dph") {
    drug = "diphenhydramine";
  }
  if (drug === "3meopcp") {
    drug = "3-meo-pcp";
  }
  if (drug === "3meopce") {
    drug = "3-meo-pce";
  }
  if (drug === "ghb") {
    drug = "GHB";
  }
  if (drug === "dom") {
    drug = "DOM";
  }
  if (drug === "dipt") {
    drug = "DiPT"
  }
  
  if (drug != undefined) {
    // loads graphql query from separate file as "query" variable
    var query = require("../queries/effects.js").effect(drug);
    
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
    if (!isNaN(drug.charAt(0))) {
      pwdrug = drug
      .toUpperCase()
      .replace(/ACO/g, "-AcO-")
      .replace(/MEO/g, "-MeO-");
    } else {
      pwdrug = drug.charAt(0).toUpperCase() + drug.slice(1);
    }
    
    if (pwdrug.length == 3) pwdrug = pwdrug.toUpperCase();
    
    if (pwdrug == "Dipt") pwdrug = "DiPT";
    if (pwdrug == "Moxy") pwdrug = "5-MeO-MiPT";
    if (pwdrug == "Molly") pwdrug = "MDMA";
    if (pwdrug == "Mdma") pwdrug = "MDMA";
    
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
        pwdrug +
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
