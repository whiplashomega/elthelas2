import { useGlobalsStore, useUserStore, useCampaignStore } from '@/stores/index';
import modal from '../modal.vue';

export default {
  setup () {
    const globals = useGlobalsStore();
    const user = useUserStore();
    const campaigns = useCampaignStore();
    const userCampaigns = campaigns.campaigns;
    const logout = user.logout;
    const switchTheme = user.switchTheme;
    return {
      globals,
      user,
      logout,
      userCampaigns,
      switchTheme
    };
  },
  components: {
    modal
  },
  data () {
    return {
      showLogin: { isActive: false, title: "Login", loginformactive: true, hideFooter: false },
      showRegister: { isActive: false, title: "Register", loginformactive: true, hideFooter: false },
      cp: { isActive: false, title: "Change Password", loginformactive: true, hideFooter: false, password: "", newpassword: "", confirmpassword: "" },
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
    },
    handleChangePassword () {
      this.cp.loginformactive = false;
      let user = {
        ...this.user.loggedin,
        ...this.cp
      }
      this.user.changePassword(user).then((res) => {
        this.cp.isActive = false;
        this.cp.loginformactive = true;
      })
    }
  }
};
