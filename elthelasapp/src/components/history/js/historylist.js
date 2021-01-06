import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      events: 'allEvents'
    }),
    sortedEvents: () => {
      this.events.sort((a, b) => {
        if (a.startdate.year > b.startdate.year) {
          return 1;
        } else if (a.startdate.year < b.startdate.year) {
          return -1;
        } else if (a.startdate.month > b.startdate.month) {
          return 1;
        } else if (a.startdate.month < b.startdate.month) {
          return -1;
        } else if (a.startdate.day > b.startdate.day) {
          return 1;
        } else if (a.startdate.day < b.startdate.day) {
          return -1;
        } else {
          return 0;
        }
      })
    }
  },
  data () {
    return {};
  },
  mounted () {
    this.$store.dispatch('getAllEvents');
  }
};