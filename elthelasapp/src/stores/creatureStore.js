import axios from 'axios';
import { marked } from '@/../node_modules/marked/lib/marked.esm.js';
import Creature from './classes/creature';

export default {
  state: () => {
    return {
      creatures: [],
      builderCreature: Creature(),
      encounterCreatures: []
    };
  },
  actions: {
    calcStatMods (creature) {
      creature.descr = marked.parse(creature.description);
      creature.strmod = Math.floor(creature.str / 2) - 5;
      creature.dexmod = Math.floor(creature.dex / 2) - 5;
      creature.conmod = Math.floor(creature.con / 2) - 5;
      creature.intmod = Math.floor(creature.int / 2) - 5;
      creature.wismod = Math.floor(creature.wis / 2) - 5;
      creature.chamod = Math.floor(creature.cha / 2) - 5;
    },
    getAllCreatures () {
      return new Promise((resolve) => {
        axios.get('/creatures').then((response) => {
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
        axios.get('/creatures/' + id + "?token=" + localStorage.getItem('token')).then((response) => {
          this.builderCreature = response.data;
          if (this.builderCreature.skills.length > 0 && typeof this.builderCreature.skills[0] === 'string') {
            this.builderCreature.skills = this.builderCreature.skills.map((a) => {
              return { id: Math.random(), value: a };
            });
          }
          if (this.builderCreature.tags.length > 0 && typeof this.builderCreature.tags[0] === 'string') {
            this.builderCreature.tags = this.builderCreature.tags.map((a) => {
              return { id: Math.random(), name: a };
            });
          }
          resolve(response.data);
        });
      });
    },
    saveCreature (creature) {
      return new Promise((resolve) => {
        axios.post('/creatures/' + creature._id + '?token=' + localStorage.getItem('token'), { creature: creature }).then((response) => {
          creature = response.data;
          resolve(response.data);
        });
      });
    },
    getCreature (id) {
      return new Promise((resolve) => {
        axios.get('/creatures/' + id + "?token=" + localStorage.getItem('token')).then((response) => {
          let i = this.creatures.findIndex((cre) => {
            return cre._id === id;
          });
          this.creatures[i] = response.data;
          this.calcStatMods(this.creatures[i]);
          if (this.creatures[i].skills.length > 0 && typeof this.creatures[i].skills[0] === 'object') {
            this.creatures[i].skills = this.creatures[i].skills.map((a) => {
              return a.value;
            });
          }
          if (this.creatures[i].tags.length > 0 && typeof this.creatures[i].tags[0] === 'object') {
            this.creatures[i].tags = this.creatures[i].tags.map((a) => {
              return a.name;
            });
          }
          resolve(this.creatures[i]);
        });
      });
    },
    deleteCreature (id) {
      return new Promise((resolve) => {
        axios.delete('/creatures/' + id + "?token=" + localStorage.getItem('token')).then((response) => {
          let i = this.creatures.findIndex((cre) => {
            return cre._id === id;
          });
          this.creatures.splice(i, 1);
        });
      });
    },
    saveNewCreature (creature) {
      return new Promise((resolve) => {
        axios.post('/creatures/?token=' + localStorage.getItem('token'), { creature: creature }).then((response) => {
          creature._id = response.data._id;
          this.creatures.push(response.data);
        });
      });
    }
  }
};