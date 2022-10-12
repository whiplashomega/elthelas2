import { useMeta } from 'vue-meta';

export default {
  setup() {
    useMeta({ title: "Divine Domains" });
  },
  data () {
    return {
      shownDomain: "water"
    };
  },
  methods: {
    changeDomain(domain) {
      this.shownDomain = domain;
    }
  }
};
