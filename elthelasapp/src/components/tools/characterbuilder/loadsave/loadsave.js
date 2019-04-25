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
  methods: {
    ...mapActions({
      loadChar: "loadChar",
      getDriveFiles: "getDriveFiles",
      loadFromDrive: "loadFromDrive",
      saveToDrive: "saveToDrive",
      getFromServer: "getFromServer",
      updateToServer: "updateToServer",
      newToServer: "newToServer",
      deleteFromServer: "deleteFromServer",
      saveCharacter: "saveCharacter",
      loadCharacter: "loadCharacter",
      shortrest: "shortrest",
      longrest: "longrest",
      resetCharacter: "resetCharacter"
    })
  }
};
