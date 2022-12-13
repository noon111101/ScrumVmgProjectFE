<template>
  <div style="padding-bottom: 20px">
    <h2 style="font-weight: bold">Bảng tổng hợp nghỉ phép năm {{currentYear}}</h2>
    <div class="d-flex flex-row mt-3 ms-0">
      <div class="col-9">
        <span>Phòng ban </span>
        <el-select
            v-if="showAdminBoard"
            class="mx-3 my-3"
            v-model="department"
            @change="getAllByYear"
            placeholder="Chọn Phòng Ban"
        >
          <el-option label="Tất cả" value="" selected> </el-option>
          <el-option
              v-for="(item, index) in departments"
              :key="index"
              :label="item.name"
              :value="item.name"
          >
          </el-option>
        </el-select>
        <span v-if="showModeratorBoard" class="mx-3 my-3 fw-bold"
        >Phòng {{ accountDepartment.name }}</span
        >

        <span class="demonstration ms-5">Năm </span>
        <el-date-picker
            v-model="currentYear"
            type="year"
            placeholder="Chọn một năm"
            value-format="yyyy"
            @change="getAllByYear"
        >

        </el-date-picker>
      </div>
        <div class="col-3">
          <el-button
              type="danger"
              class="el-icon-download float-end ms-3 my-3"
              round
          >
            Xuất File
          </el-button>
          <el-button
              v-if="showAdminBoard"
              v-b-modal="'save-modal'"
              type="primary"
              class="el-icon-edit-outline float-end my-3"
              round
          >
            Cập nhật
          </el-button>
        </div>
    </div>
  <div
      class="table-responsive-xxl"
      style="
        background-color: white;
        width: 100%;
        display: inline-block;
        box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
      "
  >
    <table class="table table-bordered align-middle">
      <thead style="background-color: #c2c2c2">
      <tr>
        <th rowspan="2" style="width: 60px" >STT</th>
        <th rowspan="2" class="text-center" style="width: 200px">
          Họ và tên
        </th>
        <th rowspan="2" style="width: 150px" >
          Mã nhân viên
        </th>
        <th rowspan="2" style="width: 130px" >
          Thời gian tính phép
        </th>
        <th rowspan="2" style="width: 100px" >
          Số ngày được nghỉ trong năm {{currentYear}}
        </th>
        <th rowspan="2" style="width: 100px" >
          Số ngày phép dư đầu kì năm {{currentYear}}
        </th>
        <th colspan="12" class="text-center" style="width: 600px">
          Số ngày phép đã sử dụng theo tháng
        </th>
        <th rowspan="2" style="width: 90px">
          Tổng số ngày phép đã nghỉ trước tháng 4
        </th>
        <th rowspan="2" style="width: 90px">
          Tổng số ngày nghỉ phép năm {{currentYear}}
        </th>
        <th rowspan="2" style="width: 90px">
          Số ngày phép còn lại năm {{currentYear-1}}
        </th>
        <th rowspan="2" style="width: 90px">
          Số ngày phép còn lại năm {{currentYear}}
        </th>
        <th rowspan="2" style="width: 60px">
          Trả phép
        </th>
        <th rowspan="2"  style="width: 90px">
          Số ngày phép được sử dụng đến tháng hiện tại
        </th>
      </tr>
      <tr>
        <th class="text-center" v-for="(n, index) in 12" :key="index">
          {{ n }}
        </th>
      </tr>
      </thead>
      <tbody v-for="(depart,indexDepart) in furloughData" :key="indexDepart">
      <tr>
        <td style="background-color: #E0E0E04D;font-weight: bold" colspan="24">{{indexDepart}}</td>
      </tr>
      <tr :class="{
                'user-lock': !u.user.avalible,
              }"
          v-for="(u,indexUser) in depart" :key="indexUser">
        <td>{{indexUser + 1}}</td>
        <td>{{u.user.fullName}}</td>
        <td class="text-center">{{u.user.code}}</td>
        <td>{{u.user.startWork}}</td>
        <td class="fix text-center"
            :class="{
                edited: u.availibleEditStatus,
              }"
            v-b-modal="'modal-currentYear'"
            v-on:click="infoEditCurrent(u.availibleCurrentYear,indexUser,u.user.id,indexDepart)"
        >{{u.availibleCurrentYear}}</td>
        <td class="fix text-center"
            :class="{
                edited: u.previousEditStatus,
              }"
            v-b-modal="'modal-previousYear'"
            v-on:click="infoEditPrevious(u.oddCurrentYear,indexUser,u.user.id,indexDepart)"
        >{{u.oddCurrentYear}}</td>
        <td class="fix"
            :class="{
                edited: log.status,
              }"
            v-b-modal="'modal-month'"
            v-on:click="infoEditMonth(index+1,log.usedInMonth,indexUser,u.user.id,indexDepart)"
            v-for="(log, index) in u.furloughs" :key="index">{{log.usedInMonth}}</td>
        <td class="text-center">{{u.usedBeforeApril}}</td>
        <td class="text-center">{{u.usedInYear}}</td>
        <td class="text-center">{{u.leftLastYear}}</td>
        <td class="text-center">{{u.leftCurentYear}}</td>
        <td class="text-center">{{u.payFurlough}}</td>
        <td class="text-center">{{u.availibleUsePresentMonth}}</td>

      </tr>

      </tbody>
      <!--      Check không có dữ liệu hiện "NO DATA"-->

    </table>
<!--    Modal chỉnh sửa số ngày nghỉ trong tháng-->
    <b-modal id="modal-month" centered size="sm">
      <template #modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <h5>Số phép trong tháng {{monthEdit}}</h5>
        <b-icon-x-circle-fill style="color: #d8363a" size="sm" @click="close()">
        </b-icon-x-circle-fill>
      </template>
      <b-form-input
          v-model="useInMonthEdit"
          size="sm"
          min="0"
          max="31"
          type="number"
      >{{ useInMonthEdit }}</b-form-input
      >
      <template #modal-footer="{ ok }">
        <b-button
            size="sm"
            variant="success"
            @click="handleEditMonth(), ok()"
        >
          OK
        </b-button>
      </template>
    </b-modal>

<!--    Modal chỉnh sửa số ngày được nghỉ trong năm 2022-->
    <b-modal id="modal-currentYear" centered style="width: 100px">
      <template #modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <h5 class="text-center">Số ngày được nghỉ trong năm {{monthEdit}}</h5>
        <b-icon-x-circle-fill style="color: #d8363a" size="sm" @click="close()">
        </b-icon-x-circle-fill>
      </template>
      <b-form-input
          v-model="currentFurloughYearEdit"
          size="sm"
          min="0"
          max="31"
          type="number"
      >{{ currentFurloughYearEdit }}</b-form-input
      >
      <template #modal-footer="{ ok }">
        <b-button
            size="sm"
            variant="success"
            @click="handleEditCurrent(), ok()"
        >
          OK
        </b-button>
      </template>
    </b-modal>

<!--    Modal chỉnh sửa số ngày phép dư đầu kì-->
    <b-modal id="modal-previousYear" centered style="width: 100px">
      <template #modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <h5>Số ngày phép dư đầu kì năm {{monthEdit}}</h5>
        <b-icon-x-circle-fill style="color: #d8363a" size="sm" @click="close()">
        </b-icon-x-circle-fill>
      </template>
      <b-form-input
          v-model="previousFurloughYearEdit"
          size="sm"
          min="0"
          max="31"
          type="number"
      >{{ previousFurloughYearEdit }}</b-form-input
      >
      <template #modal-footer="{ ok }">
        <b-button
            size="sm"
            variant="success"
            @click="handleEditPrevious(), ok()"
        >
          OK
        </b-button>
      </template>
    </b-modal>
    <!--    MODAL Lưu chỉnh sửa -->
    <b-modal id="save-modal" centered style="width: 100px" size="md">
      <template #modal-header="{}">
        <!-- Emulate built in modal header close button action -->
        <h5>Xác nhận lưu tất cả chỉnh sửa</h5>
      </template>
      <span style="color: #75c4c0">Lưu</span><span> hoặc</span
    ><span style="color: #ff0000"> Xóa</span><span> tất cả chỉnh sửa</span>
      <template #modal-footer="{ ok }">
        <b-button variant="danger" @click="handleDeleteEdit(), ok()"
        >Xoá</b-button
        >
        <b-button @click="ok()">Tiếp tục chỉnh sửa</b-button>
        <b-button
            style="background-color: #75c4c0"
            @click="handelUpdate(), ok()"
        >
          Lưu
        </b-button>
      </template>
    </b-modal>
  </div>
  </div>
</template>

<script>
import FurloughService from "@/services/furlough.service";
import LogService from "@/services/logdetail-service";
export default {
  name: "ReportFurlough",
  data(){
    return {
      currentYear:new Date().getFullYear().toString(),
      furloughData:'',
      monthEdit:'',
      department: null,
      departments: [],
      useInMonthEdit:'',
      currentFurloughYearEdit:'',
      previousFurloughYearEdit:'',
      userIdEdit:'',
      userIndexEdit:'',
      departmentEdit:'',
      listEdit:{
        monthFurloughEdits:[],
        furloughPreviousEdits:[],
        furloughCurrentEdits:[]
      }
    }
  },
  methods :{
    getDepartment() {
      LogService.getDepartment().then((respone) => {
        this.departments = respone.data;
        console.log(respone.data);
      });
    },
    getAllByYear(){
      FurloughService.getAllByYear({
        'year':this.currentYear,
        'department':this.department
      }).then(respone => {
        this.furloughData=respone.data
        console.log(this.furloughData)
      })
    },
    infoEditMonth(month,useInMonth,userIndex,userId,depart){
      this.monthEdit=month;
      this.useInMonthEdit=useInMonth;
      this.userIndexEdit=userIndex;
      this.userIdEdit=userId;
      this.departmentEdit=depart
    },
    infoEditCurrent(furloughCurrent,userIndex,userId,depart){
      this.currentFurloughYearEdit=furloughCurrent;
      this.userIndexEdit=userIndex;
      this.userIdEdit=userId;
      this.departmentEdit=depart
    },
    infoEditPrevious(furloughPrevious,userIndex,userId,depart){
      this.previousFurloughYearEdit=furloughPrevious;
      this.userIndexEdit=userIndex;
      this.userIdEdit=userId;
      this.departmentEdit=depart
    },
    handleEditMonth(){
      for(let depart in this.furloughData){
        if(depart==this.departmentEdit){
          this.furloughData[depart][this.userIndexEdit].furloughs[this.monthEdit-1].usedInMonth= this.useInMonthEdit
          this.furloughData[depart][this.userIndexEdit].furloughs[this.monthEdit-1].status=true;
          this.listEdit.monthFurloughEdits.push({
            id:this.userIdEdit,
            month:this.monthEdit,
            used:this.useInMonthEdit
          })
        }
      }
    },
    handleEditCurrent(){
      for(let depart in this.furloughData){
        if(depart==this.departmentEdit){
          this.furloughData[depart][this.userIndexEdit].availibleCurrentYear= this.currentFurloughYearEdit
          this.furloughData[depart][this.userIndexEdit].availibleEditStatus=true;
          this.listEdit.furloughCurrentEdits.push({
            id:this.userIdEdit,
            availibleCurrentYear:this.currentFurloughYearEdit
          })
          console.log(this.listEdit.year)
        }
      }
    },
    handleEditPrevious(){
      console.log(this.useInMonthEdit)
      for(let depart in this.furloughData){
        if(depart==this.departmentEdit){
          this.furloughData[depart][this.userIndexEdit].oddCurrentYear= this.previousFurloughYearEdit
          this.furloughData[depart][this.userIndexEdit].previousEditStatus=true;
          this.listEdit.furloughPreviousEdits.push({
            id:this.userIdEdit,
            oddCurrentYear:this.previousFurloughYearEdit
          })
        }
      }
    },
    handleDeleteEdit() {
      this.getAllByYear();
      this.$swal.fire({
        title: "Xóa chỉnh sửa thành công",
        type: "success",
        icon: "success",
        showCloseButton: true,
      });
    },
    handelUpdate() {
      this.listEdit.year=Number.parseInt(this.currentYear)
      FurloughService.edit(this.listEdit)
          .then((respone) => {
            console.log(respone);
            this.$swal.fire({
              title: "Cập nhật thành công",
              text:respone.data.message,
              type: "success",
              icon: "success",
              showCloseButton: true,
            });
            this.getAllByYear();
            this.listEdit = {
              monthFurloughEdits:[],
                  furloughPreviousEdits:[],
                  furloughCurrentEdits:[],
                  year: Number.parseInt(this.currentYear)
            };
          })
          .catch((error) => {
            console.log(error);
            this.$swal.fire({
              title: "Cập nhật thất bại",
              type: "error",
              text: error.response.data.message,
              icon: "error",
              showCloseButton: true,
            });
          });
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_ADMIN");
      }
      return false;
    },
    showModeratorBoard() {
      if (this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_MANAGE");
      }
      return false;
    }
  },
  mounted() {
    this.getDepartment();
    this.getAllByYear()
  }
}
</script>

<style scoped>
tr th {
  vertical-align: middle;
}
.edited {
  background-color: #e24146 !important;
  color: white;
}
.user-lock {
  background-color: #ed9696 !important;
}
.fix:hover {
  background-color: #e24146;
  color: white;
}
.fix {
  padding: 10px !important;
}
</style>