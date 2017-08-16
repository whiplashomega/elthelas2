/* globals angular FB*/
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
    
    service.Check = function() {
      FB.getLoginStatus(function(response) {
          if(response.status === 'connected') {
            response.authResponse.accessToken;
            response.authResponse.userID;
          } else if(false) {
            
          }
      });      
    };
    
    service.FacebookLogin = function() {
      $http({
        method: 'POST',
        url: '/users/facebook',
      }).then(function(response) {
        var data = response;
      });
    };
    
    service.Login = function(username, password, callback) {
      return $http({
        method: 'POST',
        url: '/users/login',
        headers: {'Content-Type': 'application/json'},
        data: { username: username, password: password }
        }).then(function(response) { 
        callback(response);
      });
    };
    
    service.Register = function(user, callback) {
      if(user.password !== user.passwordConfirm) {
        return false;
      } else {
        $http({
          method: 'POST',
          url: '/users/register',
          data: user
        }).then(function(response) {
            callback(response);
        }, function(response) {
          console.log(response);
        });
      }
    };
    
    service.SetCredentials = function(username, password, token, rememberMe) {
      var authdata = Base64.encode(username + ':' + password);
      
      $rootScope.globals = {
        currentUser: {
          username: username,
          password: password,
          token: token
        }
      };
      
      $http.defaults.headers.common.Authorization = 'Basic ' + authdata;
      
      var cookieExp = new Date();
      cookieExp.setDate(cookieExp.getDate() + 7);
      if(rememberMe) {
        $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
      }
    };
    
    service.LoadFromCookies = function() {
      var cookie = $cookies.get('globals');
      if(cookie) {
        $rootScope.globals = JSON.parse(cookie);
      }
    };
    
    service.ClearCredentials = function() {
      $rootScope.globals = {};
      $cookies.remove('globals');
      $http.defaults.headers.common.Authorization = 'Basic';
    };
    
    service.GetUserDetails = function(callback) {
      if($rootScope.globals && $rootScope.globals.currentUser) {
        $http({
          method: 'GET',
          url: '/users/' + $rootScope.globals.currentUser.username,
          headers: { 'x-access-token': $rootScope.globals.currentUser.token, 'Content-Type': 'application/json' }
        }).then(function(response) {
          callback(response.data);
        }, function(response) {
          console.log(response);
          callback(false);
        }); 
      }
    };
    
    service.UpdateUser = function(username, firstname, lastname, password, passwordConfirm, callback) {
      if(password === passwordConfirm && $rootScope.globals && $rootScope.globals.currentUser) {
      $http({
        method: 'PUT',
        url: '/users/' + $rootScope.globals.currentUser.username,
        headers: { 'x-access-token': $rootScope.globals.currentUser.token, 'Content-Type': 'application/json' },
        data: { username: username, firstname: firstname, lastname: lastname, password: password }
      }).then(function(response) {
        callback(response.data);
      }, function(response) {
        callback(false);
      });
      } else {
        console.log("password and passwordConfirm do not match");
        callback(false);
      }
    };
    
    service.DeleteUser = function(username, password, callback) {
      if($rootScope.globals && $rootScope.globals.currentUser && $rootScope.globals.currentUser.password === password) {
        $http({
          method: 'DELETE',
          url: '/users/' + username,
          headers: { 'x-access-token': $rootScope.globals.currentUser.token, 'Content-Type': 'application/json' }
        }).then(function(response) {
          callback(response.data);
        }, function(response) {
          console.log(response);
          callback(false);
        });
      }
    };
    
    return service;
  }]);
})(angular);