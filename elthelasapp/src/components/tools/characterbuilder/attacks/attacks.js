import { mapGetters, mapActions } from 'vuex';
import droll from 'droll';

export default {
  computed: {
    ...mapGetters({
      character: 'getCharacter',
      getAttBonus: 'getAttBonus',
      getAttackBonus: "getAttackBonus",
      getAttackDamageBonus: "getAttackDamageBonus"
    })
  },
  data () {
    return {
      newattack: { name: "", stat: 0, bonus: 0, addstat: false, damage: "", range: "", type: "", dtype: "", edit: false, damagebonus: 0, prof: true, damage2: "", dtype2: "", critRange: 20, damagebonus2: 0, damage3: "", damagebonus3: 0, dtype3: "", advantage: false, rolls: {}, rolled: false, roll: false },
      attackmodal: false
    };
  },
  methods: {
    ...mapActions({
      removeAttack: "removeAttack"
    }),
    addAttack() {
      this.character.attacks.push(this.newattack);
      this.newattack = { name: "", stat: 0, bonus: 0, addstat: false, damage: "", range: "", type: "", dtype: "", edit: false, damagebonus: 0, prof: true, damage2: "", dtype2: "", critRange: 20, damagebonus2: 0, damage3: "", damagebonus3: 0, dtype3: "", advantage: false, rolls: {}, rolled: false, roll: false };
      this.attackmodal = false;
    },
    rerollDie(die, arr, i, att) {
      arr[i] = droll.roll(die).total;
      console.log(arr[i]);
      console.log(att.rolls.dRoll1.total);
      att.rolls.total1 = att.rolls.dRoll1.rolls.reduce((acc, cur) => {
        return acc + cur;
      }, 0) + this.getAttackDamageBonus(att) + (att.rolls.crit ? att.rolls.critRoll1.rolls.reduce((acc, cur) => {
        return acc + cur;
      }, 0) : 0);
      att.rolls.totalDamage = att.rolls.total1;
      if (att.rolls.dRoll2) {
        att.rolls.total2 = att.rolls.dRoll2.rolls.reduce((acc, cur) => {
          return acc + cur;
        }, 0) + Number(att.damagebonus2) + (att.rolls.crit ? att.rolls.critRoll2.rolls.reduce((acc, cur) => {
          return acc + cur;
        }, 0) : 0);
        att.rolls.totalDamage += att.rolls.total2;
      }
      if (att.rolls.dRoll3) {
        att.rolls.total3 = att.rolls.dRoll3.rolls.reduce((acc, cur) => {
          return acc + cur;
        }, 0) + Number(att.damagebonus3) + (att.rolls.crit ? att.rolls.critRoll3.rolls.reduce((acc, cur) => {
          return acc + cur;
        }, 0) : 0);
        att.rolls.totalDamage += att.rolls.total3;
      }
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
      att.rolls.dRoll1 = droll.roll(att.damage);
      att.rolls.critRoll1 = droll.roll(att.damage);
      att.rolls.dRoll2 = att.damage2 ? droll.roll(att.damage2) : false;
      att.rolls.critRoll2 = droll.roll(att.damage2);
      att.rolls.dRoll3 = att.damage3 ? droll.roll(att.damage3) : false;
      att.rolls.critRoll3 = droll.roll(att.damage3);
      att.rolls.total1 = att.rolls.dRoll1.total + Number(this.getAttackDamageBonus(att)) + (att.rolls.crit ? att.rolls.critRoll1.total : 0);
      att.rolls.totalDamage = att.rolls.total1;
      if (att.rolls.dRoll2) {
        att.rolls.total2 = att.rolls.dRoll2.total + Number(att.damagebonus2) + (att.rolls.crit ? att.rolls.critRoll2.total : 0);
        att.rolls.totalDamage += att.rolls.total2;
      }
      if (att.rolls.dRoll3) {
        att.rolls.total3 = att.rolls.dRoll3.total + Number(att.damagebonus3) + (att.rolls.crit ? att.rolls.critRoll3.total : 0);
        att.rolls.totalDamage += att.rolls.total3;
      }
      att.rolled = true;
    }
  }
};
