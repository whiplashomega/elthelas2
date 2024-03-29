
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
      "sugar": 0,
      "coffee": 0,
      "clay": 0,
      "cotton": 0,
      "pottery": 0,
      "paper": 0,
      "consumergoods": 0,
      "furniture": 0,
      "brick": 0,
      "horses": 0,
      "raremetal": 0,
      "wool": 0
    },
    population: {
      adults: 0,
      invalid: 0,
      children: 0,
      elderly: 0
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
      sugar: 0,
      coffee: 0,
      clay: 0,
      cotton: 0,
      pottery: 0,
      paper: 0,
      consumergoods: 0,
      furniture: 0,
      brick: 0,
      horses: 0,
      raremetal: 0,
      wool: 0
    },
    transactionrecord: [],
    improvements: [],
    construction: [],
    privateEnterprise: [],
    privateEmployees: [],
    staff: [],
    animals: [],
    vassals: [],
    laws: {
      incomeTaxRate: 0,
      headTaxRate: 0,
      foodSubsidies: 0,
      propertyTaxRate: 0,
      todaysExports: 0,
      rentRate: 0,
      vassalTaxRate: 0,
      conscription: 0,
      rainfall: 0,
      temperature: 50,
      continental: false,
      lattitude: 0
    },
    merchants: [],
    guards: 0,
    servants: 0,
    laborers: 0,
    gameYear: 1846,
    gameMonth: 7,
    gameDay: 12,
    rainString: "",
    currentTemperature: 0,
    windSpeed: 0,
    notes: ""
  };
}
