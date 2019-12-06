import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      character: "getCharacter",
      getHPTotal: "getHPTotal"
    })
  },
  methods: {
    ...mapActions({
      shortrest: "shortrest",
      longrest: "longrest"
    })
  }
};
