import { useCreatureStore, useCharacterStore, useUserStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
import { marked } from '@/../node_modules/marked/lib/marked.esm.js';
import charcalc from '@/helpers/charcalc';
import modal from '@/components/global/modal.vue';
import { useMeta } from 'vue-meta';
import creaturecalc from '@/helpers/creaturecalc';

const modalInfo = {
  name: "",
  tags: "",
  size: "",
  cr: "",
  type: "",
  subtype: "",
  alignment: "",
  ac: "",
  acdesc: "",
  hp: "",
  hpdesc: "",
  speed: "",
  str: "",
  dex: "",
  con: "",
  int: "",
  wis: "",
  cha: "",
  stats: [0, 0, 0, 0 ,0, 0],
  skills: "",
  saves: "",
  senses: "",
  damageimmunities: "",
  conditionimmunities: "",
  damageresistances: "",
  languages: "",
  locations: "",
  latlong: "",
  description: ""
};

const crxptable = [
  { cr: 0, xp: 10 },
  { cr: 0.125, xp: 25 },
  { cr: 0.25, xp: 50 },
  { cr: 0.5, xp: 100 },
  { cr: 1, xp: 200 },
  { cr: 2, xp: 450 },
  { cr: 3, xp: 700 },
  { cr: 4, xp: 1100 },
  { cr: 5, xp: 1800 },
  { cr: 6, xp: 2300 },
  { cr: 7, xp: 2900 },
  { cr: 8, xp: 3900 },
  { cr: 9, xp: 5000 },
  { cr: 10, xp: 5900 },
  { cr: 11, xp: 7200 },
  { cr: 12, xp: 8400 },
  { cr: 13, xp: 10000 },
  { cr: 14, xp: 11500 },
  { cr: 15, xp: 13000 },
  { cr: 16, xp: 15000 },
  { cr: 17, xp: 18000 },
  { cr: 18, xp: 20000 },
  { cr: 19, xp: 22000 },
  { cr: 20, xp: 25000 },
  { cr: 21, xp: 33000 },
  { cr: 22, xp: 41000 },
  { cr: 23, xp: 50000 },
  { cr: 24, xp: 62000 },
  { cr: 26, xp: 90000 },
  { cr: 30, xp: 155000 }
];

function validhp (cre) {
  if (!isNaN(creaturecalc.hp(cre))) {
    return  true;
  }
  return false;
}
function ismetric (a) {
  if (a.speed.includes("ft") || a.speed.includes("feet") || a.senses.includes("ft") || a.senses.includes("feet") || a.description.includes("ft") || a.description.includes("feet")) {
    return false;
  }
  return true;
}

export default {
  setup () {
    const creatureStore = useCreatureStore();
    const characterStore = useCharacterStore();
    const userStore = useUserStore();

    const { creatures } = storeToRefs(creatureStore);
    const { charlevel, accalc, getSpeedStat, getStatTotal, getStatMod, getSaveMod,
            getSkillMod, getHPTotal, getAttackBonus, getDamageBonus, totalslots,
            getInitMod, getCharacter: curcharacter, characters } = storeToRefs(characterStore);
    const { loggedin: token, isLoggedIn: loggedin, isAdmin: admin, getUserInfo: userinfo } = userStore;
    const { getFromServer, loadChar, selCharacter } = characterStore;
    const { getCreature, saveNewCreature, deleteCreature, getAllCreatures } = creatureStore;

    getAllCreatures();

    useMeta({ title: "Encounter Runner" });
    return {
      creatures, charlevel, accalc, getSpeedStat, getStatTotal, getStatMod, getSaveMod,
      getSkillMod, getHPTotal, getAttackBonus, getDamageBonus, totalslots, getInitMod,
      curcharacter, characters, token, loggedin, admin, userinfo, getFromServer, loadChar,
      selCharacter, getCreature, saveNewCreature, deleteCreature, creaturecalc, creatureStore
    };
  },
  props: {
    creArray: Array,
    charArray: Array
  },
  components: {
    modal
  },
  computed: {
    convertedcount () {
      return this.creatures.filter((a) => {
        return validhp(a);
      }).filter((a) => {
        return ismetric(a);
      }).length;
    },
    metriccount () {
      return this.creatures.filter((a) => {
        return ismetric(a);
      }).length;
    },
    validhpcount () {
      return this.creatures.filter((a) => {
        return validhp(a);
      }).length;
    },
    unconvertedcount () {
      return this.creatures.filter((a) => {
        return !validhp(a);
      }).length;
    },
    filteredcreatures () {
      return this.creatures.filter((a) => {
        var values = this.creaturestable.filterValue.split(" ");
        let inelement = true;
        if (this.typeFilter !== "" && a.type !== this.typeFilter) {
          return false;
        }
        if (this.sizeFilter !== "" && a.size !== this.sizeFilter) {
          return false;
        }
        if (this.crFilterMin > a.cr) {
          return false;
        }
        if (this.crFilterMax < a.cr) {
          return false;
        }
        if (this.converted) {
          if (this.converted === "Yes" && !validhp(a)) {
            return false;
          } else if (this.converted === "No" && validhp(a)) {
            return false;
          }
        }
        if (this.metric) {
          if (this.metric === "Yes" && !ismetric(a)) {
            return false;
          } else if (this.metric === "No" && ismetric(a)) {
            return false;
          }
        }
        values.forEach((value) => {
          let exists = this.creaturestable.filterBy.some(function(el) {
            for (var y in a) {
              if (el === y && a[y] && a[y].toString().toLowerCase().includes(value.toLowerCase())) {
                return true;
              }
            }
          });
          if (this.creaturestable.filterValue && !exists) {
            inelement = false;
          }
        });
        if (inelement) {
          return true;
        }
        return false;
      }).sort((a, b) => {
        if (a[this.creaturestable.sortBy] > b[this.creaturestable.sortBy] && this.creaturestable.sortDesc === false) {
          return 1;
        } else if (a[this.creaturestable.sortBy] < b[this.creaturestable.sortBy] && this.creaturestable.sortDesc === true) {
          return 1;
        } else {
          return -1;
        }
      });
    },
    statBlocks () {
      let blocks = [];
      this.encountercreatures.forEach((a) => {
        if (!a.ispc) {
          let i = blocks.findIndex((b) => b.name === a.name);
          if (i === -1) {
            blocks.push(a);
          }
        }
      });
      return blocks;
    },
    encountercreaturesinit () {
      return this.encountercreatures.sort((a, b) => {
        if (a.init > b.init) {
          return -1;
        } else {
          return 1;
        }
      });
    },
    encounterlink () {
      return '/tools/runner/' + this.encountercreatures.map((cre) => {
        return cre.name.replace(/ /g, "").toLowerCase();
      }).join("&");
    }
  },
  data () {
    return {
      creaturestable: {
        fields: [
          { key: 'name', label: 'Name', sortable: true },
          { key: 'size', label: 'Size', sortable: true },
          { key: 'cr', label: 'CR', sortable: true },
          { key: 'type', label: 'Type', sortable: true },
          { key: 'subtype', label: 'Subtype', sortable: true },
          { key: 'alignment', label: 'Alignment', sortable: true }
        ],
        filterValue: "",
        sortBy: "name",
        sortDesc: false,
        filterBy: [ "name", "size", "cr", "subtype", "alignment" ],
        modalInfo: { ...modalInfo },
        notupdatedonly: false
      },
      modalProps: { isActive: false },
      typeFilter: "",
      sizeFilter: "",
      crFilterMin: 0,
      crFilterMax: 40,
      nextIndex: 0,
      partylevel: 1,
      partysize: 4,
      difficulty: "",
      xpvalue: 0,
      terrain: 1,
      adjustedxpvalue: 0,
      aoe: false,
      comp: this,
      encountercreatures: [],
      converted: false,
      metric: false
    };
  },
  methods: {
    del (item) {
      let conf = confirm("are you sure you want to delete " + item.name + "? It cannot be recovered if you do.");
      if (conf + this.admin) {
        this.deleteCreature(item._id);
      }
    },
    edit (item) {
      let conf = confirm("are you sure you want to edit " + item.name + "?");
      if (conf + this.admin) {
        this.$router.push("/tools/creaturebuilder/" + item._id);
      }
    },
    xpByCR (cr) {
      return crxptable.find((a) => {
        return a.cr === cr;
      }).xp;
    },
    calculateDifficulty () {
      var easythresholds = [25, 50, 75, 125, 250, 300, 350, 450, 550, 600, 800, 1000, 1100, 1250, 1400, 1600, 2000, 2100, 2400, 2800];
      var mediumthresholds = [50, 100, 150, 250, 500, 600, 750, 900, 1100, 1200, 1600, 2000, 2200, 2500, 2800, 3200, 3900, 4200, 4900, 5700];
      var hardthresholds = [75, 150, 225, 375, 750, 900, 1100, 1400, 1600, 1900, 2400, 3000, 3400, 3800, 4300, 4800, 5900, 6300, 7300, 8500];
      var deadlythresholds = [100, 200, 400, 500, 1100, 1400, 1700, 2100, 2400, 2800, 3600, 4500, 5100, 5700, 6400, 7200, 8800, 9500, 10900, 12700];
      var easy = easythresholds[this.partylevel - 1] * this.partysize;
      var medium = mediumthresholds[this.partylevel - 1] * this.partysize;
      var hard = hardthresholds[this.partylevel - 1] * this.partysize;
      var deadly = deadlythresholds[this.partylevel - 1] * this.partysize;
      var xp = 0;
      for (var x = 0; x < this.encountercreatures.length; x++) {
        if (!this.encountercreatures[x].ispc) {
          xp += this.xpByCR(this.encountercreatures[x].cr);
        }
      }
      this.xpvalue = xp;
      xp *= (4 / (this.partysize));
      xp *= (1 + this.encountercreatures.length * 0.1);
      xp *= this.terrain * (1 + 0.05 * this.aoe * this.partysize);
      this.adjustedxpvalue = Math.floor(xp);
      if (xp < easy) {
        this.difficulty = "too easy";
      } else if (xp < medium) {
        this.difficulty = "easy";
      } else if (xp < hard) {
        this.difficulty = "medium";
      } else if (xp < deadly) {
        this.difficulty = "hard";
      } else if (xp < deadly * 1.5) {
        this.difficulty = "deadly";
      } else {
        this.difficulty = "nigh on impossible";
      }
    },
    async addToEncounter (item) {
      item = await this.getCreature(item._id);
      var creature = Object.assign({}, item);
      creature.id = this.nextIndex;
      creature.ispc = false;
      this.nextIndex++;
      creature.currenthp = creaturecalc.hp(creature);
      creature.descr = marked.parse(creature.description);
      creature.mini = "";
      creature.initMod = creaturecalc.statMod(creature, creature.stats[1]);
      creature.advantage = false;
      creature.disadvantage = false;
      creature.init = 0;
      this.encountercreatures.push(creature);
      this.calculateDifficulty();
    },
    removeCreature (item) {
      this.encountercreatures = this.encountercreatures.filter((a) => {
        if (a.id === item.id) {
          return false;
        }
        return true;
      });
      this.calculateDifficulty();
    },
    createSkillsArray (character) {
      return character.skills.reduce((a, b) => {
        if (b.prof > 0) {
          a.push("+" + this.getSkillMod(b) + " " + b.name);
          return a;
        } else {
          return a;
        }
      }, []);
    },
    createDescription (character) {
      let comp = this;
      let descr = character.attacks.reduce((red, att) => {
        let attstring = "**" + att.name + ":** " + att.type + ", range " + att.range + ", ";
        if (comp.getAttackBonus(att) > -1) attstring += "+";
        attstring += comp.getAttackBonus(att) + " to hit (" + att.damage;
        if (comp.getDamageBonus(att) > 0) attstring += " +" + comp.getDamageBonus(att);
        else if (comp.getDamageBonus(att) < 0) attstring += " -" + comp.getDamageBonus(att);
        attstring += " " + att.dtype + " damage ";
        if (att.damage2 !== '') attstring += " + " + att.damage2 + " " + att.dtype2 + " damage";
        return red + attstring + "\n\n";
      }, "");
      let reducer = (red, feat) => {
        return red + "**" + feat.name + ":** " + feat.description + "\n\n";
      };
      descr = character.feats.reduce(reducer, descr);
      descr = character.charclasses.reduce((red, cls) => {
        red = cls.thisclass.features.reduce(reducer, red);
        red = cls.selsubclass.features.reduce(reducer, red);
        return red;
      }, descr);
      if (character.race.traits) {
        descr = character.race.traits.reduce(reducer, descr);
      }
      descr = character.features.reduce(reducer, descr);
      let spells = "**Spells**\n\n";
      for (let key in character.spells) {
        if (character.spells[key].length > 0) {
          spells += "**" + key + "(" + this.totalslots(key) + " slots):** " + character.spells[key].reduce((red, spell) => {
            return red + spell.title + (spell.prepared ? "*" : "") + ", ";
          }, "") + "\n\n";
        }
      }
      if (spells.length > 14) descr += spells;
      return marked.parse(descr);
    },
    buildCreature (character, ispc) {
      this.setCharacter(character);
      let creature = {
        id: this.nextIndex,
        name: character.name,
        size: "medium",
        type: "humanoid",
        ispc: ispc,
        subtype: character.race.singular,
        alignment: character.alignment,
        acdesc: this.accalc,
        speed: this.getSpeedStat(0) + " ft",
        str: this.getStatTotal(0) + 0,
        dex: this.getStatTotal(1),
        con: this.getStatTotal(2),
        int: this.getStatTotal(3),
        wis: this.getStatTotal(4),
        cha: this.getStatTotal(5),
        strmod: this.getStatMod(0),
        dexmod: this.getStatMod(1),
        conmod: this.getStatMod(2),
        intmod: this.getStatMod(3),
        wismod: this.getStatMod(4),
        chamod: this.getStatMod(5),
        saves: "+" + this.getSaveMod(0) + " strength +" + this.getSaveMod(1) + " dexterity +" + this.getSaveMod(2) + " constitution +" + this.getSaveMod(3) + " intelligence +" + this.getSaveMod(4) + " wisdom +" + this.getSaveMod(5) + " charisma.",
        skills: this.createSkillsArray(character),
        senses: "",
        damageresistances: "",
        damageimmunities: "",
        conditionimmunities: "",
        languages: character.proficiencies,
        cr: this.charlevel(character) - 1,
        descr: this.createDescription(character),
        mini: "",
        currenthp: character.hpcurrent,
        hpdesc: this.getHPTotal,
        initMod: this.getInitMod,
        advantage: false,
        disadvantage: false,
        init: 0
      };
      this.encountercreatures.push(creature);
      this.nextIndex++;
      this.calculateDifficulty();
    },
    async selCharacter(character) {
      await this.loadChar({ character: character, comp: this, passthrough: true }).then(() => {
        this.buildCreature(character, false);
        this.$root.$emit('bv::hide::modal', 'servermodal');
      });
    },
    roll () {
      let rolledCreatures = [];
      this.encountercreatures.forEach((character) => {
        let prerolled = rolledCreatures.findIndex((a) => a.name === character.name);
        if (prerolled !== -1) {
          // we want to group creatures of the same type rather than roll them individually
          character.init = rolledCreatures[prerolled].init;
        } else {
          let roll1 = Number(character.initMod) + Math.floor(Math.random() * 20) + 1;
          let roll2 = Number(character.initMod) + Math.floor(Math.random() * 20) + 1;
          if (character.advantage && !character.disadvantage) {
            if (roll1 > roll2) {
              character.init = roll1;
            } else {
              character.init = roll2;
            }
          } else if (!character.advantage && character.disadvantage) {
            if (roll1 < roll2) {
              character.init = roll1;
            } else {
              character.init = roll2;
            }
          } else {
            character.init = roll1;
          }
          rolledCreatures.push(character);
        }
      });
    },
    getCreaturesOnMount (creatures) {
      this.creatureStore.getAllCreatures().then(() => {
        for (var x = 0; x < creatures.length; x++) {
          var cre = this.creatures.filter(function(a) {
            return a.name.toLowerCase().replace(/ /g, '') === creatures[x].toLowerCase().replace(/ /g, '');
          });
          if (cre.length > 0) {
            this.addToEncounter(cre[0]);
          }
        }
        this.calculateDifficulty();
      });
    },
    async loadCharacters (charArray) {
      charArray.forEach((a) => {
        this.buildCreature(a, true);
      });
    }
  },
  mounted () {
    this.encountercreatures = [];
    if (this.$route.params.id) {
      console.log('there is an encounter parameter');
      var creatures = this.$route.params.id.split('&');
      this.getCreaturesOnMount(creatures);
    } else if (typeof this.creArray !== 'undefined' && this.creArray.length > 0) {
      console.log("running in campaign setting");
      creatures = this.creArray;
      this.getCreaturesOnMount(creatures);
    }
    if (typeof this.charArray !== 'undefined' && this.charArray.length > 0) {
      this.loadCharacters(this.charArray);
      this.partysize = this.charArray.length;
      this.partylevel = charcalc.charlevel(this.charArray[0]);
    }
  }
};
