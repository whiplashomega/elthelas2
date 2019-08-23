import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      character: "getCharacter"
    })
  },
  methods: {
    ...mapActions({
      loadimage: "loadImage"
    })
  }
};
