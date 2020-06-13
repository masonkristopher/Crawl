import Vue from 'vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'

import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD028aZa3qI77oP8kUQKV2kHk4uBiW0mOs',
    libraries: "places", // necessary for places input
  }
});
 
Vue.use(Vuesax, {
  theme:{
    colors:{
      primary:'rgba(66, 66, 66, 0.144)',
    }
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  
}).$mount('#app')
