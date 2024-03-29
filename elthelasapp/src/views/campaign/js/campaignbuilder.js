import { useCampaignStore, useUserStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
import notes from '@/components/campaignbuilder/notes.vue';
import pcmanager from '@/components/campaignbuilder/pcmanager.vue';
import npcmanager from '@/components/campaignbuilder/npcmanager.vue';
import modal from '@/components/global/modal.vue';
import runner from '@/views/campaign/runner.vue';
import { useMeta } from 'vue-meta';
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
  setup () {
    const campaigns = useCampaignStore();
    const userinfo = useUserStore();
    
    const { campaigns: allCampaigns, current: campaign, currentChapter: chapter, campaignCharacters: pcs } = storeToRefs(campaigns);
    const { getUserInfo: token, isLoggedIn: loggedin } = userinfo;
    
    const { getAllCampaigns: getAll, getAllCampaignsSilent: getAllSilent, saveNewCampaign: saveNew, saveCampaign: save, loadCampaign: load, loadCampaignById: loadById, loadCampaignByUrl: loadByUrl, deleteCampaign: deleteCamp, newCampaign: newCamp } = campaigns;
    let buildmode = campaign.buildmode;
    useMeta({ title: "Campaign Builder" });
    return {
      campaigns, userinfo, allCampaigns, campaign, chapter, pcs, token, loggedin, buildmode,
      
      getAll, getAllSilent, saveNew, save, load, loadById, loadByUrl, deleteCamp, newCamp
    };
  },
  components: {
    notes,
    pcmanager,
    npcmanager,
    runner,
    modal
  },
  data: function () {
    return {
      comp: this,
      showChapters: true,
      creArray: [],
      charArray: [],
      runnerKey: 0,
      activeTab: 0,
      modalProps: { isActive: false }
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
    loadEncounter(link) {
      this.creArray = link.substr(link.search("runner/") + 7).split("&");
      this.charArray = this.pcs;
      this.runnerKey++;
      this.activeTab = 3;
      window.scroll(1, 300);
    },
    showLoadModal() {
      this.modalProps.isActive = true;
    }
  },
  created () {
    this.getAllSilent().then(() => {
      if (this.$route.params.campaign) {
        this.loadByUrl({ url: this.$route.params.campaign });
      }
    });
  }
};
