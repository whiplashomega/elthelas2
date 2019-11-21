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
      resetCreature: "resetCreature"
    }),
    addTag () {
      this.creature.tags.push("");
    },
    removeTag (i) {
      this.creature.tags.splice(i, 1);
    },
    addSkill () {
      this.creature.skills.push("");
    },
    removeSkill (i) {
      this.creature.skills.splice(i, 1);
    },
    submitCreature () {
      this.saveNewCreature(this.creature);
    }
  }
}