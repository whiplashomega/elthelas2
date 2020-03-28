import Vue from 'vue';
import { newCampaign, newChapter } from './classes/campaign';
import newEncounter from './classes/encounter';

export default {
  state: {
    all: [],
    current: newCampaign(),
    currentChapter: false,
    campaignCharacters: []
  },
  getters: {
    getCampaigns: (state) => state.all,
    getCurrentCampaign: (state) => state.current,
    getCurrentChapter: (state) => state.currentChapter,
    getCampaignCharacters: (state) => state.campaignCharacters
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
    getAllCampaigns: ({ state }, comp) => {
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
    getAllCampaignsSilent: ({ state, getters }) => {
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
    fetchCampaignCharacter: ({ state }, id) => {
      Vue.http.get('/characters/' + id).then((response) => {
        if (response.status === 200) {
          state.campaignCharacters.push({ ...response.body });
        }
      });
    },
    loadCampaign: ({ state, dispatch }, { campaign, comp }) => {
      state.current = { ...campaign };
      state.currentChapter = state.current.chapters[0];
      comp.$root.$emit('bv::hide::modal', 'campaignmodal');
      state.campaignCharacters = [];
      state.current.playercharacters.forEach((pcid) => {
        dispatch('fetchCampaignCharacter', pcid);
      });
    },
    loadCampaignById: ({ state }, { id }) => {
      state.current = { ...state.all.filter((a) => {
        return a._id === id;
      })[0] };
      state.currentChapter = state.current.chapters[0];
    },
    loadCampaignByUrl: ({ state, dispatch }, { url }) => {
      state.current = { ...state.all.filter((a) => {
        return a.url === url;
      })[0] };
      state.current.playercharacters.forEach((pcid) => {
        dispatch('fetchCampaignCharacter', pcid);
      });
      state.currentChapter = state.current.chapters[0];
    },
    saveCampaign: ({ state, getters }) => {
      Vue.http.post('/campaigns/' + state.current._id + "?token=" + getters.getUserInfo.token, { campaign: state.current }).then((res) => {
        state.all.splice(state.all.indexOf(state.current), 1);
        state.all.push(res.body);
      });
    },
    deleteCampaign: ({ state, getters }, { campaign }) => {
      Vue.http.delete('/campaigns/' + campaign._id + "?token=" + getters.getUserInfo.token).then(() => {
        state.all.splice(state.all.indexOf(campaign));
      });
    },
    moveEncounterUp: ({ state }, index) => {
      if (index > 0) {
        let en = state.currentChapter.encounters.splice(index, 1);
        state.currentChapter.encounters.splice(index - 1, 0, ...en);
      }
    },
    moveEncounterDown: ({ state }, index) => {
      if (index + 1 < state.currentChapter.encounters.length) {
        let en = state.currentChapter.encounters.splice(index, 1);
        state.currentChapter.encounters.splice(index + 1, 0, ...en);
      }
    },
    deleteCampaignEncounter: ({ state }, index) => {
      if (window.confirm("Are you sure you want to delete this encounter?")) {
        state.currentChapter.encounters.splice(index, 1);
      }
    },
    moveChapterUp: ({ state }, index) => {
      if (index > 0) {
        let en = state.current.chapters.splice(index, 1);
        state.current.chapters.splice(index - 1, 0, ...en);
      }
    },
    moveChapterDown: ({ state }, index) => {
      if (index + 1 < state.current.chapters.length) {
        let en = state.current.chapters.splice(index, 1);
        state.current.chapters.splice(index + 1, 0, ...en);
      }
    },
    deleteChapter: ({ state }, index) => {
      if (window.confirm("Are you sure you want to delete this chapter?")) {
        state.current.chapters.splice(index, 1);
      }
    },
    newCamapign: ({ state }) => {
      state.current = newCampaign();
      state.currentChapter = state.current.chapters[0];
    },
    invitePCToCampaign: ({ state, getters }, pcid) => {
      Vue.http.get('/characters/invite/' + pcid + '/' + state.current._id + '?token=' + getters.getUserInfo.token).then(() => {
        return true;
      });
    },
    addSection: ({ state }) => {
      state.currentChapter.sections.push({ id: Date.now(), encounters: [], title: "", description: "", complete: false, hidden: false });
    },
    deleteSection: ({ state }, section) => {
      let i = state.currentChapter.sections.findIndex((a) => {
        return a.id === section.id;
      });
      state.currentChapter.sections.splice(i, 1);
    },
    addEncounterToSection: ({ state }, { section, index }) => {
      section.encounters.splice(index, 0, newEncounter());
    },
    deleteEncounterFromSection: ({ state }, { section, encounter }) => {
      let i = section.encounters.findIndex((a) => {
        return a.id === encounter.id;
      });
      section.encounters.splice(i, 1);
    },
    moveEncounterUpInSection: ({ state }, { section, index }) => {
      if (index > 0) {
        let en = section.encounters.splice(index, 1);
        section.encounters.splice(index - 1, 0, ...en);
      }
    },
    moveEncounterDownInSection: ({ state }, { section, index }) => {
      if (index + 1 < section.encounters.length) {
        let en = section.encounters.splice(index, 1);
        section.encounters.splice(index + 1, 0, ...en);
      }
    },
    moveEncounterFromSectionToSection: ({ state }, { section1, section2, encounter }) => {
      let i = section1.encounters.findIndex((a) => encounter.id === a.id);
      section1.encounters.splice(i, 1);
      section2.encounters.push(encounter);
    },
    moveEncounterFromChapterToSection: ({ state }, { encounter, section }) => {
      let i = state.currentChapter.encounters.findIndex((a) => a.name === encounter.name);
      state.currentChapter.encounters.splice(i, 1);
      section.encounters.push(encounter);
    },
    moveSectionUp: ({ state }, index) => {
      if (index > 0) {
        let section = state.currentChapter.sections.splice(index, 1);
        state.currentChapter.sections.splice(index - 1, 0, ...section);
      }
    },
    moveSectionDown: ({ state }, index) => {
      if (index + 1 < state.currentChapter.sections.length) {
        let en = state.currentChapter.sections.splice(index, 1);
        state.currentChapter.sections.splice(index + 1, 0, ...en);
      }
    }
  }
};
