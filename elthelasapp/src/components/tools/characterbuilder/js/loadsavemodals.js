import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      token: 'getUserInfo',
      character: "getCharacter",
      charlevel: "charlevel",
      characters: "serverCharacters",
      filelist: "driveCharacters",
      userinfo: "getUserInfo",
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
      }).filter((a) => {
        if (this.groupfilter === "all") {
          return true;
        } else if (this.groupfilter === a.group) {
          return true;
        } else {
          return false;
        }
      });
    }
  },
  data () {
    return {
      comp: this,
      groupfilter: "all"
    };
  },
  methods: {
    ...mapActions({
      getOneFromServer: "getOneFromServer",
      loadFromDrive: "loadFromDrive",
      deleteFromServer: "deleteFromServer"
    }),
    loadChar (id) {
      this.getOneFromServer(id);
      this.$root.$emit('bv::hide::modal', 'servermodal');
    }
  }
};
