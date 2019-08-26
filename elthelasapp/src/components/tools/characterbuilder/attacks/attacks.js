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
      newattack: { name: "", stat: 0, bonus: 0, addstat: false, damage: "", range: "", type: "", dtype: "", edit: false, damagebonus: 0, prof: true, damage2: "", dtype2: "", critRange: 20, damagebonus2: 0, damage3: "", damagebonus3: 0, dtype3: "", advantage: false },
      attackmodal: false
    };
  },
  methods: {
    ...mapActions({
      removeAttack: "removeAttack"
    }),
    addAttack() {
      this.character.attacks.push(this.newattack);
      this.newattack = { name: "", stat: 0, bonus: 0, addstat: false, damage: "", range: "", type: "", dtype: "", edit: false, damagebonus: 0, prof: true, damage2: "", dtype2: "", critRange: 20, damagebonus2: 0, damage3: "", damagebonus3: 0, dtype3: "", advantage: false };
      this.attackmodal = false;
    },
    rollAttack(attack) {
      var elvenAccuracy = this.character.feats.reduce((a, b) => {
        return (b.name === "Elven Accuracy") || a;
      }, false) && (attack.stat === 1 || attack.stat === 3 || attack.stat === 4 || attack.stat === 5);
      var rawRoll = Number(droll.roll('1d20'));
      var firstRoll = rawRoll;
      var secondRoll = Number(droll.roll('1d20'));
      var thirdRoll = Number(droll.roll('1d20'));
      if ((attack.advantage === "advantage" && secondRoll > rawRoll) || (attack.advantage === "disadvantage" && secondRoll < rawRoll)) {
        rawRoll = secondRoll;
      }
      if (attack.advantage === "advantage" && elvenAccuracy && thirdRoll > rawRoll) {
        rawRoll = thirdRoll;
      }
      var toHit = rawRoll + Number(this.getAttackBonus(attack));
      var crit = false;
      if (rawRoll >= Number(attack.critRange)) {
        crit = true;
      }
      var damageRoll1 = Number(droll.roll(attack.damage)) + (crit ? Number(droll.roll(attack.damage)) : 0);
      var damageRoll2 = attack.damage2 ? Number(droll.roll(attack.damage2)) + (crit ? Number(droll.roll(attack.damage2)) : 0) : 0;
      var damageRoll3 = attack.damage3 ? Number(droll.roll(attack.damage3)) + (crit ? Number(droll.roll(attack.damage3)) : 0) : 0;
      var damage1 = damageRoll1 + Number(this.getAttackDamageBonus(attack));
      var damage2 = damageRoll2 + Number(attack.damagebonus2);
      var damage3 = damageRoll3 + Number(attack.damagebonus3);
      var damageTotal = damage1 + damage2 + damage3;
      // build the alert
      var alertString = "Attack Roll = " + toHit + " (" + rawRoll + " + " + this.getAttackBonus(attack) + ")";
      if (crit) {
        alertString += " Critical Hit!";
      }
      if (attack.advantage) {
        alertString += " (All Rolls: " + firstRoll + " " + secondRoll + ((elvenAccuracy && attack.advantage === "advantage") ? " " + thirdRoll : "") + ")";
      }
      alertString += "\n\nDamage: " + damageTotal + " (" + damage1 + " " + attack.dtype;
      if (damage2) {
        alertString += " + " + damage2 + " " + attack.dtype2;
      }
      if (damage3) {
        alertString += " + " + damage3 + " " + attack.dtype3;
      }
      alertString += ")";
      alert(alertString);
    }
  }
};
