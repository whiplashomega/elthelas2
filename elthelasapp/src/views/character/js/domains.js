export default {
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
