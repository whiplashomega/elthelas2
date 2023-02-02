import droll from 'droll';

export default {
  hp (creature) {
    let conmod = this.statMod(creature, 2);
    let diesize = 6.5;
    if (creature.size === "Tiny") {
      diesize = 3.5;
    } else if (creature.size === "Medium" || creature.size === "Small") {
      diesize = 4.5;
    } else if (creature.size === "Large") {
      diesize = 5.5;
    }
    return Math.floor((conmod + diesize) * creature.hitdice);
  },
  statMod (creature, i) {
    return Math.floor(creature.stats[i] / 2) - 5;
  },
  ac (creature) {
    let dexbonus = Math.min(creature.maxdex, this.statMod(creature, 1));
    return Number(creature.ac) + dexbonus;
  },
  prof (creature) {
    return Math.floor((creature.hitdice - 1) / 4) + 2;
  },
  saveMod (creature, i) {
    return creature.saves[i] ? this.prof(creature) + this.statMod(creature, i) : this.statMod(creature, i);
  },
  init (creature) {
    return this.statMod(creature, 1) + Number(creature.initmod);
  },
  skillMod (creature, skill) {
    let prof = skill.prof * this.prof(creature);
    return prof + this.statMod(creature, skill.stat) + Number(skill.magic);
  },
  passivePerception(creature) {
    let perception = creature.skills.filter((skill) => {
      return skill.name === "Perception";
    })[0];
    return 10 + this.skillMod(creature, perception);
  },
  attMod (creature, attack) {
    return this.prof(creature) + this.statMod(creature, attack.stat) + Number(attack.bonus);
  },
  dmgBonus (creature, attack, dmg) {
    return (dmg.addstat ? this.statMod(creature, attack.stat) : 0) + Number(dmg.damagebonus);
  },
  saveDC (creature, attack) {
    return 8 + this.prof(creature) + this.statMod(creature, attack.stat);
  },
  attackDPR (creature, attack) {
    let avgDamage = attack.attroll ? attack.damage.reduce((b, a) => {
      let hitChance = (this.attMod(creature, attack) + 2) * 0.05;
      let roll = droll.parse(a.dice);
      return (b + roll.avgResult + this.dmgBonus(creature, attack, a)) * hitChance;
    }, 0) : 0;
    avgDamage += attack.save ? attack.savedamage.reduce((b, a) => {
      let hitChance = (this.saveDC(creature, attack) - 5) * 0.05;
      let roll = droll.parse(a.dice);
      return (b + roll.avgResult + this.dmgBonus(creature, attack, a)) * hitChance;
    }, 0): 0;
    return avgDamage;
  },
  actionDPR (creature, action) {
    return action.attacks.reduce((b, a) => {
      return b + this.attackDPR(creature, a.attack) * a.num;
    }, 0);
  },
  DPR (creature) {
    let bestActionDPR = 0;
    let bestLegendaryDPR = 0;
    let bestBonusDPR = 0;
    let totalDPR = 0;
    creature.actions.forEach(action => {
      if (action.type === "Standard") {
        let dpr = this.actionDPR(creature, action);
        if (dpr > bestActionDPR) {
          bestActionDPR = dpr;
        }
      }
      if (action.type === "Legendary") {
        let dpr = this.actionDPR(creature, action);
        if (dpr > bestLegendaryDPR) {
          bestLegendaryDPR = dpr;
        }
      }
      if (action.type === "Bonus") {
        let dpr = this.actionDPR(creature, action);
        if (dpr > bestBonusDPR) {
          bestBonusDPR = dpr;
        }
      }
    });
    totalDPR = bestActionDPR + bestLegendaryDPR + bestBonusDPR;
    console.log(totalDPR);
    return totalDPR;
  },
  offensiveCR (creature) {
    let dpr = this.DPR(creature) / 5;
    dpr *= creature.crmods.hasaoe ? 1.25 : 1;
    return dpr;
  },
  hitDieSize (creature) {
    if (creature.size === "Tiny") {
      return 6;
    } else if (creature.size === "Small" || creature.size === "Medium") {
      return 8;
    } else if (creature.size === "Large") {
      return 10;
    } else {
      return 12;
    }
  },
  defensiveCR (creature) {
    let misschance = Math.max(0, (this.ac(creature) - 9) * 0.05);
    let rescount = 0;
    let immcount = 0;
    let vulcount = 0;
    for (var x in creature.dr) {
      if (creature.dr[x] === "resistance") {
        rescount++;
      } else if (creature.dr[x] === "immunity") {
        immcount++;
      } else if (creature.dr[x] === "vulnerable") {
        vulcount++;
      }
    }
    let adjustedHP = this.hp(creature) / (1 - misschance);
    adjustedHP *= (1 + 0.1 * rescount + 0.2 * immcount - 0.1 * vulcount);
    adjustedHP *= (creature.crmods.regeneration ? 1.2 : 1);
    adjustedHP *= (1 + creature.pc * 0.2);
    return adjustedHP / 25;
  },
  cr (creature) {
    return ((this.offensiveCR(creature) + this.defensiveCR(creature)) / 2).toPrecision(2);
  }
}