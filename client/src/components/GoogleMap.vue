<template>
  <div>
    <br />
    <div>
      <label>
        <vs-icon icon="search"></vs-icon>
        <input
          id="location-search"
          type="text" 
          v-on:keyup.enter="findBar" 
          v-model="currentPlace" 
          @input="$emit('update:currentPlace', currentPlace)" 
          placeholder="Enter a ZIP code or city"
          @focus="() => {this.currentPlace = ''}"
        >
        <button id="location-search-button" @click="findBar">Search </button>
      </label>
      <br>
      <br>

    </div>
  
    <gmap-map :center="center" :zoom="12" :options="{styles: styles}" style="width:100%;  height: 400px; float:right;">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
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

    <ul id="bar-selected-list" v-if="selected.length > 0">
      <h3>Bars in your crawl so far:</h3>
      <li v-for="(bar, index) in selected" :key="bar.name">{{ bar.name }} at {{ bar.address }} <button @click="removeBarFromCrawl(index)">Remove</button></li>
    </ul>

  </div>
</template>

<script>
import axios from "axios";
import 'material-icons/iconfont/material-icons.css';
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
      },
      styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
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

<style>
@import '../assets/styles/map.scss';
</style>