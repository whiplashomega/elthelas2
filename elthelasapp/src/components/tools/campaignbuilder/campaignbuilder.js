import { mapGetters, mapActions } from 'vuex';
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
      newCamp: 'newCampaign',
      addChapter: 'addChapter',
      addEncounter: 'addEncounterToChapter',
      loadChapter: 'loadChapter',
      moveEnUp: 'moveEncounterUp',
      moveEnDown: 'moveEncounterDown',
      moveChUp: 'moveChapterUp',
      moveChDown: 'moveChapterDown',
      deleteEncounter: 'deleteCampaignEncounter',
      deleteChapter: 'deleteChapter'
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
