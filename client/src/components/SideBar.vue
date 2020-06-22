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

          <vs-sidebar-group icon="person" title="User" v-if="this.user !== null">

            <vs-sidebar-item style="color:red;" index="1" :key="unfoundNumberKey" v-if="this.user.phoneNumber === ''">
              <div v-if="this.showNumberInput === false">Register Your Phone Number <span id="phone-edit-span"><vs-icon id="phone-edit" icon="create" @click="showInput"></vs-icon></span></div>
              <span v-else-if="this.showNumberInput === true"><vs-input icon-after="true" icon="check" v-on:icon-click="addNumber" placeholder=" - - - "  v-model="userNumberChange"/></span>
            </vs-sidebar-item>
            <vs-sidebar-item icon="call" index="1" :key="foundNumberKey" v-else-if="this.user.phoneNumber !== ''">
              <div v-if="this.showNumberInput === false">{{this.user.phoneNumber}} <span id="phone-edit-span"><vs-icon id="phone-edit" icon="create" @click="showInput"></vs-icon></span></div>
              <span v-else-if="this.showNumberInput === true"><vs-input icon-after="true" icon="check" v-on:icon-click="addNumber" placeholder=" - - - " v-model="userNumberChange"/></span>
            </vs-sidebar-item>

            <vs-sidebar-item icon="email" index="1.2">
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
            {{index + 1}}. {{crawl.Title}} <button id="delete-crawl" style="float:right; color:red;" @click="remove">--</button>
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

      <vs-sidebar-item icon="https" index="5">
        Security
      </vs-sidebar-item>
      <vs-sidebar-item icon="help" index="6">
        Help
      </vs-sidebar-item>



      <div class="footer-sidebar" slot="footer">
        <vs-button icon="reply" class="log-button logout" color="danger" type="flat" @click="logout">log out</vs-button>
        <vs-button icon="settings" color="primary" type="border">settings</vs-button>
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
        <vs-button icon="arrow_right_alt" class="log-button login" color="success" type="flat" @click="login" style="float:right;">Log In</vs-button>
      </div>
    </vs-popup>

  </div>

</template>

<script>
import axios from 'axios';
import 'material-icons/iconfont/material-icons.css';

export default {
  props: ['user'],
  // in data, 'this' doesnt exist yet. we want createdCrawls to be equal to the global storage, so we do it in computed instead
  computed: {
      createdCrawls() {
        return this.$store.createdCrawls
      },
    },
  data:() => ({
    active:false,
    popupActivo:false,
    showNumberInput:false,
    unfoundNumberKey: 0,
    foundNumberKey: 1,
    userNumber: null,
    userNumberChange: "",
    joinedCrawls: [],
  }),
  watch: {
    // whenever createdCrawls changes, this function will get all the crawls a user has joined
    createdCrawls: function () {
      const { id} = this.user;
      axios.get(`${process.env.VUE_APP_MY_IP}/api/crawl/joined/${id}`)
        .then((response) => {
          response.data.forEach(joined => {
            axios.get(`/api/crawl/details/${joined.Id_Crawl}`)
              .then(response => {
                if (response.Id_Creator !== id) {
                  this.joinedCrawls.push(response.data[0]);
                }
              })
          })
        })
    },
    // showNumberInput: function () {
    //   this.$force
    // },

  },
  methods: {
    logout() {
      axios.get(`/api/auth/google/logout`)
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
      // axios.get(`${process.env.VUE_APP_MY_IP}/api/auth/google`)
      console.log('Log In Page')
    },
    showInput() {
      this.showNumberInput = true;
      this.foundNumberKey += 1;
      this.unfoundNumberKey += 1;
      console.log(this.showNumberInput);
    },
    addNumber() {
      axios.post(`${process.env.VUE_APP_MY_IP}/api/user/contact`, {
          number: this.userNumberChange,
          userId: this.user.id,
      })
        .then(() => {
          this.showNumberInput = false;
          this.foundNumberKey -= 1;
          this.unfoundNumberKey -= 1;

          this.user.phoneNumber = this.userNumberChange;
          this.$vs.notify({
            title:'SAVED',
            text: 'YOUR NUMBER HAS BEEN ADDED',
            color:'success',
            icon:'check'
          })
        })
        .catch((err) => {
          this.$vs.notify({
            title:'PLEASE TRY AGAIN',
            text: 'Your Number Was Not Added',
            color:'danger',
            icon:'error'
          })
          console.log('Error adding the phone number:', err)
        })
    },
    remove() {
      console.log('removed crawl');
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

<style>
  @import '../assets/styles/sidebar.scss';
</style>