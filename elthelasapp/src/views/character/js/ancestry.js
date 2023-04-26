import { useStaticsStorev2 } from '@/stores/index';
import { marked } from '@/../node_modules/marked/lib/marked.esm.js';
import { useMeta } from 'vue-meta';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const statics = useStaticsStorev2();
    statics.getAllAncestries();
    const { ancestries } = storeToRefs(statics);

    useMeta({ title: "Character Ancestries" });
    return {
      statics,
      ancestries,
      marked
    };
  },
  computed: {
    hw () {
      let hw = [];
      for (var x = 0; x < this.ancestries.length; x++) {
        for (var y = 0; y < this.ancestries[x].subraces.length; y++) {
          var name = this.ancestries[x].subraces[y].name;
          if (name === "default" || name === "") {
            name = this.ancestries[x].name;
          }
          var hwi = { ...this.ancestries[x].subraces[y] };
          hwi.name = name;
          hw.push(hwi);
        }
      }
      return hw;
    },
    ages () {
      let ages = [];
      for (var x = 0; x < this.ancestries.length; x++) {
        this.ancestries[x].agepoints.name = this.ancestries[x].name;
        ages.push(this.ancestries[x].agepoints);
      }
      return ages;
    },
    filterhw () {
      return this.hw.filter((a) => {
        if (this.hwFilter !== "") {
          return a.name.toLowerCase().includes(this.hwFilter.toLowerCase());
        }
        return true;
      }).sort((a, b) => {
        if (this.hwSortDesc) {
          if (a[this.hwSortBy] < b[this.hwSortBy]) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (a[this.hwSortBy] > b[this.hwSortBy]) {
            return 1;
          } else {
            return -1;
          }
        }
      });

    },
    filterage () {
      return this.ages.filter((a) => {
        if (this.ageFilter !== "") {
          return a.name.toLowerCase().includes(this.ageFilter.toLowerCase());
        }
        return true;
      }).sort((a, b) => {
        if (this.ageSortDesc) {
          if (a[this.ageSortBy] < b[this.ageSortBy]) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (a[this.ageSortBy] > b[this.ageSortBy]) {
            return 1;
          } else {
            return -1;
          }
        }
      });
    }
  },
  data () {
    return {
      currentRace: {},
      ageFields: [
        { key: "name", sortable: true, name: "Name" },
        { key: "puberty", sortable: true, name: "Puberty" },
        { key: "sexualmaturity", sortable: true, name: "Sexual Maturity" },
        { key: "mentalmaturity", sortable: true, name: "Mental Maturity" },
        { key: "middleage", sortable: true, name: "Middle Age" },
        { key: "oldage", sortable: true, name: "Old Age" },
        { key: "averagelifespan", sortable: true, name: "Average Lifespan" },
        { key: "maxage", sortable: true, name: "Max Age" }
      ],
      ageSortBy: "name",
      ageSortDesc: false,
      ageCurrentPage: 1,
      agePerPage: 10,
      ageFilter: "",
      hwFields: [
        { key: "name", sortable: true, name: "Name" },
        { key: "averageheight", sortable: true, name: "Average Height" },
        { key: "baseheight", sortable: true, name: "Base Height" },
        { key: "heightroll", sortable: true, name: "Height Roll" },
        { key: "averageweight", sortable: true, name: "Average Weight" },
        { key: "baseweight", sortable: true, name: "Base Weight" },
        { key: "weightroll", sortable: true, name: "Weight Roll" }
      ],
      hwSortBy: "name",
      hwSortDesc: false,
      hwCurrentPage: 1,
      hwPerPage: 10,
      hwFilter: ""
    };
  },
  methods: {
    loadRace(id) {
      this.currentRace = this.ancestries.filter((a) => {
        return a.id === id;
      })[0];
    },
    changeHWSort(field) {
      if (this.hwSortBy === field.key) {
        this.hwSortDesc = !this.hwSortDesc;
      } else {
        this.hwSortBy = field.key;
      }
    },
    changeAgeSort(field) {
      if (this.ageSortBy === field.key) {
        this.ageSortDesc = !this.ageSortDesc;
      } else {
        this.ageSortBy = field.key;
      }
    }
  }
};
