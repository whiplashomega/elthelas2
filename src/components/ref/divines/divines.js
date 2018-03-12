import { mapGetters } from 'vuex';
import marked from 'marked';

export default {
  computed: mapGetters({
     divines: "allDivines" 
  }),
  data () {
    return {
      divineFilter: "",
      types: [
        "Alien",
        "Angel",
        "Fey",
        "Fiend"
      ],
      filteredDivines: []
    };
  },
  methods: {
    filterDivines: function() {
      this.filteredDivines = this.divines.filter((d) => {
        console.log(d.type);
        console.log(this.divineFilter);
        return d.type === this.divineFilter;
      });
    }
  },
  created () {
    this.$store.dispatch('getAllDivines').then(() => {
      this.filteredDivines = this.divines;
    });
  }
};