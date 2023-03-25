import { useStaticsStore } from '@/stores/index';
import { useMeta } from 'vue-meta';

export default {
  setup () {
    const statics = useStaticsStore();
    statics.getAllBackgroundsv2();
    useMeta({ title: "Backgrounds" });
    return {
      statics
    };
  }
};
