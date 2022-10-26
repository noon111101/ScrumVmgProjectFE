<template>
  <div className="container">
    <div className="block" class="text-end">
      <span className="demonstration">Ngày</span> &ensp;&ensp;&ensp;&ensp;
      <el-date-picker
          style="width: 20%"
          v-model="date"
          placeholder="Ngày"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          @change="getAll">
      </el-date-picker>
      <br /><br />
    </div>
    <div class="text-end" >
      <el-input v-model="search" size="medium" placeholder="Tên nhân viên" style="width: 40%"/>
    </div>
    <br /><br />
    <div>
<!--      <div >-->
<!--        <p v-if="date!=''" style="color: cadetblue">-->
<!--          Tìm kiếm ngày: {{date}}-->
<!--        </p>-->
<!--        <p v-if="search!=''" style="color: cadetblue">-->
<!--          Tìm kiếm tên: {{search}}-->
<!--        </p>-->
<!--      </div>-->
      <el-table class="text-center"
          :data="
          logs.filter(
            (data) =>
              !search ||
              data.user.fullName.toLowerCase().includes(search.toLowerCase())
          )
        "
          cell-style="border: solid 1px"
          row-style="border: solid 1px"
          style="width: 100%;border: solid 1px; display: inline-block"
      >
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="Mã nhân viên" prop="user.code"> </el-table-column>
        <el-table-column label="Họ và tên" prop="user.fullName"> </el-table-column>
        <el-table-column label="Phòng ban" prop="user.departments.name"> </el-table-column>
        <el-table-column label="Ngày" prop="date_log"> </el-table-column>
        <el-table-column label="Giờ vào" prop="timeIn"> </el-table-column>
        <el-table-column label="Giờ ra" prop="timeOut"> </el-table-column>
        <el-table-column label="" prop="" v-slot:="data">
          <router-link :to="`/user/${data.row.user.code}/${data.row.user.departments.name}/${data.row.user.fullName}`">
            <el-button>Xem chi tiết</el-button>
<!--            <el-button type="primary" icon="el-icon-edit" circle></el-button>-->
          </router-link>

        </el-table-column>
      </el-table>
    </div>

    <el-pagination
        small
        layout="prev, pager, next"
        :total="totalItems"
        :page-size="pageSize"
        @current-change="handlePageChange"
    >
    </el-pagination>
  </div>
</template>

<script>
// import UserService from '../services/user.service';
import ExcelService from "@/services/excel-service";
import LogdetailService from "@/services/logdetail-service";
// import {router} from "@/router";

export default {
  name: "HomeVue",
  data() {
    return {
      stt: 1,
      user_code: "",
      date: "",
      logs: [],
      search: "",
      departmentId: 0,


      totalItems: 0,
      page: 0,
      pageSize: 30,
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
  created() {
    this.getUserCode();
    this.getDepartmentId();
  },
  mounted() {
    this.getAll();
  },
  methods: {
    getUserCode() {
      this.user_code = this.currentUser.user.code;
      // this.user_code = this.currentUser.user.user_code;
      console.log("user code" + this.user_code);
      },

    getDepartmentId() {
      this.departmentId = this.currentUser.user.departments.id
    },
    getAll() {
      const params = {
        "id" : this.departmentId,
        "date": this.date
      };
      LogdetailService.getLogsByDate_Department(params)
          .then((response) => {
            this.logs = response.data.content;
            this.page = response.data.pageable;
            this.totalItems = response.data.totalElements;
            console.log(this.departmentId + "fdafdsafsd")
          })
          .catch((error) => {
            console.log(error);
          });
    },
    exportExcel() {
      ExcelService.exportExcel();
    },
    handlePageChange(value) {
      this.page = value - 1;
      this.getAll();
      // if (this.search !== null) {
      //   this.searchBlogs();
      // }
      // if (this.category !== null) {
      //   this.getBlogs();
      // }else {
      //   this.getBlogs();
      // }
    },
    searchLogs() {
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        key: this.search,
        date: this.search,
      };
      LogdetailService.search(params)
          .then((response) => {
            this.logs = response.data.blogs;
            this.totalItems = response.data.totalItems;
            this.page = response.data.page;
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },
};
</script>