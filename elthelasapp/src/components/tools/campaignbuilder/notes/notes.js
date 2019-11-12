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
  props: [ 'buildmode' ],
  computed: {
    ...mapGetters({
      campaign: 'getCurrentCampaign',
      chapter: 'getCurrentChapter'
    })
  },
  data: function () {
    return {
      comp: this,
      showChapters: true
    };
  },
  methods: {
    ...mapActions({
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
  }
};
