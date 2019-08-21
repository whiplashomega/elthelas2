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
      comp: this
    };
  },
  methods: {
    ...mapActions({
      getAll: 'getAllCampaigns',
      saveNew: 'saveNewCampaign',
      save: 'saveCampaign',
      load: 'loadCampaign',
      loadById: 'loadCampaignById',
      deleteCamp: 'deleteCampaign',
      newCamp: 'newCampaign',
      addChapter: 'addChapter',
      addEncounter: 'addEncounterToChapter',
      loadChapter: 'loadChapter'
    })
  }
};
