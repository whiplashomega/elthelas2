import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      character: "getCharacter",
      races: 'builderRaces',
      classtext: 'classtext',
      nations: 'allNationNames',
      cities: 'allCityNames',
      factions: 'allOrganizations',
      backgrounds: 'allBackgrounds',
      mobile: 'isMobile'
    })
  },
  methods: {
    ...mapActions({
      setRaceDefaults: "setRaceDefaults"
    })
  }
};
