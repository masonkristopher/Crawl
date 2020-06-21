<template>
  <div>
    <br />
    <div>
      <h2>Search for bars</h2>
      <label>
        <input 
          type="text" 
          v-on:keyup.enter="findBar" 
          v-model="currentPlace" 
          @input="$emit('update:currentPlace', currentPlace)" 
          placeholder="Enter a ZIP code or city"
          @focus="() => {this.currentPlace = ''}"
        >
        <button @click="findBar"> Search </button>
      </label>
      <br/>

    </div>
    <gmap-map :center="center" :zoom="12" style="width:100%;  height: 400px;">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        v-bind:icon="'http://maps.google.com/mapfiles/kml/paddle/' + index + '-lv.png'"
        @click="toggleInfoWindow(m,index)"
      ></gmap-marker>

      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
       
      >
        <div v-html="infoContent"></div>
        <button  @click="addBarToCrawl">  Add to Your Crawl  </button>
      </gmap-info-window>
    </gmap-map>
      <ul v-if="selected.length > 0">
        <h3>Bars in your crawl so far:</h3>
        <li v-for="(bar, index) in selected" :key="bar.name">{{ bar.name }} at {{ bar.address }} <button @click="removeBarFromCrawl(index)">Remove</button></li>
      </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "GoogleMap",
  data() {
    return {
      // defaulted to New Orleans
      center: { lat: 29.9630486, lng: -90.0438412 },
      markers: [],
      selected: [],
      places: [],
      currentPlace: null,
      infoContent: "",
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    };
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    toggleInfoWindow: function(marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoContent = this.getInfoWindowContent(marker);

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    
    getInfoWindowContent: function(marker) {
      return `<div class="card">
                <div class="card-content">
                  <div class="media">
                   <div class="media-content">
                    <h3 class="barName">${marker.position.name}</h3>
                    <p class="address">${marker.position.address}</p>
                  </div>
                </div>
                </div>
              </div>`;
    },

    findBar() {
      // takes in the name of the city or zip code

      axios.get(`${process.env.VUE_APP_MY_IP}/api/map/${this.currentPlace}`)
        .then(bars =>  {
          // empty the markers and places and update before each search
          this.markers = [];
          this.places = [];
          bars.data.forEach(bar => {
            this.addMarker(bar);
          });
        })
        .catch(error => console.log(error));
    },

    addMarker(bar) {
      if (bar) {
        const marker = {
          lat: bar.geometry.location.lat,
          lng: bar.geometry.location.lng,
          name: bar.name,
          address: bar.vicinity,
          //some bars don't have photos
          // photo: bar.photos[0],
          
        };
        this.markers.push({ position: marker });
        this.places.push(bar);
        this.center = marker;
        // emit to update parent's places and markers
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

    addBarToCrawl: function() {
      // pushes the location into state, unless it's already in there
      let names = [];
      this.selected.forEach((location) => {
        names.push(location.name)
      })
      if (!names.includes(this.infoWindowPos.name)) {
        this.selected.push(this.infoWindowPos);
        this.$emit('update:selected', this.selected);
      }
    },

    removeBarFromCrawl: function(index) {
      this.selected.splice(index, 1);
      this.$emit('update:selected', this.selected)
    },
  }
};
</script>