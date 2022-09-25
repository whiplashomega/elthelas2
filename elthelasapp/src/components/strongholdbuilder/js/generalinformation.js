import { useStrongholdStore, useUserStore } from '@/stores/index';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const strongholdStore = useStrongholdStore();
    const { availableClearedLand, availableForestedLand, availableStaffBeds,
            farmLand, forestedLand, getPop, getInvalid, getChildren, getEmployable,
            privateEmployees, privateLaborers, staffBeds, stronghold, timberLand,
            totalLand, totalEmployees, unemploymentRate, unrest, urbanLand
    } = storeToRefs(strongholdStore);
    const userStore = useUserStore();
    const { getUserInfo: userinfo } = userStore; 
    return {
      availableClearedLand, availableForestedLand, availableStaffBeds, farmLand,
      forestedLand, getPop, getInvalid, getChildren, getEmployable, privateEmployees,
      privateLaborers, staffBeds, stronghold, timberLand, totalLand, totalEmployees,
      unemploymentRate, unrest, urbanLand, userinfo
    };
  }
};
