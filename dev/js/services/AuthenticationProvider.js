/* globals angular */
(function(ng) {
  'use strict';
  var Base64 = {
    keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    
    encode: function (input) {
      var output = "";
      var chr1, chr2, chr3 = "";
      var enc1, enc2, enc3, enc4 = "";
      var i = 0;
 
      do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
 
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }
 
        output = output +
          this.keyStr.charAt(enc1) +
          this.keyStr.charAt(enc2) +
          this.keyStr.charAt(enc3) +
          this.keyStr.charAt(enc4);
          chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
      } while (i < input.length);
 
      return output;
    },
 
    decode: function (input) {
      var output = "";
      var chr1, chr2, chr3 = "";
      var enc1, enc2, enc3, enc4 = "";
      var i = 0;
 
      // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
      var base64test = /[^A-Za-z0-9\+\/\=]/g;
      if (base64test.exec(input)) {
        window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
      }
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
      do {
        enc1 = this.keyStr.indexOf(input.charAt(i++));
        enc2 = this.keyStr.indexOf(input.charAt(i++));
        enc3 = this.keyStr.indexOf(input.charAt(i++));
        enc4 = this.keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
 
        output = output + String.fromCharCode(chr1);
 
        if (enc3 !== 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 !== 64) {
          output = output + String.fromCharCode(chr3);
        }
 
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
 
      } while (i < input.length);
 
      return output;
    }
  };
  angular.module('elthelas').factory('AuthenticationProvider', ['$http', '$cookies', '$rootScope', '$timeout',  
  function($http, $cookies, $rootScope, $timeout) {
    var service = {};
    service.Login = Login;
    service.SetCredentials = SetCredentials;
    service.ClearCredentials = ClearCredentials;
    service.Register = Register;
    
    function Login(username, password, callback) {
      return $http({
        method: 'POST',
        url: 'app_dev.php/login_check',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj) {
              if(true) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
              }
            }
            return str.join("&");
        },
        data: { _username: username, _password: password }
        }).then(function(response) { 
        callback(response);
      });
    }
    
    function Register(username, password, passwordconfirm, email, token, callback) {
      if(password !== passwordconfirm) {
        return false;
      } else {
        $http({
          method: 'POST',
          url: 'app_dev.php/register/',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: "fos_user_registration_form[email]="+encodeURIComponent(email)+
            "&fos_user_registration_form[username]="+encodeURIComponent(username)+
            "&fos_user_registration_form[plainPassword][first]="+encodeURIComponent(password)+
            "&fos_user_registration_form[plainPassword][second]="+encodeURIComponent(passwordconfirm)+
            "&fos_user_registration_form[_token]="+encodeURIComponent(token)
        }).then(function(response) {
            callback(response);
        });
      }
    }
    
    function SetCredentials(username, password, rememberMe) {
      var authdata = Base64.encode(username + ':' + password);
      
      $rootScope.globals = {
        currentUser: {
          username: username,
          password: password
        }
      };
      
      $http.defaults.headers.common.Authorization = 'Basic ' + authdata;
      
      var cookieExp = new Date();
      cookieExp.setDate(cookieExp.getDate() + 7);
      if(rememberMe) {
        $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
      }
    }
    
    service.LoadFromCookies = function() {
      $rootScope.globals = $cookies.get('globals');
    };
    
    function ClearCredentials() {
      $rootScope.globals = {};
      $cookies.remove('globals');
      $http.defaults.headers.common.Authorization = 'Basic';
    }
    
    return service;
  }]);
})(angular);