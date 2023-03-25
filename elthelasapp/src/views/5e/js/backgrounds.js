import { useStaticsStore } from '@/stores/index';
import { useMeta } from 'vue-meta';

export default {
  setup () {
    const statics = useStaticsStore();
    statics.getAllBackgrounds();
    useMeta({ title: "Backgrounds" });
    return {
      statics
    };
  }
};
