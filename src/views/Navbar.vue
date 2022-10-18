<template>


  <div class="nav-bar"
       style="background-color: white; box-shadow: 0 0 20px rgba(0, 0 ,0 ,0.5);height: 80px; width: 100%">
    <b-navbar toggleable="lg">
      <b-navbar-brand href="#">
        <router-link to="/home" class="nav-link">
          <img src="../assets/logo_vmg.png" width="50px">
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>

          <b-nav-item href="#" class="text-nav">
            <router-link to="/user" class="nav-link">
              <i class="el-icon-s-home"></i>
              Trang chủ
            </router-link>
          </b-nav-item>

          <b-nav-item v-if="showModeratorBoard" href="#" class="text-nav">
            <router-link to="/mod" class="nav-link">
              <i class="el-icon-folder-opened"></i>
              Quản Lý Công
            </router-link>
          </b-nav-item>

          <b-nav-item v-if="showAdminBoard" class="text-nav">
            <router-link to="/register" class="nav-link">
              <i class="el-icon-circle-plus"> Thêm Nhân Viên</i>
            </router-link>
          </b-nav-item>


        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav v-if="!loggedIn" class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->

            <template #button-content>
              <i class="el-icon-user-solid"></i>
              <em class="text-nav"> User</em>
            </template>
            <b-dropdown-item href="#" class="text-nav">Profile</b-dropdown-item>
            <b-dropdown-item @mouseup="logOut" class="text-nav">Sign Out</b-dropdown-item>


          </b-nav-item-dropdown>

        </b-navbar-nav>
        <b-navbar-nav v-if="loggedIn" class="ml-auto">
          <b-nav-item class="text-nav" right>
            <router-link to="/login" class="nav-link">
              <i class="el-icon-user-solid"> Login</i>
            </router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>

export default {
  name: "Nav-bar",
  data() {
    return {
      user: ''
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
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
  create() {
    this.user = localStorage.getItem("user")
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },


}
</script>

<style scoped>


</style>