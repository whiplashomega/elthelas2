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
  props: [ 'buildmode', 'showChapters' ],
  computed: {
    ...mapGetters({
      campaign: 'getCurrentCampaign',
      chapter: 'getCurrentChapter'
    })
  },
  data: function () {
    return {
      comp: this,
      section2: { title: "Please Select a Section", id: 0 }
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
      deleteChapter: 'deleteChapter',
      addSection: "addSection",
      deleteSection: "deleteSection",
      addEncounterToSection: "addEncounterToSection",
      deleteEncounterFromSection: "deleteEncounterFromSection",
      moveEncounterUpInSection: "moveEncounterUpInSection",
      moveEncounterDownInSection: "moveEncounterDownInSection",
      moveEncounterFromSectionToSection: "moveEncounterFromSectionToSection",
      moveEncounterFromChapterToSection: "moveEncounterFromChapterToSection",
      moveSectionUp: "moveSectionUp",
      moveSectionDown: "moveSectionDown"
    }),
    loadEncounter (link) {
      this.$parent.$parent.$parent.loadEncounter(link);
    }
  }
};
