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
    cloth: 3,
    coal: 0.15,
    food: 0.15,
    iron: 0.45,
    leather: 60,
    lumber: 1.5,
    steel: 0.75,
    stone: 25,
    timber: 0.5,
    wool: 1.5
  },
  sellTable: {
    alcohol: 0.2,
    arcanum: 500,
    cloth: 2,
    coal: 0.1,
    food: 0.1,
    iron: 0.3,
    leather: 40,
    lumber: 0.5,
    steel: 0.5,
    stone: 1,
    timber: 0.1,
    wool: 1
  },
  unitWeightMod: {
    alcohol: 1,
    arcanum: 1,
    cloth: 0.5,
    coal: 1,
    food: 1,
    iron: 1,
    leather: 20,
    lumber: 16,
    steel: 1,
    stone: 250,
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
