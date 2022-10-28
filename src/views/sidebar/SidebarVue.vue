<template>

  <nav class="navbar fixed-top">
    <div class="user-detail nav-item dropdown " v-if="currentUser">
      <a
          class="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
      >
        <font-awesome-icon icon="user" />
        {{ currentUser.user.fullName }}
      </a>
      <ul class="dropdown-menu">
        <li>
          <a class="dropdown-item">
            <router-link to="/profile" class="nav-link sel">
              <font-awesome-icon icon="user" />
              Thông tin cá nhân
            </router-link>
          </a>
        </li>
        <li>
          <a class="dropdown-item">
            <router-link to="/changepassword" class="nav-link">
              <i class="el-icon-refresh-left"></i>
              Thay đổi mật khẩu
            </router-link>
          </a>
        </li>
        <li>
          <hr class="dropdown-divider" />
        </li>
        <li>
          <a class="dropdown-item" href="#">
            <a class="nav-link sel" href @click.prevent="logOut">
              <font-awesome-icon icon="sign-out-alt" />
              LogOut
            </a>
          </a>
        </li>
      </ul>
    </div>
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasDarkNavbar"
        aria-controls="offcanvasDarkNavbar"
        v-if="currentUser"
        style="border: none"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!--      <a class="navbar-brand" href="#"><img src="../../assets/logo_vmg.png" width="50px"></a>-->

      <ul class="dropdown-menu navbar-brand" style="float: right">
        <li>
          <a class="dropdown-item">
            <router-link to="/profile" class="nav-link sel">
              <font-awesome-icon icon="user" />
              Thông tin cá nhân
            </router-link>
          </a>
        </li>
        <li>
          <a class="dropdown-item">
            <router-link to="/changepassword" class="nav-link">
              <i class="el-icon-refresh-left"></i>
              Thay đổi mật khẩu
            </router-link>
          </a>
        </li>
        <li>
          <hr class="dropdown-divider" />
        </li>
        <li>
          <a class="dropdown-item" href="#">
            <a class="nav-link sel" href @click.prevent="logOut">
              <font-awesome-icon icon="sign-out-alt" />
              LogOut
            </a>
          </a>
        </li>
      </ul>

      <div
        class="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasDarkNavbar"
        aria-labelledby="offcanvasDarkNavbarLabel"
        style="width: 14%"
      >
        <div class="offcanvas-header" style="margin: auto">
          <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">
            <img src="../../assets/new_logo.png" width="50px" />
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white text-center"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/profile">
                <router-link to="/calender" v-if="currentUser" class="nav-link sel">
                  <font-awesome-icon icon="home" />
                  Home
                </router-link>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                <router-link to="/user" v-if="currentUser" class="nav-link sel">
                  <i class="el-icon-question"></i>
                  Chi tiết chấm công
                </router-link>
              </a>
            </li>

            <li class="nav-item" v-if="showAdminBoard">
              <a class="nav-link">

                <router-link to="/timesheetadmin" class="nav-link sel">
                  <i class="el-icon-document-copy"> </i> Chi tiết chấm công
                  [Admin]
                </router-link>
              </a>
            </li>

            <li class="nav-item" v-if="showModeratorBoard">
              <a class="nav-link">
                <router-link to="/timesheetmod" class="nav-link sel">
                  <i class="el-icon-document-copy"> </i> Chi tiết chấm công(mod)
                </router-link>
              </a>
            </li>

            <li class="nav-item" v-if="showAdminBoard">
              <a class="nav-link">
                <router-link to="/manage" class="nav-link sel">
                  <i class="el-icon-document-copy"> </i> Quản lý nhân viên
                </router-link>
              </a>
            </li>



            <li class="nav-item" v-if="showAdminBoard">
              <a class="nav-link">
                <router-link to="/timesheet" class="nav-link sel">
                  <i class="el-icon-document-copy"> </i> Bảng Chấm Công
                </router-link>
              </a>
            </li>

            <li class="nav-item" v-if="showModeratorBoard">
              <a class="nav-link">
                <router-link to="/timesheet" class="nav-link sel">
                  <i class="el-icon-document-copy"> </i> Bảng Chấm Công
                </router-link>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
// import SidebarLink from './SidebarLink'
// import {collapsed, toggleSidebar, sidebarWidth} from "./state";

export default {
  data() {
    return {};
  },
  props: {},
  // components: { SidebarLink },
  // setup() {
  //   return {collapsed, toggleSidebar, sidebarWidth};
  // },
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
        return this.currentUser.roles.includes("ROLE_MANAGE");
      }
      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      // this.$router.push("/login");
      window.location.replace("http://localhost:8081/login");
    },
  },
};
</script>
<style>
/*:root {*/
/*  --sidebar-bg-color: black;*/
/*  --sidebar-item-hover: #38a169;*/
/*  --sidebar-item-active: #276749;*/
/*}*/
</style>

<style scoped>
* {
  font-family: "Montserrat", sans-serif;
}

/*.sidebar {*/
/*  background-color: #ffffff;*/
/*  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);*/
/*  float: left;*/
/*  position: fixed;*/
/*  z-index: 1;*/
/*  top: 0;*/
/*  left: 0;*/
/*  bottom: 0;*/
/*  padding: 0.5em;*/
/*  transition: 0.3s ease;*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*}*/

/*.sidebar h1 {*/
/*  height: 2.5em;*/
/*}*/

/*.collapse-icon {*/
/*  position: absolute;*/
/*  bottom: 0;*/
/*  padding: 0.75em;*/
/*  color: rgba(255, 255, 255, 0.7);*/
/*  transition: 0.2s linear;*/
/*}*/

/*.rotate-180 {*/
/*  transform: rotate(180deg);*/
/*  transition: 0.2s linear;*/
/*}*/

/*.nav-link {*/
/*  overflow: hidden;*/
/*}*/

/*.sel:hover {*/
/*  color: #e24146;*/
/*}*/
.navbar {
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.user-detail{
  position: fixed;
  top: 10px;
  right: 20px;
  z-index: 1030;
}
</style>
