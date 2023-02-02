import axios from 'axios';
import Creature from './classes/creaturev2';

export default {
  state: () => {
    return {
      creatures: [],
      builderCreature: Creature(),
      encounterCreatures: []
    };
  },
  actions: {
    getAllCreatures () {
      return new Promise((resolve) => {
        axios.get('/creaturesv2').then((response) => {
          this.creatures = response.data;
          resolve(true);
        }).catch((response) => {
          console.log(response);
          console.log("could not fetch creatures from DB");
        });
      });
    },
    resetCreature () {
      this.builderCreature = Creature();
    },
    getCreatureForEdit (id) {
      return new Promise((resolve) => {
        axios.get('/creaturesv2/' + id + "?token=" + localStorage.getItem('token')).then((response) => {
          this.builderCreature = response.data;
          resolve(true);
        });
      });
    },
    saveCreature (creature) {
      return new Promise((resolve) => {
        axios.post('/creaturesv2/' + creature._id + '?token=' + localStorage.getItem('token'), { creature: creature }).then((response) => {
          creature = response.data;
          resolve(response.data);
        });
      });
    },
    getCreature (id) {
      return new Promise((resolve) => {
        axios.get('/creaturesv2/' + id + "?token=" + localStorage.getItem('token')).then((response) => {
          let i = this.creatures.findIndex((cre) => {
            return cre._id === id;
          });
          this.creatures[i] = response.data;
          resolve(this.creatures[i]);
        });
      });
    },
    deleteCreature (id) {
      return new Promise((resolve) => {
        axios.delete('/creaturesv2/' + id + "?token=" + localStorage.getItem('token')).then((response) => {
          let i = this.creatures.findIndex((cre) => {
            return cre._id === id;
          });
          this.creatures.splice(i, 1);
          console.log(response);
          resolve(true);
        });
      });
    },
    saveNewCreature (creature) {
      return new Promise((resolve) => {
        axios.post('/creaturesv2/?token=' + localStorage.getItem('token'), { creature: creature }).then((response) => {
          creature._id = response.data._id;
          this.creatures.push(response.data);
          resolve(true);
        });
      });
    }
  }
};