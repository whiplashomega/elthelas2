import { mapGetters } from 'vuex';
import marked from 'marked';
import L from 'leaflet';
import M from 'leaflet-measure';
import $ from 'jquery';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

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
      otherSize: 0
    };
  },
  methods: {
    hideModal () {
      
    },
    showdetails (geoitem, type) {
      if (type === 'city') {
        this.city = geoitem;
      }
      if (type === 'nation') {
        this.nation = geoitem;
        this.otherSize = this.nation.populationDistribution.reduce((a, b) => {
          return a - b.proportion;
        }, 1);
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
      for(var i = 0; i < this.markers.length; i++) {
        this.map.removeLayer(this.markers[i]);
      }
      this.markers = [];
    },
    showAll () {
      this.clearmarkers();
      for (var x = 0; x < this.cities.length; x++) {
        this.addmarker(this.cities[x], 'city');
      }
      for (var x = 0; x < this.nations.length; x++) {
        this.addmarker(this.nations[x], 'nation');
      }
      for (var x = 0; x < this.landmarks.length; x++) {
        this.addmarker(this.landmarks[x], 'landmark');
      }
      for (var x = 0; x < this.continents.length; x++) {
        this.addmarker(this.continents[x], 'continent');
      }
      for (var x = 0; x < this.features.length; x++) {
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
    start () {
      if(this.$route.params.name) {
      var type = this.$route.params.type;
      var location = this.$route.params.name;
      var item = {};
      if(type === "continent") {
        item = this.continents.filter(function(a) {
          return a.name.toLowerCase().replace(/ /g,'') === location.toLowerCase().replace(/ /g,'');
        })[0];
      }
      if(type === "city") {
        item = this.cities.filter(function(a) {return a.name.toLowerCase().replace(/ /g,'') === location.toLowerCase().replace(/ /g,'');})[0];
      }
      if(type === "nation") {
        item = this.nations.filter(function(a) {return a.name.toLowerCase().replace(/ /g,'') === location.toLowerCase().replace(/ /g,'');})[0];
      }
      if(type === "landmark") {
        item = this.landmarks.filter(function(a) {return a.name.toLowerCase().replace(/ /g,'') === location.toLowerCase().replace(/ /g,'');})[0];
      }
      if(type === "feature") {
        item = this.features.filter(function(a) {return a.name.toLowerCase().replace(/ /g,'') === location.toLowerCase().replace(/ /g,'');})[0];
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
    '$route' (to, from) {
      console.log('wtf mate');
      this.start();
    }
  },
  mounted () {
    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconAnchor: [13,40]
    });
    
    L.Marker.prototype.options.icon = DefaultIcon;
    this.map =  L.map('map', {
      
    }).setView([0, 0], 2);
    
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