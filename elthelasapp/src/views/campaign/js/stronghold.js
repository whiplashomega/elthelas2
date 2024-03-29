import improvements from "@/components/strongholdbuilder/improvements.vue";
import staff from "@/components/strongholdbuilder/staff.vue";
import summary from "@/components/strongholdbuilder/strongholdSummary.vue";
import generalInformation from "@/components/strongholdbuilder/generalinformation.vue";
import { useStrongholdStore } from "@/stores/index";
import { storeToRefs } from "pinia";
import { useMeta } from "vue-meta";

export default {
  components: {
    improvements: improvements,
    staff: staff,
    strongholdSummary: summary,
    generalInformation: generalInformation,
  },
  setup() {
    const strongholdStore = useStrongholdStore();
    const {
      bankRevenue,
      buildingMaintenance,
      getBuyTable: buyTable,
      calcRevRatio,
      calcTotalRevenue,
      calculateIncome,
      calculateRevenue,
      calcGrossRevenue,
      expenses,
      getPop,
      grossRevenue,
      headTax,
      improvementRevenue,
      incomeTax,
      neededStaff,
      privateLaborers,
      propertyTax,
      rents,
      resourceCost,
      resourceRevenue,
      sellTable,
      staffBeds,
      staffTypes,
      staffSummary,
      stronghold,
      taxRevenue,
      taxEfficiency,
      totalEmployees,
      totalPrivateEmployed,
      totalSalary,
      totalStorage,
      unemploymentRate,
      unrest,
      getPopNeeds: popNeeds,
      getPrivateProduction: privateProduced,
      usedStorage,
      vassalTax,
    } = storeToRefs(strongholdStore);

    const {
      getAllImprovements,
      newStronghold,
      getAllStrongholds,
      loadStronghold,
      loadStrongholdById,
      saveStronghold,
      saveNewStronghold,
      deleteStronghold,
      addToTreasury,
      buyResource,
    } = strongholdStore;

    getAllImprovements();
    getAllStrongholds();
    useMeta({ title: "Stronghold Builder" });
    return {
      bankRevenue,
      buildingMaintenance,
      buyTable,
      calcRevRatio,
      calcTotalRevenue,
      calculateIncome,
      calculateRevenue,
      calcGrossRevenue,
      expenses,
      getPop,
      grossRevenue,
      headTax,
      improvementRevenue,
      incomeTax,
      neededStaff,
      privateLaborers,
      propertyTax,
      rents,
      resourceCost,
      resourceRevenue,
      sellTable,
      staffBeds,
      staffTypes,
      staffSummary,
      stronghold,
      taxRevenue,
      taxEfficiency,
      totalEmployees,
      totalPrivateEmployed,
      totalSalary,
      totalStorage,
      unemploymentRate,
      unrest,
      popNeeds,
      privateProduced,
      usedStorage,
      vassalTax,

      getAllImprovements,
      newStronghold,
      getAllStrongholds,
      loadStronghold,
      loadStrongholdById,
      saveStronghold,
      saveNewStronghold,
      deleteStronghold,
      addToTreasury,
      buyResource,
    };
  },
  computed: {
    reverseTransactions() {
      return this.stronghold.transactionrecord.slice().reverse();
    },
    sanctuaryAnimals() {
      return this.stronghold.animals
        .filter((a) => {
          return a.livesat === "animal-sanctuary";
        })
        .sort();
    },
    stableAnimals() {
      return this.stronghold.animals
        .filter((a) => {
          return a.livesat === "stable";
        })
        .sort();
    },
    ayrieAnimals() {
      return this.stronghold.animals
        .filter((a) => {
          return a.livesat === "ayrie";
        })
        .sort();
    },
    homelessAnimals() {
      return this.stronghold.animals
        .filter((a) => {
          return a.livesat === "homeless";
        })
        .sort();
    },
  },
  data() {
    return {
      resourceChange: {
        alcohol: 0,
        arcanum: 0,
        brick: 0,
        clay: 0,
        cloth: 0,
        coal: 0,
        coffee: 0,
        consumergoods: 0,
        cotton: 0,
        food: 0,
        furniture: 0,
        horses: 0,
        iron: 0,
        leather: 0,
        lumber: 0,
        paper: 0,
        pottery: 0,
        raremetal: 0,
        steel: 0,
        stone: 0,
        sugar: 0,
        timber: 0,
        wool: 0,
      },
      changeby: 0,
      record: "",
      showTransactionRecord: false,
      newanimal: { name: "", livesat: "stables", species: "", foodcost: 0 },
    };
  },
  methods: {
    deletePrivateEnterprise(improvement) {
      let match = this.stronghold.privateEnterprise.filter((a) => {
        return a.id === improvement.id;
      })[0];
      if (match && match.count > 1) {
        match.count--;
      } else {
        improvement.count--;
        this.stronghold.privateEnterprise.splice(
          this.stronghold.privateEnterprise.indexOf(improvement),
          1
        );
      }
      improvement.staff.forEach((st) => {
        this.stronghold.privateEmployees.splice(
          this.stronghold.privateEmployees.findIndex((a) => {
            return a.name === st.name;
          }),
          1
        );
      });
    },
    sellResource(type, amount) {
      let checkWeight =
        this.stronghold.laws.todaysExports +
        Number(amount) * this.unitWeightMod[type];
      this.stronghold.resources[type] -= Number(amount);
      this.stronghold.laws.todaysExports = checkWeight;
      this.addToTreasury({
        changeby: Number(amount) * this.sellTable[type],
        record: "Sell " + amount + " " + type,
      });
    },
    addAnimal() {
      this.stronghold.animals.push({
        id: Date.now() + Math.random(),
        ...this.newanimal,
      });
      this.newanimal = {
        name: "",
        livesat: "stables",
        species: "",
        foodcost: 0,
      };
    },
    removeAnimal(animal) {
      this.stronghold.animals.splice(
        this.stronghold.animals.indexOf(animal),
        1
      );
    },
    addResource(res, amount) {
      this.stronghold.resources[res] += Number(amount);
    },
    addVassal() {
      if (!Array.isArray(this.stronghold.vassals)) {
        this.stronghold.vassals = [];
      }
      this.stronghold.vassals.push({
        id: Date.now() + Math.random(),
        name: "",
        income: 0,
      });
    },
  },
};
