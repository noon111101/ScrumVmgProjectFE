<template>
  <div className="container">
    <div className="block">
      <span className="demonstration">Thời gian</span> &ensp;&ensp;&ensp;&ensp;
      <el-date-picker
        style="width: 20%"
        v-model="date"
        placeholder="Ngày"
        type="date"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        @change="getAll"
      >
      </el-date-picker>
      <br /><br />
      <el-select
        v-model="departmentId"
        @change="getAll"
        placeholder="Chon Phòng ban"
      >
        <el-option value="0" label="All Users"></el-option>
        <el-option
          v-for="item in departments"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>
    <div style="float: right">
      <el-input v-model="search" size="medium" placeholder="Tên nhân viên" />
    </div>
    <br /><br />
    <div>
      <el-table
        :data="
          logs.filter(
            (data) =>
              !search ||
              data.user.fullName.toLowerCase().includes(search.toLowerCase())
          )
        "
        cell-style="border: solid 1px"
        row-style="border: solid 1px"
        style="width: 100%; border: solid 1px; display: inline-block"
      >
        <el-table-column label="STT" prop="id"> </el-table-column>
        <el-table-column label="Mã NV" prop="user.code"> </el-table-column>
        <el-table-column label="Ho và tên" prop="user.fullName"> </el-table-column>
        <el-table-column label="Phòng ban" prop="user.departments.name">
        </el-table-column>
        <el-table-column label="Email" prop="user.username"> </el-table-column>
        <el-table-column label="Ảnh" prop="user.cover"> </el-table-column>
        <el-table-column label="Loai tài khoản" prop="user.roles.name"> </el-table-column>
        <el-table-column v-slot:="data">
          <router-link
            :to="`/user/${data.row.user.code}/${data.row.user.departments.name}/${data.row.user.fullName}`"
          >
            <el-button>Xem chi tiết</el-button>
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
import ExcelService from "@/services/excel-service";
import LogdetailService from "@/services/logdetail-service";
import DepartmentService from "@/services/department.service";
// import UserService from "@/services/user.service";
export default {
  name: "HomeVue",
  data() {
    return {
      user_code: "",
      date: "",
      logs: [],
      search: "",
      totalItems: 0,
      page: 0,
      pageSize: 30,
      departments: [],
      departmentId: "",
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

  created() {
    DepartmentService.getAllDepartment()
      .then((response) => {
        this.departments = response.data;
      })
      .catch((e) => {
        console.log(e);
      });
  },

  methods: {
    getUserCode() {
      this.user_code = this.$store.state.auth.user.code;
      console.log("user code" + this.user_code);
    },
    getAll() {
      const params = {
        // page: this.page,
        // size: this.pageSize,
        date: this.date,
        id: this.departmentId,
      };
      LogdetailService.getLogsByDate_Department(params)
        .then((response) => {
          this.logs = response.data.content;
          this.page = response.data.pageable;
          this.totalItems = response.data.totalElements;
          console.log(response.data);
          console.log(this.date);
          console.log(this.id);
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
    },
    searchLogs() {
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        key: this.search,
        date: this.search,
      };
      console.log(params);
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
