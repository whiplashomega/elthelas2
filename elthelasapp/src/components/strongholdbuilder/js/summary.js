import { useStrongholdStore, useUserStore } from "@/stores/index";
import Decimal from "decimal.js";
import { storeToRefs } from "pinia";
import modal from "@/components/global/modal.vue";
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
  setup() {
    const strongholdStore = useStrongholdStore();
    const userStore = useUserStore();

    const {
      strongholds: allStrongholds,
      availableStaffBeds,
      calcTotalRevenue,
      gameDate,
      maxLaborers,
      netRevenue,
      stronghold,
      totalStorage,
      unrest,
      usedStorage,
      totalHousing,
      getPop,
      staffList,
      nonstaffPop,
      staffBeds,
    } = storeToRefs(strongholdStore);
    const { getUserInfo: userinfo } = userStore;
    const {
      newStronghold,
      buyResource,
      getStrongholds,
      loadStronghold,
      loadStrongholdById,
      saveStronghold,
      saveNewStronghold,
      deleteStronghold,
      addToTreasury,
      addImprovement,
    } = strongholdStore;
    return {
      allStrongholds,
      availableStaffBeds,
      calcTotalRevenue,
      gameDate,
      maxLaborers,
      netRevenue,
      stronghold,
      totalStorage,
      unrest,
      usedStorage,
      totalHousing,
      getPop,
      staffList,
      nonstaffPop,
      staffBeds,
      userinfo,
      newStronghold,
      buyResource,
      getStrongholds,
      loadStronghold,
      loadStrongholdById,
      saveStronghold,
      saveNewStronghold,
      deleteStronghold,
      addToTreasury,
      addImprovement,
    };
  },
  data() {
    return {
      newmodal: true,
      dayofweek: "Godsday",
      dayNames: [
        "Godsday",
        "Elvesday",
        "Gnomesday",
        "Dragonsday",
        "Mansday",
        "Dwarvesday",
        "Orcsday",
      ],
      monthNames: [
        "Neradan",
        "Dorunor",
        "Trimalan",
        "Sylvanus",
        "Gaiana",
        "Alohiman",
        "Coranus",
        "Moltyr",
        "Saris",
        "Maridia",
        "Tockra",
        "Amatherin",
      ],
    };
  },
  components: {
    modal,
  },
  methods: {
    newDay() {
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
      this.addToTreasury({
        changeby: this.netRevenue,
        record: "daily net revenue",
      });
      // resource revenue
      let rev = this.calcTotalRevenue;
      for (let key in this.stronghold.resources) {
        this.stronghold.resources[key] =
          Math.round(
            (this.stronghold.resources[key] + Number(rev[key])) * 100
          ) / 100;
        if (this.stronghold.resources[key] < 0) {
          this.stronghold.resources[key] = 0;
        }
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
        if (!imp.laborersassigned) {
          imp.laborersassigned = 0;
        }
        let amountconstructed = Decimal(imp.laborersassigned);

        if (!imp.private && !imp.dmGift) {
          let percentdone = amountconstructed.div(imp.buildtime);
          for (let key in imp.resourceCost) {
            let cost = percentdone.mul(imp.resourceCost[key]).toFixed(2);
            imp.resourceCost[key] -= cost;
          }
          imp.buildtime -= amountconstructed;
        } else if (imp.private) {
          imp.buildtime -= 20;
        } else {
          imp.build -= amountconstructed;
        }
        if (imp.buildtime <= 0) {
          finished.push(imp);
          this.addImprovement(imp);
        }
      });
      // clear finished projects
      finished.forEach((a) => {
        this.stronghold.construction.splice(
          this.stronghold.construction.indexOf(a),
          1
        );
      });
      // run weather randomizer
      this.calcWeather();
      let dayselapsedSinceCalendarStart =
        this.stronghold.gameYear * 365 +
        this.stronghold.gameMonth * 30 +
        this.stronghold.gameDay;
      this.dayofweek = this.dayNames[dayselapsedSinceCalendarStart % 7];
      this.month = this.monthNames[this.stronghold.gameMonth - 1];
      // demographic changes
      let adultProbability = this.stronghold.population.children / 6570; // 18 years as a child
      let deathProbability = this.stronghold.population.elderly / 5475; // average 10 years as retired
      let birthProbability = (this.stronghold.population.adults * 0.5 * (0.15 / 365)); // adults * percent women * (birth rate per woman per year / 365)
      birthProbability = Math.max(this.stronghold.population.adults * 0.00001, birthProbability * (1 - (this.unrest / 100))); // unrest reduces birth rates
      let retireProbability = this.stronghold.population.adults / 17155; // 47 years as an adult before retirement
      let sickDeathProbability = this.stronghold.population.invalid / 1000;
      let hasClinic = this.stronghold.improvements.some((a) => {
        return a.id === "clinic";
      })
      let sickRecoverProbability = this.stronghold.population.invalid / 50 * (hasClinic ? 3 : 1);
      let getSickProbability = this.stronghold.population.adults / 200;
      let numAdults = 0;
      let numBirths = 0;
      let numDeaths = 0;
      let numRetirements = 0;
      let numSickDeaths = 0;
      let numSickRecoveries = hasClinic ? Math.ceil(Math.random() * 6) : 0;
      let numGetSick = 0;
      let rand = Math.random();
      while ((1 - rand) < adultProbability) {
        numAdults++;
        rand = Math.random();
        if (adultProbability > 1) adultProbability--;
      }
      rand = Math.random();
      while ((1 - rand) < deathProbability) {
        numDeaths++;
        rand = Math.random();
        if (deathProbability > 1) deathProbability--;
      }
      rand = Math.random();
      while ((1 - rand) < birthProbability) {
        numBirths++;
        rand = Math.random();
        if (birthProbability > 1) birthProbability--;
      }
      rand = Math.random();
      while ((1 - rand) < retireProbability) {
        numRetirements++;
        rand = Math.random();
        if (retireProbability > 1) retireProbability--;
      }
      rand = Math.random();
      while ((1 - rand) < sickDeathProbability) {
        numSickDeaths++;
        rand = Math.random();
        if (sickDeathProbability > 1) sickDeathProbability--;
      }
      rand = Math.random();
      while ((1 - rand) < sickRecoverProbability) {
        numSickRecoveries++;
        rand = Math.random();
        if (sickRecoverProbability > 1) sickRecoverProbability--;
      }
      rand = Math.random();
      while ((1 - rand) < getSickProbability) {
        numGetSick++;
        rand = Math.random();
        if (getSickProbability > 1) getSickProbability--;
      }
      this.stronghold.population.children = Number(this.stronghold.population.children) + numBirths;
      if (numGetSick > Number(this.stronghold.population.adults)) { numGetSick = Number(this.stronghold.population.adults) }
      this.stronghold.population.invalid = Number(this.stronghold.population.invalid) + numGetSick;
      this.stronghold.population.adults = Number(this.stronghold.population.adults) - numGetSick;
      if (numSickRecoveries > Number(this.stronghold.population.invalid)) { numSickRecoveries = Number(this.stronghold.population.invalid) }
      this.stronghold.population.invalid -= numSickRecoveries;
      this.stronghold.population.adults += numSickRecoveries;
      if (numSickDeaths > Number(this.stronghold.population.invalid)) { numGetSick = Number(this.stronghold.population.invalid) }
      this.stronghold.population.invalid -= numSickDeaths;
      if (numRetirements > Number(this.stronghold.population.adults)) { numRetirements = Number(this.stronghold.population.adults) }
      this.stronghold.population.adults -= numRetirements;
      this.stronghold.population.elderly = Number(this.stronghold.population.elderly) + numRetirements;
      if (numDeaths > Number(this.stronghold.population.elderly)) { numDeaths = Number(this.stronghold.population.elderly) }
      this.stronghold.population.elderly -= numDeaths;
      if (numAdults > Number(this.stronghold.population.children)) { numAdults = Number(this.stronghold.population.children) }
      this.stronghold.population.children -= numAdults;
      this.stronghold.population.adults += numAdults;
      alert(
        "A new day has begun. It is the " +
          this.stronghold.gameDay +
          "th day of " +
          this.month +
          ", " +
          this.dayofweek +
          ". it is " +
          this.stronghold.currentTemperature +
          " degrees outside. " +
          this.stronghold.rainString +
          ". The average windspeed is " +
          this.stronghold.windSpeed +
          " mph.\n\nThere were " +
          numBirths + " births, " +
          numRetirements + " retirements, " +
          numSickDeaths + " deaths from disease and injury, " +
          numSickRecoveries + " people recovered from illness, " +
          numGetSick + " people became ill or injured, " +
          numDeaths + " deaths from old age, and " +
          numAdults + " children reaching adulthood"
      );
    },
    calcWeather() {
      let season = 3;
      let avgTemp = Number(this.stronghold.laws.temperature);
      if (this.stronghold.gameMonth < 3 || this.stronghold.gameMonth > 11) {
        season = 4;
      } else if (
        this.stronghold.gameMonth < 2 &&
        this.stronghold.gameMonth < 6
      ) {
        season = 1;
      } else if (
        this.stronghold.gameMonth > 5 &&
        this.stronghold.gameMonth < 9
      ) {
        season = 2;
      }
      if (
        (season === 2 && this.stronghold.laws.lattitude >= 0) ||
        (season === 4 && this.stronghold.laws.lattitude < 0)
      ) {
        // summer
        avgTemp += 20;
        if (
          this.stronghold.laws.continental &&
          Math.abs(this.stronghold.laws.lattitude) > 30
        ) {
          avgTemp += 15;
        }
      } else if (season === 4 || season === 2) {
        // winter
        avgTemp -= 20;
        if (
          this.stronghold.laws.continental &&
          Math.abs(this.stronghold.laws.lattitude) > 30
        ) {
          avgTemp -= 15;
        }
      }
      let minTemp = avgTemp - 30 - this.stronghold.laws.continental * 10;
      let maxTemp = avgTemp + 30 + this.stronghold.laws.continental * 10;
      let range = maxTemp - minTemp;
      let temperature = Math.floor(randNbm() * range) + minTemp;
      let rainChance = (2.75 * this.stronghold.laws.rainfall) / 365;
      let rainString = "No precipitation";
      if (Math.random() < rainChance) {
        // rainy day
        let rainStrengthNum = Math.random();
        if (rainStrengthNum < 0.33) {
          rainString = "Scattered showers occur throughout the day";
          if (temperature < 32) {
            rainString = "Snow flurries occur throughout the day";
          }
        } else if (rainStrengthNum < 0.5) {
          rainString = "A steady rain falls throughout the day";
          if (temperature < 32) {
            rainString =
              "An inch or two of snow falls over the course of the day";
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
      this.stronghold.windSpeed =
        Math.floor(Math.random() * 20) +
        (Math.random() > 0.75 ? Math.floor(Math.random() * 30) : 0);
    },
  },
};
