import { useStrongholdStore } from '@/stores/index';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const strongholdStore = useStrongholdStore();
    const { availableClearedLand, availableForestedLand, availableStaffBeds,
            farmLand, forestedLand, getPop, getInvalid, getChildren, getEmployable,
            privateEmployees, privateLaborers, staffBeds, stronghold, timberLand,
            totalLand, totalEmployees, unemploymentRate, unrest, urbanLand, userinfo
    } = storeToRefs(strongholdStore);
    
    return {
      availableClearedLand, availableForestedLand, availableStaffBeds, farmLand,
      forestedLand, getPop, getInvalid, getChildren, getEmployable, privateEmployees,
      privateLaborers, staffBeds, stronghold, timberLand, totalLand, totalEmployees,
      unemploymentRate, unrest, urbanLand, userinfo
    };
  }
};
