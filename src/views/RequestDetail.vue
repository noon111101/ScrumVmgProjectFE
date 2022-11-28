<template>
  <div class="container ">
    <router-link to="/profile" class="btn-back"><i class="el-icon-back"></i>&nbsp;&nbsp;Chi tiết đề xuất</router-link>
    <br><br>
    <h5 class="title-request">Nguyễn Đình Phú xin nghỉ phép ngày 15/11</h5>
    <br><br>
    <div style="width: 100%">
      <span>Trạng thái:</span>&nbsp;&nbsp;
      <button class="tt1">Chờ phê duyệt</button>
      <button class="btn-2">Chấp thuận</button>
      <button class="btn-1">Từ chối</button>
    </div>
    <br><br>
    <span class="title-request sub-title">Thông tin đề xuất</span>
    <hr style="margin: 0">
    <div class="d-flex">
      <div class="col-6 left">
        <br>
        <table>
          <tr >
            <td class="header-table" >Nhân viên:</td>
            <td>Nguyễn Đình Phú</td>
          </tr>
          <tr>
            <td class="header-table" >Mã nhân viên:</td>
            <td>VMG_0307</td>
          </tr>
          <tr>
            <td class="header-table" >Phòng ban:</td>
            <td>Phòng phát triền dịch vụ</td>
          </tr>
        </table>
      </div>
      <div class="col-6 right">
        <br>
        <table>
          <tr >
            <td class="header-table" >Loại đề xuất:</td>
            <td>Nghỉ phép</td>
          </tr>
          <tr>
            <td class="header-table" >Thời gian tạo:</td>
            <td>09/11/2022</td>
          </tr>
          <tr>
            <td class="header-table" >Thời gian thực hiện:</td>
            <td>09/11/2022</td>
          </tr>
          <tr>
            <td class="header-table" >Số ngày nghỉ:</td>
            <td>1 ngày</td>
          </tr>
          <tr>
            <td class="header-table" >Nội dung đề xuất:</td>
            <td>Xin nghỉ ngày</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="d-flex">
      <div class="col-6 left">
        <br>
        <span class="title-request sub-title">Người phê duyệt</span>
        <hr style="margin: 0; width: 90%">
        <br>
        <b-avatar style="margin-left: 12px" variant="info" v-if="currentUser.user.cover != null"
                  v-bind:src="`http://localhost:8080/` + currentUser.user.cover"></b-avatar>
        <b-avatar style="margin-left: 12px" variant="info" v-if="currentUser.user.cover == null"
                  src="../assets/user.jpg"></b-avatar>  <span style="font-weight: 600">&nbsp; Nguyễn Đăng Tùng</span>
      </div>
      <div class="col-6 right">
        <br>
        <span class="title-request sub-title">Người theo dõi</span>
        <hr style="margin: 0; width: 90%">
        <br>
        <b-avatar style="margin-left: 12px" variant="info" src="https://placekitten.com/300/300"></b-avatar>  <span style="font-weight: 600">&nbsp; Đàm Hồng Nhung</span>

        <br><br>
        <b-avatar style="margin-left: 12px" variant="info" v-if="currentUser.user.cover != null"
                  v-bind:src="`http://localhost:8080/` + currentUser.user.cover"></b-avatar>
        <b-avatar style="margin-left: 12px" variant="info" v-if="currentUser.user.cover == null"
                  src="../assets/user.jpg"></b-avatar>
        <span style="font-weight: 600">&nbsp; Trịnh Thị Hà</span>

        <br><br>
        <b-avatar style="margin-left: 12px" variant="info" v-if="currentUser.user.cover != null"
                  v-bind:src="`http://localhost:8080/` + currentUser.user.cover"></b-avatar>
        <b-avatar style="margin-left: 12px" variant="info" v-if="currentUser.user.cover == null"
                  src="../assets/user.jpg"></b-avatar>
        <span style="font-weight: 600">&nbsp; Nguyễn Đăng Tùng</span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "RequestDetail",
  computed: {
    currentUser() {
      // return JSON.parse(localStorage.getItem('user'));
      return this.$store.state.auth.user;
    },

  },
}
</script>

<style scoped>
.container {

}

.btn-back {
  color: #4787F3;
  text-decoration: none;
}

.title-request {
  text-transform: uppercase;
}

.sub-title{
  color: #828282;
}

.tt1 {
  cursor: default;
  color: #DF8620;
  background-color: #FAECDB;
  border: none;
  border-radius: 20px;
  padding: 3px 20px;
}

.btn-1 {
  float: right;
  color: #FFFFFF;
  background-color: #E24146;
  border: none;
  border-radius: 8px;
  padding: 6px 30px;
  margin-right: 10px;
}

.btn-2 {
  float: right;
  color: #FFFFFF;
  background-color: #75C4C0;
  border: none;
  border-radius: 8px;
  padding: 6px 30px;
  /*margin-right: 5px;*/
}

.btn-1:hover {
  float: right;
  color: #FFFFFF;
  background-color: #de1d23;
  border: none;
  border-radius: 8px;
  padding: 6px 30px;
  margin-right: 10px;
}

.btn-2:hover {
  float: right;
  color: #FFFFFF;
  background-color: #06bdb3;
  border: none;
  border-radius: 8px;
  padding: 6px 30px;
  /*margin-right: 5px;*/
}

.header-table{
  font-weight: 600;
  width: 180px;
}

td{
  padding: 20px 0;
}

</style>