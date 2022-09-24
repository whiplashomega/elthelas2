import { useGlobalsStore, useUserStore, useCampaignStore } from '@/stores/index';
import modal from '../modal.vue';

export default {
  setup () {
    const globals = useGlobalsStore();
    const user = useUserStore();
    const campaigns = useCampaignStore();
    const userCampaigns = campaigns.campaigns;
    const logout = user.logout;
    return {
      globals,
      user,
      logout,
      userCampaigns
    };
  },
  components: {
    modal
  },
  data () {
    return {
      showLogin: { isActive: false, title: "Login", loginformactive: true, hideFooter: false },
      showRegister: { isActive: false, title: "Register", loginformactive: true, hideFooter: false },
      logincreds: {
        username: "",
        password: ""
      },
      registeruser: {
        username: "",
        password: "",
        passwordConfirm: "",
        firstname: "",
        lastname: ""
      },
      showChangePassword: false,
      modalModel: true,
      hidetitle: false
    };
  },
  methods: {
    handleLogin () {
      this.user.login(this.logincreds).then((res) => {
        this.showLogin.loginformactive = true;
        if (res) {
          this.showLogin.isActive = false;
        } else {
          alert("Failed to login, please try again");
        }
      });
    },
    handleRegister () {
      this.user.register(this.registeruser).then((res) => {
        this.showRegister.loginformactive = true;
        if (res) {
          this.showRegister.loginformactive = false;
          this.showRegister.isActive = false;
        } else {
          alert ("Registration failed, please try again");
        }
      })
    }
  }
};
