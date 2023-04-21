import { useHistoryStore } from '@/stores/index';
import { marked } from '@/../node_modules/marked/lib/marked.esm.js';
import { useMeta } from 'vue-meta';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const historyStore = useHistoryStore();
    historyStore.getAllHistory();
    const { history: events } = storeToRefs(historyStore);
    useMeta({ title: "History" });

    return {
      marked,
      events,
      historyStore
    };
  },
  computed: {
    sortedEvents () {
      return this.events.sort((a, b) => {
        if (a.edit) {
          return -1;
        } else if (b.edit) {
          return 1;
        }
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
    },
    event () {
      return {
        text: {
          headline: "",
          text: ""
        },
        start_date: {
          day: 1,
          month: 1,
          year: 1846
        },
        end_date: {
          day: 1,
          month: 1,
          year: 1846
        },
        expand: true,
        edit: true
      };
    },
    addEvent () {
      this.events.push(this.event());
    },
    save (event) {
      event.edit = false;
      if (event._id) {
        this.historyStore.saveUpdate(event);
      } else {
        this.historyStore.saveNew(event);
      }
    },
    deleteEvent (event) {
      if (window.confirm("Are you sure you want to delete this event? It cannot be recovered.")) {
        if (event._id) {
          this.historyStore.deleteHistory(event);
        } else {
          this.events.splice(this.events.indexOf(event), 1);
        }
      }
    }
  }
};
