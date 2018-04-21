/* globals expect it describe */

import { Vue, compbuilder } from '../dependencybuild.js';
// The path is relative to the project root.
import characterbuilder from '@/components/tools/characterbuilder';

var vm = compbuilder(characterbuilder);

describe('Character Builder', () => {
  it(`should have character`, (done) => {
    // Extend the component to get the constructor, which we can then initialize directly.
    Vue.nextTick().then(() => {
      expect(vm.componentInstance.character).to.exist();
      done();
    }).catch(done);
  });
  it('should be able to add armor to character', (done) => {
    Vue.nextTick().then(() => {
      expect(vm.componentInstance.character.armors.length).to.equal(0);
      vm.componentInstance.addArmor();
      expect(vm.componentInstance.character.armors.length).to.equal(1);
      done();
    }).catch(done);
  });
});
