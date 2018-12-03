import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      "current": "getCurrentEncounter",
      "all": "getEncounters"
    })
  },
  methods: {
    ...mapActions({
      getAll: "getAllEncounters",
      load: "loadEncounter",
      loadById: "loadEncounterById"
    })
  },
  created () {
    this.getAll().then(() => {
      if (this.$route.params.id) {
        this.loadById({ id: this.$route.params.id });
      }
    });
  }
};
