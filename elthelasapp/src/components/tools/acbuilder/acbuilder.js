import { mapGetters } from 'vuex';
import Vue from 'vue';
import test from '@/tests/unit/acbuilder.test.js';

export default {
  computed: {
    ...mapGetters({
      creatures: "allCreatures"
    })
  },
  data () {
    return {};
  },
  filters: {},
  methods: {},
  mounted () {},
  updated() {}
};
