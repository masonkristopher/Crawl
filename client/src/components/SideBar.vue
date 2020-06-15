<template lang="html">

  <div id="parentx">

    <vs-button @click="active=!active" line-position="bottom" line-origin="right" color="dark" type="line"><b>View Profile</b></vs-button>
    <vs-sidebar parent="body" default-index="1"  color="primary" class="sidebarx" spacer v-model="active">

      <div class="header-sidebar" slot="header">
        <vs-avatar  size="70px" src="https://ca.slack-edge.com/T02P3HQD6-URYEC04TS-1d8e4abade33-512"/>

        <h4>
          {{User.name}}
          <vs-button color="primary" type="flat">...</vs-button>

           <vs-sidebar-group title="User">
          <vs-sidebar-item index="1">
            {{User.phoneNumber}}
          </vs-sidebar-item>
          <vs-sidebar-item index="1.2">
            {{User.email}}
          </vs-sidebar-item>
        </vs-sidebar-group>
        </h4>

      </div>

      <vs-divider position="left">
        Crawls
      </vs-divider>

      <vs-sidebar-group title="My Crawls">

          <vs-sidebar-item v-for="crawl in CreatedCrawls" :key="crawl.name">
            {{ crawl.name }}
          </vs-sidebar-item>

      </vs-sidebar-group>


      <vs-sidebar-group title="Crawls I've Joined" icon="down">

        <vs-sidebar-item v-for="crawl in JoinedCrawls" :key="crawl.name">
            {{ crawl.name }}
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
        <vs-button color="danger" type="flat">log out</vs-button>
        <vs-button color="primary" type="border">settings</vs-button>
      </div>

    </vs-sidebar>
  </div>

</template>

<script>

export default {
  data:()=>({
    active:false,
    User: {name: "Jerry McDonald",
           phoneNumber: "555-555-5555",
           email: "jerryMcDonald@gmail.com",
           },
    CreatedCrawls: [{name: "Christmas Crawl 2k21"},],
    JoinedCrawls: [{name: "Naseer's 21st Birthday Bash"}, {name: "Mac's SuperBowl Crawl"}],
  })
}
</script>

<style>
</style>