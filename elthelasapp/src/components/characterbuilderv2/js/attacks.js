import droll from 'droll';
import { useCharacterv2Store, useUserStore } from '@/stores/index';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const characters = useCharacterv2Store();
    const userinfo = useUserStore();
    
    const { character, getAttBonus, getStatMod, getAttackBonus, getDamageBonus } = storeToRefs(characters);

    const removeAttack = characters.removeAttack;

    return {
      characters,
      userinfo,
      character,
      getAttBonus,
      getStatMod,
      getAttackBonus,
      getDamageBonus,
      removeAttack
    }
  },
  data () {
    return {
      newattack: { name: "", stat: 0, bonus: 0, damage: [ { dice: "", dtype: "", damagebonus: 0, addstat: false } ], range: "", type: "", edit: false, prof: true, advantage: false, rolls: {}, rolled: false, roll: false, critRange: 20 },
      attackmodal: false
    };
  },
  methods: {
    addAttack() {
      this.character.attacks.push(this.newattack);
      this.newattack = { name: "", stat: 0, bonus: 0, damage: [ { dice: "", dtype: "", damagebonus: 0, addstat: false } ], range: "", type: "", edit: false, prof: true, advantage: false, rolls: {}, rolled: false, roll: false, critRange: 20 };
      this.attackmodal = false;
    },
    addDamage (attack) {
      attack.damage.push({ dice: "", dtype: "", damagebonus: 0, addstat: false });
    },
    removeDamage (attack, i) {
      attack.damage.splice(i, 1);
    },
    rerollDie(die, arr, i, att) {
      arr[i] = droll.roll(die).total;
      let v = this;
      att.rolls.damage.forEach((d) => {
        d.total = d.dRoll.rolls.reduce((acc, cur) => {
          return acc + cur;
        }, 0) + Number(d.damagebonus) + (d.addstat ? Number(v.getStatMod(att.stat)) : 0) + (att.rolls.crit ? d.critRoll.total : 0);
      });
      att.rolls.totalDamage = att.rolls.damage.reduce((acc, d) => {
        return acc + d.total;
      }, 0);
      this.$forceUpdate();
    },
    parse(roll) {
      return droll.parse(roll);
    },
    rollAttack(att) {
      att.rolls = {};
      att.rolls.elvenAccuracy = this.character.feats.reduce((a, b) => {
        return (b.name === "Elven Accuracy") || a;
      }, false) && (att.stat === 1 || att.stat === 3 || att.stat === 4 || att.stat === 5);
      att.rolls.rawRoll = Number(droll.roll('1d20'));
      att.rolls.firstRoll = att.rolls.rawRoll;
      att.rolls.secondRoll = Number(droll.roll('1d20'));
      att.rolls.thirdRoll = Number(droll.roll('1d20'));
      if ((att.advantage === "advantage" && att.rolls.secondRoll > att.rolls.rawRoll) || (att.advantage === "disadvantage" && att.rolls.secondRoll < att.rolls.rawRoll)) {
        att.rolls.rawRoll = att.rolls.secondRoll;
      }
      if (att.rolls.advantage === "advantage" && att.rolls.elvenAccuracy && att.rolls.thirdRoll > att.rolls.rawRoll) {
        att.rolls.rawRoll = att.rolls.thirdRoll;
      }
      att.rolls.toHit = att.rolls.rawRoll + Number(this.getAttackBonus(att));
      att.rolls.crit = false;
      if (att.rolls.rawRoll >= Number(att.critRange)) {
        att.rolls.crit = true;
      }
      att.rolls.damage = att.damage.map((d) => {
        let rolls = { ...d };
        rolls.dRoll = droll.roll(d.dice);
        rolls.critRoll = droll.roll(d.dice);
        rolls.total = rolls.dRoll.total + this.getDamageBonus(d, att.stat) + (att.rolls.crit ? rolls.critRoll.total : 0);
        return rolls;
      });
      att.rolls.totalDamage = att.rolls.damage.reduce((acc, d) => {
        return acc + d.total;
      }, 0);
      att.rolled = true;
      this.$forceUpdate();
    }
  }
};
