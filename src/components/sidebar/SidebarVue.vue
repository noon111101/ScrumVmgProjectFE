<script>
// import SidebarLink from './SidebarLink'
import {collapsed, toggleSidebar, sidebarWidth} from "./state";

export default {
  props: {},
  // components: { SidebarLink },
  setup() {
    return {collapsed, toggleSidebar, sidebarWidth};
  },
  computed: {
    currentUser() {
      // return JSON.parse(localStorage.getItem('user'));
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_ADMIN");
      }
      return false;
    },
    showModeratorBoard() {
      if (this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_MODERATOR");
      }
      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
        <!-- <div style="color:red">V</div>
        <div style="color:red">M</div>
        <div style="color:red">G</div> -->
      </span>
      <img
          src="../../assets/vmg_logo.png"
          style="width: 125px"
          v-else
      />
    </h1>
    <br/>
    <div class="text-start">
      <router-link to="/user" v-if="currentUser" class="nav-link sel">
        <font-awesome-icon icon="home"/>
        Home
      </router-link>


      <router-link v-if="!currentUser" to="/login" class="nav-link">
        <font-awesome-icon icon="sign-in-alt"/>
        Login
      </router-link>
      <br/>

      <div v-if="showAdminBoard">
        <router-link to="/admin" class="nav-link sel">
          <i class="el-icon-circle-plus-outline"> </i> Thêm Nhân Viên
        </router-link>
        <br/>
      </div>
      <div v-if="showAdminBoard">

        <router-link to="/timesheet" class="nav-link sel">
          <i class="el-icon-document-copy"> </i> Bảng Chấm Công
        </router-link>


        <br/>
      </div>

      <router-link v-if="showModeratorBoard" to="/mod" class="nav-link sel">
        Moderator Board
      </router-link>
      <!--      <br />-->
      <!--      <router-link v-if="currentUser" to="/user" class="nav-link"-->
      <!--        >User</router-link-->
      <!--      >-->
      <router-link v-if="currentUser" to="/profile" class="nav-link sel">
        <font-awesome-icon icon="user"/>
        {{ currentUser.username }}
      </router-link>
      <br/>
      <a v-if="currentUser" class="nav-link sel" href @click.prevent="logOut">
        <font-awesome-icon icon="sign-out-alt"/>
        LogOut
      </a>
    </div>
    <span
        class="collapse-icon"
        :class="{ 'rotate-180': collapsed }"
        @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left"/>
    </span>
  </div>
</template>
<style>
:root {
  --sidebar-bg-color: black;
  --sidebar-item-hover: #38a169;
  --sidebar-item-active: #276749;
}
</style>

<style scoped>
* {
  font-family: 'Montserrat', sans-serif;
}

.sidebar {
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
}

.sidebar h1 {
  height: 2.5em;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}

.nav-link {
  overflow: hidden;
}

.sel:hover {
  color: #e24146;
}
</style>
