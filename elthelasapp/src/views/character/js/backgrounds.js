import { useStaticsStore } from '@/stores/index';

export default {
  setup () {
    const statics = useStaticsStore();
    statics.getAllBackgrounds();
    return {
      statics
    };
  }
};
