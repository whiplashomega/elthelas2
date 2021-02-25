import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      gods: "allGods"
    }),
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
      return domains.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      });
    }
  },
  data () {
    return {
      GodByName: false,
      alignment: "",
      domain: "",
      SelectedGod: "",
      alignmentGods: [],
      domainGods: []
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
    this.$store.dispatch('getAllGods').then(() => {
      if (this.$route.params.god) {
        var god = this.$route.params.god;
        this.loadGod(this.gods.filter(function(a) { return (a.id === god || a.name === god); })[0].id);
      }
    });
  }
};
