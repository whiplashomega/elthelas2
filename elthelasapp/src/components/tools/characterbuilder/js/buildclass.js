import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      character: "getCharacter",
      classes: 'allClasses'
    })
  },
  methods: {
    ...mapActions({
      addclass: "addclass",
      removeclass: "removeclass"
    })
  }
};
