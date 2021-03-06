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
        if (Number(a.start_date.year) > Number(b.start_date.year)) {
          return -1;
        } else if (Number(a.start_date.year) < Number(b.start_date.year)) {
          return 1;
        } else if (Number(a.start_date.month) > Number(b.start_date.month)) {
          return -1;
        } else if (Number(a.start_date.month) < Number(b.start_date.month)) {
          return 1;
        } else if (Number(a.start_date.day) > Number(b.start_date.day)) {
          return -1;
        } else if (Number(a.start_date.day) < Number(b.start_date.day)) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  },
  data () {
    return {
      monthIndex: [
        "Neradan",
        "Dorunor",
        "Trimalan",
        "Sylvanus",
        "Gaiana",
        "Alohiman",
        "Coranus",
        "Moltyr",
        "Saris",
        "Maridia",
        "Tockra",
        "Amatherin"
      ]
    };
  },
  methods: {
    convertMonth (a) {
      return this.monthIndex[a - 1];
    }
  },
  mounted () {
    this.$store.dispatch('getAllEvents');
  }
};
