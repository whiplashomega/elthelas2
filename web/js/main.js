/*globals jQuery, angular */
"use strict";

(function($, ng) {
    var elthelas = ng.module('elthelas' ,['ui.router', 'hc.marked', 'ui.bootstrap', 'ngCookies', 'ngTimeline']);
    elthelas.run(['$state', '$stateParams',
        function($state, $stateParams) {
            //this solves page refresh and getting back to state
    }]);    
    elthelas.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
       $stateProvider.state('app', {
           url:'/',
           views: {
               'header': {
                   templateUrl: '/html/header/header.html',
                   controller: 'HeaderController'
               },
               'footer': {
                   templateUrl: '/html/footer/footer.html',
               },
               'content': {
                   templateUrl: '/html/content/home.html',
               },
               'head': {
                   templateUrl: '/html/head/home.html'
               },
               'sidebar': {
                   templateUrl: '/html/empty.html'
               }
           },
           data: { title: "Home"}
       }).state('app.domains', {
          url:'options/domains',
          views: {
              'content@': {
                  templateUrl: '/html/content/options/domains.html'
              },
              'head@': {
                  templateUrl: '/html/head/options/domains.html'
              },
              'sidebar@': {
                  templateUrl: '/html/sidebar/options.html'
              }
          },
          data: { title: "Domains"}
       }).state('app.races', {
           url: 'options/races',
           views: {
              'content@': {
                  templateUrl: '/html/content/options/races.html',
                  controller: 'RaceController'
              },
              'head@': {
                  templateUrl: '/html/head/options/races.html'
              },
              'sidebar@': {
                  templateUrl: '/html/sidebar/options.html'
              },
           },
           data: { title: "Races"},
           resolve: {
             race: function() {
               return false;
             }
           }
       }).state('app.race', {
         url: 'options/races/:race',
         views: {
              'content@': {
                  templateUrl: '/html/content/options/races.html',
                  controller: 'RaceController'
              },
              'head@': {
                  templateUrl: '/html/head/options/races.html'
              },
              'sidebar@': {
                  templateUrl: '/html/sidebar/options.html'
              },           
          },
          data: { title: "Races"},
          resolve: {
            race: function($stateParams) {
              return $stateParams.race;
            } 
          }
       }).state('app.languages', {
           url: 'options/languages',
           views: {
              'content@': {
                  templateUrl: '/html/content/options/languages.html',
                  controller: 'LanguagesController'
              },
              'head@': {
                  templateUrl: '/html/head/options/languages.html'
              },
              'sidebar@': {
                  templateUrl: '/html/sidebar/options.html'
              },
           },
           data: { title: "Languages"}
       }).state('app.gods', {
         url: 'ref/gods',
         views: {
           'content@': {
             templateUrl: '/html/content/ref/gods.html',
             controller: 'GodsController'
           },
          'head@': {
            templateUrl: '/html/head/ref/gods.html'
          },
           'sidebar@': {
             templateUrl: '/html/sidebar/ref.html'
           }
         },
        data: { title: "Gods"},
        resolve: {
          god: function() {
            return false;
          }
        }
       }).state('app.god', {
         url: 'ref/gods/:god',
         views: {
           'content@': {
             templateUrl: '/html/content/ref/gods.html',
             controller: 'GodsController'
           },
          'head@': {
            templateUrl: '/html/head/ref/gods.html'
          },
           'sidebar@': {
             templateUrl: '/html/sidebar/ref.html'
           }
         },
        data: { title: "Gods"},
        resolve: {
          god: function($stateParams) {
            return $stateParams.god;
          }
        }
       }).state('app.organizations', {
         url: 'ref/orgs',
         views: {
           'content@': {
             templateUrl: '/html/content/ref/organizations.html',
             controller: 'OrganizationController'
           },
          'head@': {
            templateUrl: '/html/head/ref/organizations.html'
          },
           'sidebar@': {
             templateUrl: '/html/sidebar/ref.html'
           }
         },
           data: { title: "Organizations"},
           resolve: {
             org: function() {
               return false;
             }
           }
       }).state('app.organization', {
        url: 'ref/orgs/:org',
        views: {
           'content@': {
             templateUrl: '/html/content/ref/organizations.html',
             controller: 'OrganizationController'
           },
           'head@': {
             templateUrl: '/html/head/ref/organizations.html'
           },
            'sidebar@': {
              templateUrl: '/html/sidebar/ref.html'
            }
          },
          data: { title: "Organizations"},
          resolve: {
            org: function($stateParams) {
              return $stateParams.org;
            }
          }
       }).state('app.calendar', {
         url: 'ref/calendar',
         views: {
           'content@': {
             templateUrl: '/html/content/ref/calendar.html'
           },
          'head@': {
            templateUrl: '/html/head/ref/calendar.html'
          },
           'sidebar@': {
             templateUrl: '/html/sidebar/ref.html'
           }
         },
           data: { title: "Calendar"}
       }).state('app.cosmology', {
         url: 'ref/cosmology',
         views: {
           'content@': {
             templateUrl: '/html/content/ref/cosmology.html'
           },
          'head@': {
            templateUrl: '/html/head/ref/cosmology.html'
          },
           'sidebar@': {
             templateUrl: '/html/sidebar/ref.html'
           }
         },
           data: { title: "Cosmology"}
       }).state('app.astronomy', {
         url: 'ref/astronomy',
         views: {
           'content@': {
             templateUrl: '/html/content/ref/astronomy.html'
           },
          'head@': {
            templateUrl: '/html/head/ref/astronomy.html'
          },
           'sidebar@': {
             templateUrl: '/html/sidebar/ref.html'
           }
         },
           data: { title: "Astronomy"}
       }).state('app.magic', {
         url: 'ref/magic',
         views: {
           'content@': {
             templateUrl: '/html/content/ref/magic.html'
           },
          'head@': {
            templateUrl: '/html/head/ref/magic.html'
          },
           'sidebar@': {
             templateUrl: '/html/sidebar/ref.html'
           }
         },
           data: { title: "Magic"}
       }).state('app.divines', {
         url: 'ref/divines',
         views: {
           'content@': {
             templateUrl: '/html/content/ref/divines.html',
             controller: 'DivineController'
           },
          'head@': {
            templateUrl: '/html/head/ref/divines.html'
          },
           'sidebar@': {
             templateUrl: '/html/sidebar/ref.html'
           }
         },
           data: { title: "Divines"}
       }).state('app.quickref', {
         url: 'ref/quick',
         views: {
           'content@': {
             templateUrl: '/html/content/ref/quick.html',
             controller: 'QuickController'
           },
          'head@': {
            templateUrl: '/html/head/ref/quick.html'
          },
           'sidebar@': {
             templateUrl: '/html/sidebar/ref.html'
           }
         },
           data: { title: "Quick Reference Manual"}
       }).state('app.history', {
         url: 'history',
         views: {
           'content@': {
             templateUrl: '/html/content/history.html',
             controller: 'HistoryController'
           },
          'head@': {
            templateUrl: '/html/head/history.html'
          },
          'sidebar@': {
           templateUrl: '/html/empty.html'
          }
         },
           data: { title: "History"},
           resolve: {
             event: function() {
               return false;
             }
           }
       }).state('app.historyevent', {
         url: 'history/:eventname',
        views: {
           'content@': {
             templateUrl: '/html/content/history.html',
             controller: 'HistoryController'
           },
          'head@': {
            templateUrl: '/html/head/history.html'
          },
          'sidebar@': {
           templateUrl: '/html/empty.html'
          }
         },
           data: { title: "History"},
         resolve: {
           event: function($stateParams) {
             return $stateParams.eventname;
           }
         }
       }).state('app.classes', {
        url: 'ref/class',
        views: {
          'content@': {
            templateUrl: '/html/content/options/classes.html',
            controller: 'ClassController'
          },
          'head@': {
            templateUrl: '/html/head/options/races.html'
          },
          'sidebar@': {
            templateUrl: '/html/sidebar/options.html'
          }
        }
       }).state('app.geo', {
         url: 'geo',
         views: {
           'content@': {
             templateUrl: '/html/content/geo.html',
             controller: 'GeographyController'
           },
           'head@': {
             templateUrl: '/html/head/geo.html'
           },
           'sidebar@': {
             templateUrl: '/html/empty.html'
          }
        },
        data: { title: "Geography" },
        resolve: {
          location: function() {
            return false;
            },
          type: function() {
            return false;
          }
        }
      }).state('app.geoitem', {
        url: 'geo/:type/:location',
        views: {
           'content@': {
             templateUrl: '/html/content/geo.html',
             controller: 'GeographyController'
           },
           'head@': {
             templateUrl: '/html/head/geo.html'
           },
           'sidebar@': {
             templateUrl: '/html/empty.html'
          }
        },
        data: { title: "Geography" },
        resolve: {
          type: function($stateParams) {
            return $stateParams.type;
          },
          location: function($stateParams) {
            return $stateParams.location;
          }
        }
      });
       $locationProvider.html5Mode(true);
    }]);
        
    
})(jQuery, angular);
/* globals angular, jQuery */
"use strict";

(function($, ng) {
  ng.module('elthelas').controller('DivineController', ['$scope', 'divineProvider', function($scope, divineProvider) {
    $scope.Divine = "";
    $scope.divines = [];
    $scope.types = [];
    $scope.divineFilter = null;
    
    $scope.filterDivines = function(a) {
      if($scope.divineFilter === null) {
        return true;
      } else {
        return a.type === $scope.divineFilter; 
      }
    };
    
    $scope.loadDivine = function(id) {
      $scope.Divine = $scope.divines.filter(function(a) {
        return a.id === id;
      })[0];
    };
    
    divineProvider.getDivines().then(function(response) {
      $scope.divines = response.data.documents;
      for(var x = 0; x < $scope.divines.length; x++) {
        if($scope.types.indexOf($scope.divines[x].type) === -1) {
          $scope.types.push($scope.divines[x].type);
        }
      }
    });
  }]);
})(jQuery, angular);
/* globals angular, jQuery */
"use strict";

(function($, ng) {
  ng.module('elthelas').controller('GodsController', ['$scope', 'godProvider', 'god', function($scope, godProvider, god) {
    $scope.gods = false;
    $scope.GodByName = "";
    $scope.alignment = "";
    
    $scope.loadGod = function(id) {
      $scope.GodByName = $scope.gods.filter(function(god) {
        return god.id === id;
      })[0];
    };
    
    godProvider.getGods().then(function(response) {
      $scope.gods = response.data.documents;
      $scope.loadGod($scope.gods.filter(function(a) {return (a.id === god || a.name === god);})[0].id);
    });

  }]);
})(jQuery, angular);
/* global angular */
/* global jQuery */
/* global document */
(function(ng, $, doc) {
    ng.module('elthelas').controller('HeaderController', ['$scope', '$state', '$rootScope', '$uibModal', '$document', 'AuthenticationProvider',
    function($scope, $state, $rootScope, $uibModal, $document, AuthenticationProvider) {
        //Google Custom Search
        var cx = '002019895859863268942:tbtmwpd5jy8';
        var gcse = doc.createElement('script');
        gcse.type = 'text/javascript';
        gcse.async = true;
        gcse.src = (doc.location.protocol === 'https:' ? 'https:' : 'https:') +
          '//www.google.com/cse/cse.js?cx=' + cx;
        var s = doc.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(gcse, s);
        $scope.title = $state.current.data.title;
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams, options){ 
          $scope.title = $state.current.data.title;
        });
        AuthenticationProvider.LoadFromCookies();
        $scope.globals = $rootScope.globals;
        $scope.message = false;
        
        $scope.login = function(size) {
          var parentElem = $("body");
          var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/app_dev.php/login',
            controller: 'LoginController',
            size: size,
            appendTo: parentElem
          });
          
          modalInstance.result.then(function (selectedItem) {
              $scope.globals = $rootScope.globals;
            }, function () {
              console.log('Modal dismissed at: ' + new Date());
              $scope.globals = $rootScope.globals;
            });
        };
        
        $scope.logout = function() {
            $scope.globals = undefined;
            AuthenticationProvider.ClearCredentials();
        };
        
        $scope.register = function(size) {
          var parentElem = $("body");
          var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/app_dev.php/register/',
            controller: 'RegisterController',
            size: size,
            appendTo: parentElem
          });
          modalInstance.result.then(function (selectedItem) {
            selectedItem();
            $scope.message = $rootScope.message;
            setTimeout(function() {
              $scope.message = false;
              $scope.$apply();
            }, 5000);
            
          }, function () {
              console.log('Modal dismissed at: ' + new Date());
              $scope.globals = $rootScope.globals;
          });
        };
    }]);
    
})(angular, jQuery, document);
/*globals jQuery, angular */
"use strict";

(function($, ng) {
  ng.module('elthelas').controller('LanguagesController', ['$scope', function($scope) {
    $scope.init = function() {
      $(".datatable").dataTable();
    };
  }]);
})(jQuery, angular);
/*global jQuery */
/*global angular */
(function($, ng) {
  "use strict";
  ng.module('elthelas').controller('OrganizationController', ['$scope', '$location', 'organizationProvider', 'org', function($scope, $location, organizationProvider, org) {
    $scope.currentOrg = false;
    
    $scope.loadOrg = function(id) {
      var tempArray = $scope.organizations.filter(function(org) {
        return org.id === id;
      });
      if(tempArray.length > 0) {
        $scope.currentOrg = tempArray[0];
      }
      else {
        $scope.currentOrg = {
          id: 'error',
          name: ''
        };
      }
    };
    
    organizationProvider.getOrganizations().then(function(response) {
      $scope.organizations = response.data.documents;
      if(org) {
        $scope.loadOrg($scope.organizations.filter(function(a) {return (a.id === org || a.title === org);})[0].id);
      }
    });
  }]);
})(jQuery, angular);
/* globals angular, jQuery */
"use strict";

(function($, ng) {
  ng.module('elthelas').controller('QuickController', ['$scope', 'SpellProvider', '$uibModal', function($scope, SpellProvider, $uibModal) {
    $scope.loadSpell =  function(index) {
      $scope.currentSpell = $scope.spells[index];
      $scope.$apply();
      var parentElem = $("body");
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: '/html/modals/spell.html',
        controller: 'SpellController',
        size: 'lg',
        appendTo: parentElem,
        resolve: {
          spell: function() {
            return $scope.currentSpell;
          }
        }
      });
          
      modalInstance.result.then(function (selectedItem) {
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };
    $scope.currentSpell = false;
    $scope.spells;
    this.init = function() {
      SpellProvider.getSpells().then(function(response) {
        $scope.spells = response.data.documents;
        
        var spellTableData = [];
        for(var x = 0; x < $scope.spells.length; x++) {
          if($scope.spells[x].level !== undefined) {
            $scope.spells[x].level = $scope.spells[x].level.replace('level', "");
          } else {
            $scope.spells[x].level = " ";
          }
          var id = 'spell' + x;
          var thisSpell = [
            '<a href="#" data-spellid="' + x + '" class="' + id + '">' + $scope.spells[x].title + "</a>",
            $scope.spells[x].level,
            $scope.spells[x].school,
            $scope.spells[x].castingTime,
            $scope.spells[x].duration,
            $scope.spells[x].tags.join(", "),
            "<input type='button' value='View' class='btn btn-sm btn-primary " + id + "' data-spellid='" + x + "' />"
          ];
          spellTableData.push(thisSpell);
        }
          $('#spelltable').dataTable({
            data: spellTableData,
            responsive: true,
            columns: [
              { title: "Title" },
              { title: "Level" },
              { title: "School" },
              { title: "Casting Time" },
              { title: "Duration" },
              { title: "Tags" },
              { title: "View" }
            ],
            drawCallback: function() {
              var callback = function() {
                $scope.loadSpell(Number($(this).attr('data-spellid')));
              };
              for(var x = 0; x < $scope.spells.length; x++) {
                $(".spell" + x).click(callback);
              }
            }
          });
      });
    };
    
    this.init();
  }]);
})(jQuery, angular);
/*global jQuery */
/*global angular */
(function($, ng) {
  "use strict";
  ng.module('elthelas').controller('RaceController', ['$scope', 'raceProvider', 'race', function($scope, raceProvider, race) {
    $scope.currentRace = false;
    
    $scope.loadRace = function(id) {
      var tempArray = $scope.races.filter(function(race) {
        return race.id === id;
      });
      if(tempArray.length > 0) {
        $scope.currentRace = tempArray[0];
      }
      else {
        $scope.currentRace = {
          id: 'error',
          name: ''
        };
      }
    };
    
    $scope.formatAgeDataRow = function(race) {
      var row = [];
      try {
        row.push(race.name);
        row.push(race.agepoints.puberty);
        row.push(race.agepoints.sexualmaturity);
        row.push(race.agepoints.mentalmaturity);
        row.push(race.agepoints.middleage);
        row.push(race.agepoints.oldage);
        row.push(race.agepoints.averagelifespan);
        row.push(race.agepoints.maxage);
      } catch(e) {
        row = [];
        //console.log(e.message);
        //console.log(race);
        if(race.name === undefined || race.name === null) {
          row.push("Error");
        } else {
          row.push(race.name);
        }
        row.push(1);
        row.push(2);
        row.push(3);
        row.push(4);
        row.push(5);
        row.push(6);
        row.push(7);
      }
      return row;
    };
    
    $scope.getAllAgeData = function() {
      var ageData = [];
      for(var x = 0; x < $scope.races.length; x++) {
        ageData.push(this.formatAgeDataRow($scope.races[x]));
      }
      
      return ageData;
    };
    
    $scope.formatSizeDataRow = function(race, subrace) {
      var row = [];
      
      if(subrace === null || subrace === undefined) {
        subrace = "default";
      }
      try {
        var thissub = race.subraces.filter(function(a) {
          return a.id === subrace;
        })[0];
        if(subrace === "default") {
          row.push(race.name);
        } else {
          row.push(thissub.name);
        }
        row.push(Math.floor(thissub.averageheight/12) + "\'" + thissub.averageheight%12 + "\"");
        row.push(Math.floor(thissub.baseheight/12) + "\'" + thissub.baseheight%12 + "\"");
        row.push(thissub.heightroll);
        row.push(thissub.averageweight + " lbs");
        row.push(thissub.baseweight + " lbs");
        row.push("Height Roll * " + thissub.weightroll);        
      }
      catch(e) {
        //console.log(e.message);
        row = ["Error", 1, 1, 1, 1, 1, 1];
      }

      
      return row;
    };

    $scope.getAllSizeData = function() {
      var sizeData = [];
      for(var x = 0; x < $scope.races.length; x++) {
        var thisRace = $scope.races[x];
        if(thisRace.subraces === null || thisRace.subraces === undefined) {
          sizeData.push($scope.formatSizeDataRow(thisRace));
        }
        else {
          for(var y = 0; y < thisRace.subraces.length; y++) {
            sizeData.push($scope.formatSizeDataRow(thisRace, thisRace.subraces[y].id));
          }
        }
      }
      return sizeData;
    };
    
    raceProvider.getRaces().then(function(response) {
      $scope.races = response.data.documents;
      if(race) {
        $scope.loadRace($scope.races.filter(function(a) {
          if(a.id === race || a.name === race) {
            return true;
          }
          for(var x = 0; x < a.subraces.length; x++) {
            if(a.subraces[x].id === race || a.subraces[x].name === race) {
              return true;
            }
          }
          
        })[0].id);
      }
      $("#ageTable").dataTable({
        data: $scope.getAllAgeData(),
        columns: [
          { title: 'Race' },
          { title: 'Start of Puberty' },
          { title: 'Sexual Maturity' },
          { title: 'Mental Maturity' },
          { title: 'Middle Age' },
          { title: 'Old Age' },
          { title: 'Average Lifespan' },
          { title: 'Maximum Age' }
          
        ]
      });
      $("#sizeTable").dataTable({
        data: $scope.getAllSizeData(),
        columns: [
          { title: 'Race/Subrace' },
          { title: 'Average Height' },
          { title: 'Base Height' },
          { title: 'Height Roll' },
          { title: 'Average Weight' },
          { title: 'Base Weight' },
          { title: 'Weight Roll' }
        ]
      });
    });
  }]);
})(jQuery, angular);
/* globals angular, jQuery */

(function (ng, $) {
  "use strict";
  
  angular.module('elthelas').controller('LoginController', ['$scope', '$location', 'AuthenticationProvider', '$uibModalInstance', 
  function($scope, $location, AuthenticationProvider, $uibModalInstance) {
    var vm = this;
    
    $scope.username;
    $scope.password;
    $scope.rememberMe;
    $scope.login = login;
    
    vm.postLogin = function(response) {
        if(response.status === 200) {
          if(!response.data.success) {
            $(".modal-body .alert").remove();
            $(".modal-body").prepend("<div class='alert alert-danger'>" + response.data.message + "</div>");
          } else {
            AuthenticationProvider.SetCredentials($scope.username, $scope.password, $scope.rememberMe);
            $uibModalInstance.close('login success');
          }
        } else {
          vm.dataLoading = false;
        }      
    };
    function login() {
      vm.dataLoading = true;
      return AuthenticationProvider.Login($scope.username, $scope.password, vm.postLogin);
      
    }
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }]);
})(angular, jQuery);
/* globals angular, jQuery */

(function(ng ,$) {
  'use strict';
  
  ng.module('elthelas').controller('RegisterController', ['$location', '$http', '$rootScope', '$uibModalInstance', '$scope', 'AuthenticationProvider',
    function($location, $http, $rootScope, $uibModalInstance, $scope, AuthenticationProvider) {
        var vm = this;
 
        $scope.register = register;
 
        function register() {
          vm.dataLoading = true;
          AuthenticationProvider.Register(
            $("#fos_user_registration_form_username").val(),
            $("#fos_user_registration_form_plainPassword_first").val(),
            $("#fos_user_registration_form_plainPassword_second").val(),
            $("#fos_user_registration_form_email").val(), 
            $("#fos_user_registration_form__token").val(),
            function(response) {
              $uibModalInstance.close(function() {
                $rootScope.message = response.data;
              });
          });
        }
        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };    
  }]);
})(angular, jQuery);
/* globals angular */

(function(ng) {
  ng.module('elthelas').controller('SpellController', ['$scope', '$uibModalInstance', 'spell', function($scope, $uibModalInstance, spell) {
    $scope.spell = spell;
    
    $scope.cancel = function () {
      $uibModalInstance.close('cancel');
    };
  }]);
})(angular);
/* globals angular, jQuery */
(function(ng, $) {
  ng.module("elthelas").controller("HistoryController", ['marked', '$scope', 'HistoryProvider', '$uibModal', 'event',
  function(marked, $scope, HistoryProvider, $uibModal, event) {
    $scope.options = {
      language: 'el',
      layout: 'portrait',
      timenav_position: 'top',
      scale_factor: 20,
    };
    
    $scope.history = [];
    HistoryProvider.getHistory().then(function(response) {
      $scope.history = response.data.documents;
      var data = {
        'title': {
          'text': {
            'headline': 'Known History of Elthelas',
            'text': ''
          }
        },
        'events': $scope.history
      };
      for(var e in data.events) {
        data.events[e].text.text = marked(data.events[e].text.text);
      }
      $scope.timeline.setData(data);
      $scope.timeline.goTo(data.events.length);
      if(event) {
        var selected = $scope.history.filter(function(a) {
          return a.text.headline.toLowerCase().replace(/ /g, "") === event.toLowerCase().replace(/ /g, ""); 
        })[0];
        var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: '/html/modals/event.html',
        controller: 'HistoryEventController',
        size: 'lg',
        appendTo: $('body'),
        resolve: {
          event: function() {
            return selected;
          }
        }
      });
          
      modalInstance.result.then(function (selectedItem) {
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
      }
    }, function() {
      
    });
  }]).controller('HistoryEventController', ['$scope', '$uibModalInstance', 'event', function($scope, $uibModalInstance, event) {
    $scope.event = event;
    
    function elthelasDateFormat(date) {
      switch (Number(date.data.month)) {
        case 1:
          date.month = "Neradan"; break;
        case 2:
          date.month = "Dorunor"; break;
        case 3:
          date.month = "Trimalan"; break;
        case 4:
          date.month = "Sylvanus"; break;
        case 5:
          date.month = "Gaiana"; break;
        case 6:
          date.month = "Alohiman"; break;
        case 7:
          date.month = "Coranus"; break;
        case 8:
          date.month = "Moltyr"; break;
        case 9:
          date.month = "Saris"; break;
        case 10:
          date.month = "Maridia"; break;
        case 11:
          date.month = 'Tockra'; break;
        case 12:
          date.month = "Amatherin"; break;
        default:
          break;
      }
      date.day = date.data.day;
      date.year = date.data.year;
      
      return date;
    }
    $scope.event.start_date = elthelasDateFormat($scope.event.start_date);
    if($scope.event.end_date) {
      $scope.event.end_date = elthelasDateFormat($scope.event.end_date);
    }
    $scope.cancel = function () {
      $uibModalInstance.close('cancel');
    };
  }]);
})(angular, jQuery);
/* globals angular, jQuery */

(function(ng, $) {
  ng.module('elthelas').controller('ClassController', ['$scope', function($scope) {
    $('.racediv').hide();
    $('.racebutton').click(function() {
      var classToShow = $(this).attr('data-race');
      $('.racediv').hide();
      $('#' + classToShow).show();
    });
  }]);
})(angular, jQuery);
/* globals angular, jQuery, L, alert */
"use strict";

(function($, ng) {
  ng.module('elthelas').controller('GeographyController', ['$scope', 'geoProvider', '$uibModal', '$q', 'type', 'location', function($scope, geoProvider, $uibModal, $q, type, location) {
    $scope.cities;
    $scope.continents;
    $scope.nations;
    $scope.features;
    $scope.landmarks;
    
    var map = L.map('map').setView([0, 0], 2);
    map.on('click', function(e) {
      alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
    });
    var markers = [];
    L.tileLayer('/images/maps/tiles/{z}/{y}/{x}.png', {
            attribution: '|--------| = 320/160/80/40 miles by zoom | map image created by Heather Domaszek',
            minZoom: 0,
            maxZoom: 4,
            tms: true,
            noWrap: true
          }).addTo(map);    
          
    function showdetails(geoitem, type) {
      var parentElem = $("body");
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: '/html/modals/' + type + ".html",
        controller: 'GeoDetailsController',
        size: 'lg',
        appendTo: parentElem,
        resolve: {
          geoitem: function() {
            return geoitem;
          }
        }
      });
          
      modalInstance.result.then(function (selectedItem) {
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    }
    
    function addmarker(city, type) {
      var marker = L.marker(city.coords, {
        alt: city.name,
        city: city
      }).bindTooltip(city.name, { permanent: true, interactive: true, direction: "auto", opacity: 0.75 });
      $(marker).click(function() {
        map.flyTo(city.coords, 4);
        showdetails(city, type);
      });
      marker.addTo(map);
      markers.push(marker);
    }
    
    $scope.showAll = function() {
      for(var i = 0; i < markers.length; i++) {
        map.removeLayer(markers[i]);
      }
      for(var x = 0; x < $scope.cities.length; x++) {
        addmarker($scope.cities[x], "city");
      } 
      for(var y = 0; y < $scope.nations.length; y++) {
        addmarker($scope.nations[y], "nation");
      }
      for(var z = 0; z < $scope.landmarks.length; z++) {
        addmarker($scope.landmarks[z], "landmark");
      }
      for(var v = 0; v < $scope.features.length; v++) {
        addmarker($scope.features[v], "feature");
      }
      for(var u = 0; u < $scope.continents.length; u++) {
        addmarker($scope.continents[u], "continent");
      }
    };
    
    $scope.showCities = function() {
      for(var i = 0; i < markers.length; i++) {
        map.removeLayer(markers[i]);
      }
      for(var x = 0; x < $scope.cities.length; x++) {
        addmarker($scope.cities[x], "city");
      }
    };
    
    $scope.showNations = function() {
      for(var i = 0; i < markers.length; i++) {
        map.removeLayer(markers[i]);
      }
      for(var x = 0; x < $scope.nations.length; x++) {
        addmarker($scope.nations[x], "nation");
      }
    };
    
    $scope.showFeatures = function() {
      for(var i = 0; i < markers.length; i++) {
        map.removeLayer(markers[i]);
      }
      for(var x = 0; x < $scope.features.length; x++) {
        addmarker($scope.features[x], "feature");
      }
    };
    
    $scope.showLandmarks = function() {
      for(var i = 0; i < markers.length; i++) {
        map.removeLayer(markers[i]);
      }
      for(var x = 0; x < $scope.landmarks.length; x++) {
        addmarker($scope.landmarks[x], "landmark");
      }
    };
    
    $scope.showContinents = function() {
      for(var i = 0; i < markers.length; i++) {
        map.removeLayer(markers[i]);
      }
      for(var x = 0; x < $scope.continents.length; x++) {
        addmarker($scope.continents[x], "continent");
      }
    };
    
    $q.all([geoProvider.getCities().then(function(response) {
      $scope.cities = response.data.documents;
    }, function(response) {
      console.log(response);
    }),
    
    geoProvider.getNations().then(function(response) {
      $scope.nations = response.data.documents;
    }, function(response) {
      console.log(response);
    }),

    geoProvider.getFeatures().then(function(response) {
      $scope.features = response.data.documents;
    }, function(response) {
      console.log(response);
    }),

    geoProvider.getLandmarks().then(function(response) {
      $scope.landmarks = response.data.documents;
    }, function(response) {
      console.log(response);
    }),

    geoProvider.getContinents().then(function(response) {
      $scope.continents = response.data.documents;
    }, function(response) {
      console.log(response);
    })]).then(function() {
      var item;
      if(location && type) {
        if(type === "continent") {
          item = $scope.continents.filter(function(a) {return a.name === location;})[0];
        }
        if(type === "city") {
          item = $scope.cities.filter(function(a) {return a.name === location;})[0];
        }
        if(type === "nation") {
          item = $scope.nations.filter(function(a) {return a.name === location;})[0];
        }
        if(type === "landmark") {
          item = $scope.landmarks.filter(function(a) {return a.name === location;})[0];
        }
        if(type === "feature") {
          item = $scope.features.filter(function(a) {return a.name === location;})[0];
        }
        showdetails(item, type);
      }
    });
    
  }]).controller('GeoDetailsController', ['$scope', '$uibModalInstance', 'geoitem', function($scope, $uibModalInstance, geoitem) {
    $scope.geoitem = geoitem;
    $scope.otherSize = 1;
    $scope.init = function() {
      var map = L.map('smallmap').setView(geoitem.coords, 4);
      L.tileLayer('/images/maps/tiles/{z}/{y}/{x}.png', {
              attribution: '|--------| = 320/160/80/40 miles by zoom | map image created by Heather Domaszek',
              minZoom: 0,
              maxZoom: 4,
              tms: true,
              noWrap: true
            }).addTo(map);
    };
    
    if(geoitem.populationDistribution) {
      for(var x = 0; x < geoitem.populationDistribution.length; x++) {
        $scope.otherSize -= geoitem.populationDistribution[x].proportion;
      }
    }
    $scope.cancel = function () {
      $uibModalInstance.close('cancel');
    };    
  }]);
})(jQuery, angular);
/*global jQuery*/
/*global angular */

(function($, ng) {
  "use strict";
  ng.module('elthelas').factory('divineProvider', ['$q', '$http', function($q, $http) {
    var divines = {};
    
    divines.getDivines = function() {
      var deferred = $q.defer();
      
      $http.get("/json/divines.json").then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    };
    
    return divines;
  }]);
})(jQuery, angular);
/*global jQuery*/
/*global angular */

(function($, ng) {
  "use strict";
  ng.module('elthelas').factory('godProvider', ['$q', '$http', function($q, $http) {
    var gods = {};
    
    gods.getGods = function() {
      var deferred = $q.defer();
      
      $http.get("/json/gods.json").then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    };
    
    return gods;
  }]);
})(jQuery, angular);
/*global jQuery, angular*/

(function($, ng) {
  "use strict";
  ng.module('elthelas').factory('organizationProvider', ['$q', '$http', function($q, $http) {
    var organizations = {};
    
    organizations.getOrganizations = function() {
      var deferred = $q.defer();
      
      $http.get("/json/organizations.json").then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    };
    
    return organizations;
  }]);
})(jQuery, angular);
/*global jQuery*/
/*global angular*/
"use strict";

(function($, ng) {
  ng.module('elthelas').factory('raceProvider', ['$q', '$http', function($q, $http) {
    var races = {};
    
    races.getRaces = function() {
      var deferred = $q.defer();
      
      $http.get("/json/races.json").then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    };
    
    return races;
  }]);
})(jQuery, angular);
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
/*global jQuery*/
/*global angular*/
"use strict";

(function($, ng) {
  ng.module('elthelas').factory('SpellProvider', ['$q', '$http', function($q, $http) {
    var spells = {};
    
    spells.getSpells = function() {
      var deferred = $q.defer();
      
      $http.get("/json/spells.json").then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    };
    
    return spells;
  }]);
})(jQuery, angular);
/*global jQuery*/
/*global angular*/
"use strict";

(function($, ng) {
  ng.module('elthelas').factory('HistoryProvider', ['$q', '$http', function($q, $http) {
    var history = {};
    
    history.getHistory = function() {
      var deferred = $q.defer();
      
      $http.get("/json/history.json").then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    };
    
    return history;
  }]);
})(jQuery, angular);
/*global jQuery*/
/*global angular */

(function($, ng) {
  "use strict";
  ng.module('elthelas').factory('geoProvider', ['$q', '$http', function($q, $http) {
    var geo = {};
    
    geo.getCities = function() {
      var deferred = $q.defer();
      
      $http.get("/json/cities.json").then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    };
    
    geo.getContinents = function() {
      var deferred = $q.defer();
      
      $http.get('/json/continents.json').then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    };
    
    geo.getFeatures = function() {
      var deferred = $q.defer();
      
      $http.get('/json/features.json').then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    };
    
    
    geo.getLandmarks = function() {
      var deferred = $q.defer();
      
      $http.get('/json/landmarks.json').then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    };
    
    
    geo.getNations = function() {
      var deferred = $q.defer();
      
      $http.get('/json/nations.json').then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        deferred.reject();
      });
      
      return deferred.promise;
    };
    
    return geo;
  }]);
})(jQuery, angular);