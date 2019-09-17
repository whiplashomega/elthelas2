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
  data () {
    return {
      comp: this,
      filelist: [],
      characters: []
    };
  },
  created () {
    this.$store.watch(
    function (state) {
        return state.character;
    },
    function () {
        //do something on data change
        if (this.loggedin && this.character.autosave) {
          this.updateToServerSilent(this);
        }
    },
    {
        deep: true //add this if u need to watch object properties change etc.
    }
);
  },
  methods: {
    ...mapActions({
      loadChar: "loadChar",
      getDriveFiles: "getDriveFiles",
      loadFromDrive: "loadFromDrive",
      saveToDrive: "saveToDrive",
      getFromServer: "getFromServer",
      updateToServer: "updateToServer",
      updateToServerSilent: "updateToServerSilent",
      newToServer: "newToServer",
      deleteFromServer: "deleteFromServer",
      saveCharacter: "saveCharacter",
      loadCharacter: "loadCharacter",
      resetCharacter: "resetCharacter"
    })
  }
};
