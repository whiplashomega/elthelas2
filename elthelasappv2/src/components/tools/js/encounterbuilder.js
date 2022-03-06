import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      all: "getEncounters",
      current: "getCurrentEncounter"
    })
  },
  data () {
    return {

    };
  },
  methods: {
    ...mapActions({
      getAll: "getAllEncounters",
      saveNew: "saveNewEncounter",
      save: "saveEncounter",
      reset: "resetEncounter",
      load: "loadEncounter",
      deleteEncounter: "deleteEncounter"
    })
  },
  created () {
    this.getAll();
  }
};
