import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      availableClearedLand: 'availableClearedLand',
      availableForestedLand: 'availableForestedLand',
      availableStaffBeds: 'availableStaffBeds',
      farmLand: 'farmLand',
      forestedLand: 'forestedLand',
      getPop: 'getPop',
      privateEmployees: 'privateEmployees',
      privateLaborers: 'privateLaborers',
      staffBeds: 'staffBeds',
      stronghold: 'stronghold',
      timberLand: 'timberLand',
      totalLand: 'totalLand',
      totalEmployees: 'totalEmployees',
      unemploymentRate: 'unemploymentRate',
      unrest: 'unrest',
      urbanLand: 'urbanLand'
    })
  }
};
