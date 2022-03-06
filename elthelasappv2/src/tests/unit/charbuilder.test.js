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
      it('should set race defaults', function() {
        comp.character.race = { stats: [4, 0, 0, 0, 0, 0], speed: [35, 0, 0, 0, 0], agepoints: { mentalmaturity: 18 }, averageheight: 60, averageweight: 100 };
        comp.setRaceDefaults();
        chai.expect(comp.character.age).to.equal(18);
        chai.expect(comp.character.height).to.equal('5\' 0\'\'');
        chai.expect(comp.character.weight).to.equal("100 lbs");
      });
      it('should create class string', function() {
        comp.character.charclasses[0] = { thisclass: { name: "Test", subclass: [{ name: "Test", singular: "Test", castermult: 0, features: [] }], hitdie: 6, features: [] }, level: 1, selsubclass: { name: "Test", singular: "Test", castermult: 0, features: [] } };
        chai.expect(comp.classtext()).to.equal('Test 1 ');
        comp.log(comp.character.charclasses);
      });
      it('should be able to add a class', function() {
        comp.addclass();
        chai.expect(comp.character.charclasses.length).to.equal(2);
      });
      it('should be able to remove a class', function() {
        comp.removeclass(1);
        chai.expect(comp.character.charclasses.length).to.equal(1);
        comp.log(comp.character.charclasses);
      });
      it('should be able to get the total value of a stat', function() {
        chai.expect(comp.getStatTotal(0)).to.equal(12);
      });
      it('should be able to get the mod of a stat', function() {
        chai.expect(comp.getStatMod(0)).to.equal(1);
      });
      it('should be able to get the save mod', function() {
        comp.character.saves[0] = true;
        chai.expect(comp.getSaveMod(0)).to.equal(3);
      });
      it('should get save dc', function() {
        chai.expect(comp.getSaveDC(0)).to.equal(11);
      });
      it('should be able to calculate an attack bonus', function() {
        chai.expect(comp.getAttBonus(0)).to.equal(3);
      });
      it('should calculate the proficiency bonus', function() {
        chai.expect(comp.profbonus()).to.equal(2);
      });
      it('should be able to calculate a skill mod', function() {
        var skill = { stat: 0, prof: 2 };
        chai.expect(comp.getSkillMod(skill)).to.equal(5);
      });
      it('should be able to calculate an initiative mod', function() {
        comp.character.initmagic = 1;
        chai.expect(comp.getInitMod()).to.equal(4);
      });
      it('should be able to calculate the HP total', function() {
        chai.expect(comp.getHPTotal()).to.equal(5);
        comp.character.stats[2] = 10;
        chai.expect(comp.getHPTotal()).to.equal(6);
      });
      it('should be able to calculate point buy', function() {
        chai.expect(comp.pointbuy()).to.equal(14);
      });
      it('should be able to get speed stat', function() {
        chai.expect(comp.getSpeedStat(0)).to.equal(35);
      });
      it('should be able to add an attack', function() {
        comp.addAttack();
        chai.expect(comp.character.attacks.length).to.equal(1);
      });
      it('should be able to add an injury', function() {
        comp.addInjury();
        chai.expect(comp.character.injuries.length).to.equal(1);
      });
      it('should be able to remove an attack', function() {
        comp.removeAttack(0);
        chai.expect(comp.character.attacks.length).to.equal(0);
      });
      it('should be able to remove an injury', function() {
        comp.removeInjury(0);
        chai.expect(comp.character.injuries.length).to.equal(0);
      });
      it('should be able to calculate the attack bonus for an attack', function() {
        var att = { bonus: 1, stat: 0, prof: true };
        chai.expect(comp.getAttackBonus(att)).to.equal(4);
        var att2 = { bonus: 3, stat: 1, prof: false };
        chai.expect(comp.getAttackBonus(att2)).to.equal(6);
      });
      it('should be able to calculate the damage bonus for an attack', function() {
        var att = { stat: 0, addstat: true, damagebonus: 0 };
        chai.expect(comp.getAttackDamageBonus(att)).to.equal(1);
      });
      it('should be able to remove armor', function() {
        comp.removeArmor(0);
        chai.expect(comp.character.armors.length).to.equal(0);
      });
      it('should be able to add and remove equipment, calculate carry weight', function() {
        comp.addEquipment();
        chai.expect(comp.character.equipment.length).to.equal(1);
        comp.character.equipment[0].weight = 100;
        comp.character.cp = 50;
        comp.character.sp = 0;
        comp.character.gp = 0;
        comp.character.pp = 0;
        chai.expect(comp.carryWeight()).to.equal(101);
        comp.removeEquipment(0);
        chai.expect(comp.character.equipment.length).to.equal(0);
      });
      it('should calculate max carry weight', function() {
        chai.expect(comp.carryMax()).to.equal(180);
        comp.character.size = "large";
        chai.expect(comp.carryMax()).to.equal(360);
      });
      it('should be able to set spell for detail modal, add and remove spells', function() {
        var spell = { title: "Test", description: "Test", level: 1, tags: [] };
        comp.spellDetail(spell);
        chai.expect(comp.detailspell.title).to.equal('Test');
        comp.addSpell(spell);
        chai.expect(comp.character.spells.level1[0].title).to.equal('Test');
        comp.displayLevel = "level1";
        comp.removeSpell(spell);
        chai.expect(comp.character.spells.level1.length).to.equal(0);
      });
      it('should be able to cast a spell', function() {
        var spell = { title: 'Test', description: "Test", level: 1, castLevel: 1, tags: [] };
        comp.character.availableslots.level1 = 4;
        comp.castSpell(spell);
        chai.expect(comp.character.availableslots.level1).to.equal(3);
        chai.expect(comp.character.castlog[0].title).to.equal('Test');
      });
    });
    mocha.checkLeaks();
    mocha.run();
  }
};
