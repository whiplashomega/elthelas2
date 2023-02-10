import { useCharacterv2Store, useStaticsStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
export default {
  setup () {
    const characters = useCharacterv2Store();
    const statics = useStaticsStore();
    const { character } = storeToRefs(characters);
    const { allNationNames: nations, allCityNames: cities, organizationsv2: factions } = storeToRefs(statics);
    return {
      character, nations, cities, factions
    };
  },
  methods: {
    textareaResize() {
      this.$refs.allies.style.minHeight = Math.max(this.$refs.allies.scrollHeight, 150) + 'px';
      this.$refs.family.style.minHeight = Math.max(this.$refs.family.scrollHeight, 150) + 'px';
      this.$refs.backstory.style.minHeight = Math.max(this.$refs.backstory.scrollHeight, 150) + 'px';
      this.$refs.bond.style.minHeight = Math.max(this.$refs.bond.scrollHeight, 150) + 'px';
      this.$refs.personality.style.minHeight = Math.max(this.$refs.personality.scrollHeight, 150) + 'px';
      this.$refs.notes.style.minHeight = Math.max(this.$refs.notes.scrollHeight, 150) + 'px';
    },
    addFaction () {
      this.character.faction.push({ id: Math.random(), faction: {}, rank: { name: "Unaffiliated" }, disposition: 0 });
    },
    removeFaction (i) {
      this.character.faction.splice(i, 1);
    }
  },
  updated () {
    this.textareaResize();
  },
  mounted () {
    this.textareaResize();
  }
};
