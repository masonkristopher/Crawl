<template>
  <div>
    <div>
      <h2>Search for bars</h2>
      <label>
        <input value="" type="text" v-model="currentPlace" @input="$emit('update:currentPlace', currentPlace)" placeholder="Enter a ZIP code">
        <button @click="findBar">Search</button>
        <!-- <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete> -->
      </label>
      <br/>

    </div>
    <br>
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 400px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="addBarToCrawl(m)"
      ></gmap-marker>

    </gmap-map>
  <ul>
    <li v-for="bar in places" :key="bar.name"> {{ bar.name }}</li>  
  </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "GoogleMap",
  data() {
    return {
      // defaulted to New Orleans
      center: { lat: 29.9630486, lng: -90.0438412 },
      markers: [],
      places: [],
      currentPlace: null,
    };
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    findBar() {
      // takes in the name of the city
      // get request a latlong api
 
      axios.get(`${process.env.VUE_APP_MY_IP}/api/map/${this.currentPlace}`)
        .then(bars =>  {
          // empty the markers and places and update before each search
          this.markers = [];
          this.places = [];
          this.$emit('update:places', this.places);
          this.$emit('update:markers', this.markers)
          bars.data.forEach(bar => {
          this.addMarker(bar)
        })
        })
        .catch(error => console.log(error))
    },
    addMarker(bar) {
      if (bar) {
        const marker = {
          lat: bar.geometry.location.lat,
          lng: bar.geometry.location.lng,
          name: bar.name
        };
        this.markers.push({ position: marker });
        this.places.push(bar);
        this.center = marker;
        // this.currentPlace = null;
        this.$emit('update:places', this.places);
        this.$emit('update:markers', this.markers)
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    addBarToCrawl: function(m) {
      console.log(m);
      
    },
  }
};
</script>