
export default function () {
  return {
    castleName: "",
    townName: "",
    treasury: 0,
    resources: {
      "alcohol": 0,
      "arcanum": 0,
      "cloth": 0,
      "coal": 0,
      "food": 0,
      "iron": 0,
      "leather": 0,
      "lumber": 0,
      "steel": 0,
      "stone": 0,
      "timber": 0,
      "wool": 0
    },
    population: {
      adults: 0,
      invalid: 0,
      children: 0
    },
    autoSell: {
      alcohol: 0,
      arcanum: 0,
      cloth: 0,
      coal: 0,
      food: 0,
      iron: 0,
      leather: 0,
      lumber: 0,
      steel: 0,
      stone: 0,
      timber: 0,
      wool: 0
    },
    transactionrecord: [],
    improvements: [
      {
        "id": "new-land",
        "name": "Land",
        "benefit": "Gain an additional 1 km^2 of unimproved forested land",
        "goldCost": 5000,
        "resourceCost": {
          "alcohol": 0,
          "arcanum": 0,
          "cloth": 0,
          "coal": 0,
          "food": 0,
          "iron": 0,
          "leather": 0,
          "lumber": 0,
          "steel": 0,
          "stone": 0,
          "timber": 0,
          "wool": 0
        },
        "staff": [],
        "income": 0,
        "revenue": {
          "alcohol": 0,
          "arcanum": 0,
          "cloth": 0,
          "coal": 0,
          "food": 0,
          "iron": 0,
          "leather": 0,
          "lumber": 0,
          "steel": 0,
          "stone": 0,
          "timber": 0,
          "wool": 0
        },
        "pop": 0,
        "staffpop": 0,
        "laborers": 0,
        "employs": 0,
        "storage": 0,
        "operating": true,
        "buildtime": 0,
        "prerequisites": [ ],
        "hide": true,
        "count": 5,
        "max": 100,
        "type": "countryside"
      }
    ],
    construction: [],
    privateEnterprise: [],
    privateEmployees: [],
    staff: [],
    animals: [],
    laws: {
      incomeTaxRate: 0,
      headTaxRate: 0,
      foodSubsidies: 0,
      propertyTaxRate: 0,
      todaysExports: 0
    },
    merchants: [],
    guards: 0,
    servants: 0,
    laborers: 0,
    gameYear: 1846,
    gameMonth: 7,
    gameDay: 12,
    notes: ""
  };
}
