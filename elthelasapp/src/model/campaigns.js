import Vue from 'vue';
import { newCampaign, newChapter } from './classes/campaign';
import newEncounter from './classes/encounter';

export default {
  state: {
    all: [],
    current: newCampaign(),
    currentChapter: false
  },
  getters: {
    getCampaigns: (state) => state.all,
    getCurrentCampaign: (state) => state.current,
    getCurrentChapter: (state) => state.currentChapter
  },
  actions: {
    addChapter: ({ state }) => {
      state.current.chapters.push(newChapter());
    },
    loadChapter: ({ state }, chapter) => {
      state.currentChapter = chapter;
    },
    addEncounterToChapter: ({ state }) => {
      state.currentChapter.encounters.push(newEncounter());
    },
    getAllCampaigns: ({ state, getters }, comp) => {
      if (comp.loggedin) {
        comp.$root.$emit('bv::show::modal', 'loading');
        comp.$http.get('/campaigns?token=' + comp.token.token).then(function(res) {
          state.all = res.body;
          comp.$root.$emit('bv::hide::modal', 'loading');
          comp.$root.$emit('bv::show::modal', 'campaignmodal');
          return true;
        }).catch(function() {
          alert("error when loading, please try logging off and in again");
          comp.$root.$emit('bv::hide::modal', 'loading');
          return false;
        });
      }
    },
    getAllCampaignsSilent: ({ state, getters}) => {
      return new Promise((resolve) => {
        Vue.http.get('/campaigns?token=' + getters.getUserInfo.token).then((res) => {
          state.all = res.body;
          resolve();
        });
      });      
    },
    saveNewCampaign: ({ state, getters }) => {
      Vue.http.post('/campaigns?token=' + getters.getUserInfo.token, { campaign: { ...state.current, _id: undefined } }).then((res) => {
        state.current = { ...res.body };
        state.all.push(res.body);
      });
    },
    loadCampaign: ({ state }, { campaign, comp }) => {
      state.current = { ...campaign };
      state.currentChapter = state.current.chapters[0];
      comp.$root.$emit('bv::hide::modal', 'servermodal');
    },
    loadCampaignById: ({ state }, { id }) => {
      state.current = { ...state.all.filter((a) => {
        return a._id === id;
      })[0] };
      state.currentChapter = state.current.chapters[0];
    },
    saveCampaign: ({ state, getters }) => {
      Vue.http.post('/campaigns/' + state.current._id + "?token=" + getters.getUserInfo.token, { encounter: state.current }).then((res) => {
        state.all.splice(state.all.indexOf(state.current), 1);
        state.current = { ...res.body };
        state.all.push(res.body);
      });
    },
    deleteCampaign: ({ state, getters }, { campaign }) => {
      Vue.http.delete('/campaigns/' + campaign._id + "?token=" + getters.getUserInfo.token).then(() => {
        state.all.splice(state.all.indexOf(campaign));
      });
    },
    newCamapign: ({ state }) => {
      state.current = newCampaign();
      state.currentChapter = state.current.chapters[0];
    }
  }
};
