// import test from '@/tests/unit/charbuilder.test.js';

import { useStaticsStorev2, useCharacterStore, useUserStore, useCreatureStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
import abilityscores from '@/components/characterbuilderv2/abilityscores.vue';
import actions from '@/components/characterbuilderv2/actions.vue';
import appearance from '@/components/characterbuilderv2/appearance.vue';
import attacks from '@/components/characterbuilderv2/attacks.vue';
import bonus from '@/components/characterbuilderv2/bonus.vue';
import buildclass from '@/components/characterbuilderv2/buildclass.vue';
import campaigninfo from '@/components/characterbuilderv2/campaigninfo.vue';
import characterheader from '@/components/characterbuilderv2/characterheader.vue';
import combat from '@/components/characterbuilderv2/combat.vue';
import combathud from '@/components/characterbuilderv2/combathud.vue';
import equipment from '@/components/characterbuilderv2/equipment.vue';
import features from '@/components/characterbuilderv2/features.vue';
import fluff from '@/components/characterbuilderv2/fluff.vue';
import gamenotes from '@/components/characterbuilderv2/gamenotes.vue';
import hitpoints from '@/components/characterbuilderv2/hitpoints.vue';
import initiative from '@/components/characterbuilderv2/initiative.vue';
import loadsave from '@/components/characterbuilderv2/loadsave.vue';
import loadsavemodals from '@/components/characterbuilderv2/loadsavemodals.vue';
import otherrolls from '@/components/characterbuilderv2/otherrolls.vue';
import pets from '@/components/characterbuilderv2/pets.vue';
import resources from '@/components/characterbuilderv2/resources.vue';
import selectfeatures from '@/components/characterbuilderv2/selectfeatures.vue';
import skills from '@/components/characterbuilderv2/skills.vue';
import spells from '@/components/characterbuilderv2/spells.vue';
import statbuilder from '@/components/characterbuilderv2/statbuilder.vue';
import wildshape from '@/components/characterbuilderv2/wildshape.vue';

import { useMeta } from 'vue-meta';

export default {
  setup () {
    // stores
    const statics = useStaticsStorev2();
    const characters = useCharacterStore();
    const creatures = useCreatureStore();
    const userinfo = useUserStore();
    // initial data retrieval
    statics.getAllNew();
    creatures.getAllCreatures();
    // map getters
    const { character, pointbuy, mobile, hitdicechanged, message } = storeToRefs(characters);

    // map actions
    const rollStats = characters.rollStats;
    useMeta({ title: "Character Builder" });

    return {
      statics,
      characters,
      character,
      userinfo,
      rollStats,
      pointbuy,
      mobile,
      hitdicechanged,
      message
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
    selectfeatures,
    skills,
    spells,
    wildshape,
    statbuilder
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
    }
  },
  mounted () {
    if (this.loggedin) {
      this.characters.getFromServerSilent();
    }
    if (this.$route.params.id) {
      this.characters.getOneFromServer(this.$route.params.id);
    }
  }
};
