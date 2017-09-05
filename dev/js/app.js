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
                   templateUrl: '/html/head/head.html',
                   controller: 'HeaderController'
               },
               'sidebar': {
                   templateUrl: '/html/empty.html'
               }
           },
           data: { 
             title: "Home", 
             auth: false,
             metadescription: "Website for the Elthelas Campaign Setting for Dungeons and Dragons by Joseph Harrison. Dungeons and Dragons is owned and copyrighted by Wizard's of the Coast.",
             metakeywords: ""
           }
    }).state('app.domains', {
          url:'options/domains',
          views: {
              'content@': {
                  templateUrl: '/html/content/options/domains.html',
                  controller: 'DomainController'
              },
              'sidebar@': {
                  templateUrl: '/html/sidebar/options.html'
              }
          },
          data: { title: "Domains",
             metadescription: "List of Domains available in the Elthelas Campaign Setting for Dungeons and Dragons by Joseph Harrison. Dungeons and Dragons is owned and copyrighted by Wizard's of the Coast.",
             metakeywords: "domains, air, earth, fire, water, craft, death, arcana, nature, life, light, war, tempest, trickery, trade"}
    }).state('app.races', {
           url: 'options/races',
           views: {
              'content@': {
                  templateUrl: '/html/content/options/races.html',
                  controller: 'RaceController'
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
           }
         },
           data: { title: "History"},
         resolve: {
           event: function($stateParams) {
             return $stateParams.eventname;
           }
         }
    }).state('app.classes', {
        url: 'options/class',
        views: {
          'content@': {
            templateUrl: '/html/content/options/classes.html',
            controller: 'ClassController'
          },
          'sidebar@': {
            templateUrl: '/html/sidebar/options.html'
          }
        },
        data: {
          title: "Classes"
        }
    }).state('app.geo', {
         url: 'geo',
         views: {
           'content@': {
             templateUrl: '/html/content/geo.html',
             controller: 'GeographyController'
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
          'sidebar@': {
            templateUrl: '/html/sidebar/campaign.html'
          }
        },
        data: {
          title: 'Epic of Elthelas Book 1: The Crystal of Light',
          auth: true
        }
    }).state('app.book4', {
        url: 'campaigns/book4',
        views: {
          'content@': {
            templateUrl: '/html/content/campaigns/book4.html'
          },
          'sidebar@': {
            templateUrl: '/html/sidebar/campaign.html'
          }
        },
        data: {
          title: 'Epic of Elthelas Book 4: Desperate Measures',
          auth: true
        },
    }).state('app.book4playersguide', {
      url: 'campaigns/book4/playersguide',
      views: {
        'content@': {
          templateUrl: '/html/content/campaigns/book4playersguide.html'
        },
        'sidebar@': {
          templateUrl: '/html/sidebar/options.html'
        }
      },
      data: {
        title: "Epic of Elthelas Book 4: Desparate Measures - Players Guide",
        auth: false
      }
    }).state('app.backgrounds', {
        url: 'options/backgrounds',
        views: {
          'content@': {
            templateUrl: '/html/content/options/backgrounds.html',
            controller: 'BackgroundController'
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
        'sidebar@': {
          templateUrl: '/html/sidebar/ref.html'
        }
      },
      data: {
        title: 'Beastiary'
      }
    }).state('app.charbuilder', {
      url: 'campaign/charbuilder',
      views: {
        'content@': {
          templateUrl: '/html/content/tools/characterbuilder.html',
          controller: 'CharController'
        },
      },
      data: {
          title: 'Character Builder', 
          auth: false
        }
    });
    $locationProvider.html5Mode(true);
  }]);
})(jQuery, angular);