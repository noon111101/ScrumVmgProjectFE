<template>
  <!-- <div class="container">
    <header class="jumbotron">
      <h3><iframe src="https://calendar.google.com/calendar/embed?src=...." style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe></h3>
    </header>
  </div> -->

  <div class="container register">

    <div class="row">
      <div class="col-md-3 register-left">
        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
        <!--        <h3>VMG Media</h3>-->
        <!--        <p>VMG Media</p>-->
        <img style="width: 200px; line-height: 100%" src="../assets/vmg_logo.png"/>
      </div>
      <div class="col-md-9 register-right">
        <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist" style="background-color: #e24146">
          <li class="nav-item">
            <a
                class="nav-link active"
                id="home-tab"
                data-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="home"
                aria-selected="true"
            >Tạo</a
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
                aria-selected="false">
              Nhân viên
            </a>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div
              class="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
          >
            <form name="form" @submit.prevent="changePassword">
              <!--              <h3 class="register-heading">Create an account</h3>-->
              <div class="row register-form">
                <div
                    class="col-md-4"
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
                <div class="col-md-8">

                  <table class="text-start">

                    <!--                      Full Name-->

                    <tr style="height: 70px">
                      <td style="width: 100px">Họ và tên<span style="color: red">*</span></td>
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
                          <div
                              v-if="errors.has('fullName')"
                              class="alert alert-danger"
                              role="alert"
                          >
                            <!--                            Full name is required and the full Name field must be at-->
                            <!--                            least 6 characters!-->
                            Nhập họ và tên
                          </div>
                        </div>
                      </td>
                    </tr>


                    <tr style="height: 70px">
                      <td style="width: 100px">Email<span style="color: red">*</span></td>
                      <td style="width: 300px">
                        <div class="form-group">
                          <input
                              v-model="user.username"
                              type="email"
                              class="form-control"
                              placeholder="Email *"
                              value=""
                              v-validate="{ required: true, min: 5 }"
                              name="username"/>
                        </div>
                        <div
                            v-if="errors.has('username')"
                            class="alert alert-danger"
                            role="alert">
                          Nhập email
                        </div>
                      </td>
                    </tr>


                    <tr style="height: 70px">
                      <td style="width: 100px">Mã nhân viên<span style="color: red">*</span></td>
                      <td style="width: 300px">
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
                          Nhập mã nhân viên
                        </div>
                      </td>
                    </tr>



                    <tr style="height: 60px">
                      <td style="width: 100px"></td>
                      <td style="width: 300px">
                        <div class="form-group">
                          <button class="btn btn-block btn-signup" >Sign Up</button>
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
            >{{ message }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ChangePassword",
  data() {
    return {
      content: "",
      value: new Date(),
      user: {
        username: "",
        fullName: "",
        role: [],
        department: "",
        code: "",
        gender: ""

      },
      submitted: false,
      successful: false,
      message: "",
      images: [],
    };
  },
  components: {

  },
  mounted() {

  },
  methods: {


  },
};
</script>
<style scoped>
#my-strictly-unique-vue-upload-multiple-image {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
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

.btn-signup{
  background-color: #e24146;
  color: #ffffff
}

.btn-signup:hover{
  background-color: #a31c20;

}
</style>
