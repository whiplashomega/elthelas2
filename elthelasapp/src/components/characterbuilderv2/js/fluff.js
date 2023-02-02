import { useCharacterv2Store } from '@/stores/index';
import { storeToRefs } from 'pinia';
export default {
  setup () {
    const characters = useCharacterv2Store();
    const { character } = storeToRefs(characters);
    
    return {
      character
    };
  },
  methods: {
    textareaResize() {
      this.$refs.allies.style.minHeight = this.$refs.allies.scrollHeight + 'px';
      this.$refs.family.style.minHeight = this.$refs.family.scrollHeight + 'px';
      this.$refs.backstory.style.minHeight = this.$refs.backstory.scrollHeight + 'px';
      this.$refs.bond.style.minHeight = this.$refs.bond.scrollHeight + 'px';
      this.$refs.personality.style.minHeight = this.$refs.personality.scrollHeight + 'px';
      this.$refs.notes.style.minHeight = this.$refs.notes.scrollHeight + 'px';
    }
  },
  updated () {
    this.textareaResize();
  }
};
