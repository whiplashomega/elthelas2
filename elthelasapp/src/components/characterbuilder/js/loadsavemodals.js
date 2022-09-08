import { useCharacterStore, useUserStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
import modal from '@/components/global/modal.vue';

export default {
  setup () {
    const charactersStore = useCharacterStore();
    const userinfo = useUserStore();
    
    const { token } = storeToRefs(userinfo);
    const { character, charlevel, serverCharacters: characters, driveCharacters: filelist, charGroups: groups } = storeToRefs(charactersStore);
    
    const { getOneFromServer, loadFromDrive, deleteFromServer } = charactersStore;
    
    return {
      userinfo, token, character, charlevel, characters, filelist, groups,
      
      getOneFromServer, loadFromDrive, deleteFromServer
    };
  },
  components: {
    modal
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
  data () {
    return {
      comp: this,
      groupfilter: "all",
      serverModalProps: { isActive: false, title: "Load Character" },
      loadingModalProps: { isActive: false, title: "Load Character" }
    };
  },
  methods: {
    loadChar (id) {
      this.getOneFromServer(id);
      this.serverModalProps.isActive = true;
    }
  }
};
