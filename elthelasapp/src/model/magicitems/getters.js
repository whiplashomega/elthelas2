import droll from 'droll';

export default {
  allMagicItems: state => state.all,
  allMagicScrolls: state => state.magicscrolls,
  allMagicWands: state => state.magicwands,
  allMagicWeapons: state => state.magicweapons,
  allMagicArmor: state => state.magicarmor,
  allMagicOther: state => state.magicother,
  allCommons: state => state.allcommons,
  allUncommons: state => state.alluncommons,
  allRares: state => state.allrares,
  allVeryRares: state => state.allveryrares,
  allLegendaries: state => state.alllegendaries,
  randomMagicItem: (state) => (minvalue, maxvalue) => {
    let possibles = state.all.filter((a) => {
      return a["Cost (gp)"] <= maxvalue && a["Cost (gp)"] >= minvalue;
    });
    let i = droll.roll("1d" + possibles.length.toString()).total - 1;
    return possibles[i];
  }
};