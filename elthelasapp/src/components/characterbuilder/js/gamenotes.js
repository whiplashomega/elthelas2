import { useCharacterStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
export default {
  setup () {
    const characters = useCharacterStore();
    const { character } = storeToRefs(characters);
    
    return {
      character
    };
  },
  computed: {
    sortedSessions () {
      return this.character.sessions.sort((a, b) => {
        if (a.id > b.id) {
          return 1;
        } else {
          return -1;
        }
      });
    }
  },
  data () {
    return {
      currentSession: {
        id: "",
        date: "",
        ingamedate: { start: "", end: "" },
        npcs: "",
        locations: "",
        goals: "",
        encounters: "",
        loot: ""
      }
    };
  },
  methods: {
    Session (date) {
      return {
        id: Date.now(),
        date: date.toLocaleDateString(),
        ingamedate: {
          start: "",
          end: ""
        },
        npcs: "",
        locations: "",
        goals: "",
        encounters: "",
        loot: ""
      };
    },
    addSession() {
      let session = this.Session(new Date());
      this.character.sessions.push(session);
      this.currentSession = session;
    },
    removeSession(session) {
      if (confirm("Are you sure you want to delete this session?")) {
        this.character.sessions.splice(this.character.sessions.findIndex(session), 1);
        if (this.character.sessions.length > 0) {
          this.currentSession = this.character.sessions[0];
        } else {
          this.currentSession = { id: "", date: "", ingamedate: { start: "", end: "" }, npcs: "", locations: "", goals: "", encounters: "", loot: "" };
        }
      }
    }
  }
};
