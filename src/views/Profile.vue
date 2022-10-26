<template>
  <section style="background-color: #eee;">
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-4">
        <div class="card mb-4">
          <div class="card-body text-center">

            <img v-bind:src="`http://localhost:8080/uploads/images/` + currentUser.user.cover"
              class="rounded-circle img-fluid" style="width: 120px">
            <h5 class="my-3">{{currentUser.user.fullName}}</h5>
            <p class="text-muted mb-4">{{currentUser.user.code}}</p>

<!--            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar"-->
<!--              class="rounded-circle img-fluid" style="width: 150px;">-->
            <h5 class="my-3">{{currentUser.user.username}}</h5>
            <p class="text-muted mb-4">{{currentUser.code}}</p>

            <div class="d-flex justify-content-center mb-2">
            <img src="http://danhbaict.vn/uploads/images/vmg%20logo.jpg" style="width: 100px;" >
            </div>
          </div>
        </div>
        <div class="card mb-4 mb-lg-0">
            <div class="card mb-4 mb-md-0">
              <div class="card-body">
                <p class="mb-4"><span class="text-primary font-italic me-1">Thống kê ngày nghỉ</span>
                </p>
                <p class="mb-1" style="font-size: .77rem;">Tổng số ngày yêu cầu đi làm</p>
                <div class="progress rounded" style="height: 5px;">
                  <div class="progress-bar" role="progressbar" style="width: 100%" aria-valuenow="80"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" style="font-size: .77rem;">Tổng số ngày đi làm</p>
                <div class="progress rounded" style="height: 5px;">
                  <div class="progress-bar" role="progressbar" style="width: 72%" aria-valuenow="72"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" style="font-size: .77rem;">Số ngày nghỉ lễ</p>
                <div class="progress rounded" style="height: 5px;">
                  <div class="progress-bar" role="progressbar" style="width: 89%" aria-valuenow="89"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>

              </div>
            </div>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="card mb-4">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Họ và tên</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{currentUser.user.fullName}}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Email</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{currentUser.user.username}}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Chức vụ</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0"  v-for="(role,index) in currentUser.roles" :key="index" >
                  <span v-if="role=='ROLE_USER'">Nhân viên</span>
                  <span v-if="role=='ROLE_MANAGE'">Trưởng phòng</span>
                  <span v-if="role=='ROLE_ADMIN'">Phòng nhân sự</span>
                  <!--                  {{role}}-->
                </p>
              </div>
            </div>
            <hr>
                   <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Giới tính</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{currentUser.user.gender}}</p>
              </div>
            </div>
              <hr>
                   <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Phòng ban</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{currentUser.user.departments.name}}</p>
              </div>
            </div>

              </div>
            </div>
            <hr>


          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
          </div>
        </div>
      </div>

</section>
</template>

<script>

export default {
  name: 'ProfileVue',
  data(){
    return{
    }
  },
  computed: {
    currentUser() {

      // return JSON.parse(localStorage.getItem('user'));
      return this.$store.state.auth.user;
    }
  },
  created() {

  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }

  }
};
 </script>