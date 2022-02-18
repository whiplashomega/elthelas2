import { useGlobalsStore, useUserStore } from '@/stores/index';
import modal from '../modal.vue';

export default {
  setup () {
    const globals = useGlobalsStore();
    const user = useUserStore();
    return {
      globals,
      user
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
          
        } else {
          alert("Failed to login, please try again");
        }
      });
    },
    handleRegister () {
      this.user.register(this.registeruser).then((res) => {
        this.showRegister.loginformactive = true;
        if (res) {
          
        } else {
          alert ("Registration failed, please try again");
        }
      })
    }
  }
};
