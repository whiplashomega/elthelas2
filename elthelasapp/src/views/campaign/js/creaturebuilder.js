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
      this.getCreature(this.$route.params.id);
    }
  }
};
