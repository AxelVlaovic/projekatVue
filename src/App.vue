<template>
  <div id="app">
    <div>
  <b-navbar toggleable="sm" type="light" variant="success">
    <b-navbar-brand to="/">Home</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/activities">Activities</b-nav-item>
        <b-nav-item to="/suggestions">Suggestions</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

          <b-navbar-nav class="ml-auto navbar_right">
            <b-nav-item v-if="!token" to="/register">Register</b-nav-item>
            <b-nav-item v-if="!token" to="/login">Log In</b-nav-item>
            <b-nav-item v-else @click="logout()">Log Out</b-nav-item>
          </b-navbar-nav>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</div>

<router-view />

  </div>
</template>

<script>

import { mapActions,mapState,mapMutations } from 'vuex';

export default{

  name: 'App',
  computed:{
    ...mapState([
      'token'
    ])
  },
  methods:{
    ...mapMutations([
      'removeToken','setToken',
    ]),

    ...mapActions([
        'fetchActivities','fetchUserRelations','fetchRelations'
    ]),

    logout(){
      this.removeToken()
    }

  },mounted(){

    this.fetchActivities();

    if(localStorage.token){
      this.setToken(localStorage.token)
    }

  },

    sockets: {
      error(err) {
        alert(err);
      }
    }

}


</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

</style>
