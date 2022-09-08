import { useCharacterStore, useUserStore } from '@/stores/index';
import { storeToRefs } from 'pinia';

export default {
  setup () {
    const characters = useCharacterStore();
    const userinfo = useUserStore();
    
    const { googletoken, loggedin, token } = storeToRefs(userinfo);
    const { character, charlevel, charGroups: groups } = storeToRefs(characters);
    
    const getDriveFiles = characters.getDriveFiles;
    const saveToDrive = characters.saveToDrive;
    const getFromServer = characters.getFromServer;
    const getFromServerSilent = characters.getFromServerSilent;
    const updateToServer = characters.updateToServer;
    const updateToServerSilent = characters.updateToServerSilent;
    const newToServer = characters.newToServer;
    const saveCharacter = characters.saveCharacter;
    const loadCharacter = characters.loadCharacter;
    const resetCharacter = characters.resetCharacter;
    
    return {
      googletoken,
      loggedin,
      token,
      character,
      charlevel,
      groups,
      getDriveFiles,
      saveToDrive,
      getFromServer,
      getFromServerSilent,
      updateToServer,
      updateToServerSilent,
      newToServer,
      saveCharacter,
      loadCharacter,
      resetCharacter
    };
  },
  computed: {
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
  mounted () {
    if (this.loggedin) {
      this.getFromServerSilent(this);
    }
  }
};
