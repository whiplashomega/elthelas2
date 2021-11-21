import { mapGetters, mapActions } from 'vuex';

function randNbm() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) return randNbm(); // resample between 0 and 1
  return num;
}

export default {
  computed: {
    ...mapGetters({
      allStrongholds: "strongholds",
      availableStaffBeds: 'availableStaffBeds',
      calcTotalRevenue: 'calcTotalRevenue',
      gameDate: 'gameDate',
      maxLaborers: 'maxLaborers',
      netRevenue: 'netRevenue',
      stronghold: 'stronghold',
      totalStorage: 'totalStorage',
      unrest: 'unrest',
      exportLimit: 'exportLimit',
      usedStorage: 'usedStorage',
      userinfo: "getUserInfo",
      totalHousing: "totalHousing",
      getPop: "getPop",
      staffList: "staffList",
      nonstaffPop: "nonstaffPop",
      staffBeds: "staffBeds"
    })
  },
  data () {
    return {
      newmodal: true,
      dayofweek: "Godsday",
      dayNames: ["Godsday", "Elvesday", "Gnomesday", "Dragonsday", "Mansday", "Dwarvesday", "Orcsday"],
      monthNames: ["Neradan", "Dorunor", "Trimalan", "Sylvanus", "Gaiana", "Alohiman", "Coranus", "Moltyr", "Saris", "Maridia", "Tockra", "Amatherin"]
    };
  },
  methods: {
    ...mapActions({
      newStronghold: 'newStronghold',
      getStrongholds: 'getStrongholds',
      loadStronghold: 'loadStronghold',
      loadStrongholdById: 'loadStrongholdById',
      saveStronghold: 'saveStronghold',
      saveNewStronghold: 'saveNewStronghold',
      deleteStronghold: 'deleteStronghold',
      addToTreasury: 'addToTreasury',
      addImprovement: 'addImprovement'
    }),
    newDay () {
      // reduce food subsidies if necessary
      if (this.stronghold.laws.foodSubsidies > this.stronghold.resources.food) {
        this.stronghold.laws.foodSubsidies = this.stronghold.resources.food;
      }
      // increment exports down
      this.stronghold.laws.todaysExports -= this.exportLimit;
      if (this.stronghold.laws.todaysExports < 0) {
        this.stronghold.laws.todaysExports = 0;
      }
      // change autosell values
      for (let key in this.stronghold.autoSell) {
        let amount = Number(this.stronghold.autoSell[key]);
        if (-amount > this.stronghold.resources[key]) {
          this.stronghold.autoSell[key] = -this.stronghold.resources[key];
        }
      }
      // gold revenue
      this.addToTreasury({ changeby: this.netRevenue, record: "daily net revenue" });
      // resource revenue
      let rev = this.calcTotalRevenue;
      for (let key in this.stronghold.resources) {
        this.stronghold.resources[key] = Math.round((this.stronghold.resources[key] + Number(rev[key])) * 100) / 100;
      }
      // increment the date
      this.stronghold.gameDay += 1;
      if (this.stronghold.gameDay > 30) {
        this.stronghold.gameDay = 1;
        this.stronghold.gameMonth += 1;
      }
      if (this.stronghold.gameMonth > 12) {
        this.stronghold.gameMonth = 1;
        this.stronghold.gameYear += 1;
      }
      let finished = [];
      // increment items under construction
      this.stronghold.construction.forEach((imp) => {
        imp.buildtime -= 1;
        if (imp.buildtime <= 0) {
          finished.push(imp);
          this.addImprovement(imp);
        }
      });
      // clear finished projects
      finished.forEach((a) => {
        this.stronghold.construction.splice(this.stronghold.construction.indexOf(a), 1);
      });
      // run weather randomizer
      this.calcWeather();
      let dayselapsedSinceCalendarStart = this.stronghold.gameYear * 365 + this.stronghold.gameMonth * 30 + this.stronghold.gameDay;
      this.dayofweek = this.dayNames[dayselapsedSinceCalendarStart % 7];
      this.month = this.monthNames[this.stronghold.gameMonth - 1];
      alert("A new day has begun. It is the " + this.stronghold.gameDay + "th day of " + this.month + ", " + this.dayofweek + ". it is " + this.stronghold.currentTemperature + " degrees outside. " + this.stronghold.rainString + ". The average windspeed is " + this.stronghold.windSpeed + " mph");
    },
    calcWeather () {
      let season = 3;
      let avgTemp = Number(this.stronghold.laws.temperature);
      if (this.stronghold.gameMonth < 3 || this.stronghold.gameMonth > 11) {
        season = 4;
      } else if (this.stronghold.gameMonth < 2 && this.stronghold.gameMonth < 6) {
        season = 1;
      } else if (this.stronghold.gameMonth > 5 && this.stronghold.gameMonth < 9) {
        season = 2;
      }
      if ((season === 2 && this.stronghold.laws.lattitude >= 0) || (season === 4 && this.stronghold.laws.lattitude < 0)) { // summer
        avgTemp += 20;
        if (this.stronghold.laws.continental && Math.abs(this.stronghold.laws.lattitude) > 30) {
          avgTemp += 15;
        }
      } else if (season === 4 || season === 2) { // winter
        avgTemp -= 20;
        if (this.stronghold.laws.continental && Math.abs(this.stronghold.laws.lattitude) > 30) {
          avgTemp -= 15;
        }
      }
      let minTemp = avgTemp - 30 - (this.stronghold.laws.continental * 10);
      let maxTemp = avgTemp + 30 + (this.stronghold.laws.continental * 10);
      let range = maxTemp - minTemp;
      let temperature = Math.floor(randNbm() * range) + minTemp;
      let rainChance = (2.75 * this.stronghold.laws.rainfall) / 365;
      let rainString = "No precipitation";
      if (Math.random() < rainChance) { // rainy day
        let rainStrengthNum = Math.random();
        if (rainStrengthNum < 0.33) {
          rainString = "Scattered showers occur throughout the day";
          if (temperature < 32) {
            rainString = "Snow flurries occur throughout the day";
          }
        } else if (rainStrengthNum < 0.5) {
          rainString = "A steady rain falls throughout the day";
          if (temperature < 32) {
            rainString = "An inch or two of snow falls over the course of the day";
          }
        } else if (rainStrengthNum < 0.67) {
          rainString = "A storm passed through overnight";
          if (temperature < 40) {
            rainString = "A snowstorm passes through overnight";
          }
        } else {
          rainString = "A large thunderstorm sweeps into the area";
          if (temperature < 32) {
            rainString = "A major blizzard passes through the area";
          }
        }
      }
      this.stronghold.currentTemperature = temperature;
      this.stronghold.rainString = rainString;
      this.stronghold.windSpeed = Math.floor(Math.random() * 20) + (Math.random() > 0.75 ? Math.floor(Math.random() * 30) : 0);
    }
  }
};
