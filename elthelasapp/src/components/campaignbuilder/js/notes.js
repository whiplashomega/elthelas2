import { useCampaignStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
import { marked } from '@/../node_modules/marked/lib/marked.esm.js';
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
    const campaignStore = useCampaignStore();
    
    const { current: campaign, currentChapter: chapter } = storeToRefs(campaignStore);
    const { addChapter,
            addEncounterToChapter: addEncounter,
            loadChapter,
            moveEncounterUp: moveEnUp,
            moveEncounterDown: moveEnDown,
            moveChapterUp: moveChUp,
            moveChapterDown: moveChDown,
            deleteEncounter: deleteCampaignEncounter,
            deleteChapter,
            addSection,
            deleteSection,
            addEncounterToSection,
            deleteEncounterFromSection,
            moveEncounterUpInSection,
            moveEncounterDownInSection,
            moveEncounterFromSectionToSection,
            moveEncounterFromChapterToSection,
            moveSectionUp,
            moveSectionDown
    } = campaignStore;
    useMeta({ title: "Campaign Notes" });
    return {
      campaign, chapter, addChapter, addEncounter, loadChapter, moveEnUp, moveEnDown, moveChUp, moveChDown, deleteCampaignEncounter, deleteChapter, addSection, deleteSection, addEncounterToSection, deleteEncounterFromSection,
      moveEncounterUpInSection, moveEncounterDownInSection, moveEncounterFromSectionToSection, moveEncounterFromChapterToSection, moveSectionUp, moveSectionDown, marked
    };
  },
  props: [ 'buildmode', 'showChapters' ],
  data: function () {
    return {
      comp: this,
      section2: { title: "Please Select a Section", id: 0 }
    };
  },
  methods: {
    loadEncounter (link) {
      this.$parent.$parent.$parent.loadEncounter(link);
    }
  }
};
