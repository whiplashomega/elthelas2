import staffTypes from './stronghold/stafftypes';
import Stronghold from './classes/stronghold';
import getters from './stronghold/getters';
import actions from './stronghold/actions';

const state = {
  all: [],
  strongholds: [],
  current: Stronghold(),
  staffTypes: staffTypes,
  changeby: 0,
  record: "",
  buyTable: {
    alcohol: 0.3,
    arcanum: 750,
    brick: 2,
    clay: 0.3,
    cloth: 3,
    coal: 0.15,
    coffee: 1.5,
    consumergoods: 10,
    cotton: 1.5,
    food: 0.15,
    "furniture": 5,
    "horses": 50,
    iron: 0.45,
    leather: 60,
    lumber: 1.5,
    paper: 20,
    "pottery": 2,
    steel: 0.75,
    stone: 25,
    sugar: 0.5,
    timber: 0.5,
    wool: 1.5
  },
  sellTable: {
    alcohol: 0.2,
    arcanum: 500,
    brick: 0.75,
    clay: 0.1,
    cloth: 2,
    coal: 0.1,
    coffee: 1,
    consumergoods: 5,
    cotton: 1,
    food: 0.1,
    furniture: 8,
    horses: 25,
    iron: 0.3,
    leather: 40,
    lumber: 0.5,
    paper: 10,
    pottery: 1.5,
    steel: 0.5,
    stone: 1,
    sugar: 0.3,
    timber: 0.1,
    wool: 1
  },
  unitWeightMod: {
    alcohol: 1,
    arcanum: 1,
    brick: 16,
    clay: 16,
    cloth: 0.5,
    coal: 1,
    coffee: 1,
    consumergoods: 1,
    cotton: 1,
    food: 1,
    furniture: 16,
    horses: 0,
    iron: 1,
    leather: 20,
    lumber: 16,
    paper: 1,
    pottery: 1,
    steel: 1,
    stone: 250,
    sugar: 1,
    timber: 16,
    wool: 1
  }
};

const mutations = {
  'GET_IMPROVEMENTS' (state, { improvements }) {
    state.all = improvements;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
