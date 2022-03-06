import { mapGetters } from 'vuex';

export default {
  props: [ "improvement", "stronghold" ],
  computed: {
    ...mapGetters({
      forestedLand: "forestedLand",
      calcRevRatio: 'calcRevRatio',
      calculateIncome: 'calculateIncome',
      calculateRevenue: 'calculateRevenue',
      guardsNeeded: 'guardsNeeded',
      laborersNeeded: 'laborersNeeded',
      servantsNeeded: 'servantsNeeded',
      availableLaborers: 'availableLaborers',
      availableOfType: 'availableOfType',
      userinfo: "getUserInfo"
    })
  },
  data () {
    return {};
  },
  methods: {
    min (a) {
      return Math.min(...a);
    },
    removeImprovement (improvement) {
      if (improvement.removeNum) {
        improvement.count -= improvement.removeNum;
        if (improvement.count <= 0) {
          this.stronghold.improvements.splice(this.stronghold.improvements.indexOf(improvement), 1);
        }
      } else {
        alert("please select the amount to remove.");
      }
    }
  }
};
