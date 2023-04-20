/* globals localStorage */

import axios from 'axios';

export default {
  state: () => {
    return {
      npcs: []
    };
  },
  actions: {
    getAllNPCs () {
      axios.get('/npcs/').then((res) => {
        this.npcs = [ ...res.data ];
        return true;
      }).catch(() => {
        return false;
      });
    },
    saveNew (npc) {
      axios.post('/npcs/' + '?token=' + localStorage.getItem('token'), { npc: npc }).then((res) => {
        npc._id = res.data._id;
        return true;
      }).catch(function(e) {
        console.log(e);
        alert("error when saving");
      });
    },
    saveUpdate (npc) {
      axios.post('/npcs/' + npc._id + '?token=' + localStorage.getItem('token'), {
        npc: npc
      }).then((res) => {
        return true;
      }).catch(function(e) {
        console.log(e);
        alert("error when saving");
      });
    },
    deleteNPC (npc) {
      axios.delete('/npcs/' + npc._id + '?token=' + localStorage.getItem('token')).then((res) => {
        if (res.data.success) {
          this.npcs.splice(this.npcs.indexOf(npc), 1);
          return true;
        }
        return false;
      }).catch(function () {
        alert('error, could not delete');
      });
    }
  }
};