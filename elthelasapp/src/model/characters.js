import Character from '@/model/classes/character';
import getters from './character/getters';
import actions from './character/actions';

export default {
  state: {
    serverCharacters: [],
    currentCharacter: Character(),
    statRolls: [],
    characters: [],
    drivefiles: [],
    hitdicechanged: 0,
    encounterCharacters: []
  },
  getters: getters,
  actions: actions
};
