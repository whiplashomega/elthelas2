import { mapGetters, mapActions } from 'vuex';
import notes from '@/components/tools/campaignbuilder/notes';
import pcmanager from '@/components/tools/campaignbuilder/pcmanager';
import npcmanager from '@/components/tools/campaignbuilder/npcmanager';
import runner from '@/components/tools/runner';
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
      loggedin: "isLoggedIn",
      pcs: 'getCampaignCharacters'
    })
  },
  components: {
    notes,
    pcmanager,
    npcmanager,
    runner
  },
  data: function () {
    return {
      buildmode: false,
      comp: this,
      showChapters: true,
      creArray: [],
      charArray: [],
      runnerKey: 0,
      activeTab: 0
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
    }),
    loadEncounter(link) {
      this.creArray = link.substr(link.search("runner/") + 7).split("&");
      this.charArray = this.pcs;
      this.runnerKey++;
      this.activeTab = 3;
    }
  },
  created () {
    this.getAllSilent().then(() => {
      if (this.$route.params.url) {
        this.loadByUrl({ url: this.$route.params.url });
      }
    });
  }
};
