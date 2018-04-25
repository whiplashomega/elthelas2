/* globals describe, it, mocha */
import '@/tests/unit/setup.js';
import chai from 'chai';

export default {
  tests(comp) {
    describe('Character Builder', function () {
      it('should have a character object', function () {
        console.log(comp);
        chai.expect(typeof comp.character).to.equal('object');
      });
      it('should be able to add armor that updates the armor class', function () {
        chai.expect(comp.character.armors.length).to.equal(0);
        comp.addArmor();
        chai.expect(comp.character.armors.length).to.equal(1);
        comp.character.armors[0].equipped = true;
        comp.character.armors[0].ac = 14;
        comp.character.stats[1] = 16;
        comp.character.armors[0].type = "Light Armor";
        chai.expect(comp.accalc()).to.equal(17);
        comp.character.armors[0].type = "Heavy Armor";
        chai.expect(comp.accalc()).to.equal(14);
        comp.character.armors[0].type = "Medium Armor";
        chai.expect(comp.accalc()).to.equal(16);
        comp.character.armors[0].type = "Shield";
        chai.expect(comp.accalc()).to.equal(27);
      });
      it('should be able to get total gold value', function () {
        comp.character.gp = 100;
        comp.character.pp = 1000;
        comp.character.cp = 100;
        comp.character.sp = 10;
        chai.expect(comp.totalGold()).to.equal(10102);
      });
    });
    mocha.checkLeaks();
    mocha.run();
  }
};
