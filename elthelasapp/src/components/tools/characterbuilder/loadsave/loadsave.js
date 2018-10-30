import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      googletoken: 'getGoogleToken',
      loggedin: 'isLoggedIn',
      token: 'getUserInfo',
      character: "getCharacter"
    })
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
      resetCharacter: "resetCharacter",
      charlevel: "charlevel"
    })
  }
};
