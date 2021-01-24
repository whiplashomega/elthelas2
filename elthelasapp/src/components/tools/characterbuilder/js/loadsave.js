import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      googletoken: 'getGoogleToken',
      loggedin: 'isLoggedIn',
      token: 'getUserInfo',
      character: "getCharacter",
      charlevel: "charlevel",
      groups: "charGroups"
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
      comp: this,
      newgroup: ""
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
      getFromServerSilent: "getFromServerSilent",
      updateToServer: "updateToServer",
      updateToServerSilent: "updateToServerSilent",
      newToServer: "newToServer",
      saveCharacter: "saveCharacter",
      loadCharacter: "loadCharacter",
      resetCharacter: "resetCharacter"
    }),
    addGroup () {
      this.character.group = this.newgroup;
    }
  },
  mounted () {
    if (this.loggedin) {
      this.getFromServerSilent(this);
    }
  }
};
