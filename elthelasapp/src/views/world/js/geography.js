/* globals navigator */
import '@/../node_modules/leaflet/dist/leaflet.css';
import '@/../node_modules/leaflet-measure/dist/leaflet-measure.css';
import { storeToRefs } from 'pinia';
import L from 'leaflet';
import 'leaflet-measure';
import { Decimal } from 'decimal.js';
import { useStaticsStore, useUserStore } from '@/stores/index';
import { marked } from '@/../node_modules/marked/lib/marked.esm.js';
import modal from '@/components/global/modal.vue';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

export default {
  setup () {
    const statics = useStaticsStore();
    const { nations, cities, landmarks, features, continents, territories } = storeToRefs(statics);
    const user = useUserStore();
    return {
      marked,
      nations,
      cities,
      landmarks,
      features,
      continents,
      territories,
      user
    };
  },
  components: {
    modal
  },
  data () {
    return {
      markers: [],
      map: {},
      city: { exports: [], description : "" },
      nation: { history: "", citizenship: "", property: "", magic: "", slavery: "", economics: "", culture: "", worship: "", government: "" },
      landmark: { description: "" },
      feature: { description: "" },
      continent: { description: "" },
      otherSize: 0,
      modalProps: {
        city: { isActive: false, title: "" },
        nation: { isActive: false, title: "" },
        landmark: { isActive: false, title: "" },
        feature: { isActive: false, title: "" },
        continent: { isActive: false, title: "" },
      },
      terrlayers: [],
      warmap: false,
      mouselat: 0,
      mouselong: 0,
      year: 1854,
      modalModel: false
    };
  },
  methods: {
    hideModal () {
      return true;
    },
    div (num) {
      return new Decimal(Number(num));
    },
    showdetails (geoitem, type) {
      if (type === 'nation') {
        this.nation = geoitem;
        this.otherSize = this.nation.populationDistribution.reduce((a, b) => {
          return a.sub(b.proportion);
        }, Decimal(1)).toFixed(2);
      } else {
        this[type] = geoitem;
      }
      //show the modal!!!
      this.modalProps[type].isActive = true;
      this.modalProps[type].title = geoitem.name
    },
    addmarker (city, type) {
      var marker = L.marker(city.coords, {
        alt: city.name,
        city: city
      }).bindTooltip(city.name, { permanent: true, interactive: true, direction: "auto", opacity: 0.75 });
      marker.on("click", () => {
        this.map.flyTo(city.coords, 4);
        this.showdetails(city, type);
      });
      marker.addTo(this.map);
      this.markers.push(marker);
    },
    addpolygon (nation) {
      let year = Number(this.year);
      let bordercoords = false;
      nation.bordercoords.sort((a, b) => {
        if (a.year > b.year) {
          return 1;
        } else {
          return -1;
        }
      });
      let prevyear = -5000;
      for (var x = 0; x < nation.bordercoords.length; x++) {
        if (nation.bordercoords[x].year <= year && nation.bordercoords[x].year > prevyear) {
          prevyear = nation.bordercoords[x].year;
          bordercoords = nation.bordercoords[x].borders;
        }
      }
      if (bordercoords && bordercoords.length > 0 && year >= nation.startyear && (!nation.endyear || year < nation.endyear)) {
        var terr = L.polygon(bordercoords, { color: nation.color });
        terr.addTo(this.map).bindTooltip(nation.name, { permanent: true, interactive: true, direction: "auto", opacity: 0.75, className: "nationlabel" });
        terr.on("click", () => {
          this.showdetails(nation, 'nation');
        });
        this.terrlayers.push(terr);
      }
    },
    clearmarkers () {
      this.terrlayers.forEach((t) => {
        this.map.removeLayer(t);
      });
      this.terrlayers = [];
      for (let i = 0; i < this.markers.length; i++) {
        this.map.removeLayer(this.markers[i]);
      }
      this.markers = [];
    },
    showAll () {
      this.clearmarkers();
      for (let x = 0; x < this.cities.length; x++) {
        this.addmarker(this.cities[x], 'city');
      }
      for (let x = 0; x < this.nations.length; x++) {
        this.addpolygon(this.nations[x]);
      }
      for (let x = 0; x < this.landmarks.length; x++) {
        this.addmarker(this.landmarks[x], 'landmark');
      }
      for (let x = 0; x < this.continents.length; x++) {
        this.addmarker(this.continents[x], 'continent');
      }
      for (let x = 0; x < this.features.length; x++) {
        this.addmarker(this.features[x], 'feature');
      }
    },
    showCities () {
      this.clearmarkers();
      for (let x = 0; x < this.nations.length; x++) {
        this.addpolygon(this.nations[x]);
      }
      for (var x = 0; x < this.cities.length; x++) {
        this.addmarker(this.cities[x], 'city');
      }
    },
    showNations () {
      this.clearmarkers();
      for (var x = 0; x < this.nations.length; x++) {
        // this.addmarker(this.nations[x], 'nation');
        this.addpolygon(this.nations[x]);
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
    }
  },
  mounted () {
   if (this.$route.params.name) {
      var type = this.$route.params.type;
      var location = this.$route.params.name;
      var item = {};
      var filteritems = function(a) {
        return a.name.toLowerCase().replace(/ /g, '') === location.toLowerCase().replace(/ /g, '');
      };
      if (type === "continent") {
        item = this.continents.filter(filteritems)[0];
      }
      if (type === "city") {
        item = this.cities.filter(filteritems)[0];
      }
      if (type === "nation") {
        item = this.nations.filter(filteritems)[0];
      }
      if (type === "landmark") {
        item = this.landmarks.filter(filteritems)[0];
      }
      if (type === "feature") {
        item = this.features.filter(filteritems)[0];
      }
      this.showdetails(item, type);
    }
    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconAnchor: [13, 40]
    });
    L.Marker.prototype.options.icon = DefaultIcon;
    this.map = L.map('map').setView([0, 0], 4);
    var thisvue = this;
    this.map.on('mousemove', function(e) {
      thisvue.mouselat = e.latlng.lat;
      thisvue.mouselong = e.latlng.lng;
    });
    this.map.on('click', function(e) {
      let val = "[" + e.latlng.lat + ", " + e.latlng.lng + "]";
      navigator.clipboard.writeText(val);
    });
    var measureControl = new L.Control.Measure({
      primaryLengthUnit: "miles",
      primaryAreaUnit: 'sqmiles'
    });
    measureControl.addTo(this.map);
    L.tileLayer('https://elthelas-images.herokuapp.com/maps/newmap/tiles/{z}/{y}/{x}.png', {
      attribution: 'map image created by Joseph Harrison',
      minZoom: 0,
      maxZoom: 5,
      tms: true,
      //noWrap: false,
      //tileSize: L.point(256, 256)
    }).addTo(this.map);

    L.control.scale({ maxWidth: 300 }).addTo(this.map);
  },
  onBeforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },
};