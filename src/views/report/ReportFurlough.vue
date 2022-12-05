<template>
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
      <tr v-for="(u,indexUser) in depart" :key="indexUser">
        <td>{{indexUser + 1}}</td>
        <td>{{u.user.fullName}}</td>
        <td class="text-center">{{u.user.code}}</td>
        <td>{{u.user.startWork}}</td>
        <td class="fix text-center">{{u.availibleCurrentYear}}</td>
        <td class="fix text-center">{{u.oddCurrentYear}}</td>
        <td class="fix"
            :class="{
                edited: log.status,
              }"
            v-b-modal="'modal-month'"
            v-on:click="infoEditMonth(index,log.usedInMonth,indexUser,indexDepart)"
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
  </div>
</template>

<script>
import FurloughService from "@/services/furlough.service";
export default {
  name: "ReportFurlough",
  data(){
    return {
      currentYear:new Date().getFullYear(),
      furloughData:'',
      monthEdit:'',
      useInMonthEdit:'',
      userIndexEdit:'',
      departmentEdit:''
    }
  },
  methods :{
    getAllByYear(year){
      FurloughService.getAllByYear({'year':year}).then(respone => {
        this.furloughData=respone.data
        console.log(this.furloughData)
      })
    },
    infoEditMonth(month,useInMonth,userIndex,depart){
      this.monthEdit=month;
      this.useInMonthEdit=useInMonth;
      this.userIndexEdit=userIndex;
      this.departmentEdit=depart
    },
    handleEditMonth(){
      console.log(this.useInMonthEdit)
      for(let depart in this.furloughData){
        if(depart==this.departmentEdit){
          this.furloughData[depart][this.userIndexEdit].furloughs[this.monthEdit].usedInMonth= this.useInMonthEdit
          this.furloughData[depart][this.userIndexEdit].furloughs[this.monthEdit].status=true;
        }
      }
    }
  },
  mounted() {
    this.getAllByYear(this.currentYear)
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
.fix:hover {
  background-color: #e24146;
  color: white;
}
.fix {
  padding: 10px !important;
}
</style>