import { useStaticsStore } from '@/stores/index';
import { marked } from '@/../node_modules/marked/lib/marked.esm.js';
import { useMeta } from 'vue-meta';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const statics = useStaticsStore();
    const { featsv2: feats } = storeToRefs(statics);
    useMeta({ title: "Feats" });
    statics.getAllFeatsV2();
    return {
      statics,
      feats,
      marked
    };
  },
  computed: {
    featsort() {
      function ftsrt (a, b) {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        }
        return 0;
      }
      return this.feats.sort(ftsrt);
    }
  }
};
