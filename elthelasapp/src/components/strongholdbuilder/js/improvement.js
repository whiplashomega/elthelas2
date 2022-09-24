import { useStrongholdStore, useUserStore } from '@/stores/index';
import { storeToRefs } from 'pinia';

export default {
  props: [ "improvement", "stronghold" ],
  setup () {
    const strongholdStore = useStrongholdStore();
    const userStore = useUserStore();
    
    const { forestedLand, calcRevRatio, calculateIncome, calculateRevenue, guardsNeeded,
            laborersNeeded, servantsNeeded, availableLaborers, availableOfType 
          } = storeToRefs(strongholdStore);
    const { getUserInfo: userinfo } = userStore();
    
    return { forestedLand, calcRevRatio, calculateIncome, calculateRevenue, guardsNeeded,
            laborersNeeded, servantsNeeded, availableLaborers, availableOfType, userinfo
    };
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
