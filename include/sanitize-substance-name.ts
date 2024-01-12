export function sanitizeSubstanceName(drug: string) {
  switch (drug) {
    case 'ket': return 'ketamine'
    case "dck": return "deschloroketamine"
    case "pce": return "Eticyclidine"
    case "3meopce": return "3-meo-pce"
    case "pcp": return "Phencyclidine"
    case "mxp": return "Methoxphenidine"
    case "14bdo": return "1,4-Butanediol"
    case "quaalude": return "Methaqualone"
    case "eph": return "Ethylphenidate"
    case "ipph": return "Isopropylphenidate"
    case "hdmp28": return "Methylnaphthidate"
    case "khat": return "Cathinone"
    case "4mmc": return "Mephedrone"
    case "dxm": return "dextromethorphan"
    case "dph": return "diphenhydramine"
    case "ghb": return "GHB"
    case "diclaz": return "Diclazepam"

    // Lysergamides: LSD, 1P-LSD, ETH-LAD, 1P-ETH-LAD, AL-LAD, ALD-52, LSA, LSD,
    // LSM-775, LSZ, PARGY-LAD, PRO-LAD,
    case "lsm775": return "LSM-775"
    case "lsz": return "LSZ"
    case "pargylad": return "PARGY-LAD"
    case "prolad": return "PRO-LAD"
    // case "lsa": return "LSA"

    // 2C-{x}: B, C, D, E, H, I, iP, P, TFM, T-2, T-4, T-7, T-21
    // case "2cip": return "2C-iP" // doesn't exist
    // case "2ctfm": return "2C-TFM" // doesn't exist
    // case "2ct4": return "2C-T-4" // doesn't exist
    case "2ct21": return "2C-T-21"

    // DO{x}: M, ET, PR, iPR, BU, AM, F, C, B, I, EF, TFM, N
    case "dom": return "DOM"
    // case "doet": return "DOET" // doesn't exist
    // case "dopr": return "DOPR" // doesn't exist
    // case "doipr": return "DOiPR" // doesn't exist
    // case "dobu": return "DOBU" // doesn't exist
    // case "doam": return "DOAM" // doesn't exist
    // case "dof": return "DOF" // doesn't exist
    // case "doc": return "DOC" // BREAKS THE API
    case "dob": return "DOB"
    case "doi": return "DOI"
    // case "doef": return "DOEF" // doesn't exist
    // case "dotfm": return "DOTFM" // doesn't exist
    // case "don": return "DON" // doesn't exist

    // 25{x}-NBOMe: B, C, D, I, N
    // case "25d": return "25dnbome" // doesn't exist
    case "25n": return "25nnbome"

    // Base tryptamines: DMT, DET, MET, EPT, MPT, DPT, EiPT, MiPT, DiPT, aMT
    case "det": return "DET"
    case "met": return "MET"
    case "ept": return "EPT"
    case "mpt": return "MPT"
    // case "eipt": return "EiPT" // doesn't exist
    case "mipt": return "MiPT"
    case "dipt": return "DiPT"
    case "amt": return "aMT"

    // 4-sub tryptamines: 4-AcO-DET (Ethacetin), 4-AcO-DMT (Psilacetin),
    // 4-AcO-DPT (Psipracetin), 4-AcO-DiPT (Ipracetin), 4-AcO-EPT,
    // 4-AcO-MET (Metacetin), 4-AcO-MPT, 4-AcO-MiPT (Mipracetin),
    // 4-HO-DET (Ethocin), 4-HO-DMT (Psilocin), 4-HO-DPT (Psiprocin),
    // 4-HO-DiPT (Iprocin), 4-HO-EPT, 4-HO-MET (Metocin), 4-HO-MPT,
    // 4-HO-MiPT (Miprocin)
    case "4acodet": return "4-AcO-DET"
    // case "4acodpt": return "4-AcO-DPT" // doesn't exist
    case "4acoept": return "4-AcO-EPT"
    // case "4acompt": return "4-AcO-MPT" // doesn't exist
    case "4acomipt": return "4-AcO-MiPT"
    case "4hodet": return "4-HO-DET"
    case "4hodmt": return "4-HO-DMT"
    case "4hodpt": return "4-HO-DPT"
    case "4hodipt": return "4-HO-DiPT"
    case "4hoept": return "4-HO-EPT"

    case "ethacetin": return "4-AcO-DET"
    // case "psipracetin": return "4-AcO-DPT" // doesn't exist
    case "ipracetin": return "4-AcO-DET"
    case "metacetin": return "4-AcO-MET"
    case "mipracetin": return "4-AcO-MiPT"
    case "psiprocin": return "4-HO-DPT"

    // 5-sub tryptamines: 5-HO-DMT / Bufotenin, 5-MeO-DALT, 5-MeO-DMT,
    // 5-MeO-DiPT / Foxy, 5-MeO-MALT, 5-MeO-MiPT / Moxy, 5-MeO-aMT
    case "5hodmt": return "5-HO-DMT";
    case "5meodipt": return "5-MeO-DiPT"
    case "foxy": return "5-MeO-DiPT"
    // case "5meomalt": return "5-MeO-MALT" // doesn't exist
    case "5meomipt": return "5-MeO-MiPT"
    case "moxy": return "5-MeO-MiPT"
    // case "5meoamt": return "5-MeO-aMT" // doesn't exist

    // Other pharmaceuticals
    case "sertraline": return "ssri";

    default: return drug;
  }
}
