import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      events: 'allEvents'
    }),
    sortedEvents () {
      return this.events.sort((a, b) => {
        if (!("end_date" in a)) {
          a.end_date = { year: "", month: "", day: "" };
        }
        if (!("end_date" in b)) {
          b.end_date = { year: "", month: "", day: "" };
        }
        if (a.start_date.year > b.start_date.year) {
          return -1;
        } else if (a.start_date.year < b.start_date.year) {
          return 1;
        } else if (a.start_date.month > b.start_date.month) {
          return -1;
        } else if (a.start_date.month < b.start_date.month) {
          return 1;
        } else if (a.start_date.day > b.start_date.day) {
          return -1;
        } else if (a.start_date.day < b.start_date.day) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  },
  data () {
    return {};
  },
  mounted () {
    this.$store.dispatch('getAllEvents');
  }
};
