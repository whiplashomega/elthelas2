import charCalculators from '@/helpers/charcalc';

export default {
  getCharErrorMessage: (state) => {
    return state.message;
  },
  getStatRolls: (state) => state.statRolls,
  hitdicechanged: (state) => state.hitdicechanged,
  serverCharacters: (state) => state.characters,
  driveCharacters: (state) => state.drivefiles,
  getSlots: () => charCalculators.slots,
  incrementClassCount: () => (spell, classCounts) => {
    charCalculators.incrementClassCount(spell, classCounts);
  },
  getNumPrepped: () => (classCounts, spells) => {
    return charCalculators.numPrepped(classCounts, spells);
  },
  getBardPrepared: () => (a) => {
    return charCalculators.bardPrepared(a);
  },
  getThirdCasterPrepared: () => (a) => {
    return charCalculators.thirdCasterPrepared(a);
  },
  getTotalPrepared: (state) => {
    return charCalculators.totalPrepared(state.currentCharacter);
  },
  getCharacter: (state) => {
    return state.currentCharacter;
  },
  getAsCreature: (state, getters) => {
    let creature = {
      name: state.currentCharacter.name,
      type: "humanoid",
      size: "medium",
      subtype: state.currentCharacter.race.name,
      cr: getters.level,
      alignment: state.currentCharacter.alignment,
      ac: getters.accalc,
      acdesc: getters.accalc,
      hp: getters.getHPTotal,
      hpdesc: getters.getHPTotal,
      speed: getters.getSpeedStat(0) + " ft",
      str: getters.getStatTotal(0),
      strmod: getters.getStatMod(0),
      dex: getters.getStatTotal(1),
      dexmod: getters.getStatMod(1),
      con: getters.getStatTotal(2),
      conmod: getters.getStatMod(2),
      int: getters.getStatTotal(3),
      intmod: getters.getStatMod(3),
      wis: getters.getStatTotal(4),
      wismod: getters.getStatMod(4),
      cha: getters.getStatTotal(5),
      chamod: getters.getStatMod(5),
      saves: getters.getSaveMod(0) + " STR " + getters.getSaveMod(1) + " DEX " + getters.getSaveMod(2) + " CON " + getters.getSaveMod(3) + " INT " + getters.getSaveMod(4) + " WIS " + getters.getSaveMod(5) + " CHA",
      senses: "passive perception " + (10 + getters.getSkillMod(state.currentCharacter.skills[11])),
      damageimmunities: "",
      conditionimmunities: "",
      languages: "",
      damageresistances: "",
      locations: "",
      latlong: "",
      description: ""
    };
    for (let x = 1; x < 5; x++) {
      if (getters.getSpeedStat(x)) {
        creature.speed += " " + getters.getSpeedStat(x);
        creature.speed += (x === 1 ? " fly" : (x === 2 ? " climb" : (x === 3 ? " swim" : (x === 4 ? " burrow" : ""))));
      }
    }
    creature.tags = [creature.type, creature.size, "cr" + creature.cr, creature.alignment];
    return creature;
  },
  classtext: (state) => {
    return charCalculators.classtext(state.currentCharacter);
  },
  profbonus: (state) => {
    return charCalculators.profbonus(state.currentCharacter);
  },
  totalGold: (state) => {
    return charCalculators.totalGold(state.currentCharacter);
  },
  getStatTotal: (state) => (i) => {
    return charCalculators.statTotal(state.currentCharacter, i);
  },
  getStatMod: (state) => (i) => {
    return charCalculators.statMod(state.currentCharacter, i);
  },
  getSaveMod: (state) => (i) => {
    return charCalculators.saveMod(state.currentCharacter, i);
  },
  getSaveDC: (state) => (i) => {
    return charCalculators.saveDC(state.currentCharacter, i);
  },
  charGroups: (state) => {
    let groups = [];
    state.characters.forEach((a) => {
      let b = groups.findIndex((c) => {
        return c.name === a.group;
      });
      if (b === -1 && a.group !== "") {
        groups.push({ name: a.group, id: a.group + Date.now() });
      }
    });
    let b = groups.findIndex((c) => {
      return c.name === state.currentCharacter.group;
    });
    if (b === -1) {
      groups.push({ name: state.currentCharacter.group, id: "curchargroup" });
    }
    return groups;
  },
  getAttBonus: (state) => (i) => {
    return charCalculators.attBonus(state.currentCharacter, i);
  },
  getSkillMod: (state) => (skill) => {
    return charCalculators.skillMod(state.currentCharacter, skill);
  },
  cantripsKnown: (state) => {
    return charCalculators.cantripsknown(state.currentCharacter);
  },
  getInitMod: (state) => {
    return charCalculators.initMod(state.currentCharacter);
  },
  getHPTotal: (state) => {
    return charCalculators.hpTotal(state.currentCharacter);
  },
  pointbuy: (state) => {
    return state.currentCharacter.stats.reduce((a, b) => {
      var c = Number(b) - 8;
      if (b > 13) {
        c += Number(b) - 13;
      }
      if (b > 15) {
        c += Number(b) - 15;
      }
      return a + c;
    }, 0);
  },
  getSpeedStat: (state) => (i) => {
    return charCalculators.speedStat(state.currentCharacter, i);
  },
  getAttackBonus: (state) => (attack) => {
    return charCalculators.attackBonus(state.currentCharacter, attack);
  },
  getDamageBonus: (state) => (dmg, stat) => {
    return charCalculators.damageBonus(state.currentCharacter, dmg, stat);
  },
  armorac: (state) => (a) => {
    return charCalculators.armorAC(state.currentCharacter, a);
  },
  charlevel: () => charCalculators.charlevel,
  accalc: (state) => {
    return charCalculators.acCalc(state.currentCharacter);
  },
  equipmentContainers: (state) => {
    return charCalculators.equipmentContainers(state.currentCharacter);
  },
  carryWeight: (state) => {
    return charCalculators.carryWeight(state.currentCharacter);
  },
  carryMax: (state) => {
    return charCalculators.carryMax(state.currentCharacter);
  },
  totalslots: (state) => (level) => {
    return charCalculators.totalSlots(state.currentCharacter, level);
  },
  warlockSlots: (state) => {
    return charCalculators.warlockSlots(state.currentCharacter);
  },
  warlockSlotLevel: (state) => {
    return charCalculators.warlockSlotLevel(state.currentCharacter);
  },
  level: (state) => {
    return charCalculators.level(state.currentCharacter);
  },
  validateCharacter: (state) => {
    if (state.currentCharacter.name === "") {
      alert("cannot save character without name");
      return false;
    }
    return true;
  }
};
