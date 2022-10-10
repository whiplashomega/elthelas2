import { useCampaignStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
import droll from 'droll';
import charCalculators from '@/helpers/charcalc';
import { marked } from '@/../node_modules/marked/lib/marked.esm.js';

export default {
  setup () {
    const campaignStore = useCampaignStore();
    
    const { current: campaign, campaignCharacters: pcs } = storeToRefs(campaignStore);
    const { invitePCToCampaign: invitePC, fetchCampaignCharacter } = campaignStore;
    const { skillMod, statMod, saveMod, statTotal, initMod, acCalc, profbonus, armorAC } = charCalculators;
    return {
      campaign, pcs, invitePC, fetchCampaignCharacter, skillMod, statMod, saveMod, statTotal, initMod, acCalc, armorAC, profbonus, marked
    };
  },
  data: function () {
    return {
      pcid: ""
    };
  },
  methods: {
    addToCampaign() {
      this.campaign.playercharacters.push(this.pcid);
      this.fetchCampaignCharacter(this.pcid);
      this.pcid = "";
    },
    reloadCharacter (pc) {
      let i = this.pcs.findIndex((a) => {
        return a._id === pc._id;
      });
      this.pcs.splice(i, 1);
      this.fetchCampaignCharacter(pc._id);
    },
    //...charCalculators,
    rollCheck (modifier) {
      let res = droll.roll('1d20').total;
      let adv = droll.roll('1d20').total;
      alert("Base Roll: " + (res + modifier) + " (" + res + " + " + modifier + ")\nAdv/Dis Roll: " + (adv + modifier) + " (" + adv + " + " + modifier + ")");
    },
    removeFromCampaign(character) {
      let i = this.campaign.playercharacters.findIndex((a) => {
        return a === character._id;
      });
      this.campaign.playercharacters.splice(i, 1);
      let j = this.pcs.findIndex((b) => {
        return b._id === character._id;
      });
      this.pcs.splice(j, 1);
    }
  }
};
