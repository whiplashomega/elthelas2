import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      "character": "getCharacter"
    }),
    actions () {
      let actions = [];
      this.character.actions.forEach((a) => {
        if (a.actiontype === 'action') {
          actions.push(a);
        }
      });
      this.character.attacks.forEach((a) => {
        actions.push({
          id: Date.now() + Math.random(),
          name: "Attack with " + a.name,
          description: ""
        });
      });
      Object.keys(this.character.spells).forEach((a) => {
        this.character.spells[a].forEach((b) => {
          let slotsAvailable = false;
          for (var x = Number(b.level); x <= 9; x++) {
            if (this.character.availableslots["level" + x] > 0) {
              slotsAvailable = true;
            }
          }
          if (b.castingTime === '1 action' && (b.level === 'cantrip' || (b.prepared && slotsAvailable))) {
            actions.push({
              id: Date.now() + Math.random(),
              name: "Cast " + b.title,
              description: b.description
            });
          }
        });
      });
      return actions;
    },
    bonus () {
      let actions = [];
      this.character.actions.forEach((a) => {
        if (a.actiontype === 'bonus') {
          actions.push(a);
        }
      });
      Object.keys(this.character.spells).forEach((a) => {
        this.character.spells[a].forEach((b) => {
          let slotsAvailable = false;
          for (var x = Number(b.level); x <= 9; x++) {
            if (this.character.availableslots["level" + x] > 0) {
              slotsAvailable = true;
            }
          }
          if (b.castingTime === '1 bonus action' && (b.level === 'cantrip' || (b.prepared && slotsAvailable))) {
            actions.push({
              id: Date.now() + Math.random(),
              name: "Cast " + b.title,
              description: b.description
            });
          }
        });
      });
      return actions;
    },
    reactions () {
      let actions = [];
      this.character.actions.forEach((a) => {
        if (a.actiontype === 'reaction') {
          actions.push(a);
        }
      });
      this.character.attacks.forEach((a) => {
        actions.push({
          id: Date.now() + Math.random(),
          name: "Attack with " + a.name,
          description: ""
        });
      });
      Object.keys(this.character.spells).forEach((a) => {
        this.character.spells[a].forEach((b) => {
          let slotsAvailable = false;
          for (var x = Number(b.level); x <= 9; x++) {
            if (this.character.availableslots["level" + x] > 0) {
              slotsAvailable = true;
            }
          }
          if (b.castingTime.contains('reaction') && (b.level === 'cantrip' || (b.prepared && slotsAvailable))) {
            actions.push({
              id: Date.now() + Math.random(),
              name: "Cast " + b.title,
              description: b.description
            });
          }
        });
      });
      return actions;
    }
  },
  data: function () {
    return {
      showstandard: false,
      addActionModal: false,
      newaction: {
        name: "",
        description: "",
        actiontype: "action",
        id: Date.now(),
        useradd: true
      }
    };
  },
  methods: {
    addAction() {
      this.character.actions.push(this.newaction);
      this.newaction = {
        name: "", description: "", actiontype: "action", id: Date.now(), useradd: true
      };
    },
    deleteAction(action) {
      this.character.actions.splice(this.character.actions.findIndex((a) => {
        return a.id === action.id;
      }), 1);
    }
  }
};
