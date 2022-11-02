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
                  <h4 class="mt-1 mb-5 pb-1">PHÁT TRIỂN CÙNG CÔNG NGHỆ</h4>
                </div>
                <form name="form" @submit.prevent="handleLogin">
                  <p>Please login to your account</p>
                  <div class="form-outline mb-4">
                    <input
                        placeholder="Enter Your Email"
                        v-model="user.username"
                        v-validate="{ required: true }"
                        type="email"
                        class="form-control"
                        name="username"
                    />
                    <!-- <label class="form-label" for="form2Example11">Email</label> -->
                  </div>
                  <div
                      v-if="errors.has('username')"
                      class="alert alert-danger"
                      role="alert"
                  >
                    Email is required and correct email format!
                  </div>
                  <div class="form-outline mb-4">
                    <input
                        placeholder="Enter Your Password"
                        v-model="user.password"
                        v-validate="{ required: true }"
                        type="password"
                        class="form-control"
                        name="password"
                    />
                    <!-- <label class="form-label" for="form2Example22">Password</label> -->
                  </div>
                  <div
                      v-if="errors.has('password')"
                      class="alert alert-danger"
                      role="alert"
                  >
                    Password is required!
                  </div>
                  <div class="text-center pt-1 mb-5 pb-1">
                    <button
                        class="btn btn-danger btn-block"
                        :disabled="loading"
                    >
                      Log in
                    </button>
                    <br />
                    <a class="text-muted" href="http://localhost:8081/forgotPassword">Forgot password?</a>
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
import User from "../models/user";
export default {
  name: "LoginVue",
  data() {
    return {
      user: new User("", ""),
      loading: false,
      message: "",
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
    handleLogin() {
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
                this.message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
              }
          );
        }
      });
    },
  },
};
</script>

<style scoped>
.gradient-custom-2 {
  /* fallback for old browsers */
  /* background: #fccb90; */

  /* Chrome 10-25, Safari 5.1-6 */
  /* background: -webkit-linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593); */

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  /* background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593); */
}

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