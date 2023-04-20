import { useNPCStore } from '@/stores/index';
import { marked } from '@/../node_modules/marked/lib/marked.esm.js';
import { useMeta } from 'vue-meta';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    useMeta({ title: "NPCs of Elthelas" });
    const npcStore = useNPCStore();
    npcStore.getAllNPCs();
    const { npcs } = storeToRefs(npcStore);

    return {
      npcs, marked, npcStore
    };
  },
  methods: {
    npc () {
      return {
        name: "",
        born: "",
        died: "",
        lastlocation: "",
        history: "",
        motivations: "",
        charid: "",
        player: "",
        campaigns: [],
        home: "",
        dmonly: false,
        job: "",
        knownassociates: "",
        edit: true
      };
    },
    addNPC () {
      this.npcs.push(this.npc());
    },
    addCampaign(npc) {
      npc.campaigns.push({ id: Math.random(), name: "" });
    },
    removeCampaign(npc, campaign) {
      npc.campaigns.splice(npc.campaigns.indexOf(campaign), 1);
    },
    save (npc) {
      npc.edit = false;
      if (npc._id) {
        this.npcStore.saveUpdate(npc);
      } else {
        this.npcStore.saveNew(npc);
      }
    },
    deleteNPC (npc) {
      if (window.confirm("Are you sure you want to delete this NPC? It cannot be recovered.")) {
        if (npc._id) {
          this.npcStore.deleteNPC(npc);
        } else {
          this.npcs.splice(this.npcs.indexOf(npc), 1);
        }
      }
    }
  }
};