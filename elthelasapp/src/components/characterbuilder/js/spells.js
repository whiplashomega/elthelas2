import { useCharacterStore, useStaticsStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
import { marked } from '@/../node_modules/marked/lib/marked.esm.js';

export default {
  setup () {
    const characters = useCharacterStore();
    const statics = useStaticsStore();
    
    const { character, getAttBonus, getSaveDC, getSlots: slots, warlockSlots, warlockSlotLevel, totalslots, getTotalPrepared: numprepared, cantripsKnown: cantrips } = storeToRefs(characters);
    const { spells } = statics;
    
    const { castSpell } = characters;
    
    return {
      marked, character, getAttBonus, getSaveDC, slots, warlockSlots, warlockSlotLevel, totalslots, numprepared, cantrips, spells,
      
      castSpell
    };
  },
  computed: {
    cantripspicked: function () {
      return this.character.spells.cantrip.length;
    },
    filteredspells () {
      var filters = this.spellfilter.split(' ');
      if (this.spellfilter === "") {
        return this.spells.filter((a) => {
          var inclass = a.tags.some((el) => {
            if (this.classfilter === "all") {
              return true;
            }
            return this.classfilter === el;
          });
          if ((inclass && this.levelfilter === "all") || (inclass && a.level === this.levelfilter)) {
            return true;
          }
          return false;
        });
      }
      if (this.levelfilter === "nonsense") {
        return this.levelfilter;
      }
      return this.spells.filter((a) => {
        var success = false;
        var successarray = [];
        filters.forEach((b) => {
          for (var prop in a) {
            if (typeof a[prop] === 'string') {
              if (a[prop].toLowerCase().includes(b)) {
                successarray.push(true);
                break;
              }
            }
          }
          if (successarray.length >= filters.length) {
            var inclass = a.tags.some((el) => {
              if (this.classfilter === "all") {
                return true;
              }
              return this.classfilter === el;
            });
            if ((inclass && this.levelfilter === "all") || (inclass && a.level === this.levelfilter)) {
              success = true;
            }
          }
        });
        return success;
      });
    }
  },
  data () {
    return {
      preparedonly: false,
      classfilter: "all",
      levelfilter: "all",
      spellfilter: "",
      selspell: {},
      selspellclass: "",
      spellModal: false,
      spellDetailModal: false,
      detailspell: { level: "cantrip", description: "", tags: [] },
      displayLevel: "cantrip"
    };
  },
  methods: {
    spellDetail(spell) {
      this.detailspell = spell;
      this.spellDetailModal = true;
    },
    addSpell(spell) {
      let level = "";
      if (spell) {
        spell.class = this.selspellclass;
        if (spell.level !== 'cantrip') {
          level = 'level' + spell.level;
        } else {
          level = spell.level;
        }
        var exists = this.character.spells[level].includes(spell);

        if (!exists) {
          spell.castLevel = spell.level;
          this.character.spells[level].push(spell);
        }
        this.spellModal = false;
      }
    },
    removeSpell(spell) {
      if (confirm("Are you sure you want to delete " + spell.title + " from your spellbook?")) {
        this.character.spells[this.displayLevel].splice(this.character.spells[this.displayLevel].indexOf(spell), 1);
      }
    },
    sortSpells (spells) {
      var x = spells.slice(0);
      x.sort((b, c) => {
        if (b.title > c.title) {
          return 1;
        } else if (c.title > b.title) {
          return -1;
        }
        return 0;
      });
      return x.filter((a) => {
        if ((a.prepared && this.preparedonly) || !this.preparedonly || this.displaylevel === 'cantrip') {
          return true;
        } else { return false }
      });
    }
  }
};
