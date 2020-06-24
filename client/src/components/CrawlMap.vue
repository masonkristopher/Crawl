<template>
  <div>
    <table>
      <tr>
        <th>Bar Number</th>
        <th>Bar Name</th>
      </tr>
      <tr
        v-for="(m, index) in markers"
        id="bar"
        :key="index"
      >
        <td>{{ index + 1 }}</td>
        <td>{{ m.position.name }}</td>
      </tr>
    </table>
    <div>
      <button v-on:click="join">
        Join
      </button>
    </div>
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 400px;"
    >
      <gmap-marker
        v-for="(m, index) in markers"
        :key="index"
        :options="{styles: styles}"
        :position="m.position"
         v-bind:icon="'http://maps.google.com/mapfiles/kml/paddle/' + (index + 1) + '-lv.png'"
        @click="toggleInfoWindow(m,index)"
      />
      <div v-if="this.showLocation">
        <gmap-marker
          v-for="(user, index) in users"
          :key="index"
          :position="user"
        />
      </div>
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
        <div v-html="infoContent" />
      </gmap-info-window>
    </gmap-map>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CrawlMap',
  props: ['crawlId', 'userId'],
  data() {
    return {
      // defaulted to New Orleans
      center: { lat: 29.9630486, lng: -90.0438412 },
      showLocation: false,
      users: [],
      crawlSpots: [],
      markers: [],
      selected: [],
      places: [],
      currentPlace: null,
      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0,
      },
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }],
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }],
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{ color: '#263c3f' }],
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#6b9a76' }],
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#38414e' }],
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#212a37' }],
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#9ca5b3' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{ olor: '#746855' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#1f2835' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#f3d19c' }],
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{ color: '#2f3948' }],
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#17263c' }],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#515c6d' }],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#17263c' }],
        },
      ],
    };
  },

  mounted() {
    this.geolocate();
    axios.get(`/api/location/all/${this.crawlId}`)
      .then((res) => {
        this.crawlSpots = res.data;
        // this.$emit('update:crawlSpots', this.crawlSpots);
      }).then(() => {
        this.crawlSpots.forEach(bar => {
          this.addMarker(bar);
        });
        // retrieve all users who are in the specific crawl
        return axios.get(`/api/user/crawlId/${this.crawlId}`);
      })
      .then((res) => {
        const users = res.data;
        // console.log(users, 'after api/crawlId/crawlid');
        // use the ids to retrieve the user object and push its info into our state
        const ids = [];
        users.forEach((user) => {
          const { Id, Lat, Lng } = user;
          ids.push({ id: Id, lat: Lat, lng: Lng });
        });
        this.users = ids;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  created() {
    axios.get(`/api/location/all/${this.crawlId}`)
      .then((res) => {
        this.crawlSpots = res.data;
        this.$emit('update:crawlSpots', this.crawlSpots);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    toggleInfoWindow(marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoContent = this.getInfoWindowContent(marker);
      // check if its the same marker that was selected if yes toggle
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen;
      // if different marker set infowindow to open and reset current marker index
      } else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    getInfoWindowContent(marker) {
      return `
        <div class="card">
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
            </div>
          </div>
          </div>
        </div>
      `;
    },
    addMarker(bar) {
      if (bar) {
        const marker = {
          lat: bar.Lat,
          lng: bar.Lng,
          name: bar.Name,
          address: bar.Address,
          // some bars don't have photos
          // photo: bar.photos[0],
        };
        this.markers.push({ position: marker });
        this.places.push(bar);
        this.center = marker;
        // emit to update parent's places and markers
        this.$emit('update:places', this.places);
        this.$emit('update:markers', this.markers);
      }
    },

    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
    join() {
      // add user to user_crawl table.
      axios.post(`/api/crawl/join/${this.crawlId}/${this.$store.appUser.id}`);
      // update the joined crawls array on the store, hopefully triggering renders elsewehere
      axios.get(`/api/crawl/joined/${this.$store.appUser.id}`)
        .then((response) => {
          response.data.forEach(joined => {
            axios.get(`/api/crawl/details/${joined.Id_Crawl}`)
              .then(res => {
                // hello Kris et al, hope Legacy is finding you well.
                // this function makes sure that the stuff we are adding
                // does not duplicate.
                if (res.data[0].Id_Creator !== this.$store.appUser.id) {
                  const joinedCrawlIds = [];
                  this.$store.joinedCrawls.forEach((crawl) => {
                    joinedCrawlIds.push(crawl.Id);
                  });
                  if (!joinedCrawlIds.includes(res.data[0].Id)) {
                    this.$store.joinedCrawls.push(res.data[0]);
                  }
                }
              });
          });
        });
      this.showLocation = true;
    },
  },
};
</script>
