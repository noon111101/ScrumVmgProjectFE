<template>
  <!-- <div class="container">
    <header class="jumbotron">
      <h3><iframe src="https://calendar.google.com/calendar/embed?src=...." style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe></h3>
    </header>
  </div> -->
  <div class="container register">
    <div class="row">
      <div class="col-md-3 register-left">
        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
        <h3>Welcome</h3>
        <p>VMG Media</p>
        <img src="https://vmgmedia.vn/Content/images/logo/01.png" />
      </div>
      <div class="col-md-9 register-right">
        <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              id="home-tab"
              data-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
              >Employee</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
              >Hirer</a
            >
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <form name="form" @submit.prevent="handleRegister">
              <h3 class="register-heading">Create an account</h3>
              <div class="row register-form">
                <div
                  class="col-md-6"
                  id="my-strictly-unique-vue-upload-multiple-image"
                  style="display: flex; justify-content: center"
                >
                  <vue-upload-multiple-image
                    @upload-success="uploadImageSuccess"
                    @before-remove="beforeRemove"
                    @edit-image="editImage"
                    :data-images="images"
                    idUpload="myIdUpload"
                    editUpload="myIdEdit"
                  ></vue-upload-multiple-image>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      v-model="user.fullName"
                      type="text"
                      class="form-control"
                      name="fullName"
                      placeholder="Full name *"
                      value=""
                      v-validate="{ required: true, min: 6 }"
                    />
                    <div
                      v-if="errors.has('fullName')"
                      class="alert alert-danger"
                      role="alert"
                    >
                      Full name is required and the full Name field must be at
                      least 6 characters!
                    </div>
                  </div>
                  <br />
                  <div class="form-group">
                    <input
                      v-model="user.username"
                      type="email"
                      class="form-control"
                      placeholder="Email *"
                      value=""
                      v-validate="{ required: true, min: 2 }"
                      name="username"
                    />
                  </div>
                  <div
                    v-if="errors.has('username')"
                    class="alert alert-danger"
                    role="alert"
                  >
                    Email is required!
                  </div>

                  <br />
                  <!-- <div class="form-group">
                                            <input type="password" class="form-control" placeholder="Password *" value="" />
                                        </div> -->
                  <div class="form-group">
                    <input
                      v-model="user.code"
                      type=""
                      class="form-control"
                      placeholder="Employee ID *"
                      v-validate="{ required: true, min: 2 }"
                      name="code"
                    />
                  </div>
                  <div
                    v-if="errors.has('code')"
                    class="alert alert-danger"
                    role="alert"
                  >
                    EmployeeId is required!
                  </div>
                  <br />
                  <input
                    type="radio"
                    name="gender"
                    value="Nam"
                    v-model="user.gender"
                  />
                  Male
                  <input
                    type="radio"
                    name="gender"
                    value="Nữ"
                    v-model="user.gender"
                  />
                  Female
                  <br />
                  <div class="form-group">
                    <select
                      name="department"
                      v-validate="{ required: true }"
                      class="form-control"
                      v-model="user.department"
                    >
                      <!-- <option class="hidden" selected disabled>
                        Department *
                      </option> -->
                      <option>Phòng nhân sự</option>
                      <option>Phòng phát triển phần mềm</option>
                      <option>Phòng kế toán</option>
                    </select>
                  </div>
                  <br />
                  <div class="form-group">
                    <input
                      type="checkbox"
                      id="admin"
                      value="admin"
                      v-model="user.role"
                    />
                    <label for="admin">admin</label>
                    <br>
                    <input
                      type="checkbox"
                      id="manage"
                      value="manage"
                      v-model="user.role"
                    />
                    <label for="manage">manage</label>
                    <br>
                    <input
                      type="checkbox"
                      id="user"
                      value="user"
                      v-model="user.role"
                    />
                    <label for="user">user</label>
                    <br />
                    <span>Select: {{ user.role }}</span>
                  </div>
                  <br />
                  <div class="form-group">
                    <button class="btn btn-danger btn-block">Sign Up</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueUploadMultipleImage from "vue-upload-multiple-image";
import UserService from "../services/user.service";
export default {
  name: "AdminVue",
  data() {
    return {
      content: "",
      value: new Date(),
      user: {
        username:"",
        fullName:"",
        role:[],
        department:"",
        code: "",
        gender:""

      },
      submitted: false,
      successful: false,
      message: "",
      images: [],
    };
  },
  components: {
    VueUploadMultipleImage,
  },
  mounted() {
    UserService.getAdminBoard().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  },
  methods: {
    handleRegister() {
      this.message = "";
      this.submitted = true;
      console.log(this.roles)
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          this.$store.dispatch("auth/register", this.user).then(
            (data) => {
              this.message = data.message;
              this.successful = true;
            },
            (error) => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    },
    uploadImageSuccess(formData, index, fileList) {
      console.log("data", formData, index, fileList);
      // Upload image api
      // axios.post('http://your-url-upload', formData).then(response => {
      //   console.log(response)
      // })
    },
    beforeRemove(index, done, fileList) {
      console.log("index", index, fileList);
      var r = confirm("remove image");
      if (r == true) {
        done();
      }
    },
    editImage(formData, index, fileList) {
      console.log("edit data", formData, index, fileList);
    },
  },
};
</script>
<style scoped>
#my-strictly-unique-vue-upload-multiple-image {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.register {
  background: -webkit-linear-gradient(left, rgba(52, 58, 64, 255), #ffffff);
  margin-top: 3%;
  padding: 3%;
}
.register-left {
  text-align: center;
  color: #fff;
  margin-top: 4%;
}
.register-left input {
  border: none;
  border-radius: 1.5rem;
  padding: 2%;
  width: 60%;
  background: #f8f9fa;
  font-weight: bold;
  color: #383d41;
  margin-top: 30%;
  margin-bottom: 3%;
  cursor: pointer;
}
.register-right {
  background: #f8f9fa;
  border-top-left-radius: 10% 50%;
  border-bottom-left-radius: 10% 50%;
}
.register-left img {
  margin-top: 15%;
  margin-bottom: 5%;
  width: 25%;
  -webkit-animation: mover 2s infinite alternate;
  animation: mover 1s infinite alternate;
}
@-webkit-keyframes mover {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}
@keyframes mover {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}
.register-left p {
  font-weight: lighter;
  padding: 12%;
  margin-top: -9%;
}
.register .register-form {
  padding: 10%;
  margin-top: 10%;
}
.btnRegister {
  float: right;
  margin-top: 10%;
  border: none;
  border-radius: 1.5rem;
  padding: 2%;
  background: red;
  color: #fff;
  font-weight: 600;
  width: 50%;
  cursor: pointer;
}
.register .nav-tabs {
  margin-top: 3%;
  border: none;
  background: red;
  border-radius: 1.5rem;
  width: 28%;
  float: right;
}
.register .nav-tabs .nav-link {
  padding: 2%;
  height: 34px;
  font-weight: 600;
  color: #fff;
  border-top-right-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
}
.register .nav-tabs .nav-link:hover {
  border: none;
}
.register .nav-tabs .nav-link.active {
  width: 100px;
  color: red;
  border: 2px solid red;
  border-top-left-radius: 1.5rem;
  border-bottom-left-radius: 1.5rem;
}
.register-heading {
  text-align: center;
  margin-top: 8%;
  margin-bottom: -15%;
  color: #495057;
}
</style>
