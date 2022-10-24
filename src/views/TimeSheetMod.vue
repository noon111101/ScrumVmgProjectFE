<template>
  <div className="container">
    <div className="block">
      <span className="demonstration">Thời gian</span> &ensp;&ensp;&ensp;&ensp;
      <el-date-picker
          style="width: 20%"
          v-model="value1"
          placeholder="Pick a day"
          type="date"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
      >
      </el-date-picker>
      <br /><br />
    </div>
    <div style="float:right">
      <el-input v-model="search" size="medium" placeholder="Tên nhân viên" />
    </div>
    <br /><br />
    <div>
      <el-table
          :data="
          logs.filter(
            (data) =>
              !search ||
              data.fullName.toLowerCase().includes(search.toLowerCase())
          )
        "
          cell-style="border: solid 1px"
          row-style="border: solid 1px"
          style="width: 80%;border: solid 1px; display: inline-block"
      >
        <el-table-column label="STT" prop="id"> </el-table-column>
        <el-table-column label="Name" prop="user.fullName"> </el-table-column>
        <el-table-column label="Mã NV" prop="user.code"> </el-table-column>
        <el-table-column label="Date" prop="date_log"> </el-table-column>
        <el-table-column label="In" prop="timeIn"> </el-table-column>
        <el-table-column label="Out" prop="timeOut"> </el-table-column>
        <el-table-column label="" prop="" v-slot:="data">
          <router-link :to="`/user/${data.row.user.code}`">
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
import {router} from "@/router";

export default {
  name: "HomeVue",
  data() {
    return {
      user_code: "",
      value1: "",
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
    this.a();

  },
  methods: {
    getUserCode() {
      this.user_code = this.$store.state.auth.user.code;
      console.log("user code" + this.user_code);
      // console.log("user code"+curr)
    },
    viewDetail(code){
      console.log(code)
      router.push(`/user/${code}`)
    },

    getDepartmentId() {
      this.departmentId = this.currentUser.user.departments.id
    },
    getAll() {
      const params = {
        "page": this.page,
        "size": this.pageSize,
        "id" : this.departmentId,
      };
      LogdetailService.getDepartment(params)
          .then((response) => {
            this.logs = response.data.content;
            this.page = response.data.pageable;
            this.totalItems = response.data.totalElements;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    a() {
      const a = String(this.logs.date_log).split("T")[0];
      this.logs.data_log = a;
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