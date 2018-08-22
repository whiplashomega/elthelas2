import { mapGetters } from 'vuex';
import L from 'leaflet';
import 'leaflet-measure';
import $ from 'jquery';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

function round(number, precision) {
  var shift = function (number, exponent) {
    var numArray = ("" + number).split("e");
    return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + exponent) : exponent));
  };
  return shift(Math.round(shift(number, +precision)), -precision);
}

export default {
  computed: mapGetters({
    cities: 'allCities',
    nations: 'allNations',
    landmarks: 'allLandmarks',
    features: 'allFeatures',
    continents: 'allContinents'
  }),
  data () {
    return {
      markers: [],
      map: {},
      city: { exports: [], description: "" },
      nation: { history: "", citizenship: "", property: "", magic: "", slavery: "", economics: "", culture: "", worship: "", government: "" },
      landmark: { description: "" },
      feature: { description: "" },
      continent: { description: "" },
      otherSize: 0,
      warmap: false
    };
  },
  methods: {
    hideModal () {},
    showdetails (geoitem, type) {
      if (type === 'city') {
        this.city = geoitem;
      }
      if (type === 'nation') {
        this.nation = geoitem;
        this.otherSize = round(this.nation.populationDistribution.reduce((a, b) => {
          return a - b.proportion;
        }, 1), 3);
      }
      if (type === 'landmark') {
        this.landmark = geoitem;
      }
      if (type === 'feature') {
        this.feature = geoitem;
      }
      if (type === 'continent') {
        this.continent = geoitem;
      }
      this.$root.$emit('bv::show::modal', type + 'modal');
    },
    addmarker (city, type) {
      var marker = L.marker(city.coords, {
        alt: city.name,
        city: city
      }).bindTooltip(city.name, { permanent: true, interactive: true, direction: "auto", opacity: 0.75 });
      $(marker).click(() => {
        this.map.flyTo(city.coords, 4);
        this.showdetails(city, type);
      });
      marker.addTo(this.map);
      this.markers.push(marker);
    },
    clearmarkers () {
      for (var i = 0; i < this.markers.length; i++) {
        this.map.removeLayer(this.markers[i]);
      }
      this.markers = [];
    },
    showAll () {
      this.clearmarkers();
      for (var x = 0; x < this.cities.length; x++) {
        this.addmarker(this.cities[x], 'city');
      }
      for (x = 0; x < this.nations.length; x++) {
        this.addmarker(this.nations[x], 'nation');
      }
      for (x = 0; x < this.landmarks.length; x++) {
        this.addmarker(this.landmarks[x], 'landmark');
      }
      for (x = 0; x < this.continents.length; x++) {
        this.addmarker(this.continents[x], 'continent');
      }
      for (x = 0; x < this.features.length; x++) {
        this.addmarker(this.features[x], 'feature');
      }
    },
    showCities () {
      this.clearmarkers();
      for (var x = 0; x < this.cities.length; x++) {
        this.addmarker(this.cities[x], 'city');
      }
    },
    showNations () {
      this.clearmarkers();
      for (var x = 0; x < this.nations.length; x++) {
        this.addmarker(this.nations[x], 'nation');
      }
    },
    showLandmarks () {
      this.clearmarkers();
      for (var x = 0; x < this.landmarks.length; x++) {
        this.addmarker(this.landmarks[x], 'landmark');
      }
    },
    showFeatures () {
      this.clearmarkers();
      for (var x = 0; x < this.features.length; x++) {
        this.addmarker(this.features[x], 'feature');
      }
    },
    showContinents () {
      this.clearmarkers();
      for (var x = 0; x < this.continents.length; x++) {
        this.addmarker(this.continents[x], 'continent');
      }
    },
    showWarMap () {
      let alliancelatlong = [
        [46.49650154751426, 88.8134765625],
        [39.8401771327549, 98.83300781250001],
        [40.04233491818056, 108.32519531250001],
        [33.79512630103207, 113.33496093750001],
        [27.991976169784156, 114.56542968750001],
        [10.05269833241438, 120.98144531250001],
        [10.571522126852484, 125.28808593750001],
        [22.347535530432065, 131.87988281250003],
        [35.458432791026304, 134.42871093750003],
        [43.323179587489086, 132.23144531250003],
        [56.60637380984016, 135.04394531250003],
        [61.353296880736764, 128.27636718750003],
        [61.771823802324036, 109.29199218750001],
        [62.30751731037516, 82.30957031250001],
        [63.389061297647125, 77.43164062500001],
        [62.752211046333535, 60.38085937500001],
        [59.44228245633656, 51.06445312500001],
        [58.02991820107317, 50.8447265625],
        [53.902720016840476, 57.96386718750001],
        [48.10559716402152, 60.42480468750001],
        [42.291532494306, 66.13769531250001],
        [32.098863043145876, 72.37792968750001],
        [35.02774729487063, 76.86035156250001],
        [39.50192146626985, 76.33300781250001],
        [47.9880834535749, 71.76269531250001],
        [50.231394907552875, 78.96972656250001],
        [49.89286502817229, 87.05566406250001],
        [61.100125153823406, 88.00048828125001],
        [60.92909768981922, 105.60058593750001],
        [50.65207267042477, 99.33837890625001]
      ];
      let alliance2latlong = [
        [-20.470762381715563, 29.663085937500004],
        [-12.042006714207925, 35.72753906250001],
        [-6.318028445858987, 42.05566406250001],
        [3.99441055902031, 36.18896484375001],
        [12.467419240954229, 37.59521484375001],
        [22.186133381855317, 45.24169921875001],
        [25.124149253988623, 53.37158203125001],
        [27.48268975973484, 47.448558370182035],
        [35.41927241349596, 38.75214109716715],
        [38.98823513440445, 34.2650606727474],
        [42.96747732655269, 32.508208698400985],
        [37.67838604126121, 20.473772674127872],
        [27.638523614271946, 10.898929413939744],
        [3.023955250363652, 13.35395968117036],
        [-7.910312189871065, 15.5107320604667],
        [-17.441061444279285, 21.352871029258555]
      ];
      let maniusrebellionlatlong = [
        [46.49650154751426, 88.8134765625],
        [49.89286502817229, 87.05566406250001],
        [61.100125153823406, 88.00048828125001],
        [60.92909768981922, 105.60058593750001],
        [50.65207267042477, 99.33837890625001]
      ];
      let orcslatlong = [
        [32.098863043145876, 72.37792968750001],
        [35.02774729487063, 76.86035156250001],
        [39.50192146626985, 76.33300781250001],
        [47.9880834535749, 71.76269531250001],
        [50.231394907552875, 78.96972656250001],
        [49.89286502817229, 87.05566406250001],
        [46.49650154751426, 88.8134765625],
        [39.8401771327549, 98.83300781250001],
        [40.04233491818056, 108.32519531250001],
        [33.79512630103207, 113.33496093750001],
        [27.991976169784156, 114.56542968750001],
        [20.547937074489422, 111.92871093750001],
        [10.916920895841397, 103.31542968750001],
        [1.5790847267832018, 100.23925781250001],
        [-10.320323625412541, 102.39257812500001],
        [-17.31393222192294, 100.986328125],
        [-40.851215574282456, 80.59570312500001],
        [-42.10026033308264, 64.02832031250001],
        [-36.17557404062256, 46.5380859375],
        [-20.470762381715563, 29.663085937500004],
        [-12.042006714207925, 35.72753906250001],
        [-6.318028445858987, 42.05566406250001],
        [3.99441055902031, 36.18896484375001],
        [12.467419240954229, 37.59521484375001],
        [22.186133381855317, 45.24169921875001],
        [25.124149253988623, 53.37158203125001],
        [19.475655495911596, 66.29150390625001],
        [22.59245816401359, 71.82861328125001]
      ];
      if (this.warmap === false) {
        this.alliance = L.polygon(alliancelatlong, { color: 'blue' });
        this.alliance2 = L.polygon(alliance2latlong, { color: 'green' });
        this.orcs = L.polygon(orcslatlong, { color: 'red' });
        this.manius = L.polygon(maniusrebellionlatlong, { color: 'orange' });
        this.alliance.addTo(this.map);
        this.orcs.addTo(this.map);
        this.alliance2.addTo(this.map);
        this.manius.addTo(this.map);
        this.warmap = true;
      } else {
        this.warmap = false;
        this.map.removeLayer(this.alliance);
        this.map.removeLayer(this.alliance2);
        this.map.removeLayer(this.orcs);
        this.map.removeLayer(this.manius);
      }
    },
    start () {
      if (this.$route.params.name) {
        var type = this.$route.params.type;
        var location = this.$route.params.name;
        var item = {};
        if (type === "continent") {
          item = this.continents.filter(function(a) {
            return a.name.toLowerCase().replace(/ /g, '') === location.toLowerCase().replace(/ /g, '');
          })[0];
        }
        if (type === "city") {
          item = this.cities.filter(function(a) { return a.name.toLowerCase().replace(/ /g, '') === location.toLowerCase().replace(/ /g, ''); })[0];
        }
        if (type === "nation") {
          item = this.nations.filter(function(a) { return a.name.toLowerCase().replace(/ /g, '') === location.toLowerCase().replace(/ /g, ''); })[0];
        }
        if (type === "landmark") {
          item = this.landmarks.filter(function(a) { return a.name.toLowerCase().replace(/ /g, '') === location.toLowerCase().replace(/ /g, ''); })[0];
        }
        if (type === "feature") {
          item = this.features.filter(function(a) { return a.name.toLowerCase().replace(/ /g, '') === location.toLowerCase().replace(/ /g, ''); })[0];
        }
        this.showdetails(item, type);
      }
    }
  },
  created () {
    Promise.all([
      this.$store.dispatch('getAllCities'),
      this.$store.dispatch('getAllNations'),
      this.$store.dispatch('getAllContinents'),
      this.$store.dispatch('getAllFeatures'),
      this.$store.dispatch('getAllLandmarks')
    ]).then(() => {
      this.start();
    });
  },
  watch: {
    '$route' () {
      console.log('wtf mate');
      this.start();
    }
  },
  mounted () {
    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconAnchor: [13, 40]
    });
    L.Marker.prototype.options.icon = DefaultIcon;
    this.map = L.map('map', {}).setView([0, 0], 2);
    this.map.on('click', function(e) {
      alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
    });
    var measureControl = new L.Control.Measure({
      primaryLengthUnit: "miles",
      primaryAreaUnit: 'sqmiles'
    });
    measureControl.addTo(this.map);
    L.tileLayer('http://elthelas-maps.s3-website.us-east-2.amazonaws.com/maps/tiles/{z}/{y}/{x}.png', {
      attribution: 'map image created by Heather Domaszek',
      minZoom: 0,
      maxZoom: 5,
      tms: true,
      noWrap: false
    }).addTo(this.map);
    L.control.scale({ maxWidth: 300 }).addTo(this.map);
  }
};
