import { useStaticsStore } from '@/stores/index';
import { marked } from '@/../node_modules/marked/lib/marked.esm.js';
import { useMeta } from 'vue-meta';

export default {
  setup () {
    const statics = useStaticsStore();
    
    const gods = statics.gods;

    useMeta({ title: "Gods" });
    return {
      gods,
      statics,
      marked
    };
  },
  computed: {
    domains () {
      let domains = [];
      this.gods.forEach((god) => {
        let doms = god.domains5.split(", ");
        doms.forEach((dom) => {
          if (!domains.includes(dom)) {
            domains.push(dom);
          }
        });
      });
      return domains.sort();
    },
    sortGods () {
      return this.gods.sort((a, b) => {
        if ((a[this.sortBy] > b[this.sortBy] & !this.sortDesc) || (a[this.sortBy] < b[this.sortBy] & this.sortDesc)) {
          return 1;
        } else {
          return -1;
        }
      })
    }
  },
  data () {
    return {
      GodByName: { lore: "", level10: "", level1: "", holiday: "", worshippers: "", appearance: "", home: "" },
      alignment: "",
      domain: "",
      SelectedGod: "",
      alignmentGods: [],
      domainGods: [],
      sortBy: "name",
      sortDesc: false
    };
  },
  watch: {
    alignment: function() {
      this.alignmentGods = this.gods.filter((god) => {
        return god.alignment === this.alignment;
      });
    },
    domain: function() {
      this.domainGods = this.gods.filter((god) => {
        var domains = god.domains5.split(", ");
        return domains.includes(this.domain);
      });
    },
    SelectedGod: function(a) {
      this.loadGod(a);
    }
  },
  methods: {
    loadGod (id) {
      this.GodByName = this.gods.filter((god) => {
        return god.id === id;
      })[0];
    }
  },
  created () {
    this.statics.getAllGods().then(() => {
      if (this.$route.params.god) {
        var god = this.$route.params.god;
        this.loadGod(this.gods.filter(function(a) { return (a.id === god || a.name === god); })[0].id);
      }
    });
  }
};
