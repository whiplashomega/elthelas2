export default {
  data () {
    return {
      shownClass: ""
    };
  },
  mounted () {
    if (this.$route.params.id) {
      this.shownClass = this.$route.params.id.toLowerCase();
    }
  }
};
