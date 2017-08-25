/* globals angular, jQuery, Random */
"use strict";

(function($, ng) {
  ng.module('elthelas').controller('QuickController', ['$scope', 'SpellProvider', 'ItemProvider', '$uibModal', function($scope, SpellProvider, ItemProvider, $uibModal) {
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
          
      modalInstance.result.then(function (selectedItem) {}, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };
    $scope.currentSpell = false;
    $scope.spells;
    $scope.magicItems = [];
    $scope.armor = [];
    
    function createDataTable(selector, data, columns, postInit) {
      $(selector + ' tfoot th').each(function() {
        var title = $(this).text();
        $(this).html( '<input type="text" class="form-control" style="min-width: 80px" placeholder="Search '+title+'" />' );
      });
          
      var table = $(selector).DataTable({
        responsive: true,
        paging: false,
        data: data,
        columns: columns,
        fixedHeader: {
          footer: true
        },
        initComplete: postInit
      });
      table.columns().every(function () {
        $('input', this.footer()).on('keyup change', function(a, b) {
          var index = this.parentNode.cellIndex;
          table.column(index).search(this.value).draw();
        });
      });
      
      return table;
    }
    
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
            $scope.spells[x].tags.join(", ")
          ];
          spellTableData.push(thisSpell);
        }
        createDataTable('#spelltable', spellTableData, [
              { title: "Title" },
              { title: "Level" },
              { title: "School" },
              { title: "Casting Time" },
              { title: "Duration" },
              { title: "Tags" }
            ], function() {
              var callback = function() {
                $scope.loadSpell(Number($(this).attr('data-spellid')));
              };
              for(var x = 0; x < $scope.spells.length; x++) {
                $(".spell" + x).click(callback);
              }
            });

        $('.datatable').DataTable();
        
        ItemProvider.getArmor().then(function(response) {
          $scope.armor = response.data;
          var armorData = [];
          for(var i = 0; i < $scope.armor.length; i++) {
            var thisArmor = [];
            thisArmor.push($scope.armor[i].Armor);
            thisArmor.push($scope.armor[i].Type);
            thisArmor.push($scope.armor[i].Material);
            thisArmor.push(Number($scope.armor[i].AC));
            thisArmor.push($scope.armor[i].Strength);
            thisArmor.push($scope.armor[i].Stealth);
            thisArmor.push(Number($scope.armor[i].Weight));
            thisArmor.push($scope.armor[i].Resistance);
            thisArmor.push(Number($scope.armor[i].Price));
            thisArmor.push(Number($scope.armor[i]["Time to Craft"]));
            armorData.push(thisArmor);
          }
          
          createDataTable("#armortable", armorData, [
            {title: "Armor"}, 
            {title: "Type"}, 
            {title: "Material"}, 
            {title: "AC"}, 
            {title: "Strength"}, 
            {title: "Stealth"}, 
            {title: "Weight"}, 
            {title: "Resistance"},
            {title: "Price"},
            {title: "Time to Craft"}
          ]);
          
          ItemProvider.getWeapons().then(function(response) {
            $scope.weapons = response.data;
            var weaponData = [];
            for(var k = 0; k < $scope.weapons.length; k++) {
              var thisWeapon = [];
              thisWeapon.push($scope.weapons[k].Name);
              thisWeapon.push($scope.weapons[k].Type);
              thisWeapon.push($scope.weapons[k].Damage);
              thisWeapon.push($scope.weapons[k].Weight);
              thisWeapon.push($scope.weapons[k].Properties);
              thisWeapon.push(Number($scope.weapons[k].Cost));
              weaponData.push(thisWeapon);
            }
            createDataTable("#weapontable", weaponData, [
              {title: "Name"},
              {title: "Type"},
              {title: "Damage"},
              {title: "Weight"},
              {title: "Properties"},
              {title: "Cost"},
            ]);
            
            ItemProvider.getMagicItems().then(function(data) {
              $scope.magicItems = data.data;
              $scope.magicItems = $scope.magicItems.filter(function(item) {
                if(["1st Level Scroll", "Cantrip Scroll", "2nd Level Scroll", "3rd Level Scroll", "4th Level Scroll", "5th Level Scroll", "6th Level Scroll", "7th Level Scroll", "8th Level Scroll", "+1 Armor", "+2 Armor", "Armor of Resistance", "Mariner's Armor", "Weapon +1", "Weapon +2", "Weapon +3", "Weapon of Returning", "Weapon of Returning +1", "Weapon of Elemental Damage", "Weapon of Elemental Damage +1", "Weapon of Sharpness", "Vicious Weapon", "Weapon of Life Stealing", "Weapon of Warning", "Weapon of Wounding"]
                  .indexOf(item.Item) !== -1) 
                {
                  return false;
                }
                return true;
              });
              
              for (var l = 0; l < $scope.weapons.length; l++) {
                $scope.magicItems.push({
                  Item: $scope.weapons[l].Name + " of Wounding",
                  Type: "Weapon (" + $scope.weapons[l].Name + ")",
                  Attunement: "Yes",
                  Rarity: "Rare",
                  Effect: "Hit points lost to this weapon's damage can be regained only through a short or long rest, rather than by regeneration, magic, or any other means. Once per turn, when you hit a creature with an attack using this magic weapon, you can wound the target. At the start of each of the wounded creature's turns, it takes 1d4 necrotic damage for each time you've wounded it, and it can then make a DC 15 Constitution saving throw, ending the effect of all such wounds on itself on a success. Alternatively, the wounded creature, or a creature within 5 feet of it, can use an action to make a DC 15 Wisdom (Medicine) check, ending the effect of such wounds on it on a success.",
                  "Cost (gp)": 8000
                });
                $scope.magicItems.push({
                  Item: $scope.weapons[l].Name + " of Speed",
                  Type: "Weapon (" + $scope.weapons[l].Name + ")",
                  Attunement: "Yes",
                  Rarity: "Very Rare",
                  Effect: "You gain a +2 bonus to attack and damage rolls made with this magic weapon. In addition, you can make one attack with it as a bonus action on each of your turns.",
                  "Cost (gp)": 21000
                });
                $scope.magicItems.push({
                  Item: $scope.weapons[l].Name + " of Life Stealing",
                  Type: "Weapon (" + $scope.weapons[l].Name + ")",
                  Attunement: "Yes",
                  Rarity: "Rare",
                  Effect: "When you attack a creature with this magic weapon and roll a 20 on the attack roll, that target takes an extra 10 necrotic damage if it isn't a construct or an undead. You also gain 10 temporary hit points.",
                  "Cost (gp)": 5000
                });
                $scope.magicItems.push({
                  Item: "Vicious " + $scope.weapons[l].Name,
                  Type: "Weapon (" + $scope.weapons[l].Name + ")",
                  Attunement: "Yes",
                  Rarity: "Rare",
                  Effect: "When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon's type.",
                  "Cost (gp)": 5000
                });
                $scope.magicItems.push({
                  Item: "+1 " + $scope.weapons[l].Name,
                  Type: "Weapon (" + $scope.weapons[l].Name + ")",
                  Attunement: "No",
                  Rarity: "Uncommon",
                  Effect: "You have a +1 bonus to attack and damage rolls made with this " + $scope.weapons[l].Name + ".",
                  "Cost (gp)": 3000
                });
                $scope.magicItems.push({
                  Item: "+2 " + $scope.weapons[l].Name,
                  Type: "Weapon (" + $scope.weapons[l].Name + ")",
                  Attunement: "No",
                  Rarity: "Rare",
                  Effect: "You have a +2 bonus to attack and damage rolls made with this " + $scope.weapons[l].Name + ".",
                  "Cost (gp)": 8000
                });
                $scope.magicItems.push({
                  Item: "+3 " + $scope.weapons[l].Name,
                  Type: "Weapon (" + $scope.weapons[l].Name + ")",
                  Attunement: "No",
                  Rarity: "Very Rare",
                  Effect: "You have a +3 bonus to attack and damage rolls made with this " + $scope.weapons[l].Name + ".",
                  "Cost (gp)": 14000
                });
                $scope.magicItems.push({
                  Item: $scope.weapons[l].Name + " of Warning",
                  Type: "Weapon (" + $scope.weapons[l].Name + ")",
                  Attunement: "Yes",
                  Rarity: "Uncommon",
                  Effect: "This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can't be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.",
                  "Cost (gp)": 3000
                });
                var dmgArray = ["fire", "acid", "cold", "lightning"];
                dmgArray.forEach(function(dmg) {
                  $scope.magicItems.push({
                    Item: $scope.weapons[l].Name + " of " + dmg,
                    Type: "Weapon (" + $scope.weapons[l].Name + ")",
                    Attunement: "No",
                    Rarity: "Uncommon",
                    Effect: "Whenever an attack with this " + $scope.weapons[l].Name + " hits it does an additional 1d6 " + dmg + " damage in addition to its normal effects.",
                    "Cost (gp)": 4000
                  });  
                  $scope.magicItems.push({
                    Item: "+1 " + $scope.weapons[l].Name + " of " + dmg,
                    Type: "Weapon (" + $scope.weapons[l].Name + ")",
                    Attunement: "Yes",
                    Rarity: "Rare",
                    Effect: "You gain +1 to attack and damage rolls with this " + $scope.weapons[l].Name + ". Whenever an attack with this " + $scope.weapons[l].Name + " hits it does an additional 1d6 " + dmg + " damage in addition to its normal effects.",
                    "Cost (gp)": 9000
                  }); 
                });
                if(/thrown/.test($scope.weapons[l].Properties)) {
                  $scope.magicItems.push({
                    Item: $scope.weapons[l].Name + " of Returning",
                    Type: "Weapon (" + $scope.weapons[l].Name + ")",
                    Attunement: "Yes",
                    Rarity: "Uncommon",
                    Effect: "This " + $scope.weapons[l].Name + " instantly returns to the wielders hand after an attack is made with it, regardless of whether the attack hits or misses. If the owner does not have a hand free it instead falls to the ground at his/her feat.",
                    "Cost (gp)": 1500
                  });
                  $scope.magicItems.push({
                    Item: "+1 " + $scope.weapons[l].Name + " of Returning",
                    Type: "Weapon (" + $scope.weapons[l].Name + ")",
                    Attunement: "Yes",
                    Rarity: "Rare",
                    Effect: "You gain +1 to attack and damage rolls while wielding this " + $scope.weapons[l].Name + ". This " + $scope.weapons[l].Name + " instantly returns to the wielders hand after an attack is made with it, regardless of whether the attack hits or misses. If the owner does not have a hand free it instead falls to the ground at his/her feat.",
                    "Cost (gp)": 7000
                  });
                }
                if(/slashing/.test($scope.weapons[l].Damage)) {
                  $scope.magicItems.push({
                    Item: $scope.weapons[l].Name + " of Sharpness",
                    Type: "Weapon (" + $scope.weapons[l].Name + ")",
                    Attunement: "Yes",
                    Rarity: "Very Rare",
                    Effect: "When you attack an object with this magic weapon and hit, maximize your weapon damage dice against the target. When you attack a creature with this weapon and roll a 20 on the attack roll, that target takes an extra 14 slashing damage. Then roll another d20. If you roll a 20 you lop off one of the target's limbs, with the effect of such loss determined by the DM. If the creature has no limb to sever, you lop off a portion of its body instead. In addition, you can speak the weapon's command word to cause the blade to shed bright light in a 10-foot radius and dim light for an additional 10 feet. Speaking the command word again or sheathing the sword puts out the light.",
                    "Cost (gp)": 9000
                  });                  
                }
              }
              
              for (var z = 0; z < $scope.armor.length; z++) {
                var resistArray = ["fire", "cold", "acid", "poison", "bludgeoning", "piercing", "slashing", "force", "lightning", "thunder", "radiant", "necrotic"];
                $scope.magicItems.push({
                  Item: "+1 " + $scope.armor[z].Material + " " + $scope.armor[z].Armor,
                  Type: "Armor (" + $scope.armor[z].Armor + ")",
                  Attunement: "No",
                  Effect: "You have a +1 bonus to AC while wearing this armor." + $scope.armor[z].Resistance,
                  Rarity: "Rare",
                  "Cost (gp)": Number($scope.armor[z].Price) + 4000
                });
                $scope.magicItems.push({
                  Item: "+2 " + $scope.armor[z].Material + " " + $scope.armor[z].Armor,
                  Type: "Armor (" + $scope.armor[z].Armor + ")",
                  Attunement: "No",
                  Effect: "You have a +2 bonus to AC while wearing this armor. " + $scope.armor[z].Resistance,
                  Rarity: "Very Rare",
                  "Cost (gp)": Number($scope.armor[z].Price) + 16000
                });
                resistArray.forEach(function(resist) {
                  $scope.magicItems.push({
                    Item: $scope.armor[z].Material + " " + $scope.armor[z].Armor + " of " + resist + " Resistance",
                    Type: "Armor (" + $scope.armor[z].Armor + ")",
                    Attunement: "Yes",
                    Effect: "You have resistance to "+ resist +" damage while you wear this armor. " + $scope.armor[z].Resistance,
                    Rarity: "Rare",
                    "Cost (gp)": Number($scope.armor[z].Price) + 8000
                  });                
                });
                $scope.magicItems.push({
                    Item: "Mariner's " + $scope.armor[z].Material + " " + $scope.armor[z].Armor,
                    Type: "Armor (" + $scope.armor[z].Armor + ")",
                    Attunement: "No",
                    Effect: "While wearing this armor, you have a swimming speed equal to your walking speed. In addition, whenever you start your turn underwater with 0 hit points, the armor causes you to rise 60 feet toward the surface. The armor is decorated with fish and shell motifs. " + $scope.armor[z].Resistance,
                    Rarity: "Uncommon",
                    "Cost (gp)": Number($scope.armor[z].Price) + 2000                
                });
              }
              
              for (var y = 0; y < $scope.spells.length; y++) {
                var levelnum;
                if($scope.spells[y].level === "cantrip") {
                  levelnum = 0;
                } else {
                  levelnum = Number($scope.spells[y].level);
                }
                var item = {
                  Item: "Scroll of " + $scope.spells[y].title,
                  Type: "Single Use (scroll)",
                  Attunement: "No",
                  Effect: "This scroll bears the spell " + $scope.spells[y].title + ", written in a mystical cipher. If it is on your class's spell list you can use an action to read the scroll and cast it without having to provide any of the spell's components. If the spell is on your class's spell list but of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC is " + (10 + levelnum) + ". On a failed check, the spell disappears from the scroll with no other effect. Once the spell is cast the scroll crumbles to dust. The attack bonus is " + (Math.floor(Math.abs(levelnum - 1)/2) * 2 + 5)  + " and the save DC is " + (Math.floor(Math.abs(levelnum - 1)/2) * 2 + 13) + "."
                };
                if(["cantrip", "1"].indexOf($scope.spells[y].level) !== -1) {
                  item.Rarity = "Common";
                } else if(["2", "3"].indexOf($scope.spells[y].level) !== -1) {
                  item.Rarity = "Uncommon";
                } else if(["4", "5"].indexOf($scope.spells[y].level) !== -1) {
                  item.Rarity = "Rare";
                } else {
                  item.Rarity = "Very Rare";
                }
                if($scope.spells[y].level === "cantrip") {
                  item["Cost (gp)"] = 25;
                } else {
                  item["Cost (gp)"] = 50 * Math.pow(2, ($scope.spells[y].level - 1));
                }
                
                if($scope.spells[y].level !== "9") {
                  $scope.magicItems.push(item);
                }
              }
              $scope.setMagicItemStock();
            });            
          });
          
        });

      });
    };
    
    $scope.setMagicItemStock = function() {
      var magicItemTableData = [];
      var today = new Date();
      var randgen = Math.seedrandom(today.getYear() + today.getMonth() + today.getDate());
      for (var x = 0; x < $scope.magicItems.length; x++) {
        var rand = Math.random();
        var thisItem = [];
        thisItem.push($scope.magicItems[x].Item);
        thisItem.push($scope.magicItems[x].Type);
        thisItem.push(Number($scope.magicItems[x]["Cost (gp)"]));
        thisItem.push($scope.magicItems[x].Rarity);
        thisItem.push($scope.magicItems[x].Attunement);
        thisItem.push($scope.magicItems[x].Effect);
        var inStock = function() {
          if($scope.magicItems[x].Rarity === "Common") {
            return "In Stock";
          } else if($scope.magicItems[x].Rarity === "Uncommon") {
            if(rand > 0.85) {
              return "In Stock";
            }
          } else if($scope.magicItems[x].Rarity === "Rare") {
            if(rand > 0.95) {
              return "In Stock";
            }
          } else if($scope.magicItems[x].Rarity === "Very Rare") {
            if(rand > 0.99) {
              return "In Stock";
            }
          }
          return "Out of Stock";
        };
        thisItem.push(inStock());
        magicItemTableData.push(thisItem);
      }
      
      createDataTable('#magictable', magicItemTableData, [
          { title: "Item" }, 
          { title: "Type" }, 
          { title: "Cost (gp)" }, 
          { title: "Rarity" }, 
          { title: "Attunement" },
          { title: "Effect" },
          { title: "Random Stock" }
          ]);
    };
    
    this.init();
  }]);
})(jQuery, angular);