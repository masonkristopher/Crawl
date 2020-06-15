import Vue from 'vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import axios from 'axios';

import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD028aZa3qI77oP8kUQKV2kHk4uBiW0mOs',
    libraries: "places", // necessary for places input
  }
});

Vue.use(Vuesax, {
  theme: {
    colors: {
      primary: 'rgba(66, 66, 66, 0.144)',
    }
  }
})

Vue.config.productionTip = false

new Vue({
  created: function () {
    // create an axios get reques to grab the user information and check if they are logged in
    axios.get('/api/auth/google/login')
      .then(function (response) {
        if (response.data.redirect == '/') {
          alert(`welcome ${response.data.user}`)
        } else if (response.data.redirect == '/login') {
          window.location.href = 'api/auth/google';
        }
      })
      .catch(function (error) {
        alert(error);
        window.location = "/login"
      })
  },
  render: h => h(App),

}).$mount('#app')