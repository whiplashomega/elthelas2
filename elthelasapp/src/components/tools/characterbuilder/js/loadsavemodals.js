import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      token: 'getUserInfo',
      character: "getCharacter",
      charlevel: "charlevel",
      characters: "serverCharacters",
      filelist: "driveCharacters"
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
      comp: this
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
      updateToServerSilent: "updateToServerSilent",
      newToServer: "newToServer",
      deleteFromServer: "deleteFromServer",
      saveCharacter: "saveCharacter",
      loadCharacter: "loadCharacter",
      resetCharacter: "resetCharacter"
    })
  }
};
