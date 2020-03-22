import { mapGetters, mapActions } from 'vuex';
import improvements from '@/components/tools/strongholdbuilder/improvements';
import staff from '@/components/tools/strongholdbuilder/staff';
import summary from '@/components/tools/strongholdbuilder/summary';
import generalInformation from '@/components/tools/strongholdbuilder/generalinformation';

export default {
  components: {
    improvements: improvements,
    staff: staff,
    strongholdSummary: summary,
    generalInformation: generalInformation,
    userinfo: "getUserInfo"
  },
  computed: {
    ...mapGetters({
      bankRevenue: 'bankRevenue',
      buildingMaintenance: 'buildingMaintenance',
      buyTable: 'getBuyTable',
      calcRevRatio: 'calcRevRatio',
      calcTotalRevenue: 'calcTotalRevenue',
      calculateIncome: 'calculateIncome',
      calculateRevenue: 'calculateRevenue',
      expenses: 'expenses',
      exportLimit: 'exportLimit',
      getPop: 'getPop',
      grossRevenue: 'grossRevenue',
      headTax: 'headTax',
      improvementRevenue: 'improvementRevenue',
      incomeTax: 'incomeTax',
      neededStaff: 'neededStaff',
      privateLaborers: 'privateLaborers',
      propertyTax: 'propertyTax',
      resourceCost: 'resourceCost',
      resourceRevenue: 'resourceRevenue',
      sellTable: 'getSellTable',
      staffBeds: 'staffBeds',
      staffSummary: 'staffSummary',
      stronghold: "stronghold",
      taxRevenue: 'taxRevenue',
      totalEmployees: 'totalEmployees',
      totalPrivateEmployed: 'totalPrivateEmployed',
      totalSalary: 'totalSalary',
      totalStorage: 'totalStorage',
      unemploymentRate: 'unemploymentRate',
      unrest: 'unrest',
      usedStorage: 'usedStorage'
    }),
    reverseTransactions () {
      return this.stronghold.transactionrecord.slice().reverse();
    },
    sanctuaryAnimals () {
      return this.stronghold.animals.filter((a) => {
        return a.livesat === "animal-sanctuary";
      }).sort();
    },
    stableAnimals () {
      return this.stronghold.animals.filter((a) => {
        return a.livesat === "stable";
      }).sort();
    },
    ayrieAnimals () {
      return this.stronghold.animals.filter((a) => {
        return a.livesat === "ayrie";
      }).sort();
    },
    currentExportWeight () {
      // first subtract local consumption, we let it go negative because our population will import food if they have to.
      // general stores sell to the local populace, but don't directly import goods
      let generalstores = this.stronghold.improvements.filter((a) => {
        return a.id === 'general-store';
      })[0];
      let genstoresrev = { food: 0, alcohol: 0, cloth: 0, leather: 0, steel: 0 };
      if (generalstores) {
        genstoresrev = this.calculateRevenue(generalstores);
      }
      let food = Number(this.stronghold.autoSell.food) + Number(this.getPop) + genstoresrev.food;
      let alcohol = Number(this.stronghold.autoSell.alcohol) + Number(this.getPop) / 6 + genstoresrev.alcohol;
      let steel = Number(this.stronghold.autoSell.steel) + Number(this.getPop) / 20 + genstoresrev.steel;
      let cloth = Number(this.stronghold.autoSell.cloth) + Number(this.getPop) / 20 + genstoresrev.cloth;
      let leather = Number(this.stronghold.autoSell.leather) + Number(this.getPop) / 200 + genstoresrev.leather;
      let timber = Number(this.stronghold.autoSell.timber) + Number(this.getPop) / 3;
      let total = this.stronghold.laws.todaysExports + Math.abs(food);
      total += Math.abs(steel);
      total += Math.abs(Number(this.stronghold.autoSell.iron));
      total += Math.abs(alcohol);
      total += Math.abs(Number(this.stronghold.autoSell.coal));
      total += Math.abs(Number(this.stronghold.autoSell.arcanum));
      total += Math.abs(Number(this.stronghold.autoSell.wool));
      total += Math.abs(leather * 20);
      total += Math.abs(timber * 16);
      total += Math.abs(Number(this.stronghold.autoSell.lumber) * 16);
      total += Math.abs(cloth / 2);
      total += Math.abs(Number(this.stronghold.autoSell.stone) * 1000);
      return Math.round(total);
    }
  },
  data () {
    return {
      resourceChange: {
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
      changeby: 0,
      record: "",
      showTransactionRecord: false,
      newanimal: { name: "", livesat: "stables", species: "", foodcost: 0 }
    };
  },
  methods: {
    ...mapActions({
      getImprovements: 'getAllImprovements',
      newStronghold: 'newStronghold',
      getStrongholds: 'getAllStrongholds',
      loadStronghold: 'loadStronghold',
      loadStrongholdById: 'loadStrongholdById',
      saveStronghold: 'saveStronghold',
      saveNewStronghold: 'saveNewStronghold',
      deleteStronghold: 'deleteStronghold',
      addToTreasury: 'addToTreasury',
      buyResource: 'buyResource'
    }),
    sellResource (type, amount) {
      let checkWeight = this.stronghold.laws.todaysExports + Number(amount) * this.unitWeightMod[type];
      this.stronghold.resources[type] -= Number(amount);
      this.stronghold.laws.todaysExports = checkWeight;
      this.addToTreasury({ changeby: Number(amount) * this.sellTable[type], record: "Sell " + amount + " " + type });
    },
    addAnimal () {
      this.stronghold.animals.push({ id: Date.now() + Math.random(), ...this.newanimal });
      this.newanimal = { name: "", livesat: "stables", species: "", foodcost: 0 };
    },
    removeAnimal (animal) {
      this.stronghold.animals.splice(this.stronghold.animals.indexOf(animal), 1);
    },
    addResource (res, amount) {
      this.stronghold.resources[res] += Number(amount);
    },
    addMerchant () {
      this.stronghold.merchants.push({
        id: Date.now() + Math.random(),
        name: "",
        carryweight: 0
      });
    },
    deleteMerchant (merchant) {
      this.stronghold.merchants.splice(this.stronghold.merchants.indexOf(merchant), 1);
    }
  },
  created () {
    this.getImprovements();
    this.getStrongholds();
  }
};
