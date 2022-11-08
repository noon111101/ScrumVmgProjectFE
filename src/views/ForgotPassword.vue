<template>
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
                  <h4 class="mt-1 mb-5 pb-1">QUÊN MÂT KHẨU</h4>
                </div>
                <form accept-charset="utf-8">
                  <p>Vui lòng nhập email để lấy lại mật khẩu</p>
                  <div class="form-outline mb-4">
                    <input
                      placeholder="Enter Your Email"
                      v-model="email"
                      v-validate="{ required: true }"
                      type="email"
                      class="form-control"
                      name="email"
                    />
                    <small v-if="errEmail !== null" style="color: red">
                      {{ errEmail }}
                    </small>
                  </div>
                  <div class="text-center pt-1 mb-5 pb-1">
                    <el-button type="danger" @click="handleForgot"
                      >Xác nhân</el-button
                    >
                    <br />
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
</template>
<script>
import UserService from "@/services/user.service";
export default {
  name: "ForgotVue",
  data() {
    return {
      loading: false,
      message: "",
      email: "",
      errEmail: "",
      checkEmail: true,
      users: [],
      a: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {},
  methods: {
    validEmail: function (email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    async handleForgot() {
      let response = await UserService.getAllUser();
      this.users = response.data;

      for (let i = 0; i < this.users.length; i++) {
        if (this.email === this.users[i].username) {
          this.errEmail = "";
          this.checkEmail = true;
          break;
        } else {
          this.errEmail = "Email không tồn tại";
          this.checkEmail = false;
        }
      }

      if (!this.email) {
        this.errEmail = "Vui lòng nhập email nhân viên";
        this.checkEmail = false;
      } else if (!this.validEmail(this.email)) {
        this.errEmail = "Vui lòng nhập đúng định dạng email";
        this.checkEmail = false;
      } else if (
        this.validEmail(this.email) &&
        this.email &&
        this.checkEmail === true
      ){
        this.errEmail = "";
        this.checkEmail = true;
      }
      
        if (this.checkEmail === true) {
          this.loading = true;
          this.$validator.validateAll().then((isValid) => {
            if (!isValid) {
              this.loading = false;
              return;
            }
            if (this.email) {
              const params = {
                email: this.email,
              };
              UserService.forgotPassword(params).then((response) => {
                if (response.data == true) {
                  this.$router.push("/confirmForgot");
                } else {
                  (error) => {
                    this.loading = false;
                    this.message =
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString();
                  };
                }
              });
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
