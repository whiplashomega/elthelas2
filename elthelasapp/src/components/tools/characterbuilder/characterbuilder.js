import { mapGetters, mapActions } from 'vuex';
import characterheader from '@/components/tools/characterbuilder/characterheader';
import abilityscores from '@/components/tools/characterbuilder/abilityscores';
import initiative from '@/components/tools/characterbuilder/initiative';
import appearance from '@/components/tools/characterbuilder/appearance';
import hitpoints from '@/components/tools/characterbuilder/hitpoints';
import buildclass from '@/components/tools/characterbuilder/buildclass';
import skills from '@/components/tools/characterbuilder/skills';
import combat from '@/components/tools/characterbuilder/combat';
import equipment from '@/components/tools/characterbuilder/equipment';
import loadsave from '@/components/tools/characterbuilder/loadsave';
// import test from '@/tests/unit/charbuilder.test.js';

export default {
  components: {
    characterheader,
    abilityscores,
    initiative,
    appearance,
    hitpoints,
    buildclass,
    skills,
    combat,
    equipment,
    loadsave
  },
  computed: {
    ...mapGetters({
      mobile: 'isMobile',
      spells: 'allSpells',
      feats: 'allFeats',
      character: 'getCharacter',
      getSaveDC: 'getSaveDC',
      getAttBonus: 'getAttBonus',
      pointbuy: "pointbuy",
      getSpeedStat: "getSpeedStat",
      getAttackBonus: "getAttackBonus",
      getAttackDamageBonus: "getAttackDamageBonus",
      slots: "getSlots",
      warlockSlots: "warlockSlots",
      warlockSlotLevel: "warlockSlotLevel",
      level: "level",
      totalslots: "totalslots",
      featsort: "featsort",
      statRolls: "getStatRolls"
    }),
    numASI () {
      var asi = 0;
      this.character.charclasses.forEach((cl) => {
        if (cl.level >= 4) {
          asi++;
        }
        if (cl.level >= 6 && (cl.thisclass.name === "Fighter" || cl.thisclass.name === "Factotum")) {
          asi++;
        }
        if (cl.level >= 8) {
          asi++;
        }
        if (cl.level >= 10 && (cl.thisclass.name === "Rogue")) {
          asi++;
        }
        if (cl.level >= 12) {
          asi++;
        }
        if (cl.level >= 14 && cl.thisclass.name === "Fighter") {
          asi++;
        }
        if (cl.level >= 16) {
          asi++;
        }
        if (cl.level >= 19) {
          asi++;
        }
      });
      asi += Number(this.character.bonusfeats);
      while (this.character.feats.length < asi) {
        this.character.feats.push({ name: "", prereq: "", description: "" });
      }
      if (this.character.feats.length > asi) {
        this.character.feats.length = asi;
      }
      return asi;
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
      buildHide: false,
      attackmodal: false,
      preparedonly: false,
      classfilter: "all",
      levelfilter: "all",
      spellfilter: "",
      selspell: {},
      selspellclass: "",
      newattack: { name: "", stat: 0, bonus: 0, addstat: false, damage: "", range: "", type: "", dtype: "", edit: false, damagebonus: 0, prof: true, damage2: "", dtype2: "" },
      newfeature: { name: "", description: "", show: false },
      newFeatureModal: false,
      spellModal: false,
      spellDetailModal: false,
      detailspell: { level: "cantrip", description: "", tags: [] },
      displayLevel: "cantrip",
      blankchar: {}
    };
  },
  filters: {
    date (value) {
      var date = new Date(value);
      return date.toLocaleString();
    }
  },
  methods: {
    ...mapActions({
      addInjury: "addInjury",
      removeInjury: "removeInjury",
      removeAttack: "removeAttack",
      removeArmor: "removeArmor",
      castSpell: "castSpell",
      rollStats: "rollStats"
    }),
    addAttack() {
      this.character.attacks.push(this.newattack);
      this.newattack = { name: "", stat: 0, bonus: 0, addstat: 0, damage: "", range: "", type: "", dtype: "", edit: false, damagebonus: 0, prof: true, damage2: "", dtype2: "" };
      this.attackmodal = false;
    },
    log(val) {
      console.log(val);
    },
    setval(object, attribute, value) {
      object[attribute] = value;
      this.$forceUpdate();
    },
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
    addFeature() {
      this.character.features.push(this.newfeature);
      this.newfeature = { name: "", description: "", show: false };
      this.newFeatureModal = false;
    },
    removeFeature(i) {
      this.character.features.splice(i, 1);
    },
    addResource() {
      this.character.resources.push({ name: "", current: 0, max: 0, recharge: "never" });
    },
    removeResource(i) {
      this.character.resources.splice(i, 1);
    },
    populateResources() {
      this.character.charclasses.forEach((a) => {
        if (a.thisclass.name === "Barbarian" && Number(a.level) < 20) {
          var rage = { name: "Rage", current: 2, max: 2, recharge: "longrest" };
          if (Number(a.level) >= 3) {
            rage.max++;
            rage.current++;
          } if (Number(a.level) >= 6) {
            rage.max++;
            rage.current++;
          } if (Number(a.level) >= 12) {
            rage.max++;
            rage.current++;
          } if (Number(a.level) >= 17) {
            rage.max++;
            rage.current++;
          }
          this.character.resources.push(rage);
        }
        if (a.thisclass.name === "Barbarian" && a.selsubclass.name === "Path of the Ancestral Guardian" && Number(a.level) >= 10) {
          this.character.resources.push({ name: "Consult the Spirits", current: 1, max: 1, recharge: "shortrest" });
        }
        if (a.thisclass.name === "Barbarian" && a.selsubclass.name === "Path of the Zealot") {
          if (a.level >= 6) {
            this.character.resources.push({ name: "Fanatical Focus", current: 1, max: 1, recharge: "never" });
          }
          if (a.level >= 10) {
            this.character.resources.push({ name: "Zealous Presence", current: 1, max: 1, recharge: "longrest" });
          }
        }
        if (a.thisclass.name === "Bard") {
          var inspiration = { name: "Bardic Inspiration", current: this.getStatMod(5), max: this.getStatMod(5), recharge: "longrest" };
          if (Number(a.level) >= 5) {
            inspiration.recharge = "shortrest";
          }
          this.character.resources.push(inspiration);
          if (a.selsubclass.name === "College of Glamour") {
            if (Number(a.level) >= 3) {
              this.character.resources.push({ name: "Enthralling Performance", current: 1, max: 1, recharge: "shortrest" });
            }
            if (Number(a.level) >= 6) {
              this.character.resources.push({ name: "Mantle of Majesty", current: 1, max: 1, recharge: "longrest" });
            }
            if (Number(a.level) >= 14) {
              this.character.resources.push({ name: "Unbreakable Majesty", current: 1, max: 1, recharge: "shortrest" });
            }
          }
          if (a.selsubclass.name === "College of Whispers") {
            if (Number(a.level) >= 6) {
              this.character.resources.push({ name: "Mantle of Whispers", current: 1, max: 1, recharge: "shortrest" });
            }
            if (Number(a.level) >= 14) {
              this.character.resources.push({ name: "Shadow Lore", current: 1, max: 1, recharge: "longrest" });
            }
          }
        }
        if (a.thisclass.name === "Cleric") {
          var channel = { name: "Channel Divinity", current: 1, max: 1, recharge: "shortrest" };
          if (Number(a.level) >= 6) {
            channel.current++;
            channel.max++;
          }
          if (Number(a.level) >= 18) {
            channel.current++;
            channel.max++;
          }
          this.character.resources.push(channel);
        }
        if (a.thisclass.name === "Druid" && Number(a.level) < 20) {
          this.character.resources.push({ name: "Wildshape", current: 2, max: 2, recharge: "shortrest" });
        }
        if (a.thisclass.name === "Factotum") {
          let num = this.getStatMod(3) + Number(a.level) / 2;
          this.character.resources.push({ name: "Epiphany Points", current: num, max: num, recharge: "shortrest" });
        }
        if (a.thisclass.name === "Fighter") {
          this.character.resources.push({ name: "Second Wind", current: 1, max: 1, recharge: "shortrest" });
          if (Number(a.level) >= 2) {
            let surge = { name: "Action Surge", current: 1, max: 1, recharge: "shortrest" };
            if (Number(a.level) >= 17) {
              surge.current++;
              surge.max++;
            }
            this.character.resources.push(surge);
          }
          if (a.level >= 9) {
            let num = Math.floor((Number(a.level) - 5) / 4);
            this.character.resources.push({ name: "Indomitable", current: num, max: num, recharge: "shortrest" });
          }
          if (Number(a.level) >= 3 && a.selsubclass.name === "Battle Master") {
            let superiority = { name: "Combat Superiority", current: 4, max: 4, recharge: "shortrest" };
            if (Number(a.level) >= 7) {
              superiority.current++;
              superiority.max++;
            }
            if (Number(a.level) >= 15) {
              superiority.current++;
              superiority.max++;
            }
          }
        }
        if (a.thisclass.name === "Monk" && Number(a.level) >= 2) {
          this.character.resources.push({ name: "Ki", current: Number(a.level), max: Number(a.level), recharge: "shortrest" });
        }
        if (a.thisclass.name === "Paladin") {
          this.character.resources.push({ name: "Lay on Hands", current: Number(a.level) * 5, max: Number(a.level) * 5, recharge: "longrest" });
          this.character.resources.push({ name: "Divine Sense", current: this.getStatMod(5) + 1, max: this.getStatMod(5) + 1, recharge: "longrest" });
          if (a.level >= 3) {
            this.character.resources.push({ name: "Channel Divinity", current: 1, max: 1, recharge: "shortrest" });
          }
          if (a.level >= 14) {
            this.character.resources.push({ name: "Cleansing Touch", current: this.getStatMod(5), max: this.getStatMod(5), recharge: "longrest" });
          }
        }
        if (a.thisclass.name === "Sorcerer" && Number(a.level) >= 2) {
          this.character.resources.push({ name: "Sorcery Points", current: Number(a.level), max: Number(a.level), recharge: "longrest" });
        }
        if (a.thisclass.name === "Warlock") {
          if (Number(a.level) >= 1 && a.selsubclass.name === "The Hexblade") {
            this.character.resources.push({ name: "Hexblade's Curse", current: 1, max: 1, recharge: "shortrest" });
          }
        }
        if (a.thisclass.name === "Wizard") {
          if (Number(a.level) >= 2 && a.selsubclass.name === "Bladesinging") {
            this.character.resources.push({ name: "Bladesong", current: 2, max: 2, recharge: "shortrest" });
          }
          if (Number(a.level) >= 2 && a.selsubclass.name === "School of Abjuration") {
            this.character.resources.push({ name: "Arcane Ward", current: 1, max: 1, recharge: "longrest" });
          }
          if (Number(a.level) >= 2 && a.selsubclass.name === "School of Enchantment") {
            this.character.resources.push({ name: "Hypnotic Gaze", current: 1, max: 1, recharge: "longrest" });
          }
          if (Number(a.level) >= 6 && a.selsubclass.name === "School of Enchantment") {
            this.character.resources.push({ name: "Instinctive Charm", current: 1, max: 1, recharge: "longrest" });
          }
          if (Number(a.level) >= 10 && a.selsubclass.name === "School of Illusion") {
            this.character.resources.push({ name: "Illusory Self", current: 1, max: 1, recharge: "shortrest" });
          }
          if (Number(a.level) >= 10 && a.selsubclass.name === "School of Transmutation") {
            this.character.resources.push({ name: "Shapechanger", current: 1, max: 1, recharge: "shortrest" });
          }
        }
      });
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
      return x;
    }
  },
  mounted () {
    if (process.env.NODE_ENV === 'development') {
      // test.tests(this);
      // this.reset();
    }
  },
  updated() {
    if (!this.mobile) {
      scaleFontSize('attackdiv');
      scaleFontSize('featurebox');
      scaleFontSize('profbox');
      scaleFontSize('armorbox');
      scaleFontSize('equipmentbox');
    }
  }
};

function scaleFontSize(element) {
  var container = document.getElementById(element);
  // We only want to scale down long text, so first we reset
  // font-size to 100%, in case this function is called multiple times.
  container.style.fontSize = "100%";
  // Now actually check if the text is wider than
  // its container, if so then reduce font-size
  var num = 95;
  while (container.scrollHeight > container.clientHeight && num > 10) {
    container.style.fontSize = num + "%";
    num -= 5;
  }
}
