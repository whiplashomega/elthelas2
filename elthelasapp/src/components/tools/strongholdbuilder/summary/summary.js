import { mapGetters, mapActions } from 'vuex';

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
      usedStorage: 'usedStorage'
    })
  },
  data () {
    return {
      newmodal: true
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
      this.addToTreasury(this.netRevenue, "daily net revenue");
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
    }
  }
};
