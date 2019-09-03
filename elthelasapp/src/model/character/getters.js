import { Decimal } from 'decimal.js';

function dec(num) {
  return new Decimal(Number(num));
}

export default {
  getStatRolls: (state) => state.statRolls,
  getSlots: (state) => state.slots,
  incrementClassCount: () => (spell, classCounts) => {
    classCounts.forEach((cc) => {
      if (spell.class === cc.classname && spell.prepared) {
        cc.numprepped++;
      }
    });
  },
  getNumPrepped: (state, getters) => (classCounts, spells) => {
    spells.level1.forEach((spell) => {
      getters.incrementClassCount(spell, classCounts);
    });
    spells.level2.forEach((spell) => {
      getters.incrementClassCount(spell, classCounts);
    });
    spells.level3.forEach((spell) => {
      getters.incrementClassCount(spell, classCounts);
    });
    spells.level4.forEach((spell) => {
      getters.incrementClassCount(spell, classCounts);
    });
    spells.level5.forEach((spell) => {
      getters.incrementClassCount(spell, classCounts);
    });
    spells.level6.forEach((spell) => {
      getters.incrementClassCount(spell, classCounts);
    });
    spells.level7.forEach((spell) => {
      getters.incrementClassCount(spell, classCounts);
    });
    spells.level8.forEach((spell) => {
      getters.incrementClassCount(spell, classCounts);
    });
    spells.level9.forEach((spell) => {
      getters.incrementClassCount(spell, classCounts);
    });
  },
  getBardPrepared: (state, getters) => (a) => {
    let num = Math.min(a.level, 9) + 3;
    num += Math.floor(Math.max(0, Math.min(a.level, 17) - 9) / 2);
    if (a.level > 9) {
      num += 2;
    }
    if (a.level > 13) {
      num += 2;
    }
    if (a.level > 17) {
      num += 2;
    }
    if (a.level > 5 && a.selsubclass.name === "College of Lore") {
      num += 2;
    }
    return num;
  },
  getThirdCasterPrepared: () => (a) => {
    let num = Math.floor((a.level - 1) / 3) + 3;
    if (a.level >= 8) {
      num++;
    }
    if (a.level >= 11) {
      num++;
    }
    if (a.level >= 14) {
      num++;
    }
    if (a.level >= 20) {
      num++;
    }
    return num;
  },
  getTotalPrepared: (state, getters) => {
    let spells = state.currentCharacter.spells;
    let classCounts = [];
    state.currentCharacter.charclasses.forEach((a) => {
      let num = Math.floor(a.level * a.selsubclass.castermult + getters.getStatMod(a.thisclass.caststat));
      if (a.thisclass.name === "Sorcerer") {
        num = Math.min(a.level, 11) + 1;
        num += Math.floor(Math.max(0, Math.min(a.level, 17) - 11) / 2);
        if (a.selsubclass.name === "Sorceron Bloodline") {
          num += 3;
        }
      }
      if (a.thisclass.name === "Warlock") {
        num = Math.min(a.level, 9) + 1;
        num += Math.floor(Math.max(0, a.level - 9) / 2);
      }
      if (a.thisclass.name === "Bard") {
        num = getters.getBardPrepared(a);
      }
      if (a.thisclass.name === "Cleric" || (a.thisclass.name === "Druid" && a.selsubclass.name === "Circle of the Land")) {
        num += 2 + Math.floor(Math.min(a.level - 1, 8) / 2) * 2;
      }
      if (a.thisclass.name === "Ranger") {
        num = Math.ceil(a.level / 2) + 1;
        if ((a.selsubclass.name === "Gloom Stalker" || a.selsubclass.name === "Horizon Walker" || a.selsubclass.name === "Monster Slayer") && a.level > 2) {
          num += Math.floor((a.level - 1) / 4) + 1;
        }
      }
      if (a.thisclass.name === "Paladin" && a.level > 2) {
        num += (Math.floor((a.level - 1) / 4) + 1) * 2;
      }
      if ((a.thisclass.name === "Fighter" && a.selsubclass.name === "Eldritch Knight") ||
          (a.thisclass.name === "Rogue" && a.selsubclass.name === "Arcane Trickster")) {
        getters.getThirdCasterPrepared(a);
      }
      classCounts.push({
        classname: a.thisclass.name,
        maxprepped: num,
        numprepped: 0
      });
    });
    getters.getNumPrepped(classCounts, spells);
    return classCounts;
  },
  getCharacter: (state) => {
    return state.currentCharacter;
  },
  getAsCreature: (state) => {
    return state.currentCharacter;
  },
  classtext: (state) => {
    let character = state.currentCharacter;
    return character.charclasses.reduce((a, b) => {
      return a + b.thisclass.name + " " + b.level.toString() + " ";
    }, "");
  },
  profbonus: (state) => {
    var level = state.currentCharacter.charclasses.reduce((a, b) => {
      return a + Number(b.level);
    }, 0);
    return Math.ceil(level / 4) + 1;
  },
  totalGold: (state) => {
    let character = state.currentCharacter;
    return dec(character.cp).div(100)
      .add(dec(character.sp).div(10))
      .add(dec(character.gp))
      .add(dec(character.pp).mul(10))
      .add(dec(character.art))
      .add(dec(character.gems)).toNumber();
  },
  getStatTotal: (state) => (i) => {
    return Number(state.currentCharacter.stats[i]) + Number(state.currentCharacter.race.stats[i]) + Number(state.currentCharacter.statbonus[i]);
  },
  getStatMod: (state, getters) => (i) => {
    return Math.floor(getters.getStatTotal(i) / 2) - 5;
  },
  getSaveMod: (state, getters) => (i) => {
    return getters.getStatMod(i) + Number(state.currentCharacter.savebonus[i]) + state.currentCharacter.saves[i] * getters.profbonus;
  },
  getSaveDC: (state, getters) => (i) => {
    return 8 + getters.profbonus + getters.getStatMod(i) + Number(state.currentCharacter.saveDCBonus[i]);
  },
  getAttBonus: (state, getters) => (i) => {
    return Number(state.currentCharacter.attBonus[i]) + getters.getStatMod(i) + getters.profbonus;
  },
  getSkillMod: (state, getters) => (skill) => {
    return getters.getStatMod(skill.stat) + Math.floor(Number(skill.prof) * getters.profbonus) + Number(skill.magic);
  },
  getInitMod: (state, getters) => {
    return getters.getStatMod(1) + Number(state.currentCharacter.initmagic);
  },
  getHPTotal: (state, getters) => {
    var total = 0;
    state.currentCharacter.charclasses.forEach((cc) => {
      total += Number(cc.level) * (cc.thisclass.hitdie / 2 + getters.getStatMod(2) + 1);
    });
    total += (state.currentCharacter.charclasses[0].thisclass.hitdie / 2 - 1);
    total += Number(state.currentCharacter.hpmagic);
    return total;
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
    return Number(state.currentCharacter.race.speed[i]) + Number(state.currentCharacter.speedmagic[i]);
  },
  getAttackBonus: (state, getters) => (attack) => {
    return Number(attack.bonus) + Number(getters.getStatMod(attack.stat)) + getters.profbonus * attack.prof;
  },
  getDamageBonus: (state, getters) => (dmg, stat) => {
    if (dmg.addstat) {
      return Number(getters.getStatMod(stat)) + Number(dmg.damagebonus);
    } else {
      return Number(dmg.damagebonus);
    }
  },
  armorac: (state, getters) => (a) => {
    var ac = Number(a.ac);
    if (a.type === "Medium Armor") {
      let medmaster = state.currentCharacter.feats.filter((a) => {
        return a.name === "Medium Armor Master";
      });
      let maxdex = 2;
      if (medmaster.length > 0) {
        maxdex++;
      }
      if (a.name.toLowerCase().includes("mithril")) {
        maxdex++;
      }
      ac = Number(a.ac) + Math.min(maxdex, getters.getStatMod(1));
    } else if (a.type === 'Light Armor') {
      ac = Number(a.ac) + getters.getStatMod(1);
    } else if (a.type === "Unarmored Bonus") {
      ac = 10 + Number(a.ac) + getters.getStatMod(1) + getters.getStatMod(a.unarmoredstat);
    }
    return ac;
  },
  charlevel: () => (character) => {
    var level = 0;
    character.charclasses.forEach((a) => {
      level += Number(a.level);
    });
    return level;
  },
  accalc: (state, getters) => {
    var shields = state.currentCharacter.armors.filter((a) => {
      return a.type === "Shield";
    });
    let ac = state.currentCharacter.armors.reduce((b, a) => {
      if (a.equipped && a.type !== "Shield") {
        let ac = getters.armorac(a);
        if (ac > b) {
          b = ac;
        }
      }
      return b;
    }, 10 + getters.getStatMod(1));
    let shield = shields.reduce((b, a) => {
      if (a.equipped) {
        return b + Number(a.ac);
      } else {
        return b;
      }
    }, 0);
    return Number(ac) + Number(shield) + Number(state.currentCharacter.acmagic);
  },
  equipmentContainers: (state) => {
    var containers = [];
    var defcontainer = {
      equipment: state.currentCharacter.equipment.filter((a) => {
        if (!a.container || state.currentCharacter.containers.filter(b => {
          return a.container === b.id;
        }).length === 0) {
          return true;
        }
        return false;
      }),
      name: "Not In Container",
      capacity: 9999,
      weightCounts: true,
      weight: 0,
      contains: 0
    };
    defcontainer.equipment.forEach((e) => {
      defcontainer.contains += e.weight * e.quantity;
    });
    if (defcontainer.equipment.length > 0) {
      containers.push(defcontainer);
    }
    state.currentCharacter.containers.forEach((c) => {
      var equip = state.currentCharacter.equipment.filter((e) => {
        return e.container === c.id;
      });
      var weight = 0;
      equip.forEach((e) => {
        weight += e.weight * e.quantity;
      });
      containers.push({ ...c, equipment: equip, contains: weight, container: c });
    });
    return containers;
  },
  carryWeight: (state, getters) => {
    var sum = dec(0);
    getters.equipmentContainers.forEach((a) => {
      sum = sum.add(a.weight);
      if (a.weightCounts) {
        sum = sum.add(a.equipment.reduce((a, b) => {
          return a.add(dec(b.weight).mul(b.quantity));
        }, dec(0)));
      }
    });
    sum = sum.add(dec(state.currentCharacter.cp).add(state.currentCharacter.sp).add(state.currentCharacter.gp).add(state.currentCharacter.pp).div(50)).toNumber();
    return sum;
  },
  carryMax: (state, getters) => {
    var base = getters.getStatTotal(0) * 15;
    if (state.currentCharacter.size === "tiny") {
      base *= 0.5;
    } else if (state.currentCharacter.size === 'large') {
      base *= 2;
    } else if (state.currentCharacter.size === 'huge') {
      base *= 4;
    }
    return base + Number(state.currentCharacter.capacitybonus);
  },
  totalslots: (state) => (level) => {
    let index = 0;
    if (level === 'cantrip') {
      return 'infinite';
    } else {
      index = Number(level.substring(5)) - 1;
    }
    let casterlevel = 0;
    if (state.currentCharacter.charclasses.length === 1) {
      casterlevel += Math.ceil(Number(state.currentCharacter.charclasses[0].level) * Number(state.currentCharacter.charclasses[0].selsubclass.castermult));
    } else {
      state.currentCharacter.charclasses.forEach((a) => {
        casterlevel += Math.floor(Number(a.level) * Number(a.selsubclass.castermult));
      });
    }
    try {
      return state.slots[casterlevel][index] + Number(state.currentCharacter.bonusslots[index]);
    } catch (e) {
      return 0;
    }
  },
  warlockSlots: (state) => {
    var slots = 0;
    state.currentCharacter.charclasses.forEach((a) => {
      if (a.thisclass.name === "Warlock") {
        if (a.level >= 1) {
          slots++;
        } if (a.level >= 2) {
          slots++;
        } if (a.level >= 11) {
          slots++;
        } if (a.level >= 17) {
          slots++;
        }
      }
    });
    return slots;
  },
  warlockSlotLevel: (state) => {
    return Math.min(state.currentCharacter.charclasses.reduce((level, a) => {
      if (a.thisclass.name === "Warlock") {
        level = Math.ceil(Number(a.level) / 2.0);
      }
      return level;
    }, 0), 5);
  },
  level: (state) => {
    return state.currentCharacter.charclasses.reduce((level, a) => {
      return level + Number(a.level);
    }, 0);
  },
  validateCharacter: (state) => {
    if (state.currentCharacter.name === "") {
      alert("cannot save character without name");
      return false;
    }
    return true;
  }
};
