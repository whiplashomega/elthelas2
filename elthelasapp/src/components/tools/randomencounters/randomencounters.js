import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      encounters: "getEncounters",
      getRandom: "getRandomEncounters"
    })
  },
  data () {
    return {
      tier: "Any",
      environment: "Any"
    };
  }
};
