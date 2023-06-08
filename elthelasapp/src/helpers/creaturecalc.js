export default {
  hp (creature) {
    return this.basehp(creature) + this.pp(creature);
  },
  basehp (creature) {
    let conmod = this.statMod(creature, 2);
    let diesize = 10.5;
    if (creature.size === "tiny") {
      diesize = 2.5;
    } else if (creature.size === "small") {
      diesize = 3.5;
    }else if (creature.size === "medium") {
      diesize = 4.5;
    } else if (creature.size === "large") {
      diesize = 5.5;
    } else if (creature.size === "huge") {
      diesize = 6.5;
    }
    return Math.floor((conmod + diesize) * creature.hitdice);
  },
  pp (creature) {
    return creature.pc * creature.hitdice;
  },
  statMod (creature, i) {
    return Math.floor(creature.stats[i] / 2) - 5;
  },
  prof (creature) {
    return Math.floor((creature.hitdice - 1) / 4) + 2;
  },
  saveMod (creature, i) {
    return creature.saves[i] ? this.prof(creature) + this.statMod(creature, i) : this.statMod(creature, i);
  },
  attMod (creature, i) {
    return this.prof(creature) + this.statMod(creature, i);
  },
  saveDC (creature, i) {
    return 8 + this.prof(creature) + this.statMod(creature, i);
  }
}