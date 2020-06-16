<template>
  <div>
    <div>
      <h2>Search and add a pin</h2>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="findBar()" >Add</button>
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
        @click="sayHello()"
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

      axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
        params: {
          location: '29.9630486,-90.0438412',
          radius: '1500',
          type: 'bar',
          keyword: 'bars',
          key: 'AIzaSyD028aZa3qI77oP8kUQKV2kHk4uBiW0mOs'
        }
      }).then(response => response.data.results)
        .then(bars =>  bars.forEach(bar => console.log(bar)))
        .catch(error => console.log(error))
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
          name: this.currentPlace.name
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        //this.items[0].message++;
        this.center = marker;
        this.currentPlace = null;
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
    sayHello: function() {
      console.log('hello');
    },
  }
};
</script>