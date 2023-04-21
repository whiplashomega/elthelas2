/* globals localStorage */

import axios from 'axios';

export default {
  state: () => {
    return {
      history: []
    };
  },
  actions: {
    getAllHistory () {
      axios.get('/history/').then((res) => {
        this.history = [ ...res.data ];
        return true;
      }).catch(() => {
        return false;
      });
    },
    saveNew (history) {
      axios.post('/history/' + '?token=' + localStorage.getItem('token'), { history: history }).then((res) => {
        history._id = res.data._id;
        return true;
      }).catch(function(e) {
        console.log(e);
        alert("error when saving");
      });
    },
    saveUpdate (history) {
      axios.post('/history/' + history._id + '?token=' + localStorage.getItem('token'), {
        history: history
      }).then((res) => {
        return true;
      }).catch(function(e) {
        console.log(e);
        alert("error when saving");
      });
    },
    deleteHistory (history) {
      axios.delete('/npcs/' + history._id + '?token=' + localStorage.getItem('token')).then((res) => {
        if (res.data.success) {
          this.history.splice(this.history.indexOf(history), 1);
          return true;
        }
        return false;
      }).catch(function () {
        alert('error, could not delete');
      });
    }
  }
};