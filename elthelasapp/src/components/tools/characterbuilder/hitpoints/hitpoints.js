import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      character: "getCharacter",
      getHPTotal: "getHPTotal"
    })
  }
};
