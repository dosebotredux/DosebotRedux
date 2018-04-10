//the big enchilada
//tested with --info lsd, --info dmt, --info salvia

let sanitizeDrugName = function(drug) {
  if (drug === "dck") { return "deschloroketamine" }
  if (drug === "pce") { return "Eticyclidine" }
  if (drug === "pcp") { return "Phencyclidine" }
  if (drug === "mxp") { return "Methoxphenidine" }
  if (drug === "14bdo") { return "1,4-Butanediol" }
  if (drug === "quaalude") { return "Methaqualone" }
  if (drug === "eph") { return "Ethylphenidate" }
  if (drug === "ipph") { return "Isopropylphenidate" }
  if (drug === "hdmp28") { return "Methylnaphthidate" }
  if (drug === "khat") { return "Cathinone" }
  if (drug === "4mmc") { return "Mephedrone" }
  if (drug === "dxm") { return "dextromethorphan" }
  if (drug === "dph") { return "diphenhydramine" }
  if (drug === "ghb") { return "GHB" }

  // Lysergamides: LSD, 1P-LSD, ETH-LAD, 1P-ETH-LAD, AL-LAD, ALD-52, LSA, LSD,
  // LSM-775, LSZ, PARGY-LAD, PRO-LAD
  if (drug === "lsm775") { return "LSM-775" }
  if (drug === "lsz") { return "LSZ" }
  if (drug === "pargylad") { return "PARGY-LAD" }
  if (drug === "prolad") { return "PRO-LAD" }

  // 2C-{x}: B, C, D, E, H, I, iP, P, TFM, T-2, T-4, T-7, T-21
  // if (drug === "2cip") { return "2C-iP" } // doesn't exist
  // if (drug === "2ctfm") { return "2C-TFM" } // doesn't exist
  // if (drug === "2ct4") { return "2C-T-4" } // doesn't exist
  if (drug === "2ct21") { return "2C-T-21" }

  // DO{x}: M, ET, PR, iPR, BU, AM, F, C, B, I, EF, TFM, N
  if (drug === "dom") { return "DOM" }
  // if (drug === "doet") { return "DOET" } // doesn't exist
  // if (drug === "dopr") { return "DOPR" } // doesn't exist
  // if (drug === "doipr") { return "DOiPR" } // doesn't exist
  // if (drug === "dobu") { return "DOBU" } // doesn't exist
  // if (drug === "doam") { return "DOAM" } // doesn't exist
  // if (drug === "dof") { return "DOF" } // doesn't exist
  // if (drug === "doc") { return "DOC" } // BREAKS THE API
  if (drug === "dob") { return "DOB" }
  if (drug === "doi") { return "DOI" }
  // if (drug === "doef") { return "DOEF" } // doesn't exist
  // if (drug === "dotfm") { return "DOTFM" } // doesn't exist
  // if (drug === "don") { return "DON" } // doesn't exist

  // 25{x}-NBOMe: B, C, D, I, N
  // if (drug === "25d") { return "25dnbome"} // doesn't exist
  if (drug === "25n") { return "25nnbome" }

  // Base tryptamines: DMT, DET, MET, EPT, MPT, DPT, EiPT, MiPT, DiPT, aMT
  if (drug === "det") { return "DET" }
  if (drug === "met") { return "MET" }
  if (drug === "ept") { return "EPT" }
  if (drug === "mpt") { return "MPT" }
  // if (drug == "eipt") { return "EiPT" } // doesn't exist
  if (drug === "mipt") { return "MiPT" }
  if (drug === "dipt") { return "DiPT" }
  if (drug === "amt") { return "aMT" }

  // 4-sub tryptamines: 4-AcO-DET (Ethacetin), 4-AcO-DMT (Psilacetin),
  // 4-AcO-DPT (Psipracetin), 4-AcO-DiPT (Ipracetin), 4-AcO-EPT,
  // 4-AcO-MET (Metacetin), 4-AcO-MPT, 4-AcO-MiPT (Mipracetin),
  // 4-HO-DET (Ethocin), 4-HO-DMT (Psilocin), 4-HO-DPT (Psiprocin),
  // 4-HO-DiPT (Iprocin), 4-HO-EPT, 4-HO-MET (Metocin), 4-HO-MPT,
  // 4-HO-MiPT (Miprocin)
  if (drug === "4acodet") { return "4-AcO-DET" }
  // if (drug === "4acodpt") { return "4-AcO-DPT" } // doesn't exist
  if (drug === "4acoept") { return "4-AcO-EPT" }
  // if (drug === "4acompt") { return "4-AcO-MPT" } // doesn't exist
  if (drug === "4acomipt") { return "4-AcO-MiPT" }
  if (drug === "4hodet") { return "4-HO-DET" }
  if (drug === "4hodmt") { return "4-HO-DMT" }
  if (drug === "4hodpt") { return "4-HO-DPT" }
  if (drug === "4hodipt") { return "4-HO-DiPT" }
  if (drug === "4hoept") { return "4-HO-EPT" }

  if (drug === "ethacetin") { return "4-AcO-DET" }
  // if (drug === "psipracetin") { return "4-AcO-DPT" } // doesn't exist
  if (drug === "ipracetin") { return "4-AcO-DET" }
  if (drug === "metacetin") { return "4-AcO-MET" }
  if (drug === "mipracetin") { return "4-AcO-MiPT" }
  if (drug === "psiprocin") { return "4-HO-DPT" }

  // 5-sub tryptamines: 5-HO-DMT / Bufotenin, 5-MeO-DALT, 5-MeO-DMT,
  // 5-MeO-DiPT / Foxy, 5-MeO-MALT, 5-MeO-MiPT / Moxy, 5-MeO-aMT
  if (drug === "5hodmt") { return "5-HO-DMT" }
  if (drug === "5meodipt") { return "5-MeO-DiPT" }
  if (drug === "foxy") { return "5-MeO-DiPT" }
  // if (drug === "5meomalt") { return "5-MeO-MALT" } // doesn't exist
  if (drug === "5meomipt") { return "5-MeO-MiPT" }
  if (drug === "moxy") { return "5-MeO-MiPT" }
  // if (drug === "5meoamt") { return "5-MeO-aMT" } // doesn't exist

  return drug
}

exports.run = (client, message, args) => {
  const { request } = require("graphql-request");

  var str = message.content;
  var result = str.split(" ");
  var drug = str
    .toLowerCase()
    .replace("--info ", "", -1)
    .replace(/-/g, "", -1)
    .replace(/ /g, "", -1); //removes all symbols and puts everything in lower case so bot finds the images easier
  drug = sanitizeDrugName(drug)
  console.log(`Requesting info for ${drug}`);

  // loads graphql query from separate file as "query" variable
  let query = require("../queries/info.js").info(drug);
  request("https://api.psychonautwiki.org", query).then(data => {

    console.log(data) // SHOW ME WHAT YOU GOT

    if (data.substances.length == 0) {
      message.channel.send(`There are no substances matching \`${drug}\` on PsychonautWiki.`).catch(console.error)
      return
    }

    if (data.substances.length > 1) {
      message.channel.send(`There are multiple substances matching \`${drug}\` on PsychonautWiki.`).catch(console.error)
      return
    }

    let substance = data.substances[0]

    var messages = []
    messages.push(`**${substance.name} information**`)
    messages.push("")
    messages.push(buildDosageMessage(substance))
    messages.push("**Addiction potential**")
    messages.push("```" + (substance.addictionPotential || "No information") + "```")
    messages.push("**Tolerance**")
    messages.push(buildToleranceMessage(substance))

    message.channel.send(messages.join("\n")).catch(console.error)

    message.channel.send(`More information: <https://psychonautwiki.org/wiki/${substance.name}>`).catch(console.error)
  })
  .catch(function(error) {
    console.log("promise reected/errored out");
    console.log(error);
  });
};

// Functions
function buildToleranceMessage(substance) {
  let t = substance.tolerance
  // console.log(t)
  if (!!t) {
    return `\`\`\`Full: ${t.full}\nHalf: ${t.half}\nBaseline: ${t.zero}\`\`\``
  } else {
    return "```No information.```"
  }
}

function buildDosageMessage(substance) {
  var messages = []

  var i
  for (i = 0; i < substance.roas.length; i++) {
    let roa = substance.roas[i]
    let dose = roa.dose

    let dosageObjectToString = function(x) {
      // console.log(x)
      let unit = dose.units
      if (!!x) {
        if (typeof x == "number") {
          return  `${x} ${unit}`
        }
        return `${x.min} - ${x.max}${unit}`
      }
    }
    let durationObjectToString = function(x) {
      // console.log(x)
      // { max: 48, min: 12, units: 'hours' }
      if (!!x) {
        return `${x.min} - ${x.max} ${x.units}`
      }
      return undefined
    }

    messages.push(`**Dosage** (${roa.name})`)
    messages.push("```")
    messages.push(`Threshold: ${dosageObjectToString(dose.threshold) || "no information"}`)
    messages.push(`Light: ${dosageObjectToString(dose.light) || "no information"}`)
    messages.push(`Common: ${dosageObjectToString(dose.common) || "no information"}`)
    messages.push(`Strong: ${dosageObjectToString(dose.strong) || "no information"}`)
    messages.push(`Heavy: ${dosageObjectToString(dose.heavy) || "no information"}`)
    messages.push("```")

    // Duration
    messages.push(`**Duration** (${roa.name})`)
    if (!!roa.duration) {
      messages.push("```")
      messages.push(`Onset: ${durationObjectToString(roa.duration.onset) || "no information"}`)
      messages.push(`Comeup: ${durationObjectToString(roa.duration.comeup) || "no information"}`)
      messages.push(`Peak: ${durationObjectToString(roa.duration.peak) || "no information"}`)
      messages.push(`Offset: ${durationObjectToString(roa.duration.offset) || "no information"}`)
      messages.push(`Afterglow: ${durationObjectToString(roa.duration.afterglow) || "no information"}`)
      messages.push(`Total: ${durationObjectToString(roa.duration.total) || "no information"}`)
      messages.push("```")
    } else {
      messages.push("```No duration information .```")
    }

  }

  // console.log(messages)
  return messages.join("\n")
}
