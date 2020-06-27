<template lang="html">
  <div id="parentx">
    <vs-button
      id="view-profile"
      line-position="bottom"
      line-origin="right"
      color="#FFFAFA"
      type="line"
      @click="active=!active"
    >
      <b>View Profile</b>
    </vs-button>
    <vs-sidebar
      v-model="active"
      parent="body"
      default-index="1"
      color="primary"
      class="sidebarx"
      id="sidebar"
      spacer
    >
      <div
        slot="header"
        class="header-sidebar"
      >
        <vs-avatar
          v-if="this.user !== null"
          size="70px"
          :src="this.user.image"
        />
        <vs-avatar
          v-else-if="this.user === null"
          size="70px"
          src="https://cdn2.iconfinder.com/data/icons/people-groups/512/Man_Woman_Avatar-512.png"
        />
        <h4>
          <div v-if="this.user !== null">
            {{ this.user.name }}
          </div>
          <vs-button
            color="primary"
            type="flat"
          >
            ...
          </vs-button>
          <vs-sidebar-group
            v-if="this.user !== null"
            icon="person"
            title="User"
            id="sidebar-group"
          >
            <vs-sidebar-item
              v-if="this.user.phoneNumber === ''"
              :key="unfoundNumberKey"
              style="color:red;"
              index="1"
            >
              <div v-if="this.showNumberInput === false">
                Register Your Phone Number
                <span id="phone-edit-span">
                  <vs-icon
                    id="phone-edit"
                    icon="create"
                    @click="showInput"
                  />
                </span>
              </div>
              <span v-else-if="this.showNumberInput === true">
                <vs-input
                  v-model="userNumberChange"
                  icon-after="true"
                  icon="check"
                  placeholder=" - - - "
                  @icon-click="addNumber"
                />
              </span>
            </vs-sidebar-item>
            <vs-sidebar-item
              v-else-if="this.user.phoneNumber !== ''"
              :key="foundNumberKey"
              icon="call"
              index="1"
            >
              <div v-if="this.showNumberInput === false">
                {{ this.user.phoneNumber }}
                <span id="phone-edit-span">
                  <vs-icon
                    id="phone-edit"
                    icon="create"
                    @click="showInput"
                  />
                </span>
              </div>
              <span v-else-if="this.showNumberInput === true">
                <vs-input
                  v-model="userNumberChange"
                  placeholder=" - - - "
                  icon-after="true"
                  icon="check"
                  @icon-click="addNumber"
                />
              </span>
            </vs-sidebar-item>
            <vs-sidebar-item
              icon="email"
              index="1.2"
            >
              {{ this.user.email }}
            </vs-sidebar-item>
          </vs-sidebar-group>
        </h4>
      </div>
      <vs-divider position="left" icon="local_bar" />
      <vs-sidebar-group
        v-if="createdCrawls !== null"
        title="My Crawls"
        id="sidebar-group"
      >
        <vs-sidebar-item
          v-for="(crawl, index) in createdCrawls"
          :key="crawl.Title"
          :index="`${index + 1}.${index}`"
          @click="viewCrawl(crawl)"
        >
          {{ index + 1 }}. {{ crawl.Title.toUpperCase() }}<br />
          {{ moment(crawl.Crawl_Date).fromNow() }}<br />
          {{ moment(crawl.Crawl_Date).format('MM/DD/YYYY') }} at {{ moment(crawl.Crawl_Time, "HH:mm:ss").format('hh:mm A') }}<br />
        </vs-sidebar-item>
      </vs-sidebar-group>
      <vs-sidebar-group
        v-if="joinedCrawls !== null"
        title="Joined Crawls"
        icon="down"
        id="sidebar-group"
      >
        <vs-sidebar-item
          v-for="(crawl, index) in joinedCrawls"
          :key="crawl.Title"
          :index="`${index + 2}.${index}`"
          @click="viewCrawl(crawl)"
        >
          {{ index + 1 }}. {{ crawl.Title.toUpperCase() }}<br />
          {{ moment(crawl.Crawl_Date).fromNow() }}<br />
          {{ moment(crawl.Crawl_Date).format('MM/DD/YYYY') }} at {{ moment(crawl.Crawl_Time, "HH:mm:ss").format('hh:mm A') }}<br />
        </vs-sidebar-item>
      </vs-sidebar-group>
      <div
        slot="footer"
        class="footer-sidebar"
      >
        <vs-button
          icon="reply"
          class="log-button logout"
          color="danger"
          type="flat"
          @click="logout"
        >
          log out
        </vs-button>
        <!-- <vs-button
          icon="settings"
          color="primary"
          type="border"
        >
          settings
        </vs-button> -->
      </div>
    </vs-sidebar>
    <vs-popup
      id="popup-title"
      background-color="rgba(47,165,198,.6)"
      style="color:gray; font-family:Helvetica,Arial,sans-serif;"
      title="You are now logged out"
      :active.sync="popupActivo"
      button-close-hidden="true"
    >
      <div id="text">
        <p style="color:black; font-family:Helvetica,Arial,sans-serif; font-size:24px; padding:6px; text-align:center;">
          Log back in to keep crawling!
          <vs-button
            size="xl"
            icon="arrow_right_alt"
            class="log-button login"
            color="success"
            type="flat"
            @click="login"
          >
          SIGN IN
          </vs-button>
        </p>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import axios from 'axios';
import 'material-icons/iconfont/material-icons.css';

export default {
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  // in data, 'this' doesnt exist yet. we want createdCrawls to be equal to the global storage,
  // so we do it in computed instead
  // $store is reactive, so when it is updated, everything that it touches updates tooooo
  data: () => ({
    active: false,
    popupActivo: false,
    showNumberInput: false,
    unfoundNumberKey: 0,
    foundNumberKey: 1,
    userNumber: null,
    userNumberChange: '',
  }),
  computed: {
    createdCrawls() {
      return this.$store.createdCrawls;
    },
    joinedCrawls() {
      return this.$store.joinedCrawls;
    },
  },
  methods: {
    logout() {
      axios.get('/api/auth/google/logout')
        .then(() => {
          console.log('Successful logout');
          // trigger login popup
          this.popupActivo = true;
          // close sidebar
          this.active = false;
          this.user = null;
          this.$store.appUser = null;
          this.createdCrawls = null;
          this.joinedCrawls = null;
        })
        .catch((err) => {
          console.log('Error logging client out:', err);
        });
    },
    login() {
      // login will just route back to home to trigger login from App
      this.$router.push('/');
      // fyi linter is mad that 'location' appears to be undefined
      // but it is necessary to redirect
      location.reload();
    },
    showInput() {
      this.showNumberInput = true;
      this.foundNumberKey += 1;
      this.unfoundNumberKey += 1;
      console.log(this.showNumberInput);
    },
    addNumber() {
      axios.post('/api/user/contact', {
        number: this.userNumberChange,
        userId: this.user.id,
      })
        .then(() => {
          this.showNumberInput = false;
          this.foundNumberKey -= 1;
          this.unfoundNumberKey -= 1;
          this.user.phoneNumber = this.userNumberChange;
          this.$vs.notify({
            title: 'SAVED',
            text: 'YOUR NUMBER HAS BEEN ADDED',
            color: 'success',
            icon: 'check',
          });
        })
        .catch((err) => {
          this.$vs.notify({
            title: 'PLEASE TRY AGAIN',
            text: 'Your Number Was Not Added',
            color: 'danger',
            icon: 'error',
          });
          console.log('Error adding the phone number:', err);
        });
    },
    remove() {
      console.log('removed crawl');
    },
    viewCrawl(crawl) {
      // send important user id and crawl data for grabing location for next comp
      // this keeps adding things on to the endpoint. so will it just get longer and longer?
      this.$router.push(`/crawl/joined/${this.user.id}/${crawl.Title}/${crawl.Id}`);
      // fyi linter is mad that 'location' appears to be undefined
      // but it is necessary to redirect
      location.reload();
    },
  },
};
</script>

<style>
  @import '../assets/styles/sidebar.scss';
</style>
