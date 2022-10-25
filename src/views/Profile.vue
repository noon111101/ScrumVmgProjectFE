<template>
  <section style="background-color: #eee;">
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-4">
        <div class="card mb-4">
          <div class="card-body text-center">
            <img :src="'http://localhost:8080/uploads/images/' + currentUser.user.cover" 
              class="rounded-circle img-fluid" style="width: 120px">
            <h5 class="my-3">{{currentUser.user.username}}</h5>
            <p class="text-muted mb-1" v-for="(role,index) in currentUser.user.roles" :key="index">{{role.name}}</p>
            <p class="text-muted mb-4">{{currentUser.user.code}}</p>
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
                <p class="mt-4 mb-1" style="font-size: .77rem;">Mobile Template</p>
                <div class="progress rounded" style="height: 5px;">
                  <div class="progress-bar" role="progressbar" style="width: 55%" aria-valuenow="55"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" style="font-size: .77rem;">Backend API</p>
                <div class="progress rounded mb-2" style="height: 5px;">
                  <div class="progress-bar" role="progressbar" style="width: 66%" aria-valuenow="66"
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
                <p class="mb-0">Full Name</p>
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
                <p class="mb-0">Role</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0"  v-for="(role,index) in currentUser.user.roles" :key="index">{{role.name}}</p>
              </div>
            </div>
            <hr>
                   <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Gender</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{currentUser.user.gender}}</p>
              </div>
            </div>
              <hr>
                   <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Department</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{currentUser.user.departments.name}}</p>
              </div>
            </div>
<!--            <div class="row">-->
<!--              <div class="col-sm-3">-->
<!--                <p class="mb-0">Mobile</p>-->
<!--              </div>-->
<!--              <div class="col-sm-9">-->
<!--                <p class="text-muted mb-0">(098) 765-4321</p>-->
<!--              </div>-->
<!--            </div>-->
<!--            <hr>-->
<!--            <div class="row">-->
<!--              <div class="col-sm-3">-->
<!--                <p class="mb-0">Address</p>-->
<!--              </div>-->
<!--              <div class="col-sm-9">-->
<!--                <p class="text-muted mb-0">Sao Hỏa</p>-->
<!--              </div>-->
<!--            </div>-->
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>

export default {
  name: 'ProfileVue',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
 </script>