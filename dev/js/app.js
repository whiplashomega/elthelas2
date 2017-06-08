/*globals jQuery, angular */
"use strict";

(function($, ng) {
    var elthelas = ng.module('elthelas' ,['ui.router', 'hc.marked', 'ui.bootstrap', 'ngCookies']);
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
           data: { title: "Races"}
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
           data: { title: "Gods"}
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
           data: { title: "Organizations"}
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
           data: { title: "History"}
       });
       $locationProvider.html5Mode(true);
    }]).state('app.classes', {
      url: 'ref/class',
      views: {
        'content@': {
          templateUrl: '/html/content/options/classes.html',
          controller: 'ClassController'
        },
        'head@': {
          templateUrl: '/html/head/classes.html'
        },
        'sidebar@': {
          templateUrl: '/html/sidebar/options.html'
        }
      }
    });
        
    
})(jQuery, angular);