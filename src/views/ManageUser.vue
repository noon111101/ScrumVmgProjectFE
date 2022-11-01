<template style="font-size: 16px">
  <div
      className="container"
      style=" width: 90%; margin: auto"
  >
    <div style="">
      <div style="width: 200px">
      <el-select
          v-model="departmentId"
          @change="getAll"
          placeholder="Chọn Phòng ban"
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

      <div style="width: 200px">
        <el-input v-model="search" size="medium" placeholder="Tên nhân viên"/>
      </div>

      <div style="float: right;margin-bottom: 20px">
        <router-link to="/add-user" style="width: 200px">
          <el-button type="danger" round
          ><i class="el-icon-plus"></i> Thêm nhân viên
          </el-button>
        </router-link>
      </div>

    </div>

    <br/>
    <div>
      <el-table
          :data="
          users.filter(
            (data) =>
              !search ||
              data.fullName.toLowerCase().includes(search.toLowerCase())
          )
        "
          :header-cell-style="{ background: '#D9D9D9', color: 'black', align: 'center'}"
          style="width: 100%; display: inline-block;font-size: 16px"
          :row-class-name="tableRowClassName">
        >
        <el-table-column label="STT" type="index" align="center" width="100px"  ></el-table-column>
        <el-table-column label="Mã NV" prop="code" align="center" width="100px"></el-table-column>
        <el-table-column label="Ho và tên" prop="fullName" header-align="center"></el-table-column>
        <el-table-column label="Phòng ban" prop="departments.name" header-align="center">
        </el-table-column>
        <el-table-column label="Email" prop="username" header-align="center"></el-table-column>
        <el-table-column label="Ảnh" v-slot:="data" align="center"  width="210px">
          <img
              v-bind:src="
              `http://localhost:8080/uploads/images/` + data.row.cover
            "
              width="150px"
          />
        </el-table-column>
        <el-table-column v-slot:="data" label="Chức vụ"  width="150px" align="center" >
          <p class="text-muted mb-0"   v-for="(role,index) in data.row.roles" :key="index" >
            <span v-if="role.id==1">Nhân viên</span>
            <span v-if="role.id==2">Trưởng phòng</span>
            <span v-if="role.id==3">Phòng nhân sự</span>
            <!--                  {{role}}-->
          </p>
        </el-table-column>
        <el-table-column v-slot:="data" label="Trạng thái" width="150px" align="center">
          <button v-if="data.row.avalible==true"  class="tt1">Có hiệu lực</button>
          <button v-if="data.row.avalible!=true"  class="tt2">Vô hiệu lực</button>
        </el-table-column>
        <el-table-column v-slot:="data" label="Chỉnh sửa" width="150px" align="center" >
          <font-awesome-icon icon="fa-duotone fa-pen-to-square" />
          <router-link :to="`/users/${data.row.id}`">
            <i class="el-icon-edit-outline"></i>
          </router-link>
          <a>
            <b-icon icon="unlock-fill" class="rounded bg-primary p-1" variant="light" ></b-icon>
          </a>

        </el-table-column>

      </el-table>
    </div>
    <el-pagination class="text-end"
                   background
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
        page: this.page,
        size: this.pageSize,
        departid: this.departmentId,
      };
      UserService.getUser_Department(params)
          .then((response) => {
            this.users = response.data.content;
            this.page = response.data.pageable.pageNumber;
            console.log(response.data.pageable.pageNumber);
            this.totalItems = response.data.totalElements;
            console.log(response.data.content + "fdasfds");
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
.el-table .warning-row {
  background: #EDEDED;
}


.el-table .success-row {
  background: #F5F5F5;
}

.el-table .tt1{
  color: black;
  background-color: #75C4C0;
  border: none;
  border-radius: 5px;
  padding: 3px 20px;
}

.el-table .tt2{
  color: black;
  background-color: #ED9696;
  border: none;
  border-radius: 5px;
  padding: 3px 20px;
}



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
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
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
