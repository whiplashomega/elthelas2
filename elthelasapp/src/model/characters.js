import Character from '@/model/classes/character';
import Vue from 'vue';

export default {
  state: {
    serverCharacters: [],
    currentCharacter: Character(),
    slots: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0], // caster level 0
      [2, 0, 0, 0, 0, 0, 0, 0, 0], // caster level 1
      [3, 0, 0, 0, 0, 0, 0, 0, 0], // caster level 2
      [4, 2, 0, 0, 0, 0, 0, 0, 0], // caster level 3
      [4, 3, 0, 0, 0, 0, 0, 0, 0], // caster level 4
      [4, 3, 2, 0, 0, 0, 0, 0, 0], // caster level 5
      [4, 3, 3, 0, 0, 0, 0, 0, 0], // caster level 6
      [4, 3, 3, 1, 0, 0, 0, 0, 0], // caster level 7
      [4, 3, 3, 2, 0, 0, 0, 0, 0], // caster level 8
      [4, 3, 3, 3, 1, 0, 0, 0, 0], // caster level 9
      [4, 3, 3, 3, 2, 0, 0, 0, 0], // caster level 10
      [4, 3, 3, 3, 2, 1, 0, 0, 0], // caster level 11
      [4, 3, 3, 3, 2, 1, 0, 0, 0], // caster level 12
      [4, 3, 3, 3, 2, 1, 1, 0, 0], // caster level 13
      [4, 3, 3, 3, 2, 1, 1, 0, 0], // caster level 14
      [4, 3, 3, 3, 2, 1, 1, 1, 0], // caster level 15
      [4, 3, 3, 3, 2, 1, 1, 1, 0], // caster level 16
      [4, 3, 3, 3, 2, 1, 1, 1, 1], // caster level 17
      [4, 3, 3, 3, 3, 1, 1, 1, 1], // caster level 18
      [4, 3, 3, 3, 3, 2, 1, 1, 1], // caster level 19
      [4, 3, 3, 3, 3, 2, 2, 1, 1] // caster level 20
    ],
    statRolls: []
  },
  getters: {
    getStatRolls: (state) => state.statRolls,
    getSlots: (state) => state.slots,
    getCharacter: (state) => {
      return state.currentCharacter;
    },
    getAsCreature: (state) => {
      return state.currentCharacter;
    },
    classtext: (state) => {
      let character = state.currentCharacter;
      return character.charclasses.reduce((a, b) => {
        return a + b.thisclass.name + " " + b.level.toString() + " ";
      }, "");
    },
    profbonus: (state) => {
      var level = state.currentCharacter.charclasses.reduce((a, b) => {
        return a + Number(b.level);
      }, 0);
      return Math.ceil(level / 4) + 1;
    },
    totalGold: (state) => {
      let character = state.currentCharacter;
      return Number(character.cp) / 100 +
        Number(character.sp) / 10 +
        Number(character.gp) +
        Number(character.pp) * 10 +
        Number(character.art) +
        Number(character.gems);
    },
    getStatTotal: (state) => (i) => {
      return Number(state.currentCharacter.stats[i]) + Number(state.currentCharacter.race.stats[i]) + Number(state.currentCharacter.statbonus[i]);
    },
    getStatMod: (state, getters) => (i) => {
      return Math.floor(getters.getStatTotal(i) / 2) - 5;
    },
    getSaveMod: (state, getters) => (i) => {
      return getters.getStatMod(i) + Number(state.currentCharacter.savebonus[i]) + state.currentCharacter.saves[i] * getters.profbonus;
    },
    getSaveDC: (state, getters) => (i) => {
      return 8 + getters.profbonus + getters.getStatMod(i) + Number(state.currentCharacter.saveDCBonus[i]);
    },
    getAttBonus: (state, getters) => (i) => {
      return Number(state.currentCharacter.attBonus[i]) + getters.getStatMod(i) + getters.profbonus;
    },
    getSkillMod: (state, getters) => (skill) => {
      return getters.getStatMod(skill.stat) + Math.floor(Number(skill.prof) * getters.profbonus);
    },
    getInitMod: (state, getters) => {
      return getters.getStatMod(1) + Number(state.currentCharacter.initmagic);
    },
    getHPTotal: (state, getters) => {
      var total = 0;
      state.currentCharacter.charclasses.forEach((cc) => {
        total += Number(cc.level) * (cc.thisclass.hitdie / 2 + getters.getStatMod(2) + 1);
      });
      total += (state.currentCharacter.charclasses[0].thisclass.hitdie / 2 - 1);
      total += Number(state.currentCharacter.hpmagic);
      return total;
    },
    pointbuy: (state) => {
      return state.currentCharacter.stats.reduce((a, b) => {
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
      return Number(state.currentCharacter.race.speed[i]) + Number(state.currentCharacter.speedmagic[i]);
    },
    getAttackBonus: (state, getters) => (attack) => {
      return Number(attack.bonus) + Number(getters.getStatMod(attack.stat)) + getters.profbonus * attack.prof;
    },
    getAttackDamageBonus: (state, getters) => (attack) => {
      if (attack.addstat) {
        return Number(getters.getStatMod(attack.stat)) + Number(attack.damagebonus);
      } else {
        return attack.damagebonus;
      }
    },
    armorac: (state, getters) => (a) => {
      var ac = Number(a.ac);
      if (a.type === "Medium Armor") {
        ac = Number(a.ac) + Math.min(2, getters.getStatMod(1));
      } else if (a.type === 'Light Armor') {
        ac = Number(a.ac) + getters.getStatMod(1);
      } else if (a.type === "Unarmored Bonus") {
        ac = 10 + Number(a.ac) + getters.getStatMod(1) + getters.getStatMod(a.unarmoredstat);
      }
      return ac;
    },
    charlevel: () => (character) => {
      var level = 0;
      character.charclasses.forEach((a) => {
        level += Number(a.level);
      });
      return level;
    },
    accalc: (state, getters) => {
      var shields = state.currentCharacter.armors.filter((a) => {
        return a.type === "Shield";
      });
      let ac = state.currentCharacter.armors.reduce((b, a) => {
        if (a.equipped && a.type !== "Shield") {
          let ac = getters.armorac(a);
          if (ac > b) {
            b = ac;
          }
        }
        return b;
      }, 10 + getters.getStatMod(1));
      let shield = shields.reduce((b, a) => {
        if (a.equipped) {
          return b + Number(a.ac);
        } else {
          return b;
        }
      }, 0);
      return Number(ac) + Number(shield) + Number(state.currentCharacter.acmagic);
    },
    equipmentContainers: (state) => {
      var containers = [];
      var defcontainer = {
        equipment: state.currentCharacter.equipment.filter((a) => {
          if (!a.container || state.currentCharacter.containers.filter(b => {
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
      state.currentCharacter.containers.forEach((c) => {
        var equip = state.currentCharacter.equipment.filter((e) => {
          return e.container === c.id;
        });
        var weight = 0;
        equip.forEach((e) => {
          weight += e.weight * e.quantity;
        });
        containers.push({ ...c, equipment: equip, contains: weight, container: c });
      });
      return containers;
    },
    carryWeight: (state, getters) => {
      var sum = 0;
      getters.equipmentContainers.forEach((a) => {
        sum += Number(a.weight);
        if (a.weightCounts) {
          sum += a.equipment.reduce((a, b) => {
            return a + Number(b.weight) * Number(b.quantity);
          }, 0);
        }
      });
      sum += (Number(state.currentCharacter.cp) + Number(state.currentCharacter.sp) + Number(state.currentCharacter.gp) + Number(state.currentCharacter.pp)) / 50;
      return sum;
    },
    carryMax: (state, getters) => {
      var base = getters.getStatTotal(0) * 15;
      if (state.currentCharacter.size === "tiny") {
        base *= 0.5;
      } else if (state.currentCharacter.size === 'large') {
        base *= 2;
      } else if (state.currentCharacter.size === 'huge') {
        base *= 4;
      }
      return base + Number(state.currentCharacter.capacitybonus);
    },
    totalslots: (state) => (level) => {
      let index = 0;
      if (level === 'cantrip') {
        return 'infinite';
      } else {
        index = Number(level.substring(5)) - 1;
      }
      let casterlevel = 0;
      if (state.currentCharacter.charclasses.length === 1) {
        casterlevel += Math.ceil(Number(state.currentCharacter.charclasses[0].level) * Number(state.currentCharacter.charclasses[0].selsubclass.castermult));
      } else {
        state.currentCharacter.charclasses.forEach((a) => {
          casterlevel += Math.floor(Number(a.level) * Number(a.selsubclass.castermult));
        });
      }
      try {
        return state.slots[casterlevel][index] + Number(state.currentCharacter.bonusslots[index]);
      } catch (e) {
        return 0;
      }
    },
    warlockSlots: (state) => {
      var slots = 0;
      state.currentCharacter.charclasses.forEach((a) => {
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
    warlockSlotLevel: (state) => {
      return Math.min(state.currentCharacter.charclasses.reduce((level, a) => {
        if (a.thisclass.name === "Warlock") {
          level = Math.ceil(a.level / 2.0);
        }
      }, 0), 5);
    },
    level: (state) => {
      return state.currentCharacter.charclasses.reduce((level, a) => {
        return level + Number(a.level);
      }, 0);
    },
    validateCharacter: (state) => {
      if (state.currentCharacter.name === "") {
        alert("cannot save character without name");
        return false;
      }
      return true;
    }
  },
  actions: {
    getFromServer: ({ commit }, comp) => {
      if (comp.loggedin) {
        comp.$root.$emit('bv::show::modal', 'loading');
        comp.$http.get('/characters?token=' + comp.token.token).then(function(res) {
          comp.characters = res.body;
          comp.$root.$emit('bv::hide::modal', 'loading');
          comp.$root.$emit('bv::show::modal', 'servermodal');
          return true;
        }).catch(function() {
          alert("error when loading, please try logging off and in again");
          comp.$root.$emit('bv::hide::modal', 'loading');
          return false;
        });
      }
    },
    loadFromDrive: ({ state }, { comp, id }) => {
      comp.$root.$emit('bv::hide::modal', 'drivemodal');
      comp.$root.$emit('bv::show::modal', 'loading');
      Vue.http.get('https://www.googleapis.com/drive/v3/files/' + id, { params: { access_token: this.googletoken, alt: "media" } }).then((response) => {
        state.currentCharacter = { ...response.body };
        comp.$root.$emit('bv::hide::modal', 'loading');
      });
    },
    getDriveFiles: () => {
      this.$root.$emit('bv::show::modal', 'loading');
      Vue.http.get('https://www.googleapis.com/drive/v3/files', { params: { access_token: this.googletoken, q: "mimeType contains 'json'", fields: 'files(id, name, size, modifiedTime)' } }).then((response) => {
        this.filelist = response.body.files;
        this.$root.$emit('bv::hide::modal', 'loading');
        this.$root.$emit('bv::show::modal', 'drivemodal');
      });
    },
    saveToDrive: () => {
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
    loadChar: ({ state }, { character, comp }) => {
      state.currentCharacter = character;
      comp.$root.$emit('bv::hide::modal', 'servermodal');
    },
    updateToServer: ({ state }, comp) => {
      comp.$root.$emit('bv::show::modal', 'loading');
      Vue.http.post('/characters/' + state.currentCharacter._id + '?token=' + comp.token.token, { character: comp.character }).then(function(res) {
        state.currentCharacter._id = res.body._id;
        comp.$root.$emit('bv::hide::modal', 'loading');
        return true;
      }).catch(function() {
        alert("error when saving, please try logging off and in again");
        comp.$root.$emit('bv::hide::modal', 'loading');
      });
    },
    newToServer: ({ state }, comp) => {
      comp.$root.$emit('bv::show::modal', 'loading');
      state.currentCharacter._id = undefined;
      Vue.http.post('/characters?token=' + comp.token.token, { character: comp.character }).then(function(res) {
        state.currentCharacter._id = res.body._id;
        comp.$root.$emit('bv::hide::modal', 'loading');
        return true;
      }).catch(function() {
        alert("error when loading, please try logging off and in again");
        comp.$root.$emit('bv::hide::modal', 'loading');
      });
    },
    deleteFromServer({ state }, { character, comp }) {
      // comp.$root.$emit('bv::show::modal', 'loading');
      Vue.http.delete('/characters/' + character._id + '?token=' + comp.token.token).then((res) => {
        if (res.body.success) {
          comp.$root.$emit('bv::hide::modal', 'loading');
          comp.$root.$emit('bv::show::modal', 'servermodal');
          comp.characters.splice(comp.characters.indexOf(character), 1);
        }
        return true;
      }).catch(function() {
        alert("error when loading, please try logging off and in again");
        comp.$root.$emit('bv::hide::modal', 'loading');
      });
    },
    setRaceDefaults ({ state }) {
      let character = state.currentCharacter;
      character.age = character.race.agepoints.mentalmaturity;
      var feet = Math.floor(character.race.averageheight / 12);
      var inches = character.race.averageheight % 12;
      character.height = feet + "' " + inches + "''";
      character.weight = character.race.averageweight + " lbs";
    },
    addclass ({ state }) {
      state.currentCharacter.charclasses.push({ thisclass: { name: "", subclass: [] }, level: 0, selsubclass: { castermult: 0, features: [] } });
    },
    removeclass ({ state }, i) {
      if (state.currentCharacter.charclasses.length > 1) {
        state.currentCharacter.charclasses.splice(i, 1);
      } else {
        alert("cannot remove last class");
      }
    },
    addInjury({ state }) {
      state.currentCharacter.injuries.push({ name: "" });
    },
    removeInjury({ state }, i) {
      state.currentCharacter.injuries.splice(i, 1);
    },
    removeAttack({ state }, index) {
      state.currentCharacter.attacks.splice(index, 1);
    },
    removeArmor({ state }, index) {
      state.currentCharacter.armors.splice(index, 1);
    },
    removeEquipment({ state }, i) {
      state.currentCharacter.equipment.splice(state.currentCharacter.equipment.indexOf(i), 1);
    },
    removeContainer({ state }, i) {
      state.currentCharacter.containers.splice(state.currentCharacter.containers.indexOf(i), 1);
    },
    castSpell({ state }, spell) {
      if (spell.level !== 'cantrip') {
        var level = 'level' + spell.castLevel;
      } else {
        level = spell.level;
      }
      state.currentCharacter.availableslots[level]--;
      state.currentCharacter.castlog.unshift({ ...spell });
    },
    shortrest: ({ state, getters }) => {
      state.currentCharacter.warlockslotsavailable = getters.warlockSlots;
      state.currentCharacter.resources.forEach((a) => {
        if (a.recharge === 'shortrest') {
          a.current = a.max;
        }
      });
    },
    longrest: ({ state, getters, dispatch }) => {
      dispatch("shortrest").then(() => {
        for (var prop in state.currentCharacter.availableslots) {
          if (prop !== 'cantrip') {
            state.currentCharacter.availableslots[prop] = state.totalslots(prop);
          }
        }
        state.currentCharacter.hpcurrent = getters.getHPTotal;
        state.currentCharacter.charclasses.forEach((a) => {
          if (typeof a.hitdice !== 'undefined') {
            a.hitdice += a.level / 2;
            a.hitdice = Math.min(a.hitdice, a.level);
          } else {
            a.hitdice = a.level;
          }
        });
        state.currentCharacter.resources.forEach((a) => {
          if (a.recharge === 'longrest') {
            a.current = a.max;
          }
        });
        state.currentCharacter.castlog = [];
      });
    },
    saveCharacter: ({ state, getters }) => {
      if (getters.validateCharacter) {
        var text = JSON.stringify(state.currentCharacter);
        var a = document.createElement('a');
        a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(text));
        a.setAttribute('download', state.currentCharacter.name + '.json');
        a.click();
      }
    },
    loadCharacter ({ state }) {
      var f = document.getElementById('fileload').files[0];
      var r = new FileReader();
      state.currentCharacter = Character();
      r.onloadend = function(e) {
        var data = e.target.result;
        var parsed = JSON.parse(data);
        for (var x in parsed) {
          if (parsed.hasOwnProperty(x)) {
            state.currentCharacter[x] = parsed[x];
          }
        }
        // validations!
        state.currentCharacter.charclasses.forEach((a) => {
          if (typeof a.selsubclass === "undefined") {
            a.selsubclass = { features: [], name: "" };
          }
        });
      };
      if (typeof f !== "undefined") {
        r.readAsText(f);
      }
    },
    resetCharacter ({ state }) {
      state.currentCharacter = Character();
    },
    rollStats ({ state }) {
      function d6() {
        return Math.floor(Math.random() * 6) + 1;
      }
      state.statRolls = [];
      for (var x = 0; x < 6; x++) {
        var roll = [d6(), d6(), d6(), d6()];
        roll.sort();
        roll.splice(0, 1);
        state.statRolls.push(roll.reduce((a, b) => {
          return a + b;
        }, 0));
      }
    }
  }
};
