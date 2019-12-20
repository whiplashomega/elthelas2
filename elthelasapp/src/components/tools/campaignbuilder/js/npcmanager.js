import { mapGetters } from 'vuex';

export default {
  props: { buildmode: Boolean },
  computed: {
    ...mapGetters({
      campaign: "getCurrentCampaign"
    }),
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
    deleteNPC (npc) {
      let i = this.campaign.npcs.findIndex((a) => {
        return a.id === npc.id;
      });
      this.campaign.npcs.splice(i, 1);
    }
  }
};
