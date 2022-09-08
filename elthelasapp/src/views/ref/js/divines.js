import { marked } from '@/../node_modules/marked/lib/marked.esm.js';
import { useStaticsStore } from '@/stores/index';

export default {
  setup () {
    const statics = useStaticsStore();
    const { divines } = statics;
    
    return {
      divines
    };
  },
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
  mounted () {
    this.statics.getAllDivines().then(() => {
      this.filteredDivines = this.divines;
    });
  }
};
