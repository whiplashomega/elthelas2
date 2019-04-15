import Vue from 'vue';
import Stronghold from '../classes/stronghold';

export default {
  getAllImprovements ({ commit }) {
    return Vue.http.get('/json/improvements.json').then((response) => {
      var improvements = response.body.documents;
      commit('GET_IMPROVEMENTS', { improvements: improvements });
      return true;
    });
  },
  newStronghold: ({ state }) => {
    state.current = new Stronghold();
  },
  getAllStrongholds: ({ state }) => {
    return Vue.http.get('/strongholds').then((res) => {
      state.strongholds = res.body;
      return true;
    });
  },
  saveNewStronghold: ({ state, getters }) => {
    Vue.http.post('/strongholds?token=' + getters.getUserInfo.token, { stronghold: { ...state.current, _id: undefined } }).then((res) => {
      state.current = { ...res.body };
      state.strongholds.push(res.body);
      return true;
    });
  },
  loadStronghold: ({ state }, stronghold) => {
    state.current = { ...stronghold };
  },
  loadStrongholdById: ({ state }, { id }) => {
    state.current = { ...state.all.filter((a) => {
      return a._id === id;
    })[0] };
  },
  saveStronghold: ({ state, getters }) => {
    let check = window.confirm("Are you sure you want to save your changes to " + state.current.castleName + "?");
    if (check) {
      Vue.http.post('/strongholds/' + state.current._id + "?token=" + getters.getUserInfo.token, { stronghold: state.current }).then((res) => {
        state.strongholds.splice(state.all.indexOf(state.current), 1);
        state.current = { ...res.body };
        state.strongholds.push(res.body);
        return true;
      });
    }
  },
  addToTreasury ({ state, getters }, changeby, record) {
    state.current.treasury += Number(changeby);
    state.current.transactionrecord.push({ id: Date.now() + changeby + record, amount: changeby, description: record, balance: state.current.treasury, date: getters.gameDate });
    state.changeby = 0;
    state.record = "";
    var x = Math.round(state.current.treasury * 100);
    state.current.treasury = x / 100;
  },
  deleteStronghold: ({ state, getters }, { stronghold }) => {
    let check = window.confirm("Are you sure you want to delete " + stronghold.castleName);
    if (check) {
      Vue.http.delete('/strongholds/' + stronghold._id + "?token=" + getters.getUserInfo.token).then(() => {
        state.strongholds.splice(state.all.indexOf(stronghold));
        return true;
      }).catch(() => {
        alert("failed to delete stronghold");
        return false;
      });
    }
  },
  addImprovement ({ state, getters }, improvement) {
    var match = state.current.improvements.filter((a) => {
      return a.id === improvement.id;
    })[0];
    if (improvement.private) {
      match = state.current.privateEnterprise.filter((a) => {
        return a.id === improvement.id;
      })[0];
      if (match) {
        match.count++;
      } else {
        improvement.count++;
        state.current.privateEnterprise.push(improvement);
        improvement.staff.forEach((st) => {
          let match = getters.staffTypes.filter((a) => {
            return a.name === st.name;
          })[0];
          if (match && st.num > 0) {
            for (var x = 0; x < st.num; x++) {
              state.current.privateEmployees.push({ id: Date.now() + Math.random(), ...match });
            }
          } else if (match) {
            state.current.privateEmployees.push({ id: Date.now() + Math.random(), ...match });
          }
        });
      }
    } else {
      if (match) {
        match.count++;
      } else {
        improvement.count++;
        state.current.improvements.push(improvement);
      }
    }
  },
  buyResource ({ state, getters, dispatch }, type, amount) {
    let checkWeight = state.current.laws.todaysExports + Number(amount) * getters.unitWeightMod[type];
    state.current.resources[type] += Number(amount);
    state.current.laws.todaysExports = checkWeight;
    dispatch('addToTreasury', -1 * Number(amount) * getters.buyTable[type], "Purchase " + amount + " " + type);
  },
};
