<template>
  <div className="container">
    <div className="block">
      <span className="demonstration">Thời gian</span> &ensp;&ensp;&ensp;&ensp;
      <el-date-picker
        style="width: 30%"
        v-model="value1"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
      >
      </el-date-picker>
    </div>
    <br /><br />
    <div>
      <el-table
        :data="logs"
        cell-style="border: solid 1px"
        row-style="border: solid 1px"
        style="width: 60%; border: solid 1px; display: inline-block"
      >
        <el-table-column label="Date" prop="date_log"> </el-table-column>
        <el-table-column label="In" prop="timeIn"> </el-table-column>
        <el-table-column label="Out" prop="timeOut"> </el-table-column>
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

export default {
  name: "HomeVue",
  data() {
    return {
      user_code: "",
      value1: "",
      logs: [],
      search: "",
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
  mounted() {
    this.getAll();
    this.a();
    this.getUserCode();
  },
  methods: {
    getUserCode() {
      this.user_code = this.$store.state.auth.user.code;
      console.log("user code" + this.user_code);
      // console.log("user code"+curr)
    },
    getAll() {
      const params = {
        page: this.page,
        size: this.pageSize,
      };
      LogdetailService.getAll(params)
        .then((response) => {
          this.logs = response.data.content;
          this.page = response.data.pageable;
          this.totalItems = response.data.totalElements;
          console.log(this.totalItems);
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
  },
};
</script>
