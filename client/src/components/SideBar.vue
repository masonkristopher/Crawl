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

      <vs-sidebar-group title="My Crawls" v-if="CreatedCrawls !== null">

          <vs-sidebar-item v-for="(crawl, index) in CreatedCrawls" :key="crawl.name" :index="`${index + 1}.${index}`">
            {{index + 1}}. {{crawl.name}}
          </vs-sidebar-item>

      </vs-sidebar-group>


      <vs-sidebar-group title="Crawls I've Joined" icon="down" v-if="JoinedCrawls !== null">

        <vs-sidebar-item v-for="(crawl, index) in JoinedCrawls" :key="crawl.name" :index="`${index + 2}.${index}`">
            {{index + 1}}. {{crawl.name}}
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
  data:()=>({
    active:false,
    popupActivo:false,
    User: {image: "https://ca.slack-edge.com/T02P3HQD6-URYEC04TS-1d8e4abade33-512",
           name: "Jerry McDonald",
           phoneNumber: "555-555-5555",
           email: "jerryMcDonald@gmail.com",
           },
    CreatedCrawls: [{name: "Christmas Crawl 2k21"},],
    JoinedCrawls: [{name: "Naseer's 21st Birthday Bash"}, {name: "Mac's SuperBowl Crawl"}],
  }),
  methods: {
    logout() {
      axios.get(`${process.env.VUE_APP_MY_IP}/api/auth/google/logout`)
        .then(() => {
          console.log("Successful logout")
          this.popupActivo = true;
          this.user = null;
          this.CreatedCrawls = null;
          this.JoinedCrawls = null;
        })
        .catch((err) => {
        console.log('Error logging client out:', err);
        })
    },
    login() {
      axios.get(`${process.env.VUE_APP_MY_IP}/api/auth/google`)
      console.log('Log In Page')
    }
  }
}
</script>

<style>
  #view-profile {
    bottom: 0;
  }
  #text {
    align-content: center;
  }

  #popup-title {
    -webkit-text-stroke: .2px black;
  }

  .login {
    float:right;
    bottom: 4px;
  }

  .login:link, .login:visited {
    background-color: #f6372a;
    color: white;
    padding: 14px 25px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
  }

  .login:hover, .login:active {
    background-color: rgb(255, 27, 27);
    font-size: 18px;
  }
</style>