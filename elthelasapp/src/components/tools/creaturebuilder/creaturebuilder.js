import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      creature: "builderCreature"
    })
  },
  methods: {
    ...mapActions({
      saveNewCreature: "saveNewCreature",
      resetCreature: "resetCreature",
      saveCreature: "saveCreature",
      getCreature: "getCreatureForEdit"
    }),
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
      this.$router.push('/runner');
    }
  },
  created () {
    if (this.$route.params.id) {
      this.getCreature(this.$route.params.id);
    }
  }
}