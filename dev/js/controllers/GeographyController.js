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