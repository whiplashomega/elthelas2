/* globals describe, it, mocha */
import '@/tests/unit/setup.js';
import chai from 'chai';

export default {
  tests(comp) {
    describe('Animal Companion Builder', function () {

    });
    mocha.checkLeaks();
    mocha.run();
  }
};
