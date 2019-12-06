import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      character: "getCharacter"
    })
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
