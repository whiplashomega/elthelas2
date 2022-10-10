// import test from '@/tests/unit/charbuilder.test.js';

import { useStaticsStore, useCharacterStore, useUserStore, useGlobalsStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
import abilityscores from '@/components/characterbuilder/abilityscores.vue';
import actions from '@/components/characterbuilder/actions.vue';
import appearance from '@/components/characterbuilder/appearance.vue';
import attacks from '@/components/characterbuilder/attacks.vue';
import bonus from '@/components/characterbuilder/bonus.vue';
import buildclass from '@/components/characterbuilder/buildclass.vue';
import campaigninfo from '@/components/characterbuilder/campaigninfo.vue';
import characterheader from '@/components/characterbuilder/characterheader.vue';
import combat from '@/components/characterbuilder/combat.vue';
import combathud from '@/components/characterbuilder/combathud.vue';
import equipment from '@/components/characterbuilder/equipment.vue';
import features from '@/components/characterbuilder/features.vue';
import fluff from '@/components/characterbuilder/fluff.vue';
import gamenotes from '@/components/characterbuilder/gamenotes.vue';
import hitpoints from '@/components/characterbuilder/hitpoints.vue';
import initiative from '@/components/characterbuilder/initiative.vue';
import loadsave from '@/components/characterbuilder/loadsave.vue';
import loadsavemodals from '@/components/characterbuilder/loadsavemodals.vue';
import otherrolls from '@/components/characterbuilder/otherrolls.vue';
import pets from '@/components/characterbuilder/pets.vue';
import resources from '@/components/characterbuilder/resources.vue';
import skills from '@/components/characterbuilder/skills.vue';
import spells from '@/components/characterbuilder/spells.vue';

export default {
  setup () {
    // stores
    const statics = useStaticsStore();
    const characters = useCharacterStore();
    const userinfo = useUserStore();
    const globals = useGlobalsStore();
    // initial data retrieval
    statics.getAll();
    // map getters
    const { character, pointbuy, mobile, hitdicechanged, groups, message } = storeToRefs(characters);
    
    // map actions
    const rollStats = characters.rollStats;
    
    return {
      statics,
      characters,
      character,
      userinfo,
      rollStats,
      pointbuy,
      mobile,
      hitdicechanged,
      groups,
      message,
    }
  },
  components: {
    abilityscores,
    actions,
    appearance,
    attacks,
    bonus,
    buildclass,
    campaigninfo,
    characterheader,
    combat,
    combathud,
    equipment,
    features,
    fluff,
    gamenotes,
    hitpoints,
    initiative,
    loadsave,
    loadsavemodals,
    otherrolls,
    pets,
    resources,
    skills,
    spells
  },
  data () {
    return {
      buildHide: false,
      startGuide: true,
      newgroup: ""
    };
  },
  filters: {
    date (value) {
      var date = new Date(value);
      return date.toLocaleString();
    }
  },
  methods: {
    log(val) {
      console.log(val);
    },
    addGroup () {
      this.character.group = this.newgroup;
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.characters.getOneFromServer(this.$route.params.id);
    }
  }
};
