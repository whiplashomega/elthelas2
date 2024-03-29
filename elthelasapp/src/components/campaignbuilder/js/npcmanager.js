import { useCampaignStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
import { marked } from '@/../node_modules/marked/lib/marked.esm.js';

export default {
  setup () {
    const campaignStore = useCampaignStore();
    const { current: campaign } = storeToRefs(campaignStore);
    
    return {
      campaign, marked
    };
  },
  props: { buildmode: Boolean },
  computed: {
    availableChapters: function () {
      let c = [];
      this.campaign.chapters.forEach((a) => {
        c.push({
          value: a.title,
          text: a.title
        });
      });
      return c;
    },
    filteredNPCs: function () {
      let npcs = [];
      this.campaign.npcs.forEach((npc) => {
        if (this.filterByChapter === "all") {
          npcs.push(npc);
        } else if (npc.chapters.includes("all")) {
          npcs.push(npc);
        } else if (npc.chapters.includes(this.filterByChapter)) {
          npcs.push(npc);
        }
      });
      return npcs;
    }
  },
  data: function () {
    return {
      filterByChapter: "all"
    };
  },
  methods: {
    newNPC () {
      this.campaign.npcs.push({
        id: Math.random(),
        name: "New NPC",
        editMode: true,
        job: "",
        relation: "",
        link: "",
        skills: "",
        location: "",
        motivations: "",
        history: "",
        chapters: ['all'],
        show: true
      });
    },
    switchEditMode(npc) {
      npc.editMode = !npc.editMode;
    },
    deleteNPC (npc) {
      let i = this.campaign.npcs.findIndex((a) => {
        return a.id === npc.id;
      });
      if (window.confirm("Are you sure you want to delete " + npc.name + "?")) {
        this.campaign.npcs.splice(i, 1);
      }
    }
  }
};
