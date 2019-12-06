import { mapGetters } from 'vuex';

export default {
  computed: mapGetters({
    organizations: "allOrganizations"
  }),
  data () {
    return {
      currentOrg: { level1: "", level10: "", tenets: [""], description: "" }
    };
  },
  methods: {
    loadOrg: function(id) {
      this.currentOrg = this.organizations.filter((a) => {
        return a.id === id;
      })[0];
    }
  },
  created () {
    this.$store.dispatch('getAllOrganizations').then(() => {
      if (this.$route.params.org) {
        var org = this.$route.params.org;
        var orgs = this.organizations.filter(function(a) {
          return a.title.toLowerCase().replace(/ /g, '') === org.toLowerCase().replace(/ /g, '');
        });
        if (orgs.length > 0) {
          this.currentOrg = orgs[0];
        }
      }
    });
  }
};
