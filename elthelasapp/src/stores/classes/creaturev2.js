export default function () {
  return {
    name: "",
    size: "Medium",
    type: "Monstrosity",
    subtype: "",
    alignment: "Neutral Evil",
    ac: 10,
    pc: 0,
    maxdex: 99,
    acdesc: "Unarmored",
    hitdice: 1,
    initmod: 0,
    speed: [30, 0, 0, 0, 0],
    stats: [10, 10, 10, 10, 10, 10],
    spells: [],
    casterlevel: 0,
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
    senses: "",
    dr: {
      piercing: 0,
      slashing: 0,
      bludgeoning: 0,
      acid: 0,
      cold: 0,
      fire: 0,
      force: 0,
      lightning: 0,
      necrotic: 0,
      poison: 0,
      psychic: 0,
      radiant: 0,
      thunder: 0
    },
    conditions: [
      { name: "stunned", value: false },
      { name: "prone", value: false },
      { name: "exhaustion", value: false },
      { name: "blinded", value: false },
      { name: "deafened", value: false },
      { name: "frightened", value: false },
      { name: "grappled", value: false },
      { name: "incapacitated", value: false },
      { name: "paralyzed", value: false },
      { name: "petrified", value: false },
      { name: "poisoned", value: false },
      { name: "restrained", value: false },
      { name: "unconscious", value: false }
    ],
    features: [],
    actions: [],
    attacks: [],
    legendaryactions: [],
    languages: "",
    locations: [],
    image: "",
    crmods: {
      regeneration: 0,
      hasaoe: false
    },
    description: ""
  }
}