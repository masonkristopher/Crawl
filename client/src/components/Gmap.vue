<template>
  <div>
    <gmap-map :center="center" :zoom="12" style="width:100%;  height: 400px;">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
         v-bind:icon="'http://maps.google.com/mapfiles/kml/paddle/' + (index + 1) + '-lv.png'"
        @click="toggleInfoWindow(m,index)"
      ></gmap-marker>

      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
        <div v-html="infoContent"></div>
      </gmap-info-window>
    </gmap-map>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "GoogleMap",
  props: ['crawlId', 'userId'],
  data() {
    return {
      // defaulted to New Orleans
      center: { lat: 29.9630486, lng: -90.0438412 },
      crawlSpots: [],
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
        axios.get(`${process.env.VUE_APP_MY_IP}/api/location/all/${this.crawlId}`)
        .then((res) => {
          console.log('locations', res.data);
          this.crawlSpots = res.data;
          console.log(this.crawlSpots);
          // this.$emit('update:crawlSpots', this.crawlSpots);
      }).then(() => {
        this.crawlSpots.forEach(bar => {
        this.addMarker(bar)
    })
      })
      .catch((error) => {
        console.log(error);
      })
  },
  created() {
    // change to accept any endpoint crawlId       ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
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
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img src=${marker.position.photo}>
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                   <div class="media-content">
                    <h3 class="barName">${marker.position.name}</h3>
                    <p class="address">${marker.position.address}</p>
                    <button onClick="${this.addBarToCrawl(marker)}">Add</button>
                  </div>
                </div>
                </div>
              </div>`;
    },
    addMarker(bar) {
      if (bar) {
        const marker = {
          lat: bar.Lat,
          lng: bar.Lng,
          name: bar.Name,
          address: bar.Address,
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
  }
};
</script>