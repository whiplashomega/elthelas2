import { mapGetters, mapActions } from 'vuex';

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
  },
  methods: {
    ...mapActions({
      getAll: "getAllEncounters"
    })
  },
  created () {
    this.getAll();
  }
};
