import { mapGetters, mapActions } from 'vuex';
import droll from 'droll';

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
      canv: ""
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
    generateIndividual () {
      let d100 = droll.roll("1d100").total;
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
    generateHorde () {
      let d100 = droll.roll("1d100").total;
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
        lookup = [
          { min: 1, max: 6, numgems: "0", gemmax: 10, nummagic: "0", magicmax: 0 },
          { min: 7, max: 16, numgems: "2d6", gemmax: 10, nummagic: "0", magicmax: 0 },
          { min: 17, max: 26, numgems: "2d4", gemmax: 25, nummagic: "0", magicmax: 0 },
          { min: 27, max: 36, numgems: "2d6", gemmax: 50, nummagic: "0", magicmax: 0 },
          { min: 37, max: 44, numgems: "2d6", gemmax: 10, nummagic: "1d6", magicmax: 100 },
          { min: 45, max: 52, numgems: "2d4", gemmax: 25, nummagic: "1d6", magicmax: 100 },
          { min: 53, max: 60, numgems: "2d6", gemmax: 50, nummagic: "1d6", magicmax: 100 },
          { min: 61, max: 65, numgems: "2d6", gemmax: 10, nummagic: "1d4", magicmax: 200 },
          { min: 66, max: 70, numgems: "2d4", gemmax: 25, nummagic: "1d4", magicmax: 200 },
          { min: 71, max: 75, numgems: "2d6", gemmax: 50, nummagic: "1d4", magicmax: 200 },
          { min: 76, max: 78, numgems: "2d6", gemmax: 10, nummagic: "1d4", magicmax: 400 },
          { min: 79, max: 80, numgems: "2d4", gemmax: 25, nummagic: "1d4", magicmax: 400 },
          { min: 81, max: 85, numgems: "2d6", gemmax: 50, nummagic: "1d4", magicmax: 400 },
          { min: 86, max: 92, numgems: "2d4", gemmax: 25, nummagic: "1d4", magicmax: 2500 },
          { min: 93, max: 97, numgems: "2d6", gemmax: 50, nummagic: "1d4", magicmax: 2500 },
          { min: 98, max: 99, numgems: "2d4", gemmax: 25, nummagic: "1", magicmax: 5000 },
          { min: 100, max: 100, numgems: "2d6", gemmax: 50, nummagic: "1", magicmax: 5000 }
        ];
      } else if (this.challenge === 2) {
        cp = droll.roll("2d6").total * 100;
        sp = droll.roll("2d6").total * 1000;
        gp = droll.roll("6d6").total * 100;
        pp = droll.roll("3d6").total * 10;
        lookup = [
          { min: 1, max: 4, numgems: "0", gemmax: 10, nummagic: "0", magicmax: 0 },
          { min: 5, max: 10, numgems: "2d4", gemmax: 25, nummagic: "0", magicmax: 0 },
          { min: 11, max: 16, numgems: "3d6", gemmax: 50, nummagic: "0", magicmax: 0 },
          { min: 17, max: 22, numgems: "3d6", gemmax: 100, nummagic: "0", magicmax: 0 },
          { min: 23, max: 28, numgems: "2d4", gemmax: 250, nummagic: "0", magicmax: 0 },
          { min: 29, max: 32, numgems: "2d4", gemmax: 25, nummagic: "1d6", magicmax: 100 },
          { min: 33, max: 36, numgems: "3d6", gemmax: 50, nummagic: "1d6", magicmax: 100 },
          { min: 37, max: 40, numgems: "3d6", gemmax: 100, nummagic: "1d6", magicmax: 100 },
          { min: 41, max: 44, numgems: "2d4", gemmax: 250, nummagic: "1d6", magicmax: 100 },
          { min: 45, max: 49, numgems: "2d4", gemmax: 25, nummagic: "1d4", magicmax: 200 },
          { min: 50, max: 54, numgems: "3d6", gemmax: 50, nummagic: "1d4", magicmax: 200 },
          { min: 55, max: 59, numgems: "3d6", gemmax: 100, nummagic: "1d4", magicmax: 200 },
          { min: 60, max: 63, numgems: "2d4", gemmax: 250, nummagic: "1d4", magicmax: 200 },
          { min: 64, max: 66, numgems: "2d4", gemmax: 25, nummagic: "1d4", magicmax: 400 },
          { min: 67, max: 69, numgems: "3d6", gemmax: 50, nummagic: "1d4", magicmax: 400 },
          { min: 70, max: 72, numgems: "3d6", gemmax: 100, nummagic: "1d4", magicmax: 400 },
          { min: 73, max: 74, numgems: "2d4", gemmax: 250, nummagic: "1d4", magicmax: 400 },
          { min: 75, max: 76, numgems: "2d4", gemmax: 25, nummagic: "1", magicmax: 800 },
          { min: 77, max: 78, numgems: "3d6", gemmax: 50, nummagic: "1", magicmax: 800 },
          { min: 79, max: 79, numgems: "3d6", gemmax: 100, nummagic: "1", magicmax: 800 },
          { min: 80, max: 80, numgems: "2d4", gemmax: 250, nummagic: "1", magicmax: 800 },
          { min: 81, max: 84, numgems: "2d4", gemmax: 25, nummagic: "1d4", magicmin: 800, magicmax: 2500 },
          { min: 85, max: 88, numgems: "3d6", gemmax: 50, nummagic: "1d4", magicmin: 800, magicmax: 2500 },
          { min: 89, max: 91, numgems: "3d6", gemmax: 100, nummagic: "1d4", magicmin: 800, magicmax: 2500 },
          { min: 92, max: 94, numgems: "2d4", gemmax: 250, nummagic: "1d4", magicmin: 800, magicmax: 2500 },
          { min: 95, max: 96, numgems: "3d6", gemmax: 100, nummagic: "1d4", magicmin: 1600, magicmax: 5000 },
          { min: 97, max: 98, numgems: "2d4", gemmax: 250, nummagic: "1d4", magicmin: 1600, magicmax: 5000 },
          { min: 99, max: 99, numgems: "3d6", gemmax: 100, nummagic: "1", magicmin: 2500, magicmax: 10000 },
          { min: 100, max: 100, numgems: "2d4", gemmax: 250, nummagic: "1", magicmin: 2500, magicmax: 10000 }
        ];
      } else if (this.challenge === 3) {
        gp = droll.roll("4d6").total * 1000;
        pp = droll.roll("5d6").total * 100;
        lookup = [
          { min: 1, max: 3, numgems: "0", gemmax: 10, nummagic: "0", magicmax: 0 },
          { min: 4, max: 6, numgems: "2d4", gemmax: 250, nummagic: "0", magicmax: 0 },
          { min: 7, max: 9, numgems: "2d4", gemmax: 750, nummagic: "0", magicmax: 0 },
          { min: 10, max: 12, numgems: "3d6", gemmax: 500, nummagic: "0", magicmax: 0 },
          { min: 13, max: 15, numgems: "3d6", gemmax: 1000, nummagic: "0", magicmax: 0 },
          { min: 16, max: 19, numgems: "2d4", gemmax: 250, nummagic: "2d4", magicmax: 200 },
          { min: 20, max: 23, numgems: "2d4", gemmax: 750, nummagic: "2d4", magicmax: 200 },
          { min: 24, max: 26, numgems: "3d6", gemmax: 500, nummagic: "2d4", magicmax: 200 },
          { min: 27, max: 29, numgems: "3d6", gemmax: 1000, nummagic: "2d4", magicmax: 200 },
          { min: 30, max: 35, numgems: "2d4", gemmax: 250, nummagic: "1d6", magicmax: 400 },
          { min: 36, max: 40, numgems: "2d4", gemmax: 750, nummagic: "1d6", magicmax: 400 },
          { min: 41, max: 45, numgems: "3d6", gemmax: 500, nummagic: "1d6", magicmax: 400 },
          { min: 46, max: 50, numgems: "3d6", gemmax: 1000, nummagic: "1d6", magicmax: 400 },
          { min: 51, max: 54, numgems: "2d4", gemmax: 250, nummagic: "1d4", magicmax: 800 },
          { min: 55, max: 58, numgems: "2d4", gemmax: 750, nummagic: "1d4", magicmax: 800 },
          { min: 59, max: 62, numgems: "3d6", gemmax: 500, nummagic: "1d4", magicmax: 800 },
          { min: 63, max: 66, numgems: "3d6", gemmax: 1000, nummagic: "1d4", magicmax: 800 },
          { min: 67, max: 68, numgems: "2d4", gemmax: 250, nummagic: "1", magicmin: 400, magicmax: 1600 },
          { min: 69, max: 70, numgems: "2d4", gemmax: 750, nummagic: "1", magicmin: 400, magicmax: 1600 },
          { min: 71, max: 72, numgems: "3d6", gemmax: 500, nummagic: "1", magicmin: 400, magicmax: 1600 },
          { min: 73, max: 74, numgems: "3d6", gemmax: 1000, nummagic: "1", magicmin: 400, magicmax: 1600 },
          { min: 75, max: 76, numgems: "2d4", gemmax: 250, nummagic: "1d6", magicmin: 1600, magicmax: 5000 },
          { min: 77, max: 78, numgems: "2d4", gemmax: 750, nummagic: "1d6", magicmin: 1600, magicmax: 5000 },
          { min: 79, max: 80, numgems: "3d6", gemmax: 500, nummagic: "1d6", magicmin: 1600, magicmax: 5000 },
          { min: 81, max: 82, numgems: "3d6", gemmax: 1000, nummagic: "1d6", magicmin: 1600, magicmax: 5000 },
          { min: 83, max: 85, numgems: "2d4", gemmax: 250, nummagic: "1d4", magicmin: 2500, magicmax: 10000 },
          { min: 86, max: 88, numgems: "2d4", gemmax: 750, nummagic: "1d4", magicmin: 2500, magicmax: 10000 },
          { min: 89, max: 90, numgems: "3d6", gemmax: 500, nummagic: "1d4", magicmin: 2500, magicmax: 10000 },
          { min: 91, max: 92, numgems: "3d6", gemmax: 1000, nummagic: "1d4", magicmin: 2500, magicmax: 10000 },
          { min: 93, max: 94, numgems: "2d4", gemmax: 250, nummagic: "1", magicmin: 5000, magicmax: 200000 },
          { min: 95, max: 96, numgems: "2d4", gemmax: 750, nummagic: "1", magicmin: 5000, magicmax: 200000 },
          { min: 97, max: 98, numgems: "3d6", gemmax: 500, nummagic: "1", magicmin: 5000, magicmax: 200000 },
          { min: 99, max: 100, numgems: "3d6", gemmax: 1000, nummagic: "1", magicmin: 5000, magicmax: 200000 }
        ];
      } else if (this.challenge === 4) {
        gp = droll.roll("12d6").total * 1000;
        pp = droll.roll("8d6").total * 1000;
        lookup = [
          { min: 1, max: 2, numgems: "0", gemmax: 10, nummagic: "0", magicmax: 0 },
          { min: 3, max: 5, numgems: "3d6", gemmax: 1000, nummagic: "1d8", magicmax: 400 },
          { min: 6, max: 8, numgems: "1d10", gemmax: 2500, nummagic: "1d8", magicmax: 400 },
          { min: 9, max: 11, numgems: "1d4", gemmax: 7500, nummagic: "1d8", magicmax: 400 },
          { min: 12, max: 14, numgems: "1d8", gemmax: 5000, nummagic: "1d8", magicmax: 400 },
          { min: 15, max: 22, numgems: "3d6", gemmax: 1000, nummagic: "1d6", magicmax: 800 },
          { min: 23, max: 30, numgems: "1d10", gemmax: 2500, nummagic: "1d6", magicmax: 800 },
          { min: 31, max: 38, numgems: "1d4", gemmax: 7500, nummagic: "1d6", magicmax: 800 },
          { min: 39, max: 46, numgems: "1d8", gemmax: 5000, nummagic: "1d6", magicmax: 800 },
          { min: 47, max: 52, numgems: "3d6", gemmax: 1000, nummagic: "1d6", magicmin: 400, magicmax: 1600 },
          { min: 53, max: 58, numgems: "1d10", gemmax: 2500, nummagic: "1d6", magicmin: 400, magicmax: 1600 },
          { min: 59, max: 63, numgems: "1d4", gemmax: 7500, nummagic: "1d6", magicmin: 400, magicmax: 1600 },
          { min: 64, max: 68, numgems: "1d8", gemmax: 5000, nummagic: "1d6", magicmin: 400, magicmax: 1600 },
          { min: 69, max: 69, numgems: "3d6", gemmax: 1000, nummagic: "1d4", magicmin: 1600, magicmax: 5000 },
          { min: 70, max: 70, numgems: "1d10", gemmax: 2500, nummagic: "1d4", magicmin: 1600, magicmax: 5000 },
          { min: 71, max: 71, numgems: "1d4", gemmax: 7500, nummagic: "1d4", magicmin: 1600, magicmax: 5000 },
          { min: 72, max: 72, numgems: "1d8", gemmax: 5000, nummagic: "1d4", magicmin: 1600, magicmax: 5000 },
          { min: 73, max: 74, numgems: "3d6", gemmax: 1000, nummagic: "1d4", magicmin: 2500, magicmax: 10000 },
          { min: 75, max: 76, numgems: "1d10", gemmax: 2500, nummagic: "1d4", magicmin: 2500, magicmax: 10000 },
          { min: 77, max: 78, numgems: "1d4", gemmax: 7500, nummagic: "1d4", magicmin: 2500, magicmax: 10000 },
          { min: 79, max: 80, numgems: "1d8", gemmax: 5000, nummagic: "1d4", magicmin: 2500, magicmax: 10000 },
          { min: 81, max: 85, numgems: "3d6", gemmax: 1000, nummagic: "1d4", magicmin: 5000, magicmax: 200000 },
          { min: 86, max: 90, numgems: "1d10", gemmax: 2500, nummagic: "1d4", magicmin: 5000, magicmax: 200000 },
          { min: 91, max: 95, numgems: "1d4", gemmax: 7500, nummagic: "1d4", magicmin: 5000, magicmax: 200000 },
          { min: 96, max: 100, numgems: "1d8", gemmax: 5000, nummagic: "1d4", magicmin: 5000, magicmax: 200000 }
        ];
      }
      lookup.forEach((a) => {
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
