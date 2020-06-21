<template lang="html">

  <div id="parentx">

    <vs-button id="view-profile" @click="active=!active" line-position="bottom" line-origin="right" color="#FFFAFA" type="line"><b>View Profile</b></vs-button>
    <vs-sidebar parent="body" default-index="1"  color="primary" class="sidebarx" spacer v-model="active">

      <div class="header-sidebar" slot="header">
        <vs-avatar v-if="this.user !== null" size="70px" :src="this.user.image"/>
        <vs-avatar v-else-if="this.user === null" size="70px" src="https://cdn2.iconfinder.com/data/icons/people-groups/512/Man_Woman_Avatar-512.png"/>
        <h4>
          <div v-if="this.user !== null">
            {{this.user.name}}
          </div>
          <vs-button color="primary" type="flat">...</vs-button>

          <vs-sidebar-group title="User" v-if="this.user !== null">
            <vs-sidebar-item index="1">
              {{User.phoneNumber}}
            </vs-sidebar-item>

            <vs-sidebar-item index="1.2">
              {{this.user.email}}
            </vs-sidebar-item>
          </vs-sidebar-group>
        </h4>

      </div>

      <vs-divider position="left">
        Crawls
      </vs-divider>

      <vs-sidebar-group title="My Crawls" v-if="createdCrawls !== null">

          <vs-sidebar-item v-for="(crawl, index) in createdCrawls" :key="crawl.Title" :index="`${index + 1}.${index}`" v-on:click="viewCrawl(crawl)">
            {{index + 1}}. {{crawl.Title}}
          </vs-sidebar-item>

      </vs-sidebar-group>


      <vs-sidebar-group title="Crawls I've Joined" icon="down" v-if="joinedCrawls !== null">

        <vs-sidebar-item v-for="(crawl, index) in joinedCrawls" :key="crawl.Title" :index="`${index + 2}.${index}`" v-on:click="viewCrawl(crawl)">
            {{index + 1}}. {{crawl.Title}}
        </vs-sidebar-item>

      </vs-sidebar-group>


      <vs-divider position="left">
        Other
      </vs-divider>

      <vs-sidebar-item index="5">
        Security
      </vs-sidebar-item>
      <vs-sidebar-item index="6">
        Help
      </vs-sidebar-item>



      <div class="footer-sidebar" slot="footer">
        <button color="danger" type="flat" @click="logout">log out</button>
        <vs-button color="primary" type="border">settings</vs-button>
      </div>

    </vs-sidebar>

    <vs-popup
      id="popup-title"
      style="color:rgb(255,255,275)"
      background-color="rgba(47,165,198,.6)"
      title="YOU ARE LOGGED OUT" :active.sync="popupActivo" button-close-hidden="true">
      <div id="text"> 
        <p style="color:black; font-size:24px; padding:6px; text-align:center;">
          Log In With Your Account<br> 
          or<br>
          Sign Up
          <br><br>
          To Start Crawling
        </p>
        <br>
        <br>
        <button class="login" @click="login">Log In</button>
      </div>
    </vs-popup>

  </div>

</template>

<script>
import axios from 'axios'

export default {
  props: ['user'],
  // in data, 'this' doesnt exist yet. we want createdCrawls to be equal to the global storage, so we do it in computed instead
  computed: {
      createdCrawls() {
        return this.$store.createdCrawls
      },
    },
  data:()=>({
    User:{image: "https://ca.slack-edge.com/T02P3HQD6-URYEC04TS-1d8e4abade33-512",
          name: "Jerry McDonald",
          phoneNumber: "555-555-5555",
          email: "jerryMcDonald@gmail.com",
        },
    active:false,
    popupActivo:false,
    joinedCrawls: [],
  }),
  watch: {
    // whenever createdCrawls changes, this function will get all the crawls a user has joined
    createdCrawls: function () {
      const { id } = this.user;
      axios.get(`${process.env.VUE_APP_MY_IP}/api/crawl/joined/${id}`)
        .then((response) => {
          response.data.forEach(joined => {
            axios.get(`${process.env.VUE_APP_MY_IP}/api/crawl/details/${joined.Id_Crawl}`)
              .then(response => {
                this.joinedCrawls.push(response.data[0]);
              })
          })
        })
    }
  },

  methods: {
    logout() {
      axios.get(`${process.env.VUE_APP_MY_IP}/api/auth/google/logout`)
        .then(() => {
          console.log("Successful logout")
          this.popupActivo = true;
          this.user = null;
          this.createdCrawls = null;
          this.joinedCrawls = null;
        })
        .catch((err) => {
        console.log('Error logging client out:', err);
        })
    },
    login() {
      axios.get(`${process.env.VUE_APP_MY_IP}/api/auth/google`)
      console.log('Log In Page')
    },
    viewCrawl(crawl) {
      // send important user id and crawl data for grabing location for next comp
      // this keeps adding things on to the endpoint. so will it just get longer and longer?
      this.$router.push(`/crawl/joined/${this.user.id}/${crawl.Title}/${crawl.Id}`);
      // this.$router = (`/crawl/joined/${this.user.id}/${crawl.Title}/${crawl.Id}`);
    }
  }
}
</script>

<style scoped>
  @import '../assets/styles/sidebar.scss';
</style>