import { mapGetters, mapActions } from 'vuex';
import characterheader from '@/components/tools/characterbuilder/characterheader';
import abilityscores from '@/components/tools/characterbuilder/abilityscores';
import initiative from '@/components/tools/characterbuilder/initiative';
import appearance from '@/components/tools/characterbuilder/appearance';
import hitpoints from '@/components/tools/characterbuilder/hitpoints';
import buildclass from '@/components/tools/characterbuilder/buildclass';
import skills from '@/components/tools/characterbuilder/skills';
import combat from '@/components/tools/characterbuilder/combat';
import equipment from '@/components/tools/characterbuilder/equipment';
import loadsave from '@/components/tools/characterbuilder/loadsave';
import attacks from '@/components/tools/characterbuilder/attacks';
import features from '@/components/tools/characterbuilder/features';
import spells from '@/components/tools/characterbuilder/spells';
import bonus from '@/components/tools/characterbuilder/bonus';
import resources from '@/components/tools/characterbuilder/resources';
import fluff from '@/components/tools/characterbuilder/fluff';
import createcreature from '@/components/tools/characterbuilder/createcreature';
import campaigninfo from '@/components/tools/characterbuilder/campaigninfo';
// import test from '@/tests/unit/charbuilder.test.js';

export default {
  components: {
    characterheader,
    abilityscores,
    initiative,
    appearance,
    hitpoints,
    buildclass,
    skills,
    combat,
    equipment,
    loadsave,
    attacks,
    features,
    spells,
    bonus,
    resources,
    fluff,
    createcreature,
    campaigninfo
  },
  computed: {
    ...mapGetters({
      mobile: 'isMobile',
      character: 'getCharacter',
      pointbuy: "pointbuy",
      statRolls: "getStatRolls"
    })
  },
  data () {
    return {
      buildHide: false,
      hideleft: false
    };
  },
  filters: {
    date (value) {
      var date = new Date(value);
      return date.toLocaleString();
    }
  },
  methods: {
    ...mapActions({
      rollStats: "rollStats"
    }),
    log(val) {
      console.log(val);
    }
  }
};
