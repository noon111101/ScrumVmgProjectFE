<template>
  <div className="container" style="text-align: center; width: 90%;margin: auto">
    <div className="block" class="text-start">

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
      <br /><br />

      <router-link to="/add-user" class="nav-link sel">
        <el-button type="danger" round><i class="el-icon-plus"></i> Thêm nhân viên </el-button>
      </router-link>

    </div>
    <div style="float: right">
      <el-input v-model="search" size="medium" placeholder="Tên nhân viên" />
    </div>
    <br /><br />


    <div>

      <el-table
          :data="
          users.filter(
            (data) =>
              !search ||
              data.fullName.toLowerCase().includes(search.toLowerCase())
          )
        "
          :header-cell-style="{ background: '#909399', color: 'white', align: 'center'}"
          border="true"
          :cell-style="{border: '1px solid'}"
          :row-style="{border: '1px solid'}"
          style="width: 100%; display: inline-block"
      >
        <el-table-column label="STT" type="index"> </el-table-column>
        <el-table-column label="Mã NV" prop="code"> </el-table-column>
        <el-table-column label="Ho và tên" prop="fullName"> </el-table-column>
        <el-table-column label="Phòng ban" prop="departments.name">
        </el-table-column>
        <el-table-column label="Email" prop="username"> </el-table-column>
        <el-table-column label="Ảnh" v-slot:="data">
          <img v-bind:src="`http://localhost:8080/uploads/images/` + data.cover" width="50px">
        </el-table-column>
<!--        <el-table-column label="Chức vụ" v-slot:="data">-->
<!--          <p  v-for="(role,index) in data.roles.name" :key="index" >-->
<!--            <span v-if="role=='ROLE_USER'">Nhân viên</span>-->
<!--            <span v-if="role=='ROLE_MANAGE'">Trưởng phòng</span>-->
<!--            <span v-if="role=='ROLE_ADMIN'">Phòng nhân sự</span>-->
<!--          </p>-->
<!--        </el-table-column>-->
        <el-table-column label="Chỉnh sửa">
          <router-link :to="`/edit`">
            <el-button type="info">Chỉnh sửa</el-button>
          </router-link>
        </el-table-column>
        <el-table-column label="Trạng thái">
          <label class="switch">
            <input type="checkbox" checked>
            <span class="slider round"></span>
          </label>
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
// import LogdetailService from "@/services/logdetail-service";
import DepartmentService from "@/services/department.service";
import UserService from "@/services/user.service";
export default {
  name: "HomeVue",
  data() {
    return {
      user_code: "",
      date: "",
      users: [],
      search: "",
      totalItems: 0,
      page: 0,
      pageSize: 10,
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

  },

  created() {
    this.getAll();
    this.getUserCode();
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
      this.user_code = this.currentUser.user.user_code;
      console.log("user code" + this.user_code);
    },
    getAll() {
      const params = {
        "page": this.page,
        "size": this.pageSize,
        "departid": this.departmentId
      };
      UserService.getUser_Department(params)
          .then((response) => {
            this.users = response.data.content;
            this.page = response.data.pageable.pageNumber;
            console.log(response.data.pageable.pageNumber)
            this.totalItems = response.data.totalElements;
            console.log(response.data.content+"fdasfds");
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
    },
    // searchLogs() {
    //   const params = {
    //     page: this.page,
    //     pageSize: this.pageSize,
    //     key: this.search,
    //     date: this.search,
    //   };
    //   console.log(params);
    //   LogdetailService.search(params)
    //       .then((response) => {
    //         this.logs = response.data.blogs;
    //         this.totalItems = response.data.totalItems;
    //         this.page = response.data.page;
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    // },
  },
};
</script>
<style>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>