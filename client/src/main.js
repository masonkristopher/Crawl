import Vue from "vue";
import VueRouter from "vue-router";
import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css";

import App from "./App.vue";
import Dash from "./components/DashBoard/UserDash.vue";
import Create from "./components/Create/CreateCrawl.vue";
import JoinedCrawl from "./components/JoinedCrawl.vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueRouter);


// 1. Define route components.
// These can be imported from other files, above, or created in ``const Foo = { template: '<div>foo</div>' }`` syntax

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
const routes = [
  { path: '/home', component: Dash },
  { path: '/create', component: Create },
  { path: '/crawl/joined/:userId/:crawlName/:crawlId', component: JoinedCrawl }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here
const router = new VueRouter({
  routes
})


Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAP_KEY,
    libraries: "places", // necessary for places input
  },
});

Vue.use(Vuesax, {
  theme: {
    colors: {
      primary: "rgba(66, 66, 66, 0.144)",
    },
  },
});

Vue.config.productionTip = false;
//creating a reactive componenet and adding it to prototype to be globally accessible
const store = Vue.observable({ createdCrawls: [],});
Vue.prototype.$store = store;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

