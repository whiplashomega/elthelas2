import { useCharacterv2Store, useStaticsStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
export default {
  setup () {
    const characters = useCharacterv2Store();
    const statics = useStaticsStore();
    const { character } = storeToRefs(characters);
    const { allNationNames: nations, allCityNames: cities, organizations: factions } = statics;
    return {
      character, nations, cities, factions
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
    },
    addFaction () {
      this.character.faction.push({ id: Math.random(), faction: {}, rank: {}, disposition: 0 });
    }
  },
  updated () {
    this.textareaResize();
  }
};
