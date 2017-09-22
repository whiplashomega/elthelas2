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
             metakeywords: "Dungeons, Dragons, Elthelas, Campaign Setting, Homebrew"
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
             metakeywords: "domains, air, earth, fire, water, craft, death, arcana, nature, life, light, war, tempest, trickery, trade"
          }
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
           data: { 
             title: "Races",
             metadescription: "Race choices available for the Elthelas Campaign Setting including racial traits",
             metakeywords: "races, human, elf, orc, goblin, kobold, dwarf, sorceron-blooded, child of molton, trollkin, aasimar, bugbear, dragonborn, faelin, genasi, goliath, half-dwarf, half-elf, hobgoblin, lizardfolk, tiefling"
           },
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
          data: { 
            title: "Races",
            metadescription: "Race choices available for the Elthelas Campaign Setting including racial traits, displaying a particular race.",
            metakeywords: "races, human, elf, orc, goblin, kobold, dwarf, sorceron-blooded, child of molton, trollkin, aasimar, bugbear, dragonborn, faelin, genasi, goliath, half-dwarf, half-elf, hobgoblin, lizardfolk, tiefling, preloaded"
          },
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
           data: { title: "Languages",
             metadescription: "Languages available in the Elthelas Campaign Setting and rules for choosing languages for your character.",
             metakeywords: "languages, rules, options, language"
          }
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
        data: { 
          title: "Gods",
          metadescription: "Reference page of the Gods of the Elthelas campaign setting, including dogma, holy symbol, appearance, and more.",
          metakeywords: "reference, gods, holy symbol, dogma, alohim, amathera, sara, cora, mat'raktha, trolka, maris, trimala, molton, dorun, sylvan, nera, gaian, malik, arengesus, area, zhuul"
          },
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
        data: { 
          title: "Gods",
          metadescription: "Reference page of the Gods of the Elthelas campaign setting, including dogma, holy symbol, appearance, and more. With god preloaded.",
          metakeywords: "reference, gods, holy symbol, dogma, alohim, amathera, sara, cora, mat'raktha, trolka, maris, trimala, molton, dorun, sylvan, nera, gaian, malik, arengesus, area, zhuul, preloaded"
        },
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
        data: { 
          title: "Organizations",
          metadescription: "Reference sheet for organizations prominent in the Elthelas Campaign Setting, including optional rules for players who are a part of those organizations.",
          metakeywords: "reference, organizations, Black Wolf Irregulars, Amathera's Shield, Champions of Cora, Black Sun, International Grangemaster's Alliance, Silver Dragon Knights, Alliance of 6 Nations, Artificer's of Mechanus, Blackguards of Mat'raktha, Dormanian Imperial Guard, Dragon Cult, Guild of Heroes, Illustrious Guild of Merchants and Fine Artisans, Keepers of the Grove, Lords of the Rising Dawn, Makers of Legend, Masters of the Deep Song, Morrind Brewers Club, Order of the Cleansing Fire, Shepherds of the All-Mother, Stormlords of Trimala, Sylvan's Rangers, Trollkin Mercenary Corps, Voidbringers"
        },
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
        data: { title: "Organizations",
          metadescription: "Reference sheet for organizations prominent in the Elthelas Campaign Setting, including optional rules for players who are a part of those organizations. Organization preloaded",
          metakeywords: "reference, organizations, Black Wolf Irregulars, Amathera's Shield, Champions of Cora, Black Sun, International Grangemaster's Alliance, Silver Dragon Knights, Alliance of 6 Nations, Artificer's of Mechanus, Blackguards of Mat'raktha, Dormanian Imperial Guard, Dragon Cult, Guild of Heroes, Illustrious Guild of Merchants and Fine Artisans, Keepers of the Grove, Lords of the Rising Dawn, Makers of Legend, Masters of the Deep Song, Morrind Brewers Club, Order of the Cleansing Fire, Shepherds of the All-Mother, Stormlords of Trimala, Sylvan's Rangers, Trollkin Mercenary Corps, Voidbringers, preloaded"
        },
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
           data: { title: "Calendar",
             metadescription: "The calendar system commonly used on Elthelas as part of the Elthelas Campaign Setting.",
             metakeywords: "reference, calendar, months, YFC"
          }
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
           data: { title: "Cosmology",
             metadescription: "Planar cosmology for the Elthelas Campaign Setting.",
             metakeywords: "plane, cosmology, elthelas, ethereal, astral, aurumal, shadowfell, feywild, air, water, fire, earth, celestia, elysium, beastlands, arborea, ysgard, limbo, pandemonium, abyss, carceri, hades, gehenna, hell, nine hells, acheron, mechanus, arcadia, negative energy, positive enrgy, confluence"
          }
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
           data: { title: "Astronomy",
             metadescription: "Local astronomy for the Elthelas Campaign Setting's material plane.",
             metakeywords: "astronomy, ara, aruru, dina"
          }
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
           data: { title: "Magic",
             metadescription: "Description of the forces of magic and the rules surrounding them in the Elthelas Campaign Setting.",
             metakeywords: "magic, arcane, divine, schools, abjuration, conjuration, divination, enchantment, evocation, illusion, necromancy, transmutation, rules, wizards, sorcerers, arcanum"
          }
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
           data: { title: "Divines",
             metadescription: "Descriptions and information about the lesser divine beings of Elthelas, such as Archangels, demon lords, fey lords, and the Dukes of Hell",
             metakeywords: "divine, archangel, angel, demon lord, fey lord, duke, hell, abyss"
          }
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
           data: { title: "Quick Reference Manual",
             metadescription: "The Quick Reference Manual for the Elthelas Campaign Setting is a tool for players and Dungeon Masters to be able to quickly look up information on spells, magic items, and equipment. Use it to settle your disputes quickly and get on with the game.",
             metakeywords: "quick reference, spells, magic items, armor, weapons, conditions, injuries."
          }
    }).state('app.history', {
         url: 'history',
         views: {
           'content@': {
             templateUrl: '/html/content/history.html',
             controller: 'HistoryController'
           }
         },
           data: { title: "History",
             metadescription: "The complete timeline of the known history of Elthelas, more events are added regularly, with dates and descriptions.",
             metakeywords: "history, timeline, events"
          },
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
           data: { title: "History",
             metadescription: "The complete timeline of the known history of Elthelas, more events are added regularly, with dates and descriptions. An event has been preloaded",
             metakeywords: "history, timeline, events, preloaded"
          },
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
          title: "Classes",
             metadescription: "Character classes available in the Elthelas Campaign Setting, including homebrew options written by the author such as a revision to the ranger class (based on the Unearthed Arcana revised ranger), and the Factotum.",
             metakeywords: "classes, class, barbarian, bard, cleric, druid, factotum, fighter, monk, paladin, ranger, rogue, sorcerer, warlock, wizard"
          
        }
    }).state('app.geo', {
         url: 'geo',
         views: {
           'content@': {
             templateUrl: '/html/content/geo.html',
             controller: 'GeographyController'
           }
        },
        data: { title: "Geography",
             metadescription: "Geographic and location information for the Elthelas Campaign Setting.",
             metakeywords: "geography, location, elthelas, nations, cities, elathia, riftlan, atyrea, tu'eldoran, azrea, dormania, gerasalim, kandor, curinor, eldoran, demal thor, shendarel, olda, gnarra, morrindim, degak'ta, nerim, seran, terron, arad, malinval, sage, hisrudetan, alfadir, stagenheim, tiaov coast, staelia, gorgro, ice wastes, zelfir, dragonhome, dera'dragorim, dera, riftlan wilds"
          },
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
        data: { title: "Geography",
             metadescription: "Geographic and location information for the Elthelas Campaign Setting. Preloaded.",
             metakeywords: "geography, location, elthelas, nations, cities, elathia, riftlan, atyrea, tu'eldoran, azrea, dormania, gerasalim, kandor, curinor, eldoran, demal thor, shendarel, olda, gnarra, morrindim, degak'ta, nerim, seran, terron, arad, malinval, sage, hisrudetan, alfadir, stagenheim, tiaov coast, staelia, gorgro, ice wastes, zelfir, dragonhome, dera'dragorim, dera, riftlan wilds, preloaded"
           },
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
        data: { title: 'About the Author',
             metadescription: "All about Joseph Harrison, web developer and author of the Elthelas Campaign Setting.",
             metakeywords: "Joseph Harrison, Joe, elthelas, author, developer, javascript, php"
           }
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
          auth: true,
             metadescription: "History and events of the Epic of Elthelas: Book 1, a campaign first run from August 2011 - May 2013.",
             metakeywords: "crystal, crystal of light, book 1, restricted"
          
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
          auth: true,
             metadescription: "Campaign plan and fully runable campaign for the Epic of Elthelas Book 4, detailing the epic conclusion to the Great Orc War. For players level 3-17",
             metakeywords: "Book 4, desparate measures, level 3, restricted"
          
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
        auth: false,
             metadescription: "Players guide and starting information for players intending to join the campaign Epic of Elthelas Book 4: Desparate Measures.",
             metakeywords: "Book 4, players guide, desparate measures, starting information, character options"
          
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
          title: 'Backgrounds',
             metadescription: "Backgrounds available to players in the Elthelas Campaign Setting, including adaptations of backgrounds from the Sword Coast Adventurer's Guide.",
             metakeywords: "backgrounds, elthelas, options, outlander, folk hero, sage, acolyte, urchin, charlatan, far traveler, city watch, investigator, soldier, pirate, sailor, hermit"
          
        },
    }).state('app.bestiary', {
      url: 'ref/beasts',
      views: {
        'content@': {
          templateUrl: '/html/content/ref/bestiary.html',
          controller: 'BeastController'
        },
        'sidebar@': {
          templateUrl: '/html/sidebar/ref.html'
        }
      },
      data: {
        title: 'Bestiary',
             metadescription: "Bestiary for the Elthelas Campaign Setting. Will eventually include typical locations found for each creature (by plane/continent/terrain).",
             metakeywords: "beast, bestiary, aberration, humanoid, fey, dragon, giant, monstrosity, ooze, plant, fiend, celestial, reference"
          
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
          auth: false,
             metadescription: "Character builder that incorporates special options from the Elthelas Campaign Setting, build your character from scratch, export it as a json file, and reimport it any time.",
             metakeywords: "character builder, json, export, import, elthelas, background, class, race, equipment, spells"
          
        }
    });
    $locationProvider.html5Mode(true);
  }]);
})(jQuery, angular);