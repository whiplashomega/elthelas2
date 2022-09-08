import { useStaticsStore } from '@/stores/index';
import { marked } from '@/../node_modules/marked/lib/marked.esm.js';

export default {
  setup () {
    const statics = useStaticsStore();
    const { organizations } = statics;
    
    return {
      organizations, marked, statics
    };
  },
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
  mounted () {
    this.statics.getAllOrganizations().then(() => {
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
