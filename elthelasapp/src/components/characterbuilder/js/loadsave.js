import { useCharacterStore, useUserStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
import modal from '@/components/global/modal.vue';

export default {
  setup () {
    const characterStore = useCharacterStore();
    const userinfo = useUserStore();
    
    const { googletoken, loggedin, token } = storeToRefs(userinfo);
    const { charlevel, charGroups: groups } = storeToRefs(characterStore);
    const { character } = storeToRefs(characterStore);
    const id = storeToRefs(character._id);
    const getDriveFiles = characterStore.getDriveFiles;
    const saveToDrive = characterStore.saveToDrive;
    const getFromServer = characterStore.getFromServer;
    const getOneFromServer = characterStore.getOneFromServer;
    const getFromServerSilent = characterStore.getFromServerSilent;
    const updateToServer = characterStore.updateToServer;
    const updateToServerSilent = characterStore.updateToServerSilent;
    const newToServer = characterStore.newToServer;
    const deleteFromServer = characterStore.deleteFromServer;
    const saveCharacter = characterStore.saveCharacter;
    const loadCharacter = characterStore.loadCharacter;
    const resetCharacter = characterStore.resetCharacter;
    
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
      getOneFromServer,
      getFromServerSilent,
      updateToServer,
      updateToServerSilent,
      newToServer,
      saveCharacter,
      loadCharacter,
      resetCharacter,
      deleteFromServer,
      id
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
  components: {
    modal
  },
  props: { minimal: Boolean },
  data () {
    return {
      characters: [],
      groupfilter: "all",
      serverModalProps: { isActive: false, title: "Load Character" },
      loadingModalProps: { isActive: false, title: "Load Character" }
    };
  },
  methods: {
    getChars () {
      this.loadingModalProps.isActive = true;
      this.getFromServer().then((res) => {
        if (res) {
          this.characters = res;
          this.loadingModalProps.isActive = false;
          this.serverModalProps.isActive = true;
        }
      });
    },
    loadChar (id) {
      this.getOneFromServer(id);
      this.serverModalProps.isActive = false;
    },
    addGroup () {
      this.character.group = this.newgroup;
    }
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
      this.getFromServerSilent();
    }
  }
};
