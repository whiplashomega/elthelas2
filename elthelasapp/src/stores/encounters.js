/* globals localStorage */

import axios from 'axios';
import newEncounter from './classes/encounter';

var shuffle = function (array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

export default {
  state: () => {
    return {
      encounters: [],
      current: newEncounter()
    };
  },
  getters: {
    getRandomEncounters: (state) => (tier, environment) => {
      let eligible = state.encounters.filter((enc) => {
        if (enc.prereq) {
          var prereq = state.encounters.filter((a) => {
            return a._id === enc.prereq;
          })[0];
        } else {
          prereq = false;
        }
        if ((enc.tier === 'Any' || tier === 'Any' || enc.tier === tier) &&
            (enc.environment === 'Any' || environment === 'Any' || enc.environment === environment) &&
            !enc.complete &&
            enc.random &&
            (~prereq || prereq.complete)
        ) {
          return true;
        } else {
          return false;
        }
      });
      shuffle(eligible);
      let final = [];
      eligible.forEach((enc) => {
        if (final.length < 6) {
          final.push(enc);
        }
      });
      return final;
    }
  },
  actions: {
    getAllEncounters: () => {
      return new Promise((resolve) => {
        axios.get('/encounters?token=' + localStorage.getItem('token')).then((res) => {
          this.encounters = res.data;
          resolve();
        });
      });
    },
    saveNewEncounter: () => {
      axios.post('/encounters?token=' + localStorage.getItem('token'), { encounter: { ...this.current, _id: undefined } }).then((res) => {
        this.current = { ...res.data };
        this.encounters.push(res.data);
      });
    },
    loadEncounter: (encounter) => {
      this.current = { ...encounter };
    },
    loadEncounterById: ({ id }) => {
      this.current = { ...this.encounters.filter((a) => {
        return a._id === id;
      })[0] };
    },
    saveEncounter: () => {
      axios.post('/encounters/' + this.current._id + "?token=" + localStorage.getItem('token'), { encounter: this.current }).then((res) => {
        this.encounters.splice(this.encounters.indexOf(this.current), 1);
        this.current = { ...res.data };
        this.encounters.push(res.data);
      });
    },
    deleteEncounter: ({ encounter }) => {
      axios.delete('/encounters/' + encounter._id + "?token=" + localStorage.getItem('token')).then(() => {
        this.encounters.splice(this.encounters.indexOf(encounter));
      });
    },
    resetEncounter: ({ state }) => {
      state.current = newEncounter();
    }    
  }
};