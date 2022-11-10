<template>
  <div class="container register">
    <div class="row">
      <div class="col-md-3 register-left">
        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
        <img
            style="width: 200px; line-height: 100%"
            src="../assets/vmg_logo.png"
        />
      </div>
      <div class="col-md-9 register-right">

        <div class="tab-content" id="myTabContent">
          <div
              class="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
          >
            <form id="formEdit" @submit.prevent="sendForm">
              <div class="row register-form ">
                <div class="col-md-4">
                  <input
                      type="file"
                      name="cover"
                      class="form-control"
                      placeholder="Title"
                      @change="previewFiles($event)"
                  />
                  <br/><br/>
                  <img
                      alt=""
                      :src="newImage"
                      style="width: 270px"
                  />
                </div>
                <div class="col-md-8">
                  <table class="text-start">
                    <tr style="height: 70px">
                      <td style="width: 100px">
                        Họ và tên <span style="color: red">*</span>
                      </td>
                      <td style="width: 300px">
                        <div class="form-group">
                          <input
                              v-model="user.fullName"
                              type="text"
                              class="form-control"
                              name="fullName"
                              placeholder="Họ và tên"
                              value=""
                              v-validate="{ required: true, min: 6 }"
                          />
                          <small v-if="errName !== null" style="color: red">
                            {{ errName }}
                          </small>
                        </div>
                      </td>
                    </tr>
                    <tr style="height: 70px">
                      <td style="width: 100px">
                        Email<span style="color: red">*</span>
                      </td>
                      <td style="width: 300px">
                        <div class="form-group">
                          <input
                              v-model="user.username"
                              type=""
                              class="form-control"
                              placeholder="Email *"
                              value=""
                              v-validate="{ required: true, min: 5 }"
                              name="username"
                          />
                        </div>
                        <small v-if="errEmail !== null" style="color: red">
                          {{ errEmail }}
                        </small>
                      </td>
                    </tr>

                    <tr style="height: 70px">
                      <td style="width: 100px">
                        Mã nhân viên<span style="color: red">*</span>
                      </td>
                      <td style="width: 300px">
                        <div class="form-group">
                          <input
                              v-model="user.code"
                              type="number"
                              class="form-control"
                              placeholder="Employee ID *"
                              v-validate="{ required: true, min: 2 }"
                              name="code"
                          />
                        </div>
                        <small v-if="errId !== null" style="color: red">
                          {{ errId }}
                        </small>
                      </td>
                    </tr>

                    <tr style="height: 70px" >
                      <td style="width: 150px">
                        Giới tính<span style="color: red">*</span>
                      </td>
                      <td style="width: 300px">
                        <el-radio
                            v-model="user.gender"
                            name="gender"
                            value="Nam"
                            label="Nam"
                            border
                        >&nbsp; Nam
                        </el-radio>
                        <el-radio
                            v-model="user.gender"
                            name="gender"
                            value="Nữ"
                            label="Nữ"
                            border
                        >&nbsp; Nữ
                        </el-radio>
                      </td>
                    </tr>


                    <tr style="height: 70px">
                      <td style="width: 100px">
                        Phòng ban<span style="color: red">*</span>
                      </td>
                      <td style="width: 300px">
                        <div class="form-group">
                          <el-select
                              name="department"
                              v-model="user.departments.name"
                              @change="getAll"
                              placeholder="Chọn Phòng ban"
                          >
                            <el-option
                                v-for="item in departments"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name"
                            >
                            </el-option>
                          </el-select>
                        </div>
                        <div
                            v-if="errors.has('department')"
                            class="alert alert-danger"
                            role="alert"
                        >
                          Chọn phòng ban
                        </div>
                      </td>
                    </tr>

                    <template v-if="user.code == currentUser.user.code">
                      <tr style="height: 40px" disabled="" >
                        <td style="width: 100px">
                          Chức vụ<span style="color: red">*</span>
                        </td>
                        <td style="width: 300px">
                          <input
                              disabled
                              type="radio"
                              id="admin"
                              value="admin"
                              :checked="checkRole('ROLE_ADMIN')"
                              name="role"
                          />
                          <label for="admin">&nbsp; Nhân sự</label>
                        </td>
                      </tr>
                    </template>

                    <template v-if="user.code != currentUser.user.code">
                      <tr style="height: 40px"  >
                        <td style="width: 100px">
                          Chức vụ<span style="color: red">*</span>
                        </td>
                        <td style="width: 300px">
                          <input
                              type="radio"
                              id="admin"
                              value="admin"
                              :checked="checkRole('ROLE_ADMIN')"
                              name="role"
                          />
                          <label for="admin">&nbsp; Nhân sự</label>
                        </td>
                      </tr>
                    </template>
                    <tr style="height: 40px">
                      <td style="width: 100px"></td>
                      <td style="width: 300px">
                        <input
                            type="radio"
                            id="manage"
                            value="manage"
                            :checked="checkRole('ROLE_MANAGE')"
                            name="role"
                        />
                        <label for="manage">&nbsp; Trưởng phòng</label>
                      </td>
                    </tr>
                    <tr style="height: 40px">
                      <td style="width: 100px"></td>
                      <td style="width: 300px">
                        <input
                            type="radio"
                            id="user"
                            value="user"
                            name="role"
                            :checked="checkRole('ROLE_USER')"
                        />
                        <label for="user">&nbsp; Nhân viên</label>
                      </td>
                    </tr>
                    <tr style="height: 60px">
                      <td style="width: 100px"></td>
                      <td style="width: 300px">
                        <div class="form-group">
                          <button class="btn btn-block btn-signup">
                            Chỉnh sửa
                          </button>
                        </div>
                      </td>
                    </tr>
                  </table>
                  <br/>
                </div>
              </div>
            </form>
            <div
                v-if="message"
                class="alert"
                :class="successful ? 'alert-success' : 'alert-danger'"
            >
              {{ message }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserService from "@/services/user.service";
import DepartmentService from "@/services/department.service";

export default {
  name: "EditVue",
  data() {
    return {
      content: "",
      value: new Date(),
      user: {},
      submitted: false,
      successful: false,
      message: "",
      newImage: null,
      cover: {},
      departments: [],
      departmentId: "",
      errId: "",
      checkId: true,
      errEmail: "",
      checkEmail: true,
      errName: "",
      checkName: true,
      users: [],
    };
  },
  created() {
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
    UserService.getUserById(this.$route.params.id).then((response) => {
      this.user = response.data;
      console.log(this.user.cover);
      this.newImage = this.user.cover !== null ? 'http://localhost:8080/' + this.user.cover : 'https://www.namepros.com/attachments/empty-png.89209/';
    });
    DepartmentService.getAllDepartment()
        .then((response) => {
          this.departments = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
  },
  methods: {
    validEmail: function (email) {
      var re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    validCode: function (code) {
      var re = /^(\\-)?[0-9]+(.[0-9]+)?$/;
      return re.test(code);
    },

    // validName: function (name) {
    //   var re = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/;
    //   return re.test(name);
    // },

    previewFiles(event) {
      const file = event.target.files[0];

      const theReader = new FileReader();
      theReader.onloadend = async () => {
        this.newImage = await theReader.result;
      };
      theReader.readAsDataURL(file);
    },
    async sendForm() {
      let response = await UserService.getAllUser();
      this.users = response.data;

      if (!this.user.code) {
        this.errId = "Vui lòng nhập mã nhân viên";
        this.checkId = false;
      } else if (!this.validCode(this.user.code)) {
        this.errId = "Vui lòng nhập đúng định dạng code";
        this.checkId = false;
      } else if (
          this.validCode(this.user.code) &&
          this.user.code &&
          this.checkId === true
      ) {
        this.errId = "";
        this.checkId = true;
      }
      if (!this.user.fullName) {
        this.errName = "Hãy nhập Họ và tên";
        this.checkName = false;
      }
      if (
          this.checkId === true &&
          this.checkEmail === true &&
          this.checkName === true
      ) {
        this.submitted = true;
        let form = document.querySelector("#formEdit");
        console.log(form);
        UserService.editUser(this.user.id, form).then(response => {
            this.$swal.fire({
              title: "Chỉnh sửa thành công!",
              icon: "success",
              timer: 2000,
              timerProgressBar: true,
            });
            console.log(response)
            return this.$router.push(`/manage`);
          }).catch(error => {
          this.$swal.fire({
            title: "Chỉnh sửa thất bại!",
            icon: "error",
            text:error.response.data.error.message,
            timer: 2000,
            timerProgressBar: true,
          });
          return this.$router.push(`/user/${this.$route.params.id}`);
        });
      }
    },
    checkRole(role) {
      let check = false;
      for (let roleData of this.user.roles) {
        if (roleData.name == role) check = true;
      }
      return check;
    },
  },
};
</script>
<style scoped>
#my-strictly-unique-vue-upload-multiple-image {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
  padding: 20px;
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

.tab-content {
  padding: 0;
}

.btn-signup {
  background-color: #e24146;
  color: #ffffff;
}

.btn-signup:hover {
  background-color: #a31c20;
}
</style>
