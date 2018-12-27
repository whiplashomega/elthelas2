export default function() {
  return {
    name: "",
    player: "",
    warlockslotsavailable: 0,
    charclasses: [{ thisclass: { name: "", subclass: [], hitdie: 6, features: [] }, level: 0, selsubclass: { castermult: 0, features: [] } }],
    race: { stats: [0, 0, 0, 0, 0, 0], speed: [0, 0, 0, 0, 0] },
    background: { feature: { show: false, description: "", name: "" } },
    alignment: "",
    faction: { level1: "", level10: "" },
    homecountry: "",
    hometown: "",
    age: "",
    hpcurrent: 1,
    height: "",
    weight: "",
    gender: "",
    eyes: "",
    hair: "",
    allies: "",
    backstory: "",
    bond: "",
    personality: "",
    notes: "",
    god: "",
    skin: "",
    skills: [
      { name: "Acrobatics", prof: 0, stat: 1, magic: 0 },
      { name: "Animal Handling", prof: 0, stat: 4, magic: 0 },
      { name: "Arcana", prof: 0, stat: 3, magic: 0 },
      { name: "Athletics", prof: 0, stat: 0, magic: 0 },
      { name: "Deception", prof: 0, stat: 5, magic: 0 },
      { name: "History", prof: 0, stat: 3, magic: 0 },
      { name: "Insight", prof: 0, stat: 4, magic: 0 },
      { name: "Intimidation", prof: 0, stat: 5, magic: 0 },
      { name: "Investigation", prof: 0, stat: 3, magic: 0 },
      { name: "Medicine", prof: 0, stat: 4, magic: 0 },
      { name: "Nature", prof: 0, stat: 3, magic: 0 },
      { name: "Perception", prof: 0, stat: 4, magic: 0 },
      { name: "Performance", prof: 0, stat: 5, magic: 0 },
      { name: "Persuasion", prof: 0, stat: 5, magic: 0 },
      { name: "Religion", prof: 0, stat: 3, magic: 0 },
      { name: "Sleight of Hand", prof: 0, stat: 1, magic: 0 },
      { name: "Stealth", prof: 0, stat: 1, magic: 0 },
      { name: "Survival", prof: 0, stat: 4, magic: 0 }
    ],
    saves: [false, false, false, false, false, false],
    savebonus: [0, 0, 0, 0, 0, 0],
    stats: [8, 8, 8, 8, 8, 8],
    statbonus: [0, 0, 0, 0, 0, 0],
    initmagic: 0,
    hpmagic: 0,
    acmagic: 0,
    speedmagic: [0, 0, 0, 0, 0],
    attacks: [],
    armors: [],
    feats: [],
    injuries: [],
    bonusfeats: 0,
    proficiencies: "",
    equipment: [],
    containers: [
      { id: 1, name: "Carried/Worn", capacity: 9999, weightCounts: true, weight: 0 }
    ],
    cp: 0,
    sp: 0,
    gp: 0,
    pp: 0,
    art: 0,
    gems: 0,
    size: "medium",
    capacitybonus: 0,
    spells: { cantrip: [], level1: [], level2: [], level3: [], level4: [], level5: [], level6: [], level7: [], level8: [], level9: [] },
    availableslots: { cantrip: 0, level1: 0, level2: 0, level3: 0, level4: 0, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    bonusslots: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    resources: [],
    features: [],
    saveDCBonus: [0, 0, 0, 0, 0, 0],
    attBonus: [0, 0, 0, 0, 0, 0],
    castlog: []
  };
};
