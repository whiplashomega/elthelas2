export default {
  props: [ "improvement", "stronghold" ],
  data () {
    return {};
  },
  methods: {
    removeImprovement (improvement) {
      improvement.count = 0;
      this.stronghold.improvements.splice(this.stronghold.improvements.indexOf(improvement), 1);
    }
  }
};
