import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      character: "getCharacter"
    })
  },
  data: function () {
    return {
      cr: 0,
      creatureText: "",
      creatureTextModal: false
    };
  }
};
