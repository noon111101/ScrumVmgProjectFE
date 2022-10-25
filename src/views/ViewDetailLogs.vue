<template>
  <div className="container" style="text-align: center">
    <br>
    <h5 style="font-weight: 600;">
      Phòng ban: {{departmentName}}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
      Nhân viên: {{fullname}}
    </h5>
    <br><br>
    <form ac>
      <div className="block">
        <span className="demonstration">Thời gian</span> &ensp;&ensp;&ensp;&ensp;
        <el-date-picker style="width: 30%"
                        v-model="dateRange"
                        type="daterange"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        range-separator=""
                        start-placeholder="Start date"
                        end-placeholder="End date"
                        @change="getAllByDate">
        </el-date-picker>
      </div>
    </form>
    <br><br>
    <div >
      <el-table
          :data="logs"
          style="width: 60%; border: solid 1px; display: inline-block"
          cell-style="border: solid 1px"
          row-style="border: solid 1px"
          :row-class-name="tableRowClassName">
        <el-table-column
            prop="date_log"
            label="Ngày">
        </el-table-column>
        <el-table-column
            prop="timeIn"
            label="Giờ vào">
        </el-table-column>
        <el-table-column
            prop="timeOut"
            label="Giờ ra">
        </el-table-column>
      </el-table>
    </div>

    <el-pagination
        small
        layout="prev, pager, next"
        :total="totalItems"
        :page-size="pageSize"
        @current-change="handlePageChange">
    </el-pagination>
  </div>
</template>

<script>
import ExcelService from "@/services/excel-service";
import LogdetailService from "@/services/logdetail-service";
export default {
  name: 'HomeVue',
  data() {
    return {
      user_code:  "",
      dateRange: [],
      from: "",
      to: "",
      logs: [],
      totalItems: 0,
      page: 0,
      pageSize: 30,
      fullname:"",
      departmentName:"",
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      console.log(localStorage.getItem('user'))
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.getUserCode();
    this.getParams();
  },
  mounted() {
    this.getAllByDate()
  },
  methods: {
    getUserCode(){
      if(this.$route.params.code == null){
        this.user_code = this.currentUser.user.code;
        console.log(this.$route.params.code)
      }
      else{
        this.user_code = this.$route.params.code
        console.log(this.$route.params.code)
      }
    },
    getParams(){
      this.fullname = this.$route.params.fullName
      this.departmentName = this.$route.params.departmentName
       console.log(this.fullname+"dahfkdsh"+this.departmentName)
    },
    getAllByDate(){
      this.from = this.dateRange.at(0);
      this.to = this.dateRange.at(1);
      console.log(this.from,this.to)
      const params ={
        'code': this.user_code,
        'from': this.from,
        'to': this.to
      }
      LogdetailService.getByDate_UserCode(params).then(response => {
        this.logs = response.data.content;
        this.page = response.data.pageable;
        this.totalItems = response.data.totalElements;
      }).catch(error => {
        console.log(error);
      })
    },
    a() {
      const a = String(this.logs.date_log).split("T")[0]
      this.logs.data_log = a
    },
    exportExcel() {
      ExcelService.exportExcel();
    },
    handlePageChange(value) {
      this.page = value - 1;
      this.getAllByDate();
    },
    tableRowClassName() {
      return 'success-row';
    }
  },
};
</script>

<style>
</style>