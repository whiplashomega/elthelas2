import { mapGetters, mapActions } from 'vuex';
// import droll from 'droll';

export default {
  computed: {
    ...mapGetters({
      commons: 'allCommons',
      uncommons: 'allUncommons',
      rares: 'allRares',
      veryrares: 'allVeryRares',
      legendaries: 'allLegendaries',
      weapons: 'allWeapons',
      armor: 'allArmor',
      equipment: 'allEquipment'
    })
  },
  data () {
    return {
      tier: 1,
      horde: false,
      treasure: "",
      canv: ""
    };
  },
  methods: {
    ...mapActions({}),
    generateTreasure () {
      if (this.horde) {
        this.generateHorde();
      } else {
        this.treasure = this.generateIndividual();
      }
    },
    generateIndividual () {
      let goldvalue, pp, gp, sp, cp;
      if (this.tier === 1) {
        pp = Math.floor(Math.random() * 4);
        gp = Math.floor(Math.random() * 20);
        sp = Math.floor(Math.random() * 20);
        cp = Math.floor(Math.random() * 20);
        goldvalue = pp * 10 + gp + sp / 10 + cp / 100;
      } else if (this.tier === 2) {
        pp = Math.floor(Math.random() * 20);
        gp = Math.floor(Math.random() * 100);
        sp = Math.floor(Math.random() * 100);
        cp = Math.floor(Math.random() * 100);
        goldvalue = pp * 10 + gp + sp / 10 + cp / 100;
      } else if (this.tier === 3) {
        pp = Math.floor(Math.random() * 200);
        gp = Math.floor(Math.random() * 1000);
        sp = Math.floor(Math.random() * 100);
        cp = Math.floor(Math.random() * 100);
        goldvalue = pp * 10 + gp + sp / 10 + cp / 100;
      } else if (this.tier === 4) {
        pp = Math.floor(Math.random() * 1000);
        gp = Math.floor(Math.random() * 5000);
        sp = Math.floor(Math.random() * 200);
        cp = Math.floor(Math.random() * 200);
        goldvalue = pp * 10 + gp + sp / 10 + cp / 100;
      }
      return pp + " pp " + gp + " gp " + sp + " sp " + cp + " cp. Total value: " + goldvalue + " gp.";
    }
  }
};
