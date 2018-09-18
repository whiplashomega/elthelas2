import { mapGetters } from 'vuex';
import Vue from 'vue';
import test from '@/tests/unit/charbuilder.test.js';
import helpers from '@/helpers/helpers';

var newCharacter = function() {
  return {
    name: "",
    player: "",
    warlockslotsavailable: 0,
    charclasses: [{ thisclass: { name: "", subclass: [], hitdie: 6 }, level: 0, selsubclass: { castermult: 0, features: [] } }],
    race: { stats: [0, 0, 0, 0, 0, 0], speed: [0, 0, 0, 0, 0] },
    background: { feature: { show: false, description: "", name: "" } },
    alignment: "",
    faction: { level1: "", level10: "" },
    homecountry: "",
    hometown: "",
    age: "",
    hpcurrent: 1,
    height: "",
    weight: "",
    gender: "",
    eyes: "",
    hair: "",
    allies: "",
    backstory: "",
    bond: "",
    personality: "",
    notes: "",
    god: "",
    skin: "",
    skills: [
      { name: "Acrobatics", prof: 0, stat: 1, magic: 0 },
      { name: "Animal Handling", prof: 0, stat: 4, magic: 0 },
      { name: "Arcana", prof: 0, stat: 3, magic: 0 },
      { name: "Athletics", prof: 0, stat: 0, magic: 0 },
      { name: "Deception", prof: 0, stat: 5, magic: 0 },
      { name: "History", prof: 0, stat: 3, magic: 0 },
      { name: "Insight", prof: 0, stat: 4, magic: 0 },
      { name: "Intimidation", prof: 0, stat: 5, magic: 0 },
      { name: "Investigation", prof: 0, stat: 3, magic: 0 },
      { name: "Medicine", prof: 0, stat: 4, magic: 0 },
      { name: "Nature", prof: 0, stat: 3, magic: 0 },
      { name: "Perception", prof: 0, stat: 4, magic: 0 },
      { name: "Performance", prof: 0, stat: 5, magic: 0 },
      { name: "Persuasion", prof: 0, stat: 5, magic: 0 },
      { name: "Religion", prof: 0, stat: 3, magic: 0 },
      { name: "Sleight of Hand", prof: 0, stat: 1, magic: 0 },
      { name: "Stealth", prof: 0, stat: 1, magic: 0 },
      { name: "Survival", prof: 0, stat: 4, magic: 0 }
    ],
    saves: [false, false, false, false, false, false],
    savebonus: [0, 0, 0, 0, 0, 0],
    stats: [8, 8, 8, 8, 8, 8],
    statbonus: [0, 0, 0, 0, 0, 0],
    initmagic: 0,
    hpmagic: 0,
    acmagic: 0,
    speedmagic: [0, 0, 0, 0, 0],
    attacks: [],
    armors: [],
    feats: [],
    injuries: [],
    bonusfeats: 0,
    proficiencies: "",
    equipment: [],
    containers: [
      { id: 0, name: "Default", capacity: 9999, weightCounts: true, weight: 0 }
    ],
    cp: 0,
    sp: 0,
    gp: 0,
    pp: 0,
    art: 0,
    gems: 0,
    size: "medium",
    capacitybonus: 0,
    spells: { cantrip: [], level1: [], level2: [], level3: [], level4: [], level5: [], level6: [], level7: [], level8: [], level9: [] },
    availableslots: { cantrip: 0, level1: 0, level2: 0, level3: 0, level4: 0, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    bonusslots: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    resources: [],
    features: [],
    saveDCBonus: [0, 0, 0, 0, 0, 0],
    attBonus: [0, 0, 0, 0, 0, 0],
    castlog: []
  };
};

const slotsArray = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0], //caster level 0
  [2, 0, 0, 0, 0, 0, 0, 0, 0],  //caster level 1
  [3, 0, 0, 0, 0, 0, 0, 0, 0],  //caster level 2
  [4, 2, 0, 0, 0, 0, 0, 0, 0],  //caster level 3
  [4, 3, 0, 0, 0, 0, 0, 0, 0],  //caster level 4
  [4, 3, 2, 0, 0, 0, 0, 0, 0],  //caster level 5
  [4, 3, 3, 0, 0, 0, 0, 0, 0],  //caster level 6
  [4, 3, 3, 1, 0, 0, 0, 0, 0],  //caster level 7
  [4, 3, 3, 2, 0, 0, 0, 0, 0],  //caster level 8
  [4, 3, 3, 3, 1, 0, 0, 0, 0],  //caster level 9
  [4, 3, 3, 3, 2, 0, 0, 0, 0],  //caster level 10
  [4, 3, 3, 3, 2, 1, 0, 0, 0],  //caster level 11
  [4, 3, 3, 3, 2, 1, 0, 0, 0],  //caster level 12
  [4, 3, 3, 3, 2, 1, 1, 0, 0],  //caster level 13
  [4, 3, 3, 3, 2, 1, 1, 0, 0],  //caster level 14
  [4, 3, 3, 3, 2, 1, 1, 1, 0],  //caster level 15
  [4, 3, 3, 3, 2, 1, 1, 1, 0],  //caster level 16
  [4, 3, 3, 3, 2, 1, 1, 1, 1],  //caster level 17
  [4, 3, 3, 3, 3, 1, 1, 1, 1],  //caster level 18
  [4, 3, 3, 3, 3, 2, 1, 1, 1],  //caster level 19
  [4, 3, 3, 3, 3, 2, 2, 1, 1],  //caster level 20
];
export default {
  computed: {
    ...mapGetters({
      races: 'builderRaces',
      backgrounds: 'allBackgrounds',
      equipment: 'allEquipment',
      spells: 'allSpells',
      classes: 'allClasses',
      nations: 'allNationNames',
      cities: 'allCityNames',
      factions: 'allOrganizations',
      feats: 'allFeats',
      googletoken: 'getGoogleToken',
      token: 'getUserInfo',
      loggedin: 'isLoggedIn'
    }),
    featsort () {
      var feats = [ ...this.feats, { name: "Ability Score Increase", prereq: "", description: "Increase one ability score by 2 or 2 ability scores by 1" } ];
      function ftsrt (a, b) {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        }
        return 0;
      }
      return feats.sort(ftsrt);
    },
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
    },
    equipmentContainers () {
      var containers = [];
      var defcontainer = {
        equipment: this.character.equipment.filter((a) => {
          if (!a.container || this.character.containers.filter(b => {
            return a.container === b.id;
          }).length === 0) {
            return true;
          }
          return false;
        }),
        name: "Not In Container",
        capacity: 9999,
        weightCounts: true,
        weight: 0,
        contains: 0
      };
      defcontainer.equipment.forEach((e) => {
        defcontainer.contains += e.weight * e.quantity;
      });
      if (defcontainer.equipment.length > 0) {
        containers.push(defcontainer);
      }
      this.character.containers.forEach((c) => {
        var equip = this.character.equipment.filter((e) => {
          return e.container === c.id;
        });
        var weight = 0;
        equip.forEach((e) => {
          weight += e.weight * e.quantity;
        });
        containers.push({ ...c, equipment: equip, contains: weight, container: c });
      });
      return containers;
    }
  },
  data () {
    return {
      buildHide: false,
      ctypes: [
        { name: "Carried/Worn", capacity: 9999, weightCounts: true, weight: 0 },
        { name: "Backpack", capacity: 30, weightCounts: true, weight: 5 },
        { name: "Pouch", capacity: 6, weightCounts: true, weight: 1 },
        { name: "Sack", capacity: 30, weightCounts: true, weight: 0.5 },
        { name: "Chest", capacity: 300, weightCounts: true, weight: 25 },
        { name: "Bag of Holding", capacity: 500, weightCounts: false, weight: 15 },
        { name: "Heward's Handy Haversack", capacity: 120, weightCounts: false, weight: 5 }
      ],
      containModal: false,
      newcontain: { name: "Backpack", capacity: 0, weightCounts: true, weight: 0 },
      attackmodal: false,
      filelist: [],
      preparedonly: false,
      mobile: false,
      classfilter: "all",
      levelfilter: "all",
      spellfilter: "",
      selspell: {},
      selspellclass: "",
      newattack: { name: "", stat: 0, bonus: 0, addstat: false, damage: "", range: "", type: "", dtype: "", edit: false, damagebonus: 0, prof: true, damage2: "", dtype2: "" },
      armormodal: false,
      equipModal: false,
      newarmor: { name: "", type: "", ac: 0, edit: false },
      newfeature: { name: "", description: "", show: false },
      newFeatureModal: false,
      spellModal: false,
      spellDetailModal: false,
      detailspell: { level: "cantrip", description: "", tags: [] },
      displayLevel: "cantrip",
      slots: slotsArray,
      character: newCharacter(),
      blankchar: {},
      characters: [],
      newequip: { name: "", weight: 0, quantity: 1, attunement: false, edit: false, container: 0 },
      statRolls: []
    };
  },
  filters: {
    date (value) {
      var date = new Date(value);
      return date.toLocaleString();
    }
  },
  methods: {
    getDriveFiles() {
      this.$root.$emit('bv::show::modal', 'loading');
      Vue.http.get('https://www.googleapis.com/drive/v3/files', { params: { access_token: this.googletoken, q: "mimeType contains 'json'", fields: 'files(id, name, size, modifiedTime)' } }).then((response) => {
        this.filelist = response.body.files;
        this.$root.$emit('bv::hide::modal', 'loading');
        this.$root.$emit('bv::show::modal', 'drivemodal');
      });
    },
    loadFromDrive(id) {
      this.$root.$emit('bv::hide::modal', 'drivemodal');
      this.$root.$emit('bv::show::modal', 'loading');
      Vue.http.get('https://www.googleapis.com/drive/v3/files/' + id, { params: { access_token: this.googletoken, alt: "media" } }).then((response) => {
        for (var x in response.body) {
          if (response.body.hasOwnProperty(x)) {
            this.character[x] = response.body[x];
          }
        }
        this.$root.$emit('bv::hide::modal', 'loading');
      });
    },
    saveToDrive() {
      const boundary = '-------314159265358979323846';
      const delimiter = "\r\n--" + boundary + "\r\n";
      const closeDelim = "\r\n--" + boundary + "--";
      var metadata = JSON.stringify({
        name: this.character.name + '.json',
        mimeType: 'application/json'
      });
      this.$root.$emit('bv::show::modal', 'loading');
      var payload = delimiter +
      'Content-Type: application/json\r\n\r\n' +
      metadata +
      delimiter +
      'Content-Type: application/json\r\n\r\n' +
      JSON.stringify(this.character) +
      closeDelim;
      Vue.http.post('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&name=' + this.character.name + '&access_token=' + this.googletoken,
        payload,
        { headers: { 'Content-Type': 'multipart/related; boundary="' + boundary + '"' } }).then(() => {
        this.$root.$emit('bv::hide::modal', 'loading');
        return true;
      });
    },
    getFromServer() {
      if (this.loggedin) {
        helpers.loading(this);
      }
    },
    loadChar(character) {
      this.character = character;
      this.$root.$emit('bv::hide::modal', 'servermodal');
    },
    updateToServer() {
      this.$root.$emit('bv::show::modal', 'loading');
      this.$http.post('/characters/' + this.character._id + '?token=' + this.token.token, { character: this.character }).then(function(res) {
        this.character._id = res.body._id;
        this.$root.$emit('bv::hide::modal', 'loading');
        return true;
      }).catch(function() {
        alert("error when saving, please try logging off and in again");
        this.$root.$emit('bv::hide::modal', 'loading');
      });
    },
    newToServer() {
      this.$root.$emit('bv::show::modal', 'loading');
      this.character._id = undefined;
      this.$http.post('/characters?token=' + this.token.token, { character: this.character }).then(function(res) {
        this.character._id = res.body._id;
        this.$root.$emit('bv::hide::modal', 'loading');
        return true;
      }).catch(function() {
        alert("error when loading, please try logging off and in again");
        this.$root.$emit('bv::hide::modal', 'loading');
      });
    },
    deleteFromServer(character) {
      this.$root.$emit('bv::show::modal', 'loading');
      this.$http.delete('/characters/' + character._id + '?token=' + this.token.token).then(function(res) {
        if (res.body.success) {
          this.$root.$emit('bv::hide::modal', 'loading');
          this.$root.$emit('bv::show::modal', 'servermodal');
          this.characters.splice(this.characters.indexOf(character), 1);
        }
        return true;
      }).catch(function() {
        alert("error when loading, please try logging off and in again");
        this.$root.$emit('bv::hide::modal', 'loading');
      });
    },
    totalGold() {
      return Number(this.character.cp) / 100 +
        Number(this.character.sp) / 10 +
        Number(this.character.gp) +
        Number(this.character.pp) * 10 +
        Number(this.character.art) +
        Number(this.character.gems);
    },
    setRaceDefaults () {
      this.character.age = this.character.race.agepoints.mentalmaturity;
      var feet = Math.floor(this.character.race.averageheight / 12);
      var inches = this.character.race.averageheight % 12;
      this.character.height = feet + "' " + inches + "''";
      this.character.weight = this.character.race.averageweight + " lbs";
    },
    classtext () {
      return this.character.charclasses.reduce((a, b) => {
        return a + b.thisclass.name + " " + b.level.toString() + " ";
      }, "");
    },
    addclass () {
      this.character.charclasses.push({ thisclass: { name: "", subclass: [] }, level: 0, selsubclass: { castermult: 0, features: [] } });
    },
    removeclass (i) {
      if (this.character.charclasses.length > 1) {
        this.character.charclasses.splice(i, 1);
      } else {
        alert("cannot remove last class");
      }
    },
    getStatTotal(i) {
      return Number(this.character.stats[i]) + Number(this.character.race.stats[i]) + Number(this.character.statbonus[i]);
    },
    getStatMod(i) {
      return Math.floor(this.getStatTotal(i) / 2) - 5;
    },
    getSaveMod(i) {
      return this.getStatMod(i) + Number(this.character.savebonus[i]) + this.character.saves[i] * this.profbonus();
    },
    getSaveDC(i) {
      return 8 + this.profbonus() + this.getStatMod(i) + Number(this.character.saveDCBonus[i]);
    },
    getAttBonus(i) {
      return Number(this.character.attBonus[i]) + this.getStatMod(i) + this.profbonus();
    },
    profbonus() {
      var level = this.character.charclasses.reduce((a, b) => {
        return a + Number(b.level);
      }, 0);
      return Math.ceil(level / 4) + 1;
    },
    getSkillMod(skill) {
      return this.getStatMod(skill.stat) + Math.floor(Number(skill.prof) * this.profbonus());
    },
    getInitMod() {
      return this.getStatMod(1) + Number(this.character.initmagic);
    },
    getHPTotal() {
      var total = 0;
      this.character.charclasses.forEach((cc) => {
        total += Number(cc.level) * (cc.thisclass.hitdie / 2 + this.getStatMod(2) + 1);
      });
      total += (this.character.charclasses[0].thisclass.hitdie / 2 - 1);
      total += Number(this.character.hpmagic);
      return total;
    },
    pointbuy() {
      return this.character.stats.reduce((a, b) => {
        var c = Number(b) - 8;
        if (b > 13) {
          c += Number(b) - 13;
        }
        if (b > 15) {
          c += Number(b) - 15;
        }
        return a + c;
      }, 0);
    },
    getSpeedStat(i) {
      return Number(this.character.race.speed[i]) + Number(this.character.speedmagic[i]);
    },
    addAttack() {
      this.character.attacks.push(this.newattack);
      this.newattack = { name: "", stat: 0, bonus: 0, addstat: 0, damage: "", range: "", type: "", dtype: "", edit: false, damagebonus: 0, prof: true, damage2: "", dtype2: "" };
      this.attackmodal = false;
    },
    addInjury() {
      this.character.injuries.push({ name: "" });
    },
    removeInjury(i) {
      this.character.injuries.splice(i, 1);
    },
    removeAttack(index) {
      this.character.attacks.splice(index, 1);
    },
    getAttackBonus(attack) {
      return Number(attack.bonus) + Number(this.getStatMod(attack.stat)) + this.profbonus() * attack.prof;
    },
    getAttackDamageBonus(attack) {
      if (attack.addstat) {
        return Number(this.getStatMod(attack.stat)) + Number(attack.damagebonus);
      } else {
        return attack.damagebonus;
      }
    },
    addArmor() {
      this.character.armors.push(this.newarmor);
      this.newarmor = { name: "", type: "", ac: 0, edit: false };
      this.armormodal = false;
    },
    removeArmor(index) {
      this.character.armors.splice(index, 1);
    },
    armorac(a) {
      var ac = 0;
      if (a.type === "Heavy Armor") {
        ac = a.ac;
      } else if (a.type === "Medium Armor") {
        ac = a.ac + Math.min(2, this.getStatMod(1));
      } else if (a.type === "Shield") {
        ac = a.ac;
      } else if (a.type === 'Light Armor') {
        ac = a.ac + this.getStatMod(1);
      } else if (a.type === "Unarmored Bonus") {
        ac = 10 + a.ac + this.getStatMod(1) + this.getStatMod(a.unarmoredstat);
      }
      return ac;
    },
    accalc() {
      var ac = 10 + this.getStatMod(1);
      var shields = [];
      this.character.armors.forEach((a) => {
        a.ac = Number(a.ac);
        var tmp;
        if (a.equipped) {
          if (a.type === "Heavy Armor") {
            if (a.ac > ac) {
              ac = a.ac;
            }
          } else if (a.type === "Medium Armor") {
            tmp = a.ac + Math.min(2, this.getStatMod(1));
            if (tmp > ac) {
              ac = tmp;
            }
          } else if (a.type === "Shield") {
            shields.push(a.ac);
          } else if (a.type === 'Light Armor') {
            tmp = a.ac + this.getStatMod(1);
            if (tmp > ac) {
              ac = tmp;
            }
          } else if (a.type === "Unarmored Bonus") {
            tmp = 10 + a.ac + this.getStatMod(1) + this.getStatMod(a.unarmoredstat);
            if (tmp > ac) {
              ac = tmp;
            }
          }
        }
      });
      var shield = shields.reduce((a, b) => {
        return b + a;
      }, 0);
      return Number(ac) + Number(shield) + Number(this.character.acmagic);
    },
    log(val) {
      console.log(val);
    },
    setval(object, attribute, value) {
      object[attribute] = value;
      this.$forceUpdate();
    },
    addEquipment() {
      this.character.equipment.push(this.newequip);
      this.newequip = { name: "", weight: 0, quantity: 1, attunement: false, edit: false, container: this.character.containers[0].id };
      this.equipModal = false;
    },
    removeEquipment(i) {
      this.character.equipment.splice(i, 1);
    },
    addContainer() {
      var id = Date.now();
      this.character.containers.push({ ...this.newcontain, id: id });
      this.newcontain = { name: "", capacity: 0, weightCounts: true, weight: 0 };
      this.containModal = false;
    },
    removeContainer(container) {
      this.character.containers.splice(this.character.containers.indexOf(container), 1);
    },
    carryWeight() {
      var sum = 0;
      this.equipmentContainers.forEach((a) => {
        sum += Number(a.weight);
        if (a.weightCounts) {
          sum += a.equipment.reduce((a, b) => {
            return a + Number(b.weight) * Number(b.quantity);
          }, 0);
        }
      });
      sum += (Number(this.character.cp) + Number(this.character.sp) + Number(this.character.gp) + Number(this.character.pp)) / 50;
      return sum;
    },
    carryMax() {
      var base = this.getStatTotal(0) * 15;
      if (this.character.size === "tiny") {
        base *= 0.5;
      } else if (this.character.size === 'large') {
        base *= 2;
      } else if (this.character.size === 'huge') {
        base *= 4;
      }
      return base + Number(this.character.capacitybonus);
    },
    spellDetail(spell) {
      this.detailspell = spell;
      this.spellDetailModal = true;
    },
    removeSpell(i) {
      this.character.spells[this.displayLevel].splice(this.character.spells[this.displayLevel].indexOf(i), 1);
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
    castSpell(spell) {
      if (spell.level !== 'cantrip') {
        var level = 'level' + spell.castLevel;
      } else {
        level = spell.level;
      }
      this.character.availableslots[level]--;
      this.character.castlog.unshift({ ...spell });
    },
    totalslots(level) {
      let index = 0;
      if (level === 'cantrip') {
        return 'infinite';
      } else {
        index = Number(level.substring(5)) - 1;
      }
      let casterlevel = 0;
      if (this.character.charclasses.length === 1) {
        casterlevel += Math.ceil(Number(this.character.charclasses[0].level) * Number(this.character.charclasses[0].selsubclass.castermult));
      } else {
        this.character.charclasses.forEach((a) => {
          casterlevel += Math.floor(Number(a.level) * Number(a.selsubclass.castermult));
        });
      }
      try {
        return this.slots[casterlevel][index] + Number(this.character.bonusslots[index]);
      } catch (e) {
        return 0;
      }
    },
    validate() {
      if (this.character.name === "") {
        alert("cannot save character without name");
        return false;
      }
      return true;
    },
    save() {
      if (this.validate()) {
        var text = JSON.stringify(this.character);
        var a = document.createElement('a');
        a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(text));
        a.setAttribute('download', this.character.name + '.json');
        a.click();
      }
    },
    load() {
      var f = document.getElementById('fileload').files[0];
      var r = new FileReader();
      var character = this.character;
      r.onloadend = function(e) {
        var data = e.target.result;
        var parsed = JSON.parse(data);
        // console.log(parsed);
        for (var x in parsed) {
          if (parsed.hasOwnProperty(x)) {
            character[x] = parsed[x];
          }
        }
        // validations!
        character.charclasses.forEach((a) => {
          if (typeof a.selsubclass === "undefined") {
            a.selsubclass = { features: [], name: "" };
          }
        });
      };
      if (typeof f !== "undefined") {
        r.readAsText(f);
      }
    },
    level() {
      var level = 0;
      this.character.charclasses.forEach((a) => {
        level += Number(a.level);
      });
      return level;
    },
    charlevel(character) {
      var level = 0;
      character.charclasses.forEach((a) => {
        level += Number(a.level);
      });
      return level;
    },
    warlockSlots() {
      var slots = 0;
      this.character.charclasses.forEach((a) => {
        if (a.thisclass.name === "Warlock") {
          if (a.level >= 1) {
            slots++;
          } if (a.level >= 2) {
            slots++;
          } if (a.level >= 11) {
            slots++;
          } if (a.level >= 17) {
            slots++;
          }
        }
      });
      return slots;
    },
    warlockSlotLevel() {
      var level = 0;
      this.character.charclasses.forEach((a) => {
        if (a.thisclass.name === "Warlock") {
          level = Math.ceil(a.level / 2.0);
        }
      });
      return Math.min(level, 5);
    },
    shortrest() {
      this.character.warlockslotsavailable = this.warlockSlots();
      this.character.resources.forEach((a) => {
        if (a.recharge === 'shortrest') {
          a.current = a.max;
        }
      });
    },
    longrest() {
      this.shortrest();
      for (var prop in this.character.availableslots) {
        if (prop !== 'cantrip') {
          this.character.availableslots[prop] = this.totalslots(prop);
        }
      }
      this.character.hpcurrent = this.getHPTotal();
      this.character.charclasses.forEach((a) => {
        if (typeof a.hitdice !== 'undefined') {
          a.hitdice += a.level / 2;
          a.hitdice = Math.min(a.hitdice, a.level);
        } else {
          a.hitdice = a.level;
        }
      });
      this.character.resources.forEach((a) => {
        if (a.recharge === 'longrest') {
          a.current = a.max;
        }
      });
      this.character.castlog = [];
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
    },
    rollStats () {
      function d6() {
        return Math.floor(Math.random() * 6) + 1;
      }
      this.statRolls = [];
      for (var x = 0; x < 6; x++) {
        var roll = [d6(), d6(), d6(), d6()];
        roll.sort();
        roll.splice(0, 1);
        this.statRolls.push(roll.reduce((a, b) => {
          return a + b;
        }, 0));
      }
    },
    reset () {
      this.character = newCharacter();
    }
  },
  mounted () {
    this.newequip.container = this.character.containers[0];
    if (window.outerWidth < 1024) {
      this.mobile = true;
    }
    if (process.env.NODE_ENV === 'development') {
      test.tests(this);
      this.reset();
    }
  },
  updated() {
    if (window.outerWidth < 1024) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
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
