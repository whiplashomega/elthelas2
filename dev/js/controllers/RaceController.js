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