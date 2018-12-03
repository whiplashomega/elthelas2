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
        this.generateIndividual();
      }
    },
    generateIndividual () {
      var goldvalue;
      if (this.tier === 1) {
        goldvalue = (Math.floor(Math.random() * 5995) / 100) + 0.04;
      } else if (this.tier === 2) {
        goldvalue = Math.floor(Math.random() * 292) + 8;
      } else if (this.tier === 3) {
        goldvalue = Math.floor(Math.random() * 2260) + 140;
      } else if (this.tier === 4) {
        goldvalue = Math.floor(Math.random() * 16200) + 1800;
      }
      var pp = Math.floor(goldvalue / 100);
      return pp;
    }
  },
  mounted () {
    this.canv = this.$refs['canvas'].getContext('2d');
    this.canv.fillStyle = 'rgb(200, 0, 0, 0.5)';
    this.canv.fillRect(10, 10, 50, 50);
  }
};
