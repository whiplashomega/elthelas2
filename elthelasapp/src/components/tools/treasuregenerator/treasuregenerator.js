import { mapGetters, mapActions } from 'vuex';
import droll from 'droll';
import lookup from './lookup';

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
      equipment: 'allEquipment',
      allValuables: 'allValuables',
      randomValuable: 'randomValuable',
      randomMagicItem: 'randomMagicItem'
    })
  },
  data () {
    return {
      challenge: 1,
      horde: false,
      treasure: "",
      canv: "",
      d100: 1
    };
  },
  methods: {
    ...mapActions({
      getAllValuables: "getAllValuables"
    }),
    generateTreasure () {
      if (this.horde) {
        this.treasure = this.generateHorde();
      } else {
        this.treasure = this.generateIndividual();
      }
    },
    generateTreasureSetRoll () {
      if (this.horde) {
        this.treasure = this.generateHorde(this.d100);
      } else {
        this.treasure = this.generateIndividual(this.d100);
      }
    },
    generateIndividual (d100 = droll.roll("1d100").total) {
      let cp = 0;
      let sp = 0;
      let gp = 0;
      let pp = 0;
      let result = "";
      console.log(d100);
      if (this.challenge === 1) {
        if (d100 < 31) {
          cp = droll.roll("5d6").total;
        } else if (d100 < 61) {
          sp = droll.roll("4d6").total;
        } else if (d100 < 96) {
          gp = droll.roll("3d6").total;
        } else {
          pp = droll.roll("1d6").total;
        }
      } else if (this.challenge === 2) {
        if (d100 < 31) {
          cp = droll.roll("4d6").total * 100;
          gp = droll.roll("1d6").total * 10;
        } else if (d100 < 61) {
          sp = droll.roll("6d6").total * 10;
          gp = droll.roll("2d6").total * 10;
        } else if (d100 < 96) {
          gp = droll.roll("4d6").total * 10;
        } else {
          gp = droll.roll("2d6").total * 10;
          pp = droll.roll("3d6").total;
        }
      } else if (this.challenge === 3) {
        if (d100 < 21) {
          sp = droll.roll("4d6").total * 100;
          gp = droll.roll("1d6").total * 100;
        } else if (d100 < 76) {
          gp = droll.roll("2d6").total * 100;
          pp = droll.roll("1d6").total * 10;
        } else {
          gp = droll.roll("2d6").total * 100;
          pp = droll.roll("2d6").total * 10;
        }
      } else if (this.challenge === 4) {
        if (d100 < 56) {
          gp = droll.roll("1d6").total * 1000;
          pp = droll.roll("1d6").total * 100;
        } else {
          gp = droll.roll("1d6").total * 1000;
          pp = droll.roll("2d6").total * 100;
        }
      }
      let total = cp / 100 + sp / 10 + gp + pp * 10;
      result += cp + " cp, " + sp + " sp, " + gp + " gp, " + pp + " pp. Total value " + total + " gp.";
      console.log(result);
      return result;
    },
    generateHorde (d100 = droll.roll("1d100").total) {
      let cp = 0;
      let sp = 0;
      let gp = 0;
      let pp = 0;
      let result = "";
      let gems = "";
      let magicitems = "";
      let total = 0;
      let lookup = [];
      let r = {};
      console.log(d100);
      if (this.challenge === 1) {
        cp = droll.roll("6d6").total * 100;
        sp = droll.roll("3d6").total * 100;
        gp = droll.roll("2d6").total * 10;
      } else if (this.challenge === 2) {
        cp = droll.roll("2d6").total * 100;
        sp = droll.roll("2d6").total * 1000;
        gp = droll.roll("6d6").total * 100;
        pp = droll.roll("3d6").total * 10;
      } else if (this.challenge === 3) {
        gp = droll.roll("4d6").total * 1000;
        pp = droll.roll("5d6").total * 100;
      } else if (this.challenge === 4) {
        gp = droll.roll("12d6").total * 1000;
        pp = droll.roll("8d6").total * 1000;
      }
      lookup[this.challenge].forEach((a) => {
        if (d100 >= a.min && d100 <= a.max) {
          r = a;
        }
      });
      total += cp / 100;
      total += sp / 10;
      total += gp;
      total += pp * 10;
      let gemmin = 0;
      let gemmax = r.gemmax;
      for (let numgems = droll.roll(r.numgems).total; numgems > 0; numgems--) {
        let gemtype = this.randomValuable(gemmin, gemmax);
        gems += " " + gemtype.Name + " (" + gemtype.Value + " gp value)";
        total += Number(gemtype.Value);
      }
      let magicmax = r.magicmax;
      let magicmin = r.magicmin ? r.magicmin : 0;
      console.log(droll.roll(r.nummagic).total);
      for (let nummagic = droll.roll(r.nummagic).total; nummagic > 0; nummagic--) {
        let item = this.randomMagicItem(magicmin, magicmax);
        magicitems += " " + item.Item + " (" + item["Cost (gp)"] + " gp value)";
        total += Number(item["Cost (gp)"]);
      }
      result += cp + " cp, " + sp + " sp, " + gp + " gp, " + pp + " pp." + gems + magicitems + ". Total value " + total + " gp.";
      return result;
    }
  },
  created () {
    this.getAllValuables();
  }
};
