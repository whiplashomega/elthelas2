import { useStaticsStorev2 } from '@/stores/index';
import { storeToRefs } from 'pinia';
import { marked } from '@/../node_modules/marked/lib/marked.esm.js';
import { useMeta } from 'vue-meta';
export default {
  setup () {
    const statics = useStaticsStorev2();
    const { organizationsv2: organizations } = storeToRefs(statics);
    useMeta({ title: "Multinational Organizations" });

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
    this.statics.getAllOrganizationsv2().then(() => {
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
