import { mapActions, mapGetters } from 'vuex';
import droll from 'droll';
import charCalculators from '@/helpers/charcalc';

export default {
  components: {},
  computed: {
    ...mapGetters({
      campaign: "getCurrentCampaign",
      pcs: 'getCampaignCharacters'
    })
  },
  data: function () {
    return {
      pcid: ""
    };
  },
  methods: {
    ...mapActions({
      invitePC: "invitePCToCampaign",
      fetchCampaignCharacter: "fetchCampaignCharacter"
    }),
    addToCampaign() {
      this.campaign.playercharacters.push(this.pcid);
      this.fetchCampaignCharacter(this.pcid);
      this.pcid = "";
    },
    ...charCalculators,
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
