import { useStaticsStorev2 } from '@/stores/index';
import { useMeta } from 'vue-meta';

export default {
  setup () {
    const statics = useStaticsStorev2();
    statics.getAllBackgroundsv2();
    useMeta({ title: "Backgrounds" });
    return {
      statics
    };
  }
};
