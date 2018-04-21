import { mapGetters } from 'vuex';

export default {
  computed: mapGetters({
    races: "allRaces"
  }),
  data () {
    return {
      currentRace: {},
      ages: [],
      ageFields: [
        { key: "race", sortable: true },
        { key: "puberty", sortable: true },
        { key: "sexualmaturity", sortable: true },
        { key: "mentalmaturity", sortable: true },
        { key: "middleage", sortable: true },
        { key: "oldage", sortable: true },
        { key: "averagelifespan", sortable: true },
        { key: "maxage", sortable: true }
      ],
      ageSortBy: "race",
      ageSortDesc: false,
      ageCurrentPage: 1,
      agePerPage: 10,
      ageFilter: null,
      hw: [],
      hwFields: [
        { key: "name", sortable: true },
        { key: "averageheight", sortable: true },
        { key: "baseheight", sortable: true },
        { key: "heightroll", sortable: true },
        { key: "averageweight", sortable: true },
        { key: "baseweight", sortable: true },
        { key: "weightroll", sortable: true }
      ],
      hwSortBy: "race",
      hwSortDesc: false,
      hwCurrentPage: 1,
      hwPerPage: 10,
      hwFilter: null
    };
  },
  methods: {
    loadRace(id) {
      this.currentRace = this.races.filter((a) => {
        return a.id === id;
      })[0];
    }
  },
  created () {
    this.$store.dispatch('getAllRaces').then(() => {
      for (var x = 0; x < this.races.length; x++) {
        this.races[x].agepoints.race = this.races[x].name;
        this.ages.push(this.races[x].agepoints);
        for (var y = 0; y < this.races[x].subraces.length; y++) {
          var name = this.races[x].subraces[y].name;
          if (name === "default" || name === "") {
            name = this.races[x].name;
          }
          var hwi = {...this.races[x].subraces[y]};
          hwi.name = name;
          this.hw.push(hwi);
        }
      }
    });
  }
};
