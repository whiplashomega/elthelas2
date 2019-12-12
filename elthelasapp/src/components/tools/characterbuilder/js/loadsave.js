import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      googletoken: 'getGoogleToken',
      loggedin: 'isLoggedIn',
      token: 'getUserInfo',
      character: "getCharacter",
      charlevel: "charlevel"
    }),
    charsorted () {
      return this.characters.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else if (b.name > a.name) {
          return -1;
        } else {
          if (this.charlevel(a) > this.charlevel(b)) {
            return 1;
          } else {
            return -1;
          }
        }
      });
    }
  },
  props: { minimal: Boolean },
  data () {
    return {
      comp: this
    };
  },
  watch: {
    character: {
      handler () {
        if (this.character.autosave && this.loggedin) {
          this.updateToServerSilent(this);
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions({
      getDriveFiles: "getDriveFiles",
      saveToDrive: "saveToDrive",
      getFromServer: "getFromServer",
      updateToServer: "updateToServer",
      updateToServerSilent: "updateToServerSilent",
      newToServer: "newToServer",
      saveCharacter: "saveCharacter",
      loadCharacter: "loadCharacter",
      resetCharacter: "resetCharacter"
    })
  }
};
