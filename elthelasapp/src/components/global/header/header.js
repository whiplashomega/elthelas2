import { mapGetters, mapActions } from 'vuex';

export default {
  computed: mapGetters({
    title: 'title',
    loggedin: 'isLoggedIn',
    userinfo: 'getUserInfo'
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
    };
  },
  methods: {
    googleSignIn() {
      // Google's OAuth 2.0 endpoint for requesting an access token
      var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
      // Create <form> element to submit parameters to OAuth 2.0 endpoint.
      var form = document.createElement('form');
      form.setAttribute('method', 'GET'); // Send as a GET request.
      form.setAttribute('action', oauth2Endpoint);
      // Parameters to pass to OAuth 2.0 endpoint.
      var params = {
        'client_id': '298476817706-vqi3l9rvrcbj2ves71tvt51jf9linonn.apps.googleusercontent.com',
        'redirect_uri': 'https://' + window.location.hostname + "/tools/charbuilder",
        'response_type': 'token',
        'scope': 'https://www.googleapis.com/auth/drive',
        'include_granted_scopes': 'true',
        'state': 'pass-through value'
      };
      // Add form parameters as hidden input values.
      for (var p in params) {
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
      }
      // Add form to page and submit it to open the OAuth 2.0 endpoint.
      document.body.appendChild(form);
      form.submit();
    },
    ...mapActions({
      login: 'login',
      register: 'register',
      logout: 'logout',
      saveAuthHeader: 'saveAuthHeader'
    }),
    handleLogin () {
      this.login(this.logincreds).then((response) => {
        this.showLogin = false;
      }).catch(() => {
        this.errorMessage = "Error Logging In";
      });
    },
    handleRegister () {
      this.register(this.registeruser).then((response) => {
        this.showRegister = false;
      });
    }
  },
  created () {
    if (this.loggedin) {
      this.saveAuthHeader();
    }
    if (this.$route.hash) {
      var vals = this.$route.hash.split('&');
      var params = {};
      vals.forEach((a) => {
        var keyval = a.split('=');
        params[keyval[0]] = keyval[1];
      });
      if (params.access_token) {
        console.log(params);
        this.$store.commit('setOAuth', { params });
      }
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
};