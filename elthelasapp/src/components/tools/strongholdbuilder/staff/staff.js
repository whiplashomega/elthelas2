import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      guardsNeeded: "guardsNeeded",
      totalSalary: 'totalSalary',
      stronghold: 'stronghold',
      servantsNeeded: 'servantsNeeded',
      laborersNeeded: 'laborersNeeded',
      staffSummary: 'staffSummary',
      maxLaborers: 'maxLaborers',
      availableStaffBeds: 'availableStaffBeds',
      unmetStaffNeed: 'unmetStaffNeed',
      staffTypes: 'staffTypes'
    }),
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
