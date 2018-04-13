import { mapGetters } from 'vuex';
import Vue from 'vue';

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
      googletoken: 'getGoogleToken'
    }),
    featsort () {
      var feats = [ ...this.feats, { name: "Ability Score Increase", prereq: "", description: "Increase one ability score by 2 or 2 ability scores by 1" } ];
      function ftsrt (a, b) {
        if(a.name > b.name) {
          return 1;
        } else if(a.name < b.name) {
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
        if (cl.level >= 10 && (cl.thisclass.name === "Fighter" || cl.thisclass.name === "Rogue")) {
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
      while(this.character.feats.length < asi) {
        this.character.feats.push({ name: "", prereq: "", description: "" });
      }
      if(this.character.feats.length > asi) {
        this.character.feats.length = asi;
      }
      return asi;
    },
    filteredspells () {
      var filters = this.spellfilter.split(' ');
      if(this.spellfilter === "") {
        return this.spells.filter((a) => {
          var inclass = a.tags.some((el) => {
            if(this.classfilter === "all") {
              return true;
            }
            return this.classfilter === el;
          });
          if((inclass && this.levelfilter === "all") || (inclass && a.level === this.levelfilter)) {
            return true;
          }
          return false;
        });
      }
      if(this.levelfilter === "nonsense") {
        return this.levelfilter;
      }
      return this.spells.filter((a) => {
        var success = false;
        var successarray = [];
        filters.forEach((b) => {
          for(var prop in a) {
            if(typeof a[prop] === 'string') {
              if(a[prop].toLowerCase().includes(b)) {
                successarray.push(true);
                break;
              }
            }
          }
          if(successarray.length >= filters.length) {
            var inclass = a.tags.some((el) => {
              if(this.classfilter === "all") {
                return true;
              }
              return this.classfilter === el;
            });
            if((inclass && this.levelfilter === "all") || (inclass && a.level === this.levelfilter)) {
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
      attackmodal: false,
      filelist: [],
      preparedonly: false,
      mobile: false,
      classfilter: "all",
      levelfilter: "all",
      spellfilter: "",
      selspell: {},
      selspellclass: "",
      newattack: { name: "", stat: 0, bonus: 0, addstat: false, damage: "", range: "", type: "", dtype: "", edit: false, damagebonus: 0, prof: true },
      armormodal: false,
      newequip: { name: "", equipped: false, carried: true, weight: 0, quantity: 1, attunement: false, edit: false },
      equipModal: false,
      newarmor: { name: "", type: "", ac: 0, edit: false },
      newfeature: { name: "", description: "", show: false },
      newFeatureModal: false,
      spellModal: false,
      spellDetailModal: false,
      detailspell: { level: "cantrip", description: "", tags: [] },
      displayLevel: "cantrip",
      slots: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 0, 0, 0, 0],
        [3, 0, 0, 0, 0, 0, 0, 0, 0],
        [4, 2, 0, 0, 0, 0, 0, 0, 0],
        [4, 3, 0, 0, 0, 0, 0, 0, 0],
        [4, 3, 2, 0, 0, 0, 0, 0, 0],
        [4, 3, 3, 0, 0, 0, 0, 0, 0],
        [4, 3, 3, 1, 0, 0, 0, 0, 0],
        [4, 3, 3, 2, 0, 0, 0, 0, 0],
        [4, 3, 3, 3, 1, 0, 0, 0, 0],
        [4, 3, 3, 3, 2, 0, 0, 0, 0],
        [4, 3, 3, 3, 2, 1, 0, 0, 0],
        [4, 3, 3, 3, 2, 1, 0, 0, 0],
        [4, 3, 3, 3, 2, 1, 1, 0, 0],
        [4, 3, 3, 3, 2, 1, 1, 0, 0],
        [4, 3, 3, 3, 2, 1, 1, 1, 0],
        [4, 3, 3, 3, 2, 1, 1, 1, 0],
        [4, 3, 3, 3, 2, 1, 1, 1, 1],
        [4, 3, 3, 3, 3, 1, 1, 1, 1],
        [4, 3, 3, 3, 3, 2, 1, 1, 1],
        [4, 3, 3, 3, 3, 2, 2, 1, 1],
      ],
      character: {
        name: "",
        player: "",
        warlockslotsavailable: 0,
        charclasses: [{ thisclass: {name: "", subclass: [], hitdie: 6 }, level: 0, selsubclass: { castermult: 0, features: [] } }],
        race: { stats: [0, 0, 0, 0, 0, 0], speed: [0, 0, 0, 0 ,0]},
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
          { name: "Survival", prof: 0, stat: 4, magic: 0 },
        ],
        saves: [false, false, false, false, false, false],
        savebonus: [0, 0, 0, 0, 0 ,0],
        stats: [8, 8, 8, 8, 8, 8],
        statbonus: [0, 0, 0, 0, 0 ,0],
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
        cp: 0, sp: 0, gp: 0, pp: 0, art: 0, gems: 0,
        size: "medium",
        capacitybonus: 0,
        spells: { cantrip: [], level1: [], level2: [], level3: [], level4: [], level5: [], level6: [], level7: [], level8: [], level9: [] },
        availableslots: { cantrip: 0, level1: 0, level2: 0, level3: 0, level4: 0, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
        bonusslots: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        resources: [],
        features: [],
        saveDCBonus: [0, 0, 0, 0, 0, 0],
        attBonus: [0, 0, 0, 0, 0, 0]
      }
    };
  },
  filters: {
    date (value) {
      var date = new Date(value);
      return date.toLocaleString();
    },

  },
  methods: {
    getDriveFiles() {
      this.$root.$emit('bv::show::modal','loading');
      Vue.http.get('https://www.googleapis.com/drive/v3/files', { params: { access_token: this.googletoken, q: "mimeType contains 'json'", fields: 'files(id, name, size, modifiedTime)'} }).then((response) => {
        this.filelist = response.body.files;
        console.log(this.filelist);
        this.$root.$emit('bv::hide::modal','loading');
        this.$root.$emit('bv::show::modal','drivemodal');
      });
    },
    loadFromDrive(id) {
      this.$root.$emit('bv::hide::modal','drivemodal');
      this.$root.$emit('bv::show::modal','loading');
      Vue.http.get('https://www.googleapis.com/drive/v3/files/' + id, { params: { access_token: this.googletoken, alt: "media"}}).then((response) => {
        for(var x in response.body) {
          if (response.body.hasOwnProperty(x)) {
            this.character[x] = response.body[x];
          }
        }
        this.$root.$emit('bv::hide::modal','loading');
      });
    },
    saveToDrive(id) {
      const boundary = '-------314159265358979323846';
      const delimiter = "\r\n--" + boundary + "\r\n";
      const close_delim = "\r\n--" + boundary + "--";
      
      var metadata = JSON.stringify({
        name: this.character.name + '.json',
        mimeType: 'application/json'
      });
      this.$root.$emit('bv::show::modal','loading');
      var payload = delimiter +
      'Content-Type: application/json\r\n\r\n' +
      metadata +
      delimiter +
      'Content-Type: application/json\r\n\r\n' + 
      JSON.stringify(this.character) +
      close_delim;
      Vue.http.post('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&name='+ this.character.name +'&access_token=' + this.googletoken, 
        payload, 
        { headers: { 'Content-Type': 'multipart/related; boundary="' + boundary + '"'}}).then((a) => {
        console.log(a);
        this.$root.$emit('bv::hide::modal','loading');
      });
    },
    totalGold() {
      return Number(this.character.cp)/100 + 
        Number(this.character.sp)/10 + 
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
      this.character.charclasses.push({ thisclass: {name: "", subclass: [] }, level: 0, selsubclass: { castermult: 0, features: [] } });
    },
    removeclass (i) {
      if(this.character.charclasses.length > 1) {
        this.character.charclasses.splice(i, 1);
      }
      else {
        alert("cannot remove last class");
      }
    },
    getStatTotal(i) {
      return Number(this.character.stats[i]) + Number(this.character.race.stats[i]) + Number(this.character.statbonus[i]);
    },
    getStatMod(i) {
      return Math.floor(this.getStatTotal(i)/2) - 5;
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
      return Math.ceil(level/4)+1;
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
        total += Number(cc.level) * (cc.thisclass.hitdie/2 + this.getStatMod(2) + 1);
      });
      total += (this.character.charclasses[0].thisclass.hitdie/2 - 1);
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
      this.newattack = { name: "", stat: 0, bonus: 0, addstat: 0, damage: "", range: "", type: "", dtype: "", edit: false, damagebonus: 0, prof: true };
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
      if(attack.addstat) {
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
      if(a.type === "Heavy Armor") {
        ac = a.ac;
      } else if(a.type === "Medium Armor") {
        ac = a.ac + Math.min(2, this.getStatMod(1));
      } else if(a.type === "Shield") {
        ac = a.ac;
      } else if(a.type === 'Light Armor') {
        ac = a.ac + this.getStatMod(1);
      } else if(a.type === "Unarmored Bonus") {
        ac = 10 + a.ac + this.getStatMod(1) + this.getStatMod(a.unarmoredstat);
      }
      return ac;
    },
    accalc() {
      var ac = 10 + this.getStatMod(1);
      var shields = [];
      this.character.armors.forEach((a) => {
        a.ac = Number(a.ac);
        if(a.equipped) {
          if(a.type === "Heavy Armor") {
            if(a.ac > ac) {
              ac = a.ac;
            }
          } else if(a.type === "Medium Armor") {
            var tmp = a.ac + Math.min(2, this.getStatMod(1));
            if(tmp > ac) {
              ac = tmp;
            }
          } else if(a.type === "Shield") {
            shields.push(a.ac);
          } else if(a.type === 'Light Armor') {
            var tmp = a.ac + this.getStatMod(1);
            if(tmp > ac) {
              ac = tmp;
            }
          } else if(a.type === "Unarmored Bonus") {
            var tmp = 10 + a.ac + this.getStatMod(1) + this.getStatMod(a.unarmoredstat);
            if(tmp > ac) {
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
    addFeat() {
      this.character.feats.push({ selectedfeat: {name: "", prereq: "", description: "" }});
    },
    removeFeat(i) {
      this.character.feats.splice(i, 1);
    },
    addEquipment() {
      this.character.equipment.push(this.newequip);
      this.newequip = { name: "", equipped: false, carried: true, weight: 0, quantity: 1, attunement: false, edit: false };
      this.equipModal = false;
    },
    removeEquipment(i) {
      this.character.equipment.splice(i, 1);
    },
    carryWeight() {
      var sum = 0;
      this.character.equipment.forEach((a) => {
        if(a.carried) {
          sum += Number(a.weight) * Number(a.quantity);
        }
      });
      sum += (Number(this.character.cp) + Number(this.character.sp) + Number(this.character.gp) + Number(this.character.pp))/50;
      return sum;
    },
    carryMax() {
      var base = this.getStatTotal(0) * 15;
      if(this.character.size === "tiny") {
        base *= 0.5;
      } else if(this.character.size === 'large') {
        base *= 2;
      } else if(this.character.size === 'huge') {
        base *= 4;
      }
      return base + Number(this.character.capacitybonus);
    },
    spellDetail(spell) {
      console.log(spell);
      this.detailspell = spell;
      this.spellDetailModal = true;
    },
    removeSpell(i) {
      this.character.spells[this.displayLevel].splice(i, 1);
    },
    addSpell(spell) {
      if(spell) {
        spell.class = this.selspellclass;
        if(spell.level !== 'cantrip') {
          var level = 'level' + spell.level;
        } else {
          var level = spell.level;
        }
        var exists = this.character.spells[level].includes(spell);

        if(!exists) {
          this.character.spells[level].push(spell);
        }
        this.spellModal = false;
      }
    },
    totalslots(level) {
      if(level === 'cantrip') {
        return 'infinite';
      } else {
        var index = Number(level.substring(5)) - 1;
      }
      var casterlevel = 0;
      this.character.charclasses.forEach((a) => {
        casterlevel += Number(a.level) * Number(a.selsubclass.castermult);
      });
      try {
        return this.slots[casterlevel][index] + Number(this.character.bonusslots[index]);
      } catch (e) {
        return 0;
      }
    },
    validate() {
      if(this.character.name === "") {
        alert("cannot save character without name");
        return false;
      }
      return true;
    },
    save() {
      if(this.validate()) {
        var text = JSON.stringify(this.character);
        var a = document.createElement('a');
        a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
        a.setAttribute('download', this.character.name + '.json');
        a.click();
      }
    },
    load() {
      var f = document.getElementById('fileload').files[0], r = new FileReader();
      var character = this.character;
      r.onloadend = function(e) {
        var data = e.target.result;
        var parsed = JSON.parse(data);
        //console.log(parsed);
        for(var x in parsed) {
          if (parsed.hasOwnProperty(x)) {
            character[x] = parsed[x];
          }
        }
        //validations!
        character.charclasses.forEach((a) => {
          if(typeof a.selsubclass === "undefined") {
            a.selsubclass = { features: [], name: "" };
          }
        });
      };
      console.log(f);
      if(typeof f !== "undefined") {
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
    warlockSlots() {
      var slots = 0;
      this.character.charclasses.forEach((a) => {
        if(a.thisclass.name === "Warlock") {
          if(a.level >= 1) {
            slots++;
          } if(a.level >= 2) {
            slots++;
          } if(a.level >= 11) {
            slots++;
          } if(a.level >= 17) {
            slots++;
          }
        }
      });
      return slots;
    },
    warlockSlotLevel() {
      var level = 0;
      this.character.charclasses.forEach((a) => {
        if(a.thisclass.name === "Warlock") {
          level = Math.ceil(a.level / 2.0);
        }
      });
      return Math.min(level, 5);
    },
    shortrest() {
      this.character.warlockslotsavailable = this.warlockSlots();
      this.character.resources.forEach((a) => {
        if(a.recharge === 'shortrest') {
          a.current = a.max;
        }
      });
    },
    longrest() {
      this.shortrest();
      for(var prop in this.character.availableslots) {
        if(prop !== 'cantrip') {
          this.character.availableslots[prop] = this.totalslots(prop);
        }
      }
      this.character.hpcurrent = this.getHPTotal();
      this.character.charclasses.forEach((a) => {
        if(typeof a.hitdice !== 'undefined') {
          a.hitdice += a.level/2;
          a.hitdice = Math.min(a.hitdice, a.level);
        } else {
          a.hitdice = a.level;
        }
      });
      this.character.resources.forEach((a) => {
        if(a.recharge === 'longrest') {
          a.current = a.max;
        }
      });
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
      this.character.resources.push({ name: "", current: 0, max: 0, recharge: "never"});
    },
    removeResource(i) {
      this.character.resources.splice(i, 1);
    },
    populateResources() {
      this.character.charclasses.forEach((a) => {
        if(a.thisclass.name === "Barbarian" && Number(a.level) < 20) {
          var rage = { name: "Rage", current: 2, max: 2, recharge: "longrest"};
          if(Number(a.level) >= 3) {
            rage.max++;
            rage.current++;
          } if(Number(a.level) >= 6) {
            rage.max++;
            rage.current++;
          } if(Number(a.level) >= 12) {
            rage.max++;
            rage.current++;
          } if(Number(a.level) >= 17) {
            rage.max++;
            rage.current++;
          }
          this.character.resources.push(rage);
        }
        if(a.thisclass.name === "Barbarian" && a.selsubclass.name === "Path of the Ancestral Guardian" && Number(a.level) >= 10) {
          this.character.resources.push({ name: "Consult the Spirits", current: 1, max: 1, recharge: "shortrest"});
        }
        if(a.thisclass.name === "Barbarian" && a.selsubclass.name === "Path of the Zealot") {
          if(a.level >= 6) {
            this.character.resources.push({ name: "Fanatical Focus", current: 1, max: 1, recharge: "never"});
          }
          if(a.level >= 10) {
            this.character.resources.push({ name: "Zealous Presence", current: 1, max: 1, recharge: "longrest"});
          }
        }
        if(a.thisclass.name === "Bard") {
          var inspiration = { name: "Bardic Inspiration", current: this.getStatMod(5), max: this.getStatMod(5), recharge: "longrest"};
          if(Number(a.level) >= 5) {
            inspiration.recharge = "shortrest";
          }
          this.character.resources.push(inspiration);
          if(a.selsubclass.name === "College of Glamour") {
            if(Number(a.level) >= 3) {
              this.character.resources.push({ name: "Enthralling Performance", current: 1, max: 1, recharge: "shortrest" });
            }
            if(Number(a.level) >= 6) {
              this.character.resources.push({ name: "Mantle of Majesty", current: 1, max: 1, recharge: "longrest" });
            }
            if(Number(a.level) >= 14) {
              this.character.resources.push({ name: "Unbreakable Majesty", current: 1, max: 1, recharge: "shortrest" });
            }
          }
          if(a.selsubclass.name === "College of Whispers") {
            if(Number(a.level) >= 6) {
              this.character.resources.push({ name: "Mantle of Whispers", current: 1, max: 1, recharge: "shortrest" });
            }
            if(Number(a.level) >= 14) {
              this.character.resources.push({ name: "Shadow Lore", current: 1, max: 1, recharge: "longrest" });
            }
          }
        }
        if(a.thisclass.name === "Cleric") {
          var channel = { name: "Channel Divinity", current:1, max: 1, recharge: "shortrest" };
          if(Number(a.level) >= 6) {
            channel.current++;
            channel.max++;
          }
          if(Number(a.level) >= 18) {
            channel.current++;
            channel.max++;
          }
          this.character.resources.push(channel);
        }
        if(a.thisclass.name === "Druid" && Number(a.level) < 20) {
          this.character.resources.push({ name: "Wildshape", current: 2, max: 2, recharge: "shortrest"});
        }
        if(a.thisclass.name === "Factotum") {
          var num = this.getStatMod(3) + Number(a.level)/2;
          this.character.resources.push({ name: "Epiphany Points", current: num, max: num, recharge: "shortrest"});
        }
        if(a.thisclass.name === "Fighter") {
          this.character.resources.push({ name: "Second Wind", current: 1, max: 1, recharge: "shortrest"});
          if(Number(a.level) >= 2) {
            var surge = { name: "Action Surge", current: 1, max: 1, recharge: "shortrest"};
            if(Number(a.level) >= 17) {
              surge.current++;
              surge.max++;
            }
            this.character.resources.push(surge);
          }
          if(a.level >= 9) {
            var num = Math.floor((Number(a.level) - 5)/4);
            this.character.resources.push({ name: "Indomitable", current: num, max: num, recharge: "shortrest"});
          }
          if(Number(a.level) >= 3 && a.selsubclass.name === "Battle Master") {
            var superiority = { name: "Combat Superiority", current: 4, max: 4, recharge: "shortrest" };
            if(Number(a.level) >= 7) {
              superiority.current++;
              superiority.max++;
            }
            if(Number(a.level) >= 15) {
              superiority.current++;
              superiority.max++;
            }
          }
        }
        if(a.thisclass.name === "Monk" && Number(a.level) >= 2) {
          this.character.resources.push({ name: "Ki", current: Number(a.level), max: Number(a.level), recharge: "shortrest" });
        }
        if(a.thisclass.name === "Paladin") {
          this.character.resources.push({ name: "Lay on Hands", current: Number(a.level) * 5, max: Number(a.level) * 5, recharge: "longrest"});
          this.character.resources.push({ name: "Divine Sense", current: this.getStatMod(5) + 1, max: this.getStatMod(5) + 1, recharge: "longrest"});
          if(a.level >= 3) {
            this.character.resources.push({ name: "Channel Divinity", current: 1, max: 1, recharge: "shortrest"});
          }
          if(a.level >= 14) {
            this.character.resources.push({ name: "Cleansing Touch", current: this.getStatMod(5), max: this.getStatMod(5), recharge: "longrest" });
          }
        }
        if(a.thisclass.name === "Sorcerer" && Number(a.level) >= 2) {
          this.character.resources.push({ name: "Sorcery Points", current: Number(a.level), max: Number(a.level), recharge: "longrest" });
        }
        if(a.thisclass.name === "Wizard") {
          if(Number(a.level) >= 2 && a.selsubclass.name === "Bladesinging") {
            this.character.resources.push({ name: "Bladesong", current: 2, max: 2, recharge: "shortrest"});
          }
          if(Number(a.level) >= 2 && a.selsubclass.name === "School of Abjuration") {
            this.character.resources.push({ name: "Arcane Ward", current: 1, max: 1, recharge: "longrest"});
          }
          if(Number(a.level) >= 2 && a.selsubclass.name === "School of Enchantment") {
            this.character.resources.push({ name: "Hypnotic Gaze", current: 1, max: 1, recharge: "longrest"});
          }
          if(Number(a.level) >= 6 && a.selsubclass.name === "School of Enchantment") {
            this.character.resources.push({ name: "Instinctive Charm", current: 1, max: 1, recharge: "longrest"});
          }
          if(Number(a.level) >= 10 && a.selsubclass.name === "School of Illusion") {
            this.character.resources.push({ name: "Illusory Self", current: 1, max: 1, recharge: "shortrest"});
          }
          if(Number(a.level) >= 10 && a.selsubclass.name === "School of Transmutation") {
            this.character.resources.push({ name: "Shapechanger", current: 1, max: 1, recharge: "shortrest"});
          }
        }
      });
    },
    sortSpells (spells) {
      var x = spells.slice(0);
      x.sort((b, c) => {
        if(b.title > c.title) {
          return 1;
        } else if(c.title > b.title) {
          return -1;
        }
        return 0;
      });
      return x;
    }
  },
  mounted () {
    if(window.outerWidth < 1024) {
      this.mobile = true;
    }
  },
  updated() {
    scaleFontSize('attackdiv');
    scaleFontSize('featurebox');
    scaleFontSize('profbox');
    scaleFontSize('armorbox');
    scaleFontSize('equipmentbox');
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