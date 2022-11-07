<template style="font-size: 16px">
  <div
      className="container"
      style=" width: 90%; margin: auto"
  >
    <div style="" class="d-flex flex-row mt-3 ms-0 ">
      <div style="width: 200px" class="col-9  ">
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

      <div style="width: 200px" class="mx-3 fw-bold">
        <el-input v-model="search" size="medium" placeholder="Tên nhân viên"/>
      </div>


      <div style="float: right;margin-bottom: 20px" class="mx-3">
        <router-link to="/add-user" style="width: 200px;">
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
        <el-table-column label="STT" type="index" align="center" width="100px"></el-table-column>
        <el-table-column label="Mã NV" prop="code" align="center" width="100px"></el-table-column>
        <el-table-column label="Ho và tên" prop="fullName" header-align="center"></el-table-column>
        <el-table-column label="Phòng ban" prop="departments.name" header-align="center">
        </el-table-column>
        <el-table-column label="Email" prop="username" header-align="center"></el-table-column>
        <el-table-column label="Ảnh" v-slot:="data" align="center" width="210px">
          <img v-if="data.row.cover!=null"
               v-bind:src="
              `http://localhost:8080/uploads/images/` + data.row.cover
            "
               width="150px"
          />
          <img v-if="data.row.cover==null"
               src="../assets/user.jpg"
               width="150px"
          />
        </el-table-column>
        <el-table-column v-slot:="data" label="Chức vụ" width="150px" align="center">
          <p class="text-muted mb-0" v-for="(role,index) in data.row.roles" :key="index">
            <span v-if="role.id==1">Nhân viên</span>
            <span v-if="role.id==2">Trưởng phòng</span>
            <span v-if="role.id==3">Phòng nhân sự</span>
            <!--                  {{role}}-->
          </p>
        </el-table-column>
        <el-table-column v-slot:="data" label="Trạng thái" width="150px" align="center">
          <button v-if="data.row.avalible==true" class="tt1">Có hiệu lực</button>
          <button v-if="data.row.avalible!=true" class="tt2">Vô hiệu lực</button>
        </el-table-column>
        <el-table-column v-slot:="data" label="Chỉnh sửa" width="150px" align="center">
          <!--          <font-awesome-icon icon="fa-duotone fa-pen-to-square" />-->
          <router-link :to="`/user/${data.row.id}`">
            <button
                style="border: none;padding: 5px 5px; background-color: #F8CBAD; margin-right: 10px;border-radius: 50%">
              <i class="el-icon-edit-outline " style="width: 30px;"></i>
            </button>

          </router-link>
          <button v-if="data.row.avalible==1" class="btn-action"
                  @click="changeStatus(data.row.id,data.row.fullName,data.row.avalible)">
            <i class="el-icon-unlock " style="width: 30px;"></i>
          </button>
          <button v-if="data.row.avalible==0" class="btn-action"
                  @click="changeStatus(data.row.id,data.row.fullName,data.row.avalible)">
            <i class="el-icon-lock " style="width: 30px;"></i>
          </button>


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
import AuthService from "@/services/auth.service";
// import $swal from "sweetalert2";


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
      dialogFormVisible: false,
      user: {
        username: "",
        fullName: "",
        role: [],
        department: "",
        code: "",
        gender: "",
      },
      submitted: false,
      successful: false,
      message: "",
      newImage: "",
      cover: {},
      formLabelWidth: "120px",

      errId: "",
      checkId: true,
      errEmail: "",
      checkEmail: true,
      errName: "",
      checkName: true,
      errDepartment: "",
      checkDepartment: true,
      errGender: "",
      checkGender: true,
      errRole: "",
      checkRole: true,
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
        search: this.search,
        status: this.status
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
    changeStatus(id, name, status) {
      if(status==1){
        this.$swal.fire({
          title: 'Khóa tài khoản ' + name + '?',
          showDenyButton: true,
          confirmButtonColor: "#ED9696",
          confirmButtonText: 'Khóa',
          denyButtonColor: "#75C4C0",
          denyButtonText: 'Đóng',
          customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
          }
        }).then(result => {
          if (result.isConfirmed) {
            AuthService.lockAccount(id).then(response => {
              this.$swal.fire(
                  {
                    title: response.data.message,
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    width: '24em',
                  }
              )
              this.getAll()
            })

          } else if (result.isDenied) {
            this.$swal.fire(
                {
                  title: "Thay đổi thất bại",
                  icon: 'error',
                  timer: 2000,
                  timerProgressBar: true,
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  width: '24em',
                }
            )
          }
        })
      }
      else{
        this.$swal.fire({
          title: 'Mở tài khoản ' + name + '?',
          showDenyButton: true,
          confirmButtonColor: "#75C4C0",
          confirmButtonText: 'Mở',
          denyButtonColor: "#ED9696",
          denyButtonText: 'Đóng',
          customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
          }
        }).then(result => {
          if (result.isConfirmed) {
            AuthService.lockAccount(id).then(response => {
              this.$swal.fire(
                  {
                    title: response.data.message,
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    width: '24em',
                  }
              )
              this.getAll()
            })

          } else if (result.isDenied) {
            this.$swal.fire(
                {
                  title: "Thay đổi thất bại",
                  icon: 'error',
                  timer: 2000,
                  timerProgressBar: true,
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  width: '24em',
                }
            )
          }
        })
      }

      // AuthService.lockAccount(id).then(response => {
      //   this.$swal.fire(
      //       {
      //         title: response.data.message,
      //         icon: 'success',
      //         timer: 2000,
      //         timerProgressBar: true,
      //         toast: true,
      //         position: 'top-end',
      //         showConfirmButton: false,
      //         width: '24em',
      //       }
      //   )
      //   this.getAll()
      // })


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

.el-table .tt1 {
  color: black;
  background-color: #75C4C0;
  border: none;
  border-radius: 5px;
  padding: 3px 20px;
}

.el-table .tt2 {
  color: black;
  background-color: #ED9696;
  border: none;
  border-radius: 5px;
  padding: 3px 20px;
}

.el-table .btn-action {
  border: none;
  padding: 5px 5px;
  background-color: #F8CBAD;
  border-radius: 50%
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
