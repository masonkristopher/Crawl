<template lang="html">

  <div id="parentx">

    <vs-button @click="active=!active" line-position="bottom" line-origin="right" color="dark" type="line"><b>View Profile</b></vs-button>
    <vs-sidebar parent="body" default-index="1"  color="primary" class="sidebarx" spacer v-model="active">

      <div class="header-sidebar" slot="header">
        <vs-avatar  size="70px" src="https://ca.slack-edge.com/T02P3HQD6-URYEC04TS-1d8e4abade33-512"/>

        <h4>
          My Name
          <vs-button color="primary" icon="more_horiz" type="flat"></vs-button>
        </h4>

      </div>
      <vs-sidebar-group title="Aplication">
        <vs-sidebar-item index="1" icon="question_answer">
          Dashboard
        </vs-sidebar-item>
        <vs-sidebar-group title="Store">
          <vs-sidebar-item index="2.1" icon="store">
            Store
          </vs-sidebar-item>
          <vs-sidebar-item index="2.2" icon="nature_people">
            Nature
          </vs-sidebar-item>
          <vs-sidebar-item index="2.3" icon="style">
            Style
          </vs-sidebar-item>
        </vs-sidebar-group>
        <vs-sidebar-item index="2" icon="gavel">
          History
        </vs-sidebar-item>
        <vs-sidebar-item index="3" icon="https">
          security
        </vs-sidebar-item>
        <vs-sidebar-item index="4" icon="help">
          Help
        </vs-sidebar-item>
      </vs-sidebar-group>


      <vs-divider icon="person" position="left">
        User
      </vs-divider>

      <vs-sidebar-item index="5" icon="verified_user">
        Configurations
      </vs-sidebar-item>
      <vs-sidebar-item index="6" icon="account_box">
        Profile
      </vs-sidebar-item>

      <div class="footer-sidebar" slot="footer">
        <vs-button icon="reply" color="danger" type="flat">log out</vs-button>
        <vs-button icon="settings" color="primary" type="border"></vs-button>
      </div>

    </vs-sidebar>
  </div>

</template>

<script>
export default {
  data:()=>({
    active:false,
  })
}
</script>

<style>
</style>