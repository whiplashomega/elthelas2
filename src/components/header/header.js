(function() {
  var cx = '002019895859863268942:tbtmwpd5jy8'
  var gcse = document.createElement('script')
  gcse.type = 'text/javascript'
  gcse.async = true
  gcse.src = 'https://cse.google.com/cse.js?cx=' + cx
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(gcse, s)
})();

import { mapGetters, mapActions } from 'vuex';

export default {
  computed: mapGetters({
    title: 'title',
    loggedin: 'isLoggedIn'
  }),
  data () {
    return {
      hidetitle: false,
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
      showLogin: false,
      showRegister: false
    }
  },
  methods: {
    ...mapActions({
      login: 'login',
      register: 'register',
      logout: 'logout',
      saveAuthHeader: 'saveAuthHeader'
    }),
    handleLogin () {
      this.login(this.logincreds).then((response) => {
        this.showLogin = false;
        console.log(response);
        console.log(this.loggedin);
      }).catch(() => {
        this.errorMessage = "Error Logging In";
      });
    },
    handleRegister () {
      this.register(this.registeruser).then((response) => {
        this.showRegister = false;
        console.log(response);
      });
    }
  },
  created () {
    if(this.loggedin) {
      this.saveAuthHeader();
    }
  },
  mounted () {
    var cx = '002019895859863268942:tbtmwpd5jy8';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  }
}