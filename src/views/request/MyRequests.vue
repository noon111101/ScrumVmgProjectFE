<template>
  <div>
    <h1>Danh sách đề xuất của tôi</h1>

    <br/>
    <div className="container" style="text-align: center">
      <!--      <el-row :gutter="20">-->
      <!--        <el-col :md="6" :lg="6" :xl="6">-->
      <!--          <div class="grid-content" style="margin-bottom: 20px">-->

      <!--          </div>-->
      <!--        </el-col>-->

      <!--        <el-col :md="6" :lg="6" :xl="6" style="margin-bottom: 20px">-->
      <!--          <div class="grid-content">-->

      <!--          </div>-->
      <!--        </el-col>-->
      <!--        <el-col :md="6" :lg="6" :xl="6" style="margin-bottom: 20px">-->
      <!--          <div class="grid-content">-->
      <!--            <span style="">Trạng thái</span> &ensp;-->
      <!--            <el-select-->
      <!--                v-model="status"-->
      <!--                @change="getMyRequests"-->
      <!--                placeholder="Trạng thái"-->
      <!--            >-->
      <!--              <el-option value="0" label="Tất cả"></el-option>-->
      <!--              <el-option label="Chờ phê duyệt" value="1"></el-option>-->
      <!--              <el-option label="Đã chấp thuận" value="2"></el-option>-->
      <!--              <el-option label="Đã từ chối" value="3"></el-option>-->
      <!--              <el-option label="Quá hạn duyệt" value="4"></el-option>-->
      <!--            </el-select>-->
      <!--          </div>-->
      <!--        </el-col>-->

      <!--        <el-col :md="6" :lg="6" :xl="6" class="div-buttons">-->
      <!--          <div class="grid-content div-buttons">-->

      <!--          </div>-->
      <!--        </el-col>-->
      <!--      </el-row>-->
      <div class="grid-content">
        <span style="">Trạng thái</span> &ensp;
        <el-select
            v-model="statusId"
            @change="getMyRequests"
            placeholder="Trạng thái"
        >
          <el-option value="0" label="Tất cả"></el-option>
          <el-option label="Chờ phê duyệt" value="1"></el-option>
          <el-option label="Đã chấp thuận" value="2"></el-option>
          <el-option label="Đã từ chối" value="3"></el-option>
          <el-option label="Quá hạn duyệt" value="4"></el-option>
          <el-option label="Đã hủy" value="5"></el-option>
          <el-option label="Hoàn thành" value="6"></el-option>
        </el-select>
      </div>
    </div>
    <el-table :data="requests" height="780" style="width: 100%">

      <el-table-column
          v-slot:="data"
          label="Đề xuất"
          align="center"
          width="380"
      >

        <router-link class="link" :to="{name: 'requestdetail', params: {id: data.row.id}}">{{
            data.row.title
          }}
        </router-link>

      </el-table-column>
      <el-table-column
          prop="creator.fullName"
          label="Nhân viên"
          align="center"
          width="200"
      >
      </el-table-column>
      <el-table-column
          prop="creator.departments.name"
          label="Phòng ban"
          align="center"
          width="200"
      >
      </el-table-column>
      <el-table-column
          v-slot:="data"
          label="Trạng thái"
          align="center"
          width="200"
      >
        <button v-if="data.row.approveStatus.id == 1" class="btn-1">
          {{ data.row.approveStatus.name }}
        </button>
        <button v-if="data.row.approveStatus.id == 2" class="btn-2">
          {{ data.row.approveStatus.name }}
        </button>
        <button v-if="data.row.approveStatus.id == 3" class="btn-3">
          {{ data.row.approveStatus.name }}
        </button>
        <button v-if="data.row.approveStatus.id == 4" class="btn-4">
          {{ data.row.approveStatus.name }}
        </button>
        <button v-if="data.row.approveStatus.id == 5" class="btn-3">
          {{ data.row.approveStatus.name }}
        </button>
        <button v-if="data.row.approveStatus.id == 6" class="btn-2">
          {{ data.row.approveStatus.name }}
        </button>
      </el-table-column>
      <el-table-column
          v-slot:="data"
          label="Người duyệt"
          align="center"
          width="200"
      >
        <div
            v-for="(item, index) in data.row.approvers"
            :item="item"
            :index="index"
            :key="item.id"
        >
          <span>{{ item.fullName }}</span>
        </div>
      </el-table-column>
      <el-table-column
          v-slot:="data"
          label="Người theo dõi"
          align="center"
          width="200"
      >
        <div
            v-for="(item, index) in data.row.followers"
            :item="item"
            :index="index"
            :key="item.id"
        >
          <span>{{ item.fullName }}</span>
        </div>
      </el-table-column>
      <el-table-column
          prop="date"
          label="Ngày tạo"
          align="center"
          width="200"
      >
      </el-table-column>
      <el-table-column prop="" label="Thao tác" align="center" width="200" v-slot:="data">
        <el-button type="warning" v-if="data.row.approveStatus.id==1" @click="changeStatus(data.row.id, 5)"
                   icon="el-icon-delete" circle></el-button>


      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import RequestService from "@/services/request-service";

export default {
  name: "MyRequests",
  data() {
    return {
      requests: [],
      statusId: "",
      sendStatusId: "",
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.getMyRequests()
  },
  methods: {
    getMyRequests() {
      if (this.statusId == "" || this.statusId == null) {
        this.sendStatusId = 0;
      } else {
        this.sendStatusId = this.statusId;
      }
      const params = {
        "id": this.currentUser.user.id,
        "statusId": this.sendStatusId
      }
      RequestService.myRequests(params).then((response) => {
        this.requests = response.data
      })
    },
    changeStatus(requestId, statusId) {
      if (statusId == 5) {
        this.$swal
            .fire({
              title: "Xác nhận hủy yêu cầu",
              showDenyButton: true,
              confirmButtonColor: "#75C4C0",
              confirmButtonText: "Xác nhận",
              denyButtonColor: "#ED9696",
              denyButtonText: "Đóng",
              customClass: {
                actions: "my-actions",
                cancelButton: "order-1 right-gap",
                confirmButton: "order-2",
                denyButton: "order-3",
              },
            })
            .then((result) => {
              if (result.isConfirmed) {
                RequestService.changeStatus(requestId, statusId).then((response) => {
                  this.$swal.fire({
                    title: response.data.message,
                    icon: "success",
                    timer: 2000,
                    timerProgressBar: true,
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    width: "24em",
                  });
                  this.getAll();
                });
              } else if (result.isDenied) {
                this.$swal.fire({
                  title: "Thay đổi thất bại",
                  icon: "error",
                  timer: 2000,
                  timerProgressBar: true,
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  width: "24em",
                });
              }
            });
      }
    },
  }

}
</script>

<style scoped>

</style>