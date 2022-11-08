<template>
  <div className="container" style="text-align: center; width: 90%;margin: auto">
    <div style="" class="d-flex">
      <div className="block" class="text-start col-10">
        <span>Ngày</span> &ensp;
        <el-date-picker style="width: 20%;font-size: 16px;margin-right: 100px"
                        v-model="dateRange"
                        type="daterange"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        range-separator=""
                        start-placeholder="Chọn thời gian"
                        @change="getAll">
        </el-date-picker>

        <span>Bộ phận</span> &ensp;
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
              :value="item.id">
          </el-option>
        </el-select>
        <span style=" margin-left: 100px">Tìm kiếm</span> &ensp;
        <el-input v-model="search" @input="getAll" size="medium" placeholder="Tìm theo tên, email, phòng ban" style="width: 20%;"/>

      </div>
<!--      <div class="">-->
<!--        <el-input v-model="search" @input="getAll" size="medium" placeholder="Tên nhân viên" style="width: 100%"/>-->
<!--      </div>-->
    </div>


    <br/>
    <div>
      <el-table
          height="900px"
          :default-sort = "{prop: 'date_log', order: 'descending'}"
          :data="logs"
          :header-cell-style="{ background: '#D9D9D9', color: 'black', align: 'center'}"
          style="width: 100%; display: inline-block"
          :row-class-name="tableRowClassName">
        <template>



          <el-table-column label="STT" type="index" align="center" width="100px"></el-table-column>
          <el-table-column label="Mã nhân viên" prop="user.code" align="center" width="150px">
            <!--          <span>{{log.row.user.code}}</span>-->
          </el-table-column>
          <el-table-column label="Name" prop="user.fullName" align="center"></el-table-column>
          <el-table-column label="Phòng ban" prop="user.departments.name" align="center"></el-table-column>
          <el-table-column label="Email" prop="user.username" align="center"></el-table-column>
          <el-table-column label="Ngày" prop="date_log" align="center" sortable width="150px"></el-table-column>
          <el-table-column label="Giờ vào" prop="timeIn" align="center" width="150px"></el-table-column>
          <el-table-column label="Giờ ra" prop="timeOut" align="center" width="150px"></el-table-column>

        </template>
      </el-table>
    <el-pagination class="text-end"
                   background
                   layout="prev, pager, next"
                   :total="totalItems"
                   :page-size="pageSize"
                   @current-change="handlePageChange"
    >
    </el-pagination>
  </div>
  </div>
</template>

<script>
import ExcelService from "@/services/excel-service";
import LogdetailService from "@/services/logdetail-service";
import DepartmentService from "@/services/department.service";
// import { router } from "@/router";

export default {
  name: "HomeVue",
  data() {
    return {
      user_code: "",
      dateRange: "",
      from: "",
      to: "",

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
    this.getUserCode();
  },

  created() {
    DepartmentService.getAllDepartment()
        .then((response) => {
          this.departments = response.data;
          console.log(this.departments);
        })
        .catch((e) => {
          console.log(e);
        });
  },
  methods: {
    getUserCode() {
      this.user_code = this.currentUser.user.code;
      console.log("user code" + this.user_code);
      // console.log("user code"+curr)
    },
    getAll() {
      this.from = this.dateRange !== null ? this.dateRange.at(0) : null;
      this.to = this.dateRange !== null ? this.dateRange.at(1) : null;
      const params = {
        "page": this.page,
        "size": this.size,
        "id": this.departmentId,
        'from': this.from,
        'to': this.to,
        'search': this.search
      }
      LogdetailService.getLogsByDate_Department(params)
          .then((response) => {
            this.logs = response.data.content;
            this.page = response.data.pageable.pageNumber;
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
      console.log(params);
      LogdetailService.search(params)
          .then((response) => {
            this.logs = response.data.blogs;
            this.totalItems = response.data.totalItems;
            // this.page = response.data.page;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    tableRowClassName({rowIndex}) {
      if (rowIndex % 2 === 1) {
        return 'warning-row';
      } else if (rowIndex % 2 === 0) {
        return 'success-row';
      }
      return 'success-row';
    }
  },
};
</script>
<style>

* {
  font-size: 16px;
}

.el-table .warning-row {
  background: #EDEDED;
}


.el-table .success-row {
  background: #F5F5F5;
}
</style>