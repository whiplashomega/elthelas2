import axios from 'axios';
import { marked } from '@/../node_modules/marked/lib/marked.esm.js';
import droll from 'droll';
import seedrandom from 'seedrandom';

export default {
  state: () => {
    return {
      divines: [{ name: 'Placeholder', id: 'placeholder' }],
      gods: [{ name: 'Placeholder', id: 'placeholder', domains5: "" }],
      territories: [],
      cities: [],
      nations: [],
      landmarks: [],
      features: [],
      continents: []
    };
  },
  getters: {
    allNationNames: (state) => {
      return state.nations.map((a) => {
        return a.name;
      });
    },
    allCityNames: (state) => {
      return state.cities.map((a) => {
        return a.name;
      });
    }
  },
  actions: {
    getAllDivines () {
      return new Promise((resolve) => {
        axios.get("/json/divines.json").then((response) => {
          var divines = response.data.documents;
          for (var x = 0; x < divines.length; x++) {
            divines[x].descr = marked.parse(divines[x].description);
          }
          this.divines = divines;
          resolve(true);
        });
      });
    },
    getAllGods () {
      return new Promise((resolve) => {
        axios.get('/json/gods.json').then((response) => {
          this.gods = response.data.documents;
          resolve(true);
        });
      });
    },
    getAllTerritories () {
      return new Promise((resolve) => {
        axios.get('/json/territories.json').then((response) => {
          this.territories = response.data.documents;
          resolve(true);
        });
      });
    },
    getAllCities () {
      return new Promise((resolve) => {
        axios.get('/json/cities.json').then((response) => {
          this.cities = response.data.documents;
          resolve(true);
        });
      });
    },
    getAllNations () {
      return new Promise((resolve) => {
        axios.get('/json/nations.json').then((response) => {
          this.nations = response.data.documents;
          resolve(true);
        });
      });
    },
    getAllLandmarks () {
      return new Promise((resolve) => {
        axios.get('/json/landmarks.json').then((response) => {
          this.landmarks = response.data.documents;
          resolve(true);
        });
      });
    },
    getAllFeatures () {
      return new Promise((resolve) => {
        axios.get('/json/features.json').then((response) => {
          this.features = response.data.documents;
          resolve(true);
        });
      });
    },
    getAllContinents () {
      return new Promise((resolve) => {
        axios.get('/json/continents.json').then((response) => {
          this.continents = response.data.documents;
          resolve(true);
        });
      });
    },
    getWorld () {
      return Promise.all([
        this.getAllContinents(),
        this.getAllGods(),
        this.getAllTerritories(),
        this.getAllCities(),
        this.getAllNations(),
        this.getAllLandmarks(),
        this.getAllFeatures()
      ]);
    }
  }
};