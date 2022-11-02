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
                <form   accept-charset="utf-8">
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
                  </div>
                  <div
                      v-if="errors.has('email')"
                      class="alert alert-danger"
                      role="alert"
                  >
                    Email is required and correct email format!
                  </div>
                  <div class="text-center pt-1 mb-5 pb-1">
                    <button
                        @click="handleForgot"
                        class="btn btn-danger btn-block"
                        :disabled="loading"
                    >
                      Tiếp tuc
                    </button>
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
      email: '',
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
  mounted() {
  },
  methods: {
    handleForgot() {
      (this.loading = true);
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.loading = false;
          return;
        }
        if (this.email) {
          const params={
            'email':this.email
          }
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