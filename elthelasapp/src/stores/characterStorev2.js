import Character from './classes/characterv2';
import charCalculators from '@/helpers/charcalcv2';
import axios from 'axios';

export default {
  state: () => {
    return {
      serverCharacters: [],
      character: Character(),
      statRolls: [],
      characters: [],
      drivefiles: [],
      hitdicechanged: 0,
      encounterCharacters: [],
      message: ""
    };
  },
  getters: {
    getSlots: () => charCalculators.slots,
    incrementClassCount: () => (spell, classCounts) => {
      charCalculators.incrementClassCount(spell, classCounts);
    },
    maxExhaustion () {
      return Math.max(2, Math.ceil(this.getStatTotal(2) / 2));
    },
    getNumPrepped: () => (classCounts, spells) => {
      return charCalculators.numPrepped(classCounts, spells);
    },
    getBardPrepared: () => (a) => {
      return charCalculators.bardPrepared(a);
    },
    getThirdCasterPrepared: () => (a) => {
      return charCalculators.thirdCasterPrepared(a);
    },
    getTotalPrepared: (state) => {
      return charCalculators.totalPrepared(state.character);
    },
    getCharacter: (state) => {
      return state.character;
    },
    getAsCreature: (state, getters) => {
      let creature = {
        name: state.character.name,
        type: "humanoid",
        size: "medium",
        subtype: state.character.race.name,
        cr: getters.level,
        alignment: state.character.alignment,
        ac: getters.accalc,
        acdesc: getters.accalc,
        hp: getters.getHPTotal,
        hpdesc: getters.getHPTotal,
        speed: getters.getSpeedStat(0) + " ft",
        str: getters.getStatTotal(0),
        strmod: this.getStatMod(0),
        dex: this.getStatTotal(1),
        dexmod: this.getStatMod(1),
        con: this.getStatTotal(2),
        conmod: this.getStatMod(2),
        int: this.getStatTotal(3),
        intmod: this.getStatMod(3),
        wis: this.getStatTotal(4),
        wismod: this.getStatMod(4),
        cha: this.getStatTotal(5),
        chamod: this.getStatMod(5),
        saves: this.getSaveMod(0) + " STR " + this.getSaveMod(1) + " DEX " + this.getSaveMod(2) + " CON " + this.getSaveMod(3) + " INT " + this.getSaveMod(4) + " WIS " + this.getSaveMod(5) + " CHA",
        senses: "passive perception " + (10 + this.getSkillMod(this.character.skills[11])),
        damageimmunities: "",
        conditionimmunities: "",
        languages: "",
        damageresistances: "",
        locations: "",
        latlong: "",
        description: ""
      };
      for (let x = 1; x < 5; x++) {
        if (this.getSpeedStat(x)) {
          creature.speed += " " + this.getSpeedStat(x);
          creature.speed += (x === 1 ? " fly" : (x === 2 ? " climb" : (x === 3 ? " swim" : (x === 4 ? " burrow" : ""))));
        }
      }
      creature.tags = [creature.type, creature.size, "cr" + creature.cr, creature.alignment];
      return creature;
    },
    classtext: (state) => {
      return charCalculators.classtext(state.character);
    },
    profbonus: (state) => {
      return charCalculators.profbonus(state.character);
    },
    totalGold: (state) => {
      return charCalculators.totalGold(state.character);
    },
    getStatTotal: (state) => (i) => {
      return charCalculators.statTotal(state.character, i);
    },
    getStatMod: (state) => (i) => {
      return charCalculators.statMod(state.character, i);
    },
    getSaveMod: (state) => (i) => {
      return charCalculators.saveMod(state.character, i);
    },
    getSaveDC: (state) => (i, cc) => {
      return charCalculators.saveDC(state.character, i, cc);
    },
    charGroups: (state) => {
      let groups = [];
      state.characters.forEach((a) => {
        let b = groups.findIndex((c) => {
          return c.name === a.group;
        });
        if (b === -1 && a.group !== "") {
          groups.push({ name: a.group, id: a.group + Date.now() });
        }
      });
      let b = groups.findIndex((c) => {
        return c.name === state.character.group;
      });
      if (b === -1) {
        groups.push({ name: state.character.group, id: "curchargroup" });
      }
      return groups;
    },
    getAttBonus: (state) => (i, cc) => {
      return charCalculators.attBonus(state.character, i, cc);
    },
    getSkillMod: (state) => (skill) => {
      return charCalculators.skillMod(state.character, skill);
    },
    cantripsKnown: (state) => {
      return charCalculators.cantripsknown(state.character);
    },
    getInitMod: (state) => {
      return charCalculators.initMod(state.character);
    },
    getHPTotal: (state) => {
      return charCalculators.hpTotal(state.character);
    },
    getPPTotal: (state) => {
      return charCalculators.ppTotal(state.character);
    },
    pointbuy: (state) => {
      return state.character.stats.reduce((a, b) => {
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
    getSpeedStat: (state) => (i) => {
      return charCalculators.speedStat(state.character, i);
    },
    getAttackBonus: (state) => (attack) => {
      return charCalculators.attackBonus(state.character, attack);
    },
    getDamageBonus: (state) => (dmg, stat) => {
      return charCalculators.damageBonus(state.character, dmg, stat);
    },
    armorac: (state) => (a) => {
      return charCalculators.armorAC(state.character, a);
    },
    armorpc: (state) => (a) => {
      return charCalculators.armorPC(state.character, a);
    },
    charlevel: () => charCalculators.charlevel,
    accalc: (state) => {
      return charCalculators.acCalc(state.character);
    },
    pccalc: (state) => {
      return charCalculators.pcCalc(state.character);
    },
    equipmentContainers: (state) => {
      return charCalculators.equipmentContainers(state.character);
    },
    carryWeight: (state) => {
      return charCalculators.carryWeight(state.character);
    },
    carryMax: (state) => {
      return charCalculators.carryMax(state.character);
    },
    totalslots: (state) => (level) => {
      return charCalculators.totalSlots(state.character, level);
    },
    warlockSlots: (state) => {
      return charCalculators.warlockSlots(state.character);
    },
    warlockSlotLevel: (state) => {
      return charCalculators.warlockSlotLevel(state.character);
    },
    level: (state) => {
      return charCalculators.level(state.character);
    },
    validateCharacter: () => {
      if (this.character.name === "") {
        alert("cannot save character without name");
        return false;
      }
      return true;
    }
  },
  actions: {
    addAbilities (curChar) {
      if (!curChar.skills.find(e => {
        return e.name === "Strength";
      })) {
        curChar.skills.unshift(
          { name: "Strength", prof: 0, stat: 0, magic: 0 },
          { name: "Dexterity", prof: 0, sat: 1, magic: 0 },
          { name: "Constitution", prof: 0, sat: 2, magic: 0 },
          { name: "Intelligence", prof: 0, sat: 3, magic: 0 },
          { name: "Wisdom", prof: 0, sat: 4, magic: 0 },
          { name: "Charisma", prof: 0, sat: 5, magic: 0 }
        );
      }
    },
    setCharacter (character) {
      this.character = character;
    },
    getFromServer () {
      return new Promise((resolve) => {
        if (localStorage.getItem('token')) {
          axios.get('/charactersv2/?token=' + localStorage.getItem('token')).then((res) => {
            this.characters = [ ...res.data ];
            resolve(this.characters);
          }).catch(function() {
            resolve(false);
          });
        }
      });
    },
    getFromServerSilent () {
      if (localStorage.getItem('token')) {
        axios.get('/charactersv2/?token=' + localStorage.getItem('token')).then((res) => {
          this.characters = [ ...res.data ];
          return true;
        }).catch(() => {
          return false;
        });
      }
    },
    getOneFromServer (id) {
      axios.get('/charactersv2/' + id).then((response) => {
        this.character = { ...response.data };
        this.addAbilities(this.character);
      });
    },
    loadChar ({ character, comp, passthrough }) {
      let c = passthrough || window.confirm("Are you sure you want to load this character? This will erase any unsaved changes.");
      if (c) {
        this.character = Character();
        for (let prop in character) {
          this.character[prop] = character[prop];
          this.addAbilities(this.character);
        }
        // this.character = character;
        comp.$root.$emit('bv::hide::modal', 'servermodal');
      }
    },
    updateToServer () {
      axios.post('/charactersv2/' + this.character._id + '?token=' + localStorage.getItem('token'), { character: this.character }).then((res) => {
        this.character._id = res.data._id;
        return true;
      }).catch(function() {
        alert("error when saving, please try logging off and in again");
      });
    },
    updateToServerSilent () {
      axios.post('/charactersv2/' + this.character._id + '?token=' + localStorage.getItem('token'), { character: this.character }).then((res) => {
        this.character._id = res.data._id;
        return true;
      }).catch(() => {
        this.message = "error when autosaving, please try logging off and in again";
        setTimeout(function() {
          this.message = "";
        }, 10000);
      });
    },
    newToServer () {
      axios.post('/charactersv2?token=' + localStorage.getItem('token'), { character: this.character }).then((res) => {
        this.character._id = res.data._id;
        return true;
      }).catch(function(e) {
        console.log(e);
        alert("error when loading, please try logging off and in again");
      });
    },
    deleteFromServer({ character }) {
      // comp.$root.$emit('bv::show::modal', 'loading');
      axios.delete('/charactersv2/' + character._id + '?token=' + localStorage.getItem('token')).then((res) => {
        if (res.data.success) {
          this.characters.splice(this.characters.indexOf(character), 1);
        }
        return true;
      }).catch(function(e) {
        if (e) {
          alert("error when loading, please try logging off and in again: " + e);
        }
        //comp.$root.$emit('bv::hide::modal', 'loading');
      });
    },
    setRaceDefaults () {
      let character = this.character;
      character.age = character.race.agepoints.mentalmaturity;
      var feet = Math.floor(character.race.averageheight / 12);
      var inches = character.race.averageheight % 12;
      character.height = feet + "' " + inches + "''";
      character.weight = character.race.averageweight + " lbs";
    },
    addclass () {
      this.character.charclasses.push({ thisclass: { name: "", subclass: [] }, level: 0, selsubclass: { castermult: 0, features: [] }, savedcstat: 0, bonusknown: 0 });
    },
    removeclass (i) {
      if (this.character.charclasses.length > 1) {
        this.character.charclasses.splice(i, 1);
      } else {
        alert("cannot remove last class");
      }
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
    removeArmor(index) {
      this.character.armors.splice(index, 1);
    },
    removeEquipment(i) {
      this.character.equipment.splice(this.character.equipment.indexOf(i), 1);
    },
    removeContainer(i) {
      this.character.containers.splice(this.character.containers.indexOf(i), 1);
    },
    addProficiency(proficiency) {
      this.character.skills.push(proficiency);
    },
    removeProficiency(skill) {
      let i = this.character.skills.indexOf(skill);
      if (i !== -1 && confirm("Are you sure you want to remove the skill " + skill.name + "?")) {
        this.character.skills.splice(i, 1);
      }
    },
    castSpell(spell) {
      if (spell.level !== 'cantrip' && spell.castLevel !== "warlock") {
        var level = 'level' + spell.castLevel;
      } else {
        level = spell.level;
      }
      if (spell.castLevel === "warlock") {
        this.character.warlockslotsavailable--;
        this.character.castlog.unshift({ ...spell, level: this.warlockSlotLevel });
      } else {
        this.character.availableslots[level]--;
        this.character.castlog.unshift({ ...spell, level: level });
      }
      if (spell.duration.toLowerCase().includes("concentration")) {
        let effect = {
          id: Date.now() + Math.random(),
          modifier: "concentrating on " + spell.title,
          concentrating: true
        };
        if (spell.duration.toLowerCase().includes("1 minute")) {
          effect.remaining = 10;
        } else if (spell.duration.includes("1 hour")) {
          effect.remaining = 600;
        } else if (spell.duration.includes("1 round")) {
          effect.remaining = 1;
        } else if (spell.duration.includes("10 minutes")) {
          effect.remaining = 100;
        } else {
          effect.remaining = 0;
        }
        this.character.activemodifiers.push(effect);
      }
    },
    shortrest () {
      this.character.warlockslotsavailable = this.warlockSlots;
      this.character.ppcurrent = this.getPPTotal;
      this.character.resources.forEach((a) => {
        if (a.recharge === 'shortrest') {
          a.current = a.max;
        }
      });
      this.character.deathsuccess = 0;
      this.character.deathfail = 0;
    },
    longrest () {
      this.shortrest();
      for (var prop in this.character.availableslots) {
        if (prop !== 'cantrip') {
          this.character.availableslots[prop] = this.totalslots(prop);
        }
      }
      this.character.hpcurrent = this.getHPTotal;
      this.character.charclasses.forEach((a) => {
        if (typeof a.hitdice !== 'undefined') {
          a.hitdice += a.level / 2;
          a.hitdice = Math.min(a.hitdice, a.level);
          this.hitdicechanged++;
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
    saveCharacter () {
      if (this.validateCharacter) {
        var text = JSON.stringify(this.character);
        var a = document.createElement('a');
        a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(text));
        a.setAttribute('download', this.character.name + '.json');
        a.click();
      }
    },
    loadImage () {
      if (document.getElementById('imageload')) {
        var f = document.getElementById('imageload').files[0];
        var r = new FileReader();
        r.addEventListener("load", () => {
          this.character.image = r.result;
        }, false);
        if (f) {
          r.readAsDataURL(f);
        }
      }
    },
    loadCharacter () {
      var c = window.confirm("Are you sure you want to load? This will erase any unsaved changes.");
      if (c) {
        var f = document.getElementById('fileload').files[0];
        var r = new FileReader();
        this.character = Character();
        r.onloadend = function(e) {
          var data = e.target.result;
          var parsed = JSON.parse(data);
          for (var x in parsed) {
            if (parsed[x]) {
              this.character[x] = parsed[x];
            }
          }
          // validations!
          this.character.charclasses.forEach((a) => {
            if (typeof a.selsubclass === "undefined") {
              a.selsubclass = { features: [], name: "" };
            }
          });
        };
        if (typeof f !== "undefined") {
          r.readAsText(f);
        }
      }
    },
    resetCharacter () {
      var c = window.confirm("Are you sure you want to start over? This will erase any unsaved changes.");
      if (c) {
        this.character = Character();
      }
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
    rollBoundedStats () {
      function d6() {
        return Math.floor(Math.random() * 6) + 1;
      }
      this.statRolls = [];
      for (var x = 0; x < 5; x++) {
        var roll = [d6(), d6(), d6(), d6()];
        roll.sort();
        roll.splice(0, 1);
        this.statRolls.push(roll.reduce((a, b) => {
          return a + b;
        }, 0));
      }
      var remainder = 78 - this.statRolls[0] - this.statRolls[1] - this.statRolls[2] - this.statRolls[3] - this.statRolls[4];
      if (remainder >= 4 && remainder <= 18) {
        this.statRolls.push(remainder);
      } else {
        this.rollBoundedStats();
      }
    }
  }
};