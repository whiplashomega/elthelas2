/* globals localStorage */

import axios from 'axios';
import { newCampaign, newChapter } from './classes/campaign';
import newEncounter from './classes/encounter';
import Character from './classes/character';

export default {
  state: () => {
    return {
      campaigns: [],
      current: newCampaign(),
      currentChapter: false,
      campaignCharacters: []
    };
  },
  actions: {
    addChapter: () => {
      this.current.chapters.push(newChapter());
    },
    loadChapter: (chapter) => {
      this.currentChapter = chapter;
      this.currentChapter.buildmode = false;
    },
    addEncountterToChapter: () => {
      this.currentChapter.encounters.push(newEncounter());
    },
    getAllCampaigns: (comp) => {
      if (localStorage.getItem('user')) {
        comp.$root.$emit('bv::show::modal', 'loading');
        axios.get('/campaigns?token=' + localStorage.getItem('token')).then(function(res) {
          this.campaigns = res.data;
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
    getAllCampaignsSilent: () => {
      return new Promise((resolve) => {
        axios.get('/campaigns?token=' + localStorage.getItem('token')).then((res) => {
          this.campaigns = res.data;
          resolve(true);
        });
      });
    },
    saveNewCampaign: () => {
      return new Promise((resolve) => {
        axios.post('/campaigns?token=' + localStorage.getItem('token'), { campaign: { ...this.current, _id: undefined } }).then((res) => {
          this.current = { ...res.data };
          this.campaigns.push(res.data);
        });
      });
    },
    fetchCampaignCharacter: (id) => {
      axios.get('/characters/' + id).then((response) => {
        if (response.status === 200) {
          if (typeof response.data === "object" && response.body.armors) {
            this.campaignCharacters.push({ ...response.body });
          } else {
            alert("Bad character in array.");
            var badchar = Character();
            badchar._id = id;
            badchar.name = "Delete Me! I'm broken";
            this.campaignCharacters.push(badchar);
          }
        }
      });
    },
    fetchAllCharacters: (idlist) => {
      idlist.forEach((pcid) => {
        this.fetchCampaignCharacter(pcid);
      });      
    },
    loadCampaign: ({ campaign, comp }) => {
      this.current = { ...campaign, buildmode: false };
      this.currentChapter = this.current.chapters[0];
      this.currentChapter.buildmode = false;
      comp.$root.$emit('bv::hide::modal', 'campaignmodal');
      this.campaignCharacters = [];
      this.fetchAllCharacters(this.current.playercharacters);
    },
    loadCampaignById: ({ id }) => {
      this.current = { ...this.campaigns.filter((a) => {
        return a._id === id;
      })[0] };
      this.currentChapter = this.current.chapters[0];
      this.fetchAllCharacters(this.current.playercharacters);
    },
    loadCampaignByUrl: ({ url }) => {
      this.current = { ...this.campaigns.filter((a) => {
        return a.url === url;
      })[0] };
      this.currentChapter = this.current.chapters[0];
      this.fetchAllCharacters(this.current.playercharacters);
    },
    saveCampaign: () => {
      axios.post('/campaigns/' + this.current._id + "?token=" + localStorage.getItem("token"), {
        campaign: this.current
      }).then((res) => {
        this.campaigns.splice(this.campaigns.indexOf(this.current), 1);
        this.campaigns.push(res.data);
      });
    },
    deleteCampaign: ({ campaign }) => {
      axios.delete('/campaigns/' + campaign._id + "?token=" + localStorage.getItem("token")).then(() => {
        this.campaigns.splice(this.campaigns.indexOf(campaign));
      });
    },
    moveEncounterUp: (index) => {
      if (index > 0) {
        let en = this.currentChapter.encounters.splice(index, 1);
        this.currentChapter.encounters.splice(index - 1, 0, ...en);
      }
    },
    moveEncounterDown: (index) => {
      if (index + 1 < this.currentChapter.encounters.length) {
        let en = this.currentChapter.encounters.splice(index, 1);
        this.currentChapter.encounters.splice(index + 1, 0, ...en);
      }
    },
    deleteCampaignEncounter: (index) => {
      if (window.confirm("Are you sure you want to delete this encounter?")) {
        this.currentChapter.encounters.splice(index, 1);
      }
    },
    moveChapterUp: (index) => {
      if (index > 0) {
        let en = this.current.chapters.splice(index, 1);
        this.current.chapters.splice(index - 1, 0, ...en);
      }
    },
    moveChapterDown: (index) => {
      if (index + 1 < this.current.chapters.length) {
        let en = this.current.chapters.splice(index, 1);
        this.current.chapters.splice(index + 1, 0, ...en);
      }
    },
    deleteChapter: (index) => {
      if (window.confirm("Are you sure you want to delete this chapter?")) {
        this.current.chapters.splice(index, 1);
      }
    },
    newCamapign: ({ state }) => {
      state.current = newCampaign();
      state.currentChapter = state.current.chapters[0];
    },
    invitePCToCampaign: (pcid) => {
      axios.get('/characters/invite/' + pcid + '/' + this.current._id + '?token=' + localStorage.getItem('token')).then(() => {
        return true;
      });
    },
    addSection: () => {
      this.currentChapter.sections.push({ id: Date.now(), encounters: [], buildmode: true, title: "", description: "", complete: false, hidden: false });
    },
    deleteSection: (section) => {
      let i = this.currentChapter.sections.findIndex((a) => {
        return a.id === section.id;
      });
      this.currentChapter.sections.splice(i, 1);
    },
    addEncounterToSection: ({ section, index }) => {
      section.encounters.splice(index, 0, newEncounter());
    },
    deleteEncounterFromSection: ({ section, encounter }) => {
      let i = section.encounters.findIndex((a) => {
        return a.id === encounter.id;
      });
      section.encounters.splice(i, 1);
    },
    moveEncounterUpInSection: ({ section, index }) => {
      if (index > 0) {
        let en = section.encounters.splice(index, 1);
        section.encounters.splice(index - 1, 0, ...en);
      }
    },
    moveEncounterDownInSection: ({ section, index }) => {
      if (index + 1 < section.encounters.length) {
        let en = section.encounters.splice(index, 1);
        section.encounters.splice(index + 1, 0, ...en);
      }
    },
    moveEncounterFromSectionToSection: ({ section1, section2, encounter }) => {
      let i = section1.encounters.findIndex((a) => encounter.id === a.id);
      section1.encounters.splice(i, 1);
      section2.encounters.push(encounter);
    },
    moveEncounterFromChapterToSection: ({ encounter, section }) => {
      let i = this.currentChapter.encounters.findIndex((a) => a.name === encounter.name);
      this.currentChapter.encounters.splice(i, 1);
      section.encounters.push(encounter);
    },
    moveSectionUp: (index) => {
      if (index > 0) {
        let section = this.currentChapter.sections.splice(index, 1);
        this.currentChapter.sections.splice(index - 1, 0, ...section);
      }
    },
    moveSectionDown: (index) => {
      if (index + 1 < this.currentChapter.sections.length) {
        let en = this.currentChapter.sections.splice(index, 1);
        this.currentChapter.sections.splice(index + 1, 0, ...en);
      }
    }
  }
};