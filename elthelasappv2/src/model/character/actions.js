import Character from '@/model/classes/character';
import Vue from 'vue';

function addAbilities(curChar) {
  if (!curChar.skills.find(e => {
    return e.name === "Strength";
  })) {
    curChar.skills.unshift(
      { name: "Strength", prof: 0, stat: 0, magic: 0 },
      { name: "Dexterity", prof: 0, stat: 1, magic: 0 },
      { name: "Constitution", prof: 0, stat: 2, magic: 0 },
      { name: "Intelligence", prof: 0, stat: 3, magic: 0 },
      { name: "Wisdom", prof: 0, stat: 4, magic: 0 },
      { name: "Charisma", prof: 0, stat: 5, magic: 0 }
    );
  }
}

export default {
  setCharacter: ({ state }, character) => {
    state.currentCharacter = character;
  },
  getFromServer: ({ commit, state }, comp) => {
    if (comp.loggedin) {
      comp.$root.$emit('bv::show::modal', 'loading');
      comp.$http.get('/characters/?token=' + comp.token.token).then(function(res) {
        state.characters = res.body;
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
  getFromServerSilent: ({ state }, comp) => {
    if (comp.loggedin) {
      comp.$http.get('/characters/?token=' + comp.token.token).then(function(res) {
        state.characters = res.body;
        return true;
      }).catch(function() {
        return false;
      });
    }
  },
  getOneFromServer: ({ state }, id) => {
    Vue.http.get('/characters/' + id).then((response) => {
      state.currentCharacter = { ...response.body };
      addAbilities(state.currentCharacter);
    });
  },
  loadFromDrive: ({ state }, { comp, id }) => {
    comp.$root.$emit('bv::hide::modal', 'drivemodal');
    comp.$root.$emit('bv::show::modal', 'loading');
    Vue.http.get('https://www.googleapis.com/drive/v3/files/' + id, { params: { access_token: this.googletoken, alt: "media" } }).then((response) => {
      state.currentCharacter = { ...response.body };
      comp.$root.$emit('bv::hide::modal', 'loading');
    });
  },
  getDriveFiles: ({ state }, { comp }) => {
    comp.$root.$emit('bv::show::modal', 'loading');
    Vue.http.get('https://www.googleapis.com/drive/v3/files', { params: { access_token: comp.googletoken, q: "mimeType contains 'json'", fields: 'files(id, name, size, modifiedTime)' } }).then((response) => {
      state.drivefiles = response.body.files;
      comp.$root.$emit('bv::hide::modal', 'loading');
      comp.$root.$emit('bv::show::modal', 'drivemodal');
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
      { headers: { 'Content-Type': 'multipart/related; boundary="' + boundary + '"' } })
      .then(() => {
        this.$root.$emit('bv::hide::modal', 'loading');
        return true;
      });
  },
  loadChar: ({ state }, { character, comp, passthrough }) => {
    let c = passthrough || window.confirm("Are you sure you want to load this character? This will erase any unsaved changes.");
    if (c) {
      state.currentCharacter = Character();
      for (let prop in character) {
        state.currentCharacter[prop] = character[prop];
        addAbilities(state.currentCharacter);
      }
      // state.currentCharacter = character;
      comp.$root.$emit('bv::hide::modal', 'servermodal');
    }
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
  updateToServerSilent: ({ state }, comp) => {
    Vue.http.post('/characters/' + state.currentCharacter._id + '?token=' + comp.token.token, { character: comp.character }).then(function(res) {
      state.currentCharacter._id = res.body._id;
      return true;
    }).catch(function() {
      state.message = "error when autosaving, please try logging off and in again";
      setTimeout(function() {
        state.message = "";
      }, 10000);
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
    state.currentCharacter.charclasses.push({ thisclass: { name: "", subclass: [] }, level: 0, selsubclass: { castermult: 0, features: [] }, savedcstat: 0, bonusknown: 0 });
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
  addProficiency({ state }, proficiency) {
    state.currentCharacter.skills.push(proficiency);
  },
  removeProficiency({ state }, skill) {
    let i = state.currentCharacter.skills.indexOf(skill);
    if (i !== -1 && confirm("Are you sure you want to remove the skill " + skill.name + "?")) {
      state.currentCharacter.skills.splice(i, 1);
    }
  },
  castSpell({ state, getters }, spell) {
    if (spell.level !== 'cantrip' && spell.castLevel !== "warlock") {
      var level = 'level' + spell.castLevel;
    } else {
      level = spell.level;
    }
    if (spell.castLevel === "warlock") {
      state.currentCharacter.warlockslotsavailable--;
      state.currentCharacter.castlog.unshift({ ...spell, level: getters.warlockSlotLevel });
    } else {
      state.currentCharacter.availableslots[level]--;
      state.currentCharacter.castlog.unshift({ ...spell, level: level });
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
      state.currentCharacter.activemodifiers.push(effect);
    }
  },
  shortrest: ({ state, getters }) => {
    state.currentCharacter.warlockslotsavailable = getters.warlockSlots;
    state.currentCharacter.resources.forEach((a) => {
      if (a.recharge === 'shortrest') {
        a.current = a.max;
      }
    });
    state.currentCharacter.deathsuccess = 0;
    state.currentCharacter.deathfail = 0;
  },
  longrest: ({ state, getters, dispatch }) => {
    dispatch("shortrest").then(() => {
      for (var prop in state.currentCharacter.availableslots) {
        if (prop !== 'cantrip') {
          state.currentCharacter.availableslots[prop] = getters.totalslots(prop);
        }
      }
      state.currentCharacter.hpcurrent = getters.getHPTotal;
      state.currentCharacter.charclasses.forEach((a) => {
        if (typeof a.hitdice !== 'undefined') {
          a.hitdice += a.level / 2;
          a.hitdice = Math.min(a.hitdice, a.level);
          state.hitdicechanged++;
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
  loadImage: ({ state, getters }) => {
    var f = document.getElementById('imageload').files[0];
    var r = new FileReader();
    r.addEventListener("load", function () {
      state.currentCharacter.image = r.result;
    }, false);
    if (f) {
      r.readAsDataURL(f);
    }
  },
  loadCharacter ({ state }, passthrough) {
    var c = window.confirm("Are you sure you want to load? This will erase any unsaved changes.");
    if (c) {
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
    }
  },
  resetCharacter ({ state }) {
    var c = window.confirm("Are you sure you want to start over? This will erase any unsaved changes.");
    if (c) {
      state.currentCharacter = Character();
    }
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
};
