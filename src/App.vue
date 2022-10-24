<template>
  <div id="app">

<!--      <button @click="toggleSidebar"> <font-awesome-icon icon="home" /></button>-->
      <Sidebar />
    <div class="container">
      <router-view />  
    </div>
  </div>
</template>
<script>
import Sidebar from '@/components/sidebar/SidebarVue'
import { sidebarWidth } from '@/components/sidebar/state'
import { collapsed, toggleSidebar } from '@/components/sidebar/state'
export default {
  components:{Sidebar},
  setup() {
    return { sidebarWidth,collapsed, toggleSidebar }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }
      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }
      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
<style scoped>
#app {
  margin-top: 100px;

  font-family:'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
