import Character from '@/model/classes/character';
import getters from './character/getters';
import actions from './character/actions';

export default {
  state: {
    serverCharacters: [],
    currentCharacter: Character(),
    slots: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0], // caster level 0
      [2, 0, 0, 0, 0, 0, 0, 0, 0], // caster level 1
      [3, 0, 0, 0, 0, 0, 0, 0, 0], // caster level 2
      [4, 2, 0, 0, 0, 0, 0, 0, 0], // caster level 3
      [4, 3, 0, 0, 0, 0, 0, 0, 0], // caster level 4
      [4, 3, 2, 0, 0, 0, 0, 0, 0], // caster level 5
      [4, 3, 3, 0, 0, 0, 0, 0, 0], // caster level 6
      [4, 3, 3, 1, 0, 0, 0, 0, 0], // caster level 7
      [4, 3, 3, 2, 0, 0, 0, 0, 0], // caster level 8
      [4, 3, 3, 3, 1, 0, 0, 0, 0], // caster level 9
      [4, 3, 3, 3, 2, 0, 0, 0, 0], // caster level 10
      [4, 3, 3, 3, 2, 1, 0, 0, 0], // caster level 11
      [4, 3, 3, 3, 2, 1, 0, 0, 0], // caster level 12
      [4, 3, 3, 3, 2, 1, 1, 0, 0], // caster level 13
      [4, 3, 3, 3, 2, 1, 1, 0, 0], // caster level 14
      [4, 3, 3, 3, 2, 1, 1, 1, 0], // caster level 15
      [4, 3, 3, 3, 2, 1, 1, 1, 0], // caster level 16
      [4, 3, 3, 3, 2, 1, 1, 1, 1], // caster level 17
      [4, 3, 3, 3, 3, 1, 1, 1, 1], // caster level 18
      [4, 3, 3, 3, 3, 2, 1, 1, 1], // caster level 19
      [4, 3, 3, 3, 3, 2, 2, 1, 1] // caster level 20
    ],
    statRolls: []
  },
  getters: getters,
  actions: actions
};
