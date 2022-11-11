<template>
  <div style="padding-bottom: 310px">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-xl-10">
          <div class="card rounded-3 text-black">
            <div class="row g-0">
              <div class="col-lg-6">
                <div class="card-body p-md-5 mx-md-4">
                  <div class="text-center">
                    <img
                        src="http://danhbaict.vn/uploads/images/vmg%20logo.jpg"
                        style="width: 185px"
                        alt="logo"
                    />
                    <h4 class="mt-1 mb-5 pb-1">PHÁT TRIỂN CÙNG CÔNG NGHỆ</h4>
                  </div>
                  <form name="form" @submit.prevent="handleLogin">
                    <p>Nhập thông tin đăng nhập</p>
                    <div class="form-outline mb-4">
                      <input
                          placeholder="Nhập email"
                          v-model="user.username"
                          v-validate="'required'"
                          type="text"
                          class="form-control"
                          name="username"
                      />
                      <small v-if="messageEmail !== null" style="color: red">
                        {{ messageEmail }}
                      </small>
                    </div>
                    <div class="form-group">
                      <input
                          placeholder="Nhập mật khẩu"
                          v-model="user.password"
                          v-validate="'required'"
                          type="password"
                          class="form-control"
                          name="password"
                      />
                      <small v-if="messagePass !== null" style="color: red">
                        {{ messagePass }}
                      </small>
                    </div>
                    <div class="text-center pt-1 mb-5 pb-1">
                      <button
                          style="margin-top: 20px; margin-bottom: 20px"
                          class="btn btn-danger btn-block"
                          :disabled="loading"
                      >
                        Đăng nhập
                      </button>
                      <br />
                      <a
                          style="margin-top: 20px; color: #33acff"
                          href="http://localhost:8081/forgotPassword"
                      >Quên mât khẩu</a
                      >
                      <br />
                      <small v-if="messageForm" style="color: red">{{
                          messageForm
                        }}</small>
                      <br />
                      <small style="color: red" v-if="message">{{
                          message
                        }}</small>
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                  <img width="450px" src="../assets/Login.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import User from "../models/user";

export default {
  name: "LoginVue",
  data() {
    return {
      user: new User("", ""),
      loading: false,
      message: "",
      a: "",
      errAvail: "",
      checkAvail: true,
      errEmail: "",
      checkEmail: true,
      errPass: "",
      checkPass: true,
      check: true,
      messageEmail: "",
      messagePass: "",
      messageForm: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    this.$router.push("/login");
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    validEmail: function (email)
    {
      var re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email)
          ;
    },
    handleLogin() {

      if (!this.user.username && !this.user.password) {
        this.messageForm = "Vui lòng nhập thông tin tài khoản";
        this.messageEmail = "";
        this.messagePass = "";
        this.message = "";
        this.check = false;
      } else {
        this.messageForm = "";
      }

      if (!this.user.username && this.user.password) {
        this.messageEmail = "Vui lòng nhập email";
        this.messageForm = "";
        this.message = "";
        this.check = false;
      } else {
        this.messageEmail = "";
      }
      if (!this.user.password && this.user.username) {
        this.messagePass = "Vui lòng nhập mật khẩu";
        this.messageForm = "";
        this.message = "";
        this.check = false;
      } else {
        this.messagePass = "";
      }
      if (this.user.username && this.user.password) {
        this.check = true;
      }
      if (this.check === true) {
        this.loading = true;
        this.$validator.validateAll().then((isValid) => {
          if (!isValid) {
            this.loading = false;
            return;
          }
          if (this.user.username && this.user.password) {
            this.$store.dispatch("auth/login", this.user).then(
                () => {
                  this.$router.push("/calender");
                },
                (error) => {
                  this.loading = false;
                  this.a = error.response && error.response.data;
                  if (
                      error.response.data.message ==
                      "Account have been lock by admin"
                  ) {
                    this.message =
                        "Tài khoản của bạn bị khóa hiện tại chưa thể đăng nhập";
                  } else {
                    this.message = "Email hoặc mật khẩu không chính xác";
                  }
                }
            );
          }
        });
      }
    },
  },
};
</script>

<style scoped>
@media (min-width: 768px) {
  .gradient-form {
    height: 100vh !important;
  }
}
@media (min-width: 769px) {
  .gradient-custom-2 {
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
  }
}
</style>