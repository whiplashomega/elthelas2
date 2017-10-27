/*global angular, jQuery*/
(function(ng, $) {
  ng.module('elthelas').controller('Book4Controller', ['$scope', '$http', function($scope, $http) {
    $scope.navs = [
        {
          text: 'The World of Elthelas',
          url: '#theworld',
          file: "theworld.md",
          children: []
        },
        {
          text: 'Cur\'Estan',
          url: '#curestan',
          file: "curestan.md",
          children: [
            {
              text: 'Map of Cur\'Estan',
              url: '#curestanmap'
            },
            {
              text: 'Important People in Cur\'Estan',
              url: '#curestanpeople'
            },
            {
              text: 'Locations in Cur\'Estan',
              url: '#curestanlocations'
            },
            {
              text: 'Factions in Cur\'Estan',
              url: '#curestanfactions'
            }
          ]
        },
        {
          text: "Chapter 1: Recruits",
          url: "#chapter1",
          file: "chapter1.md",
          children: [
            {
              text: "Starting Out",
              url: "#chapter1startingout"
            },
            {
              text: "Raiders",
              url: "#chapter1raiders"
            },
            {
              text: "The Raiders' Base",
              url: "#chapter1raidersbase"
            },
            {
              text: "Random Encounters",
              url: "#chapter1randomencounters"
            }
          ]
        },
        {
          text: "Chapter 2: Escape from Northport",
          url: "#chapter2",
          file: "chapter2.md",
          children: [
            {
              text: "Preparations",
              url: "#chapter2preparation"
            },
            {
              text: "The City of Northport",
              url: "#chapter2northport"
            },
            {
              text: "Arrival in Northport",
              url: "#chapter2riot"
            },
            {
              text: "Necromancers on the Edge of Town",
              url: "#chapter2necromancers"
            },
            {
              text: "Sulac's Lair",
              url: "#chapter2sulac"
            },
            {
              text: "The Guild of Heroes",
              url: "#chapter2guildofheroes"
            },
            {
              text: "Delay the Orc Army",
              url: "#chapter2delayorcs"
            },
            {
              text: "Evacuation of Northport",
              url: "#chapter2evacuation"
            },
            {
              text: "Random Encounters",
              url: "#chapter2randomencounters"
            }
          ]
        },
        {
          text: "Chapter 3: Civil War",
          url: "#chapter3",
          file: "chapter3.md",
          children: [
            {
              text: "Chapter 3: Preparation",
              url: "#chapter3preparation"
            },
            {
              text: "Chapter 3: Settlement",
              url: "#chapter3settlement"
            },
            {
              text: "Chapter 3: Cur'Mestin",
              url: "#chapter3curmestin"
            },
            {
              text: "Chapter 3: Castle Octavius",
              url: "#chapter3octaviuscastle"
            },
            {
              text: "Chapter 3: The Loyalists' Hideout",
              url: "#chapter3loyalistshideout"
            },
            {
              text: "Chapter 3: The Purple Worm Nest",
              url: "#chapter3purplewormnest"
            },
            {
              text: "Chapter 3: The Temple of Alohim",
              url: "#chapter3templeofalohim"
            },
            {
              text: "Chapter 3: Breaking the Blockade",
              url: "#chapter3blockade"
            },
            {
              text: "chapter 3: Miscelaneous Sidequests",
              url: "#chapter3misc"
            }
          ]
        },
        {
          text: "Chapter 4: The Invaders and the Mad Wizard",
          url: "#chapter4",
          file: "chapter4.md",
          children: [
            {
              text: "Chapter 4: Preparation",
              url: "#preparation"
            },
            {
              text: "Chapter 4: Jim Jimmy Jim Jim Jim",
              url: "#jim-jimmy-jim-jim-jim"
            },
            {
              text: "Chapter 4: Warehouses",
              url: "#warehouses"
            },
            {
              text: "Chapter 4: Castle of the Queen",
              url: "#the-castle-of-the-queen"
            },
            {
              text: "Chapter 4: Frost Giants",
              url: "#the-frost-giants"
            },
            {
              text: "Chapter 4: The Dwarven Prospectors",
              url: "#the-dwarven-prospectors"
            },
            {
              text: "Chapter 4: The Queen's Army",
              url: "#the-queens-army"
            },
            {
              text: "Chapter 4: Silver Head",
              url: "#silver-head"
            },
            {
              text: "Chapter 4: A Last Stand",
              url: "#a-last-stand"
            }
          ]
        },
        {
          text: "Chapter 5: Counter Intelligence",
          url: "#chapter5",
          file: "chapter5.md",
          children: []
        },
        {
          text: "Chapter 6: Parakas",
          url: "#chapter6",
          file: "chapter6.md",
          children: []
        },
        {
          text: "Chapter 7: Evidence",
          url: "#chapter7",
          file: "chapter7.md",
          children: []
        },
        {
          text: "Chapter 8: Empire",
          url: "#chapter8",
          file: "chapter8.md",
          children: []
        },
        {
          text: "Chapter 9: Moon Pass",
          url: "#chapter9",
          file: "chapter9.md",
          children: []
        },
        {
          text: "Chapter 10: Halls of the Underking",
          url: "#chapter10",
          file: "chapter10.md",
          children: []
        },
        {
          text: "Chapter 11: Defense of Cur'Estan",
          url: "#chapter11",
          file: "chapter11.md",
          children: []
        },
        {
          text: "Chapter 12: Feint",
          url: "#chapter12",
          file: "chapter12.md",
          children: []
        },
        {
          text: "Chapter 13: Infiltration",
          url: "#chapter13",
          file: "chapter13.md",
          children: []
        },
        {
          text: "Chapter 14: Assassination Attempt",
          url: "#chapter14",
          file: "chapter14.md",
          children: []
        },
        {
          text: "Appendix A: Index of Character Entries",
          url: "#characterindex",
          file: "appendixa.md",
          children: []
        }
      ];
    $scope.currentnav = false;
    $scope.content = "";
    $scope.switchChapter = function(nav) {
      $scope.currentnav = nav;
      $http.get('/html/content/campaigns/book4/' + nav.file).then(function(response) {
        $scope.content = response.data;
      });
    }
  }]);
})(angular, jQuery);