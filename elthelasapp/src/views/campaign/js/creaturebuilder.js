import { useCreaturev2Store } from '@/stores/index';
import { storeToRefs } from 'pinia';
import { useMeta } from 'vue-meta';
import creature from '../creature.vue';

function newattack () {
  return {
    id: Math.random(),
    name: "", 
    stat: 0, 
    bonus: 0, 
    damage: [ { dice: "1d4", dtype: "Piercing", damagebonus: 0, addstat: true } ], 
    range: "5", 
    type: "Melee Weapon Attack", 
    prof: true,
    attroll: true,
    save: false,
    savestat: "Constitution",
    savedamage: [ { dice: "1d4", dtype: "Piercing", damagebonus: 0, addstat: false } ],
    extra: "",
    saveextra: ""
  };
}
export default {
  setup () {
    const creatureStore = useCreaturev2Store();
    const { builderCreature: creature } = storeToRefs(creatureStore);
    const { saveNewCreature, resetCreature, saveCreature, getCreatureForEdit: getCreature } = creatureStore;
    useMeta({ title: "Creature Builder" });
    return {
      creature, saveNewCreature, resetCreature, saveCreature, getCreature
    };
  },
  components: {
    creature
  },
  methods: {
    addFeature () {
      this.creature.features.push({ id: Math.random(), name: "", description: "" });
    },
    removeFeature (i) {
      this.creature.features.splice(i, 1);
    },
    addAction () {
      this.creature.actions.push({ id: Math.random(), name: "", description: "", type: "Standard", attacks: [] });
    },
    removeAction (i) {
      this.creature.actions.splice(i, 1);
    },
    addAttack () {
      this.creature.attacks.push(newattack());
    },
    removeAttack (i) {
      this.creature.attacks.splice(i, 1);
    },
    addAttackToAction (action) {
      action.attacks.push({ id: Math.random(), attack: newattack(), num: 1 });
    },
    removeAttackFromAction (action, i) {
      action.attacks.splice(i, 1);
      action.id = Math.random();
    },
    removeDmg (attack, i) {
      attack.damage.splice(i, 1);
    },
    removeSaveDmg (attack, i) {
      attack.savedamage.splice(i, 1);
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
    loadImage () {
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
      this.getCreature(this.$route.params.id);
    }
  }
};
