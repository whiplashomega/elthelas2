import { useStaticsStore } from '@/stores/index';
import { marked } from '@/../node_modules/marked/lib/marked.esm.js';

export default {
  setup () {
    const statics = useStaticsStore();
    
    return {
      statics,
      marked
    }
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
      return this.statics.feats.sort(ftsrt);
    }
  },
};
