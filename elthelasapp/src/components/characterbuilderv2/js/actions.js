import { useCharacterv2Store, useUserStore } from '@/stores/index';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const characters = useCharacterv2Store();
    const userinfo = useUserStore();

    const { character, warlockSlotLevel } = storeToRefs(characters);

    const castSpell = characters.castSpell;

    return {
      characters,
      userinfo,
      character,
      warlockSlotLevel,
      castSpell
    }
  },
  computed: {
    actions () {
      let actions = [ ...this.baseActions ];
      this.character.actions.forEach((a) => {
        if (a.actiontype === 'action') {
          if (typeof a.show === 'undefined') { a.show = false; }
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
          if (this.warlockSlotLevel >= Number(b.level) && this.character.warlockslotsavailable > 0) {
            slotsAvailable = true;
          }
          if (b.castingTime === '1 action' && (b.level === 'cantrip' || (b.prepared && slotsAvailable))) {
            if (typeof b.id === 'undefined') {
              b.id = Date.now() + Math.random();
              b.name = "Cast " + b.title;
              b.show = false;
            }
            actions.push(b);
          }
        });
      });
      return actions;
    },
    bonus () {
      let actions = [];
      this.character.actions.forEach((a) => {
        if (a.actiontype === 'bonus') {
          if (typeof a.show === 'undefined') { a.show = false; }
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
          if (this.warlockSlotLevel >= Number(b.level) && this.character.warlockslotsavailable > 0) {
            slotsAvailable = true;
          }
          if (b.castingTime === '1 bonus action' && (b.level === 'cantrip' || (b.prepared && slotsAvailable))) {
            if (typeof b.id === 'undefined') {
              b.id = Date.now() + Math.random();
              b.name = "Cast " + b.title;
              b.show = false;
            }
            actions.push(b);
          }
        });
      });
      return actions;
    },
    reactions () {
      let actions = [ ...this.baseReactions ];
      this.character.actions.forEach((a) => {
        if (a.actiontype === 'reaction') {
          if (typeof a.show === 'undefined') { a.show = false; }
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
          if (this.warlockSlotLevel >= Number(b.level) && this.character.warlockslotsavailable > 0) {
            slotsAvailable = true;
          }
          if (b.castingTime.includes('reaction') && (b.level === 'cantrip' || (b.prepared && slotsAvailable))) {
            if (typeof b.id === 'undefined') {
              b.id = Date.now() + Math.random();
              b.name = "Cast " + b.title;
              b.show = false;
            }
            actions.push(b);
          }
        });
      });
      return actions;
    }
  },
  data: function () {
    return {
      baseActions: [
        { id: 8, name: "Attack", description: "Attack with a weapon, unarmed strike, grapple (opposed athletics), or shove", show: false },
        { id: 0, name: "Dash", description: "you gain extra movement for the current turn. The increase equals your speed, after applying any modifiers.", show: false },
        { id: 11, name: "Delay", description: "Immediately end your turn so you can take it later. Must be done before any other action or movement of any kind. bad stuff still happens now. Good stuff happens when you do take your turn." },
        { id: 1, name: "Disenage", description: "your movement doesn’t provoke opportunity attacks for the rest of the turn.", show: false },
        { id: 2, name: "Dodge", description: "Until the start of your next turn, any attack roll made against you has disadvantage if you can see the attacker, and you make Dexterity saving throws with advantage.", show: false },
        { id: 3, name: "Help", description: "the creature you aid gains advantage on the next ability check it makes to perform the task you are helping with, provided that it makes the check before the start of your next turn.", show: false },
        { id: 4, name: "Hide", description: "you make a Dexterity (Stealth) check in an attempt to hide, following the rules in chapter 7 for hiding. If you succeed, you gain certain benefits, as described in the “Unseen Attackers and Targets” section", show: false },
        { id: 5, name: "Ready", description: "decide what perceivable circumstance will trigger your reaction. Then, you choose the action you will take in response to that trigger, or you choose to move up to your speed in response to it. When the trigger occurs, you can either take your reaction right after the trigger finishes or ignore the trigger.", show: false },
        { id: 10, name: "Run", description: "you gain extra movement for the current turn, but have disadvantage on dex saves and attack rolls, and enemies have advantage to hit you. The increase equals twice your speed.", show: false },
        { id: 6, name: "Search", description: "you devote your attention to finding something.", show: false },
        { id: 7, name: "Use an Object", description: "When an object requires your action for its use, you take the Use an Object action.", show: false },
        { id: 12, name: "First Aid", description: "Attempt to stabilize a creature, or if you have a healers kit, use it to heal them for 2d4+2", show: false },
        { id: 13, name: "Repair Armor", description: "Use tools and a repair kit to fix someones armor for 2d4+2 protection points", show: false }
      ],
      baseReactions: [
        { id: 9, name: "Opportunity Attack", description: "When an opponent moves out of your reach you can use a reaction to make 1 attack against them", show: false }
      ],
      showstandard: false,
      addActionModal: false,
      newaction: {
        name: "",
        description: "",
        actiontype: "action",
        id: Date.now(),
        useradd: true,
        resourceused: false,
        show: false
      }
    };
  },
  methods: {
    forceUpdate() {
      this.$forceUpdate();
    },
    addAction() {
      this.character.actions.push(this.newaction);
      this.newaction = {
        name: "", description: "", actiontype: "action", id: Date.now(), useradd: true, resourceused: false, show: false
      };
    },
    doAction (action) {
      let res = this.character.resources.filter((a) => {
        return a.name === action.resourceused.name;
      })[0];
      res.current--;
      this.$forceUpdate();
    },
    resourceAvailable (action) {
      let res = this.character.resources.filter((a) => {
        return a.name === action.resourceused.name;
      })[0];
      return res.current > 0;
    },
    deleteAction(action) {
      if (confirm("Are you sure you want to delete this action?")) {
        this.character.actions.splice(this.character.actions.findIndex((a) => {
          return a.id === action.id;
        }), 1);
      }
    }
  }
};
