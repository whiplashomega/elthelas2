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
           data: { title: "Home", auth: false }
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
      }).state('app.about', {
        url: 'about',
        views: {
          'content@': {
            templateUrl: '/html/content/about.html'
          },
          'head@': {
            templateUrl: '/html/head/about.html'
          },
          'sidebar@': {
            templateUrl: '/html/sidebar/about.html'
          }
        },
        data: { title: 'About the Author' }
      }).state('app.book1', {
        url: 'campaigns/book1',
        views: {
          'content@': {
            templateUrl: '/html/content/campaigns/book1.html'
          },
          'head@': {
            templateUrl: '/html/head/campaigns/book1.html'
          },
          'sidebar@': {
            templateUrl: '/html/sidebar/campaign.html'
          }
        },
        data: {
          title: 'Epic of Elthelas Book 1: The Crystal of Light'
        }
      }).state('app.book4', {
        url: 'campaigns/book4',
        views: {
          'content@': {
            templateUrl: '/html/content/campaigns/book4.html'
          },
          'head@': {
            templateUrl: '/html/head/campaigns/book4.html'
          },
          'sidebar@': {
            templateUrl: '/html/sidebar/campaign.html'
          }
        },
        data: {
          title: 'Epic of Elthelas Book 4: Desperate Measures',
          auth: true
        },
      }).state('app.backgrounds', {
        url: 'options/backgrounds',
        views: {
          'content@': {
            templateUrl: '/html/content/options/backgrounds.html',
            controller: 'BackgroundController'
          },
          'head@': {
            templateUrl: '/html/head/options/backgrounds.html'
          },
          'sidebar@': {
            templateUrl: '/html/sidebar/options.html'
          }
        },
        data: {
          title: 'Backgrounds'
        },
      }).state('app.beastiary', {
      url: 'ref/beasts',
      views: {
        'content@': {
          templateUrl: '/html/content/ref/beastiary.html',
          controller: 'BeastController'
        },
        'head@': {
          templateUrl: '/html/head/ref/beastiary.html'
        },
        'sidebar@': {
          templateUrl: '/html/sidebar/ref.html'
        }
      },
      data: {
        title: 'Beastiary'
      }
    });
       $locationProvider.html5Mode(true);
    }]);
        
    
})(jQuery, angular);