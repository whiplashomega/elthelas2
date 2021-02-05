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
      taxEfficiency: 'taxEfficiency',
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
    }
  },
  created () {
    this.getImprovements();
    this.getStrongholds();
  }
};
