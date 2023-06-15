import { useCreatureStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
import { useMeta } from 'vue-meta';
import creaturecalc from '@/helpers/creaturecalc';
export default {
  setup () {
    const creatureStore = useCreatureStore();
    const { builderCreature: creature } = storeToRefs(creatureStore);
    const { saveNewCreature, resetCreature, saveCreature, getCreatureForEdit: getCreature } = creatureStore;
    useMeta({ title: "Creature Builder" });
    return {
      creature, saveNewCreature, resetCreature, saveCreature, getCreature, creaturecalc
    };
  },
  methods: {
    loadimage () {
      if (document.getElementById('imageload')) {
        var f = document.getElementById('imageload').files[0];
        var r = new FileReader();
        r.addEventListener("load", () => {
          this.creature.image = r.result;
        }, false);
        if (f) {
          r.readAsDataURL(f);
        }
      }
    },
    addTag () {
      this.creature.tags.push({ id: Math.random(), name: "" });
    },
    removeTag (i) {
      this.creature.tags.splice(i, 1);
    },
    addSkill () {
      this.creature.skills.push({ id: Math.random(), value: "" });
    },
    removeSkill (i) {
      this.creature.skills.splice(i, 1);
    },
    submitCreature () {
      if (this.creature._id) {
        this.saveCreature(this.creature);
      } else {
        this.saveNewCreature(this.creature);
      }
      this.resetCreature();
      this.$router.push('/tools/runner');
    },
    checkCreature () {
      let valid = true;
      let reason = "";
      if (this.creature.ac == "") {
        valid = false;
        reason += "Must have a value for AC. ";
      }
      if (valid) {
        this.submitCreature();
      } else {
        alert(reason);
      }
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.getCreature(this.$route.params.id).then(() => {
        //conversion validation
        console.log(this.creature.stats);
        if (this.creature.stats.length === 0) {
          this.creature.stats = [this.creature.str, this.creature.dex, this.creature.con, this.creature.int, this.creature.wis, this.creature.cha];
          var gen = Math.random();
          var res = "slashing";
          if (gen < 0.34) {
            res = "bludgeoning";
          } else if (gen < 0.67) {
            res = "piercing";
          }
          this.creature.damageresistances = this.creature.damageresistances.replace("bludgeoning, piercing, and slashing from nonmagical attacks", res);
          this.creature.damageimmunities = this.creature.damageimmunities.replace("bludgeoning, piercing, and slashing from nonmagical attacks", res);
          this.creature.damageresistances = this.creature.damageresistances.replace("bludgeoning, piercing, and slashing from nonmagical weapons", res);
          this.creature.damageimmunities = this.creature.damageimmunities.replace("bludgeoning, piercing, and slashing from nonmagical weapons", res);
          if (this.creature.acdesc.includes ("chain shirt") && this.creature.pc != 1) {
            this.creature.acdesc = this.creature.acdesc.replace("chain shirt", "chain cuirass");
            this.creature.ac = 11 + Math.max(0, Math.min(creaturecalc.statMod(this.creature, 1), 4));
            this.creature.pc = 1;
            this.creature.ac += this.creature.acdesc.includes("shield") ? 2 : 0;
          } else if (this.creature.acdesc.includes ("leather armor")) {
            this.creature.acdesc = this.creature.acdesc.replace("leather armor", "leather cuirass");
            this.creature.ac = 11 + Math.max(0, Math.min(creaturecalc.statMod(this.creature, 1), 99));
            this.creature.pc = 0;
            this.creature.ac += this.creature.acdesc.includes("shield") ? 2 : 0;
          }  else if (this.creature.acdesc.includes("studded leather")) {
            this.creature.acdesc = this.creature.acdesc.replace("studded leather", "Leather Hauberk");
            this.creature.ac = 12 + Math.max(Math.min(creaturecalc.statMod(this.creature, 1), 4), 0);
            this.creature.pc = 0;
            this.creature.ac += this.creature.acdesc.includes("shield") ? 2 : 0;
          } else if (this.creature.acdesc.includes("chain mail")) {
            this.creature.acdesc = this.creature.acdesc.replace("chain mail", "Chain Full Armor");
            this.creature.ac = 15 + Math.max(Math.min(creaturecalc.statMod(this.creature, 1), 1), 0);
            this.creature.pc = 4;
            this.creature.ac += this.creature.acdesc.includes("shield") ? 2 : 0;
          } else if (this.creature.acdesc.includes("splint mail")) {
            this.creature.acdesc = this.creature.acdesc.replace("splint mail", "Scale Full Armor");
            this.creature.ac = 16 + Math.max(Math.min(creaturecalc.statMod(this.creature, 1), 1), 0);
            this.creature.pc = 3;
            this.creature.ac += this.creature.acdesc.includes("shield") ? 2 : 0;
          } else if (this.creature.acdesc.includes("scale mail")) {
            this.creature.acdesc = this.creature.acdesc.replace("scale mail", "Scale Hauberk");
            this.creature.ac = 15 + Math.max(Math.min(creaturecalc.statMod(this.creature, 1), 2), 0);
            this.creature.pc = 1;
            this.creature.ac += this.creature.acdesc.includes("shield") ? 2 : 0;
          } else if (this.creature.acdesc.includes("splint armor")) {
            this.creature.acdesc = this.creature.acdesc.replace("splint armor", "Scale Full Armor");
            this.creature.ac = 16 + Math.max(Math.min(creaturecalc.statMod(this.creature, 1), 1), 0);
            this.creature.pc = 3;
            this.creature.ac += this.creature.acdesc.includes("shield") ? 2 : 0;
          } else if (this.creature.acdesc.includes("plate")) {
            this.creature.acdesc = this.creature.acdesc.replace("plate", "steel plate full armor");
            this.creature.ac = 16 + Math.max(Math.min(creaturecalc.statMod(this.creature, 1), 0), 0);
            this.creature.pc = 4;
            this.creature.ac += this.creature.acdesc.includes("shield") ? 2 : 0;
          } else {
            this.creature.pc = 0;
          }
        }
      });
    }
  }
};
