import { useStrongholdStore, useUserStore } from '@/stores/index';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const strongholdStore = useStrongholdStore();
    const userStore = useUserStore();
    
    const { guardsNeeded, totalSalary, getPop, stronghold, servantsNeeded,
            laborersNeeded, staffSummary, maxLaborers, availableStaffBeds,
            unmetStaffNeed, staffTypes, totalHousing } = storeToRefs(strongholdStore);
            
    const { getUserInfo: userinfo } = userStore;
    
    return {
      guardsNeeded, totalSalary, getPop, stronghold, servantsNeeded, laborersNeeded,
      staffSummary, maxLaborers, availableStaffBeds, unmetStaffNeed, staffTypes,
      totalHousing, userinfo
    };
  },
  computed: {
    staffList () {
      return [ ...this.stronghold.staff ].sort((a, b) => {
        if (this.staffSort === 'job') {
          if (a.job.name > b.job.name) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (a[this.staffSort] > b[this.staffSort]) {
            return 1;
          } else {
            return -1;
          }
        }
      });
    }
  },
  data () {
    return {
      newstaff: {
        name: "",
        job: { name: "", typicalSalary: 0, bonus: "", subtype: "" },
        salary: 0
      },
      staffSort: "name"
    };
  },
  methods: {
    addStaff () {
      this.stronghold.staff.push({ id: Date.now(), ...this.newstaff, job: { ...this.newstaff.job } });
      this.newstaff = { name: "", job: { name: "", typicalSalary: 0, bonus: "" }, salary: 0 };
    },
    fireStaff (staff) {
      this.stronghold.staff.splice(this.stronghold.staff.indexOf(staff), 1);
    }
  }
};
