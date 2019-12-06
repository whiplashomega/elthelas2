import { mapGetters, mapActions } from 'vuex';
import notes from '@/components/tools/campaignbuilder/notes';
import pcmanager from '@/components/tools/campaignbuilder/pcmanager';
/* Campaign Object Structure
{
    title: String,
    chapters: [
      {
        title: String,
        encounters: [Encounter]
      }
    ],
    playercharacters: [Character],
    url: String
  };
*/

export default {
  computed: {
    ...mapGetters({
      allCampaigns: 'getCampaigns',
      campaign: 'getCurrentCampaign',
      chapter: 'getCurrentChapter',
      token: 'getUserInfo',
      loggedin: "isLoggedIn"
    })
  },
  components: {
    notes,
    pcmanager
  },
  data: function () {
    return {
      buildmode: false,
      comp: this,
      showChapters: true
    };
  },
  watch: {
    campaign: {
      handler () {
        if (this.campaign._id && this.loggedin) {
          this.save();
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions({
      getAll: 'getAllCampaigns',
      getAllSilent: 'getAllCampaignsSilent',
      saveNew: 'saveNewCampaign',
      save: 'saveCampaign',
      load: 'loadCampaign',
      loadById: 'loadCampaignById',
      loadByUrl: 'loadCampaignByUrl',
      deleteCamp: 'deleteCampaign',
      newCamp: 'newCampaign'
    })
  },
  created () {
    this.getAllSilent().then(() => {
      if (this.$route.params.url) {
        this.loadByUrl({ url: this.$route.params.url });
      }
    });
  }
};
