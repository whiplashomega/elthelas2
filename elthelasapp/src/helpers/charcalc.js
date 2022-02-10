import { Decimal } from 'decimal.js';

function dec(num) {
  return new Decimal(Number(num));
}

export default {
  slots: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0], // caster level 0
    [2, 0, 0, 0, 0, 0, 0, 0, 0], // caster level 1
    [3, 0, 0, 0, 0, 0, 0, 0, 0], // caster level 2
    [4, 2, 0, 0, 0, 0, 0, 0, 0], // caster level 3
    [4, 3, 0, 0, 0, 0, 0, 0, 0], // caster level 4
    [4, 3, 2, 0, 0, 0, 0, 0, 0], // caster level 5
    [4, 3, 3, 0, 0, 0, 0, 0, 0], // caster level 6
    [4, 3, 3, 1, 0, 0, 0, 0, 0], // caster level 7
    [4, 3, 3, 2, 0, 0, 0, 0, 0], // caster level 8
    [4, 3, 3, 3, 1, 0, 0, 0, 0], // caster level 9
    [4, 3, 3, 3, 2, 0, 0, 0, 0], // caster level 10
    [4, 3, 3, 3, 2, 1, 0, 0, 0], // caster level 11
    [4, 3, 3, 3, 2, 1, 0, 0, 0], // caster level 12
    [4, 3, 3, 3, 2, 1, 1, 0, 0], // caster level 13
    [4, 3, 3, 3, 2, 1, 1, 0, 0], // caster level 14
    [4, 3, 3, 3, 2, 1, 1, 1, 0], // caster level 15
    [4, 3, 3, 3, 2, 1, 1, 1, 0], // caster level 16
    [4, 3, 3, 3, 2, 1, 1, 1, 1], // caster level 17
    [4, 3, 3, 3, 3, 1, 1, 1, 1], // caster level 18
    [4, 3, 3, 3, 3, 2, 1, 1, 1], // caster level 19
    [4, 3, 3, 3, 3, 2, 2, 1, 1] // caster level 20
  ],
  acCalc: function(character) {
    var shields = character.armors.filter((a) => {
      return a.type === "Shield";
    });
    let ac = character.armors.reduce((b, a) => {
      if (a.equipped && a.type !== "Shield") {
        let ac = this.armorAC(character, a);
        if (ac > b) {
          b = ac;
        }
      }
      return b;
    }, 10 + this.statMod(character, 1));
    let shield = shields.reduce((b, a) => {
      if (a.equipped) {
        return b + Number(a.ac);
      } else {
        return b;
      }
    }, 0);
    return Number(ac) + Number(shield) + Number(character.acmagic);
  },
  armorAC: function(character, a) {
    var ac = Number(a.ac);
    if (a.type === "Medium Armor") {
      let medmaster = character.feats.filter((a) => {
        return a.name === "Medium Armor Master";
      });
      let maxdex = 2;
      if (medmaster.length > 0) {
        maxdex++;
      }
      if (a.name.toLowerCase().includes("mithril")) {
        maxdex++;
      }
      ac = Number(a.ac) + Math.min(maxdex, this.statMod(character, 1));
    } else if (a.type === 'Light Armor') {
      ac = Number(a.ac) + this.statMod(character, 1);
    } else if (a.type === "Unarmored Bonus") {
      ac = 10 + Number(a.ac) + this.statMod(character, 1) + this.statMod(character, a.unarmoredstat);
    }
    return ac;
  },
  attBonus: function(character, i) {
    return Number(character.attBonus[i]) + this.statMod(character, i) + this.profbonus(character);
  },
  attackBonus: function(character, attack) {
    return Number(attack.bonus) + Number(this.statMod(character, attack.stat)) + this.profbonus(character) * attack.prof;
  },
  bardPrepared: function(a) {
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
  carryMax: function(character) {
    var base = this.statTotal(character, 0) * 15;
    if (character.size === "tiny") {
      base *= 0.5;
    } else if (character.size === 'large') {
      base *= 2;
    } else if (character.size === 'huge') {
      base *= 4;
    }
    return base + Number(character.capacitybonus);
  },
  carryWeight: function(character) {
    var sum = dec(0);
    this.equipmentContainers(character).forEach((a) => {
      sum = sum.add(a.weight);
      if (a.weightCounts) {
        sum = sum.add(a.equipment.reduce((a, b) => {
          return a.add(dec(b.weight).mul(b.quantity));
        }, dec(0)));
      }
    });
    sum = sum.add(dec(character.cp).add(character.sp).add(character.gp).add(character.pp).div(50)).toNumber();
    return sum;
  },
  charlevel: function(character) {
    var level = 0;
    character.charclasses.forEach((a) => {
      level += Number(a.level);
    });
    return level;
  },
  classtext: function(character) {
    return character.charclasses.reduce((a, b) => {
      return a + b.thisclass.name + " " + b.level.toString() + " ";
    }, "");
  },
  damageBonus: function(character, dmg, stat) {
    let bonus = Number(dmg.damagebonus);
    if (dmg.addstat) {
      bonus += Number(this.statMod(character, stat));
    }
    if (dmg.prof) {
      bonus += Number(this.profbonus(character));
    }
    return bonus;
  },
  equipmentContainers: function(character) {
    var containers = [];
    var defcontainer = {
      equipment: character.equipment.filter((a) => {
        if (!a.container || character.containers.filter(b => {
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
    character.containers.forEach((c) => {
      var equip = character.equipment.filter((e) => {
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
  hpTotal: function(character) {
    var total = 0;
    character.charclasses.forEach((cc) => {
      total += Number(cc.level) * (cc.thisclass.hitdie / 2 + this.statMod(character, 2) + 1);
    });
    total += (character.charclasses[0].thisclass.hitdie / 2 - 1);
    total += Number(character.hpmagic);
    return total;
  },
  incrementClassCount: function(spell, classCounts) {
    classCounts.forEach((cc) => {
      if (spell.class === cc.classname && spell.prepared) {
        cc.numprepped++;
      }
    });
  },
  initMod: function(character) {
    return this.statMod(character, 1) + Number(character.initmagic);
  },
  level: function(character) {
    return character.charclasses.reduce((level, a) => {
      return level + Number(a.level);
    }, 0);
  },
  numPrepped: function(classCounts, spells) {
    spells.level1.forEach((spell) => {
      this.incrementClassCount(spell, classCounts);
    });
    spells.level2.forEach((spell) => {
      this.incrementClassCount(spell, classCounts);
    });
    spells.level3.forEach((spell) => {
      this.incrementClassCount(spell, classCounts);
    });
    spells.level4.forEach((spell) => {
      this.incrementClassCount(spell, classCounts);
    });
    spells.level5.forEach((spell) => {
      this.incrementClassCount(spell, classCounts);
    });
    spells.level6.forEach((spell) => {
      this.incrementClassCount(spell, classCounts);
    });
    spells.level7.forEach((spell) => {
      this.incrementClassCount(spell, classCounts);
    });
    spells.level8.forEach((spell) => {
      this.incrementClassCount(spell, classCounts);
    });
    spells.level9.forEach((spell) => {
      this.incrementClassCount(spell, classCounts);
    });
  },
  saveDC: function(character, i) {
    return 8 + this.profbonus(character) + this.statMod(character, i) + Number(character.saveDCBonus[i]);
  },
  saveMod: function(character, i) {
    return this.statMod(character, i) + Number(character.savebonus[i]) + character.saves[i] * this.profbonus(character);
  },
  skillMod: function(character, skill) {
    return this.statMod(character, skill.stat) + Math.floor(Number(skill.prof) * this.profbonus(character)) + Number(skill.magic);
  },
  speedStat: function(character, i) {
    return Number(character.race.speed[i]) + Number(character.speedmagic[i]);
  },
  statTotal: function (character, i) {
    return Number(character.stats[i]) + Number(character.race.stats[i]) + Number(character.statbonus[i]);
  },
  statMod: function(character, i) {
    return Math.floor(this.statTotal(character, i) / 2) - 5;
  },
  totalPrepared: function(character) {
    let spells = character.spells;
    let classCounts = [];
    character.charclasses.forEach((a) => {
      let num = Math.floor(a.level * a.selsubclass.castermult + this.statMod(character, a.savedcstat));
      if (a.thisclass.name === "Sorcerer") {
        num = Math.min(a.level, 11) + 1;
        num += Math.floor(Math.max(0, Math.min(a.level, 17) - 11) / 2);
        if (character.housespellsknown && a.selsubclass.name !== "Wild Magic") {
          num += 2 + Math.floor(Math.min(a.level - 1, 8) / 2) * 2;
        }
      }
      if (a.thisclass.name === "Warlock") {
        num = Math.min(a.level, 9) + 1;
        num += Math.floor(Math.max(0, a.level - 9) / 2);
        if (character.housespellsknown) {
          num += 2 + Math.floor(Math.min(a.level - 1, 8) / 2) * 2;
        }
      }
      if (a.thisclass.name === "Wizard" && character.housespellsknown && a.level >= 2) {
        num += 1 + Math.floor(Math.min(a.level - 1, 8) / 2);
      }
      if (a.thisclass.name === "Bard") {
        num = this.bardPrepared(a);
      }
      if (a.thisclass.name === "Cleric") {
        num += 2 + Math.floor(Math.min(a.level - 1, 8) / 2) * 2;
      }
      if (a.thisclass.name === "Ranger" && a.level >= 2) {
        num = Math.ceil(a.level / 2) + 1;
        if (((a.selsubclass.name !== "Hunter Conclave" && a.selsubclass.name !== "Beast Master") || character.housespellsknown) && a.level >= 3) {
          num += (Math.floor((a.level - 1) / 4) + 1);          
        }
      }
      if (a.thisclass.name === "Paladin" && a.level > 2) {
        num += (Math.floor((a.level - 1) / 4) + 1) * 2;
      }
      if ((a.thisclass.name === "Fighter" && a.selsubclass.name === "Eldritch Knight") ||
          (a.thisclass.name === "Rogue" && a.selsubclass.name === "Arcane Trickster")) {
        num = this.thirdCasterPrepared(a);
      }
      num += Number(a.bonusknown);
      classCounts.push({
        classname: a.thisclass.name,
        maxprepped: num,
        numprepped: 0
      });
    });
    this.numPrepped(classCounts, spells);
    return classCounts;
  },
  cantripsknown: function(character) {
    var cantrips = character.charclasses.reduce((a, b) => {
      let classcantrips = 0;
      if (Number(b.level) >= b.thisclass.cantriplevel && b.thisclass.cantrips > 0) {
        classcantrips = b.thisclass.cantrips;
        if (b.selsubclass.castermult === 1 || b.thisclass.name === "Warlock") {
          if (Number(b.level) >= 4) {
            classcantrips++;
          }
          if (Number(b.level) >= 10) {
            classcantrips++;
          }
        } else {
          if (Number(b.level) >= 10) {
            classcantrips++;
          }
          if (Number(b.level) >= 14) {
            classcantrips++;
          }
        }
      } else if ((b.selsubclass.name === "Eldritch Knight" || b.selsubclass.name === "Arcane Trickster") && Number(b.level) >= 3) {
        classcantrips = 2;
        if (b.selsubclass.name === "Arcane Trickster") {
          classcantrips++;
        }
        if (Number(b.level) >= 10) {
          classcantrips++;
        }
      }
      if (b.selsubclass.name === "Aberrant Mind") {
        classcantrips++;
      }
      return a + classcantrips;
    }, 0);
    cantrips += Number(character.bonuscantrips);
    return cantrips;
  },
  profbonus: function(character) {
    var level = character.charclasses.reduce((a, b) => {
      return a + Number(b.level);
    }, 0);
    return Math.ceil(level / 4) + 1;
  },
  thirdCasterPrepared: function(a) {
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
  totalGold: function(character) {
    return dec(character.cp).div(100)
      .add(dec(character.sp).div(10))
      .add(dec(character.gp))
      .add(dec(character.pp).mul(10))
      .add(dec(character.art))
      .add(dec(character.gems)).toNumber();
  },
  totalSlots: function(character, level) {
    let index = 0;
    if (level === 'cantrip') {
      return 'infinite';
    } else {
      index = Number(level.substring(5)) - 1;
    }
    let casterlevel = 0;
    let numcasterclasses = character.charclasses.reduce((a, b) => {
      if (b.selsubclass.castermult > 0) {
        return a + 1;
      } else {
        return a;
      }
    }, 0);
    if (numcasterclasses <= 1) {
      character.charclasses.forEach((a) => {
        casterlevel += Math.ceil(Number(a.level) * Number(a.selsubclass.castermult));
      });
    } else {
      character.charclasses.forEach((a) => {
        if (a.thisclass.name === "Artificer") {
          casterlevel += Math.ceil(Number(a.level) * Number(a.selsubclass.castermult));
        }
        casterlevel += Math.floor(Number(a.level) * Number(a.selsubclass.castermult));
      });
    }
    try {
      return this.slots[casterlevel][index] + Number(character.bonusslots[index]);
    } catch (e) {
      return 0;
    }
  },
  warlockSlots: function(character) {
    var slots = 0;
    character.charclasses.forEach((a) => {
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
        slots += Number(character.warlockslotsmagic);
      } else if (a.thisclass.name === "Warlock (Homebrew)" && a.level >= 1) {
        slots = Math.floor((a.level + 7) / 4);
      }
    });
    return slots;
  },
  warlockSlotLevel: function(character) {
    return Math.min(character.charclasses.reduce((level, a) => {
      if (a.thisclass.name === "Warlock") {
        level = Math.ceil(Number(a.level) / 2.0);
      }
      return level;
    }, 0), 5);
  }
};
