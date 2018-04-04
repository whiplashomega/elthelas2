import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      feats: 'allFeats'
    }),
    featsort() {
      function ftsrt (a, b) {
        if(a.name > b.name) {
          return 1;
        } else if(a.name < b.name) {
          return -1;
        }
        return 0;
      }
      return this.feats.sort(ftsrt);
    }
  },
  data: function () {
    return {};
  },
  methods: {}
};