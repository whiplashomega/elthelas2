import { useMeta } from 'vue-meta';

export default {
  setup () {
    useMeta({ title: "Character Classes" });
  },
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
