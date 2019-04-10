import Character from '@/model/classes/character';
import Vue from 'vue';
import getters from './character/getters';
import actions from './character/actions';

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
  getters: getters,
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
