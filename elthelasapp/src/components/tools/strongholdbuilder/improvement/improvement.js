import { mapGetters } from 'vuex';

export default {
  props: [ "improvement", "stronghold" ],
  computed: {
    ...mapGetters({
      forestedLand: "forestedLand"
    })
  },
  data () {
    return {};
  },
  methods: {
    removeImprovement (improvement) {
      if (improvement.removeNum) {
        improvement.count -= improvement.removeNum;
        if (improvement.count === 0) {
          this.stronghold.improvements.splice(this.stronghold.improvements.indexOf(improvement), 1);
        }
      }
    }
  }
};
