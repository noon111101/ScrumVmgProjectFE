<template>
  <div>
    <div class="row mt-5 ms-0 ">
      <div class="col-3">
        <label-wrap class="mx-3">Bộ phận:</label-wrap>
        <el-select v-model="department" @change="getLog" placeholder="Chọn Bộ phận">
          <el-option
              label="Tất cả"
              value=""
              selected
          >
          </el-option>
          <el-option
              v-for="(item,index) in departments"
              :key="index"
              :label="item.name"
              :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="col-4">
        <el-input
            size="medium"
            placeholder="Tìm kiếm nhân viên"
            v-model="search"
            @input="handelSearch"
        >
        </el-input>
      </div>
      <div class="col-2 ">
        <el-select v-model="currentMonth" @change="getLog" placeholder="Tháng">
          <el-option
              v-for="item in 12"
              :key="item"
              :value="item"
              :label= "`Tháng ` + item"
          >
            Tháng {{item}}
          </el-option>
        </el-select>
      </div>
      <div class="col-3" >
        <el-button @click="exportExcel"  type="danger" class="el-icon-upload2" round> Xuất File</el-button>
        <el-button type="primary" class="el-icon-edit-outline float-end " @click="handelUpdate" round>Cập nhật</el-button>
      </div>
    </div>

    <div class="table-responsive-xxl" style="margin-top:50px">
      <table class="table table-bordered align-middle  ">
        <thead style="background-color: #C2C2C2">
        <tr>
          <th rowspan="2">TT</th>
          <th rowspan="2" style="white-space: pre">Họ tên</th>
          <th colspan="31" class="text-center">Ngày trong tháng</th>
          <th rowspan="2" style="white-space: pre" >Tổng số <br>ngày làm <br>việc</th>
          <th rowspan="2" style="white-space: pre" >Tổng số <br>ngày hưởng <br>lương</th>
        </tr>
        <tr>
          <th class="text-center" v-for="(n,index) in 31 " :key="index">{{n}}</th>
        </tr>
        </thead>
        <tbody v-if="!checkNone">
          <tr  v-for="(user,indexLog) in users " :key="indexLog">
          <td>{{indexLog+1}}</td>
          <td style="white-space: pre">{{user.name}}</td>
          <td  v-b-modal="'my-modal'" class="fix text-center position-relative" :class="{'edited':log.status , 'weekend':checkWeekend(index+1) && !log.status}" v-on:click="infoEdit(index,user.code,log.sign)" v-for="(log,index) in user.log " :key="index">
            {{log.sign}}
            <el-tooltip popper-class="reason-popper" v-if="log.reason!=null" placement="right" effect="light">
              <div style="border: #a843a8 1px;" slot="content">multiple lines<br/>second line</div>
              <div class="el-icon-s-comment position-absolute top-0 end-0 "></div>
            </el-tooltip>
          </td>
          <td class="text-center">{{user.dayWork}}</td>
          <td class="fix text-center" @click="infoDayEdit(user.dayEarn,user.code)" v-b-modal="'my-modal1'">{{user.dayEarn}}</td>
        </tr>
        </tbody>
        <tbody v-if="checkNone">
        <tr>
          <td colspan="35" class="text-center">No data</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="flex-column" style="margin-top:20px">
      <div style="font-weight: bold;">Chú thích</div>
      <div style="text-align: justify">
        <p>KL/H,H/KL: Nghỉ nửa ngày</p>
        <p>KL: Nghỉ không lương</p>
        <p>H: Làm hành chính</p>
        <p>NT: Nghỉ tuần</p>
      </div>
    </div>
    <b-modal id="my-modal" centered size="sm" >
      <template #modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <h5>Chỉnh sửa chấm công</h5>
        <b-icon-x-circle-fill style="color: #d8363a" size="sm" @click="close()">
        </b-icon-x-circle-fill>
      </template>
      <b-form-radio v-model="selected" v-for="(sign,index) in signs" :disabled="!signs.includes(selected)?true:false" :key="index"  :name="sign" :value="sign">{{ sign }}</b-form-radio>
      <div v-if="signs.includes(selected)" class="mt-2 my-2 ">
        Nhập lý do :
      </div>
      <b-form-input v-if="signs.includes(selected)" v-model="reason"  size="sm" autofocus="true" type="text">}</b-form-input>
      <template #modal-footer="{ok}">
        <b-button size="sm" variant="success" @click="handleEdit(dateEdit,codeEdit,selected,reason),ok()">
          OK
        </b-button>

      </template>
    </b-modal>
    <b-modal id="my-modal1" centered size="sm" >
      <template #modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <h5>Số ngày hưởng lương</h5>
        <b-icon-x-circle-fill style="color: #d8363a" size="sm" @click="close()">
        </b-icon-x-circle-fill>
      </template>
      <b-form-input v-model="dayEarn" size="sm" min="0" max="31" type="number">{{dayEarn}}</b-form-input>
      <template #modal-footer="{ok}">
        <b-button size="sm" variant="success" @click="handleDayEarn(dayEarn,codeEdit),ok()">
          OK
        </b-button>
      </template>
    </b-modal>
  </div>

</template>

<script>
// import UserService from '../services/user.service';
import ExcelService from "@/services/excel-service";
import LogService from "@/services/logdetail-service"
export default {
  name: 'HomeVue',
  data() {
    return {
      users:[],
      checkNone:false,
      search: '',
      department:'',
      departments:[],
      signs:["H","KL","NT","H_KL","KL_H"],
      selected: '',
      dateEdit:'',
      codeEdit:'',
      logsEdit:[],
      dayEarn:0,
      reason:'',
      currentMonth:new Date().getMonth()+1,
      currentYear:'',
      currentDepartment:'',
    }
  },

  methods: {
    //event handler
    infoEdit(date,code,sign){
      this.dateEdit=date;
      this.codeEdit=code;
      this.selected=sign
    },
    infoDayEdit(dayEarn,code){
      this.codeEdit=code;
      this.dayEarn=dayEarn
    },
    handleDayEarn(dayEarn,code){
      for (let user of this.users) {
        if (user.code == code) {
          user.dayEarn=dayEarn
        }
      }
    },
    handelSearch(){
      if(this.search!='')
        this.users=this.users.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()))
      if(this.search=='')
        this.getLog();
        },
    handleEdit(date, code,sign,reason) {
      for (let user of this.users) {
            if(user.code==code){
              if(user.log[date].sign==sign)
                return
              console.log(user,user.log[date],sign)
              user.log[date].sign=sign
              user.log[date].status=true
              user.dayEarn=this.caculateDayWork(user.log)
              user.log[date].reason=reason
              this.logsEdit.push({
                date:user.log[date].date,
                code:code,
                sign:sign
              });
            }
        }

      console.log(this.logsEdit)
    },
    handelUpdate(){
      LogService.updateLog(this.logsEdit).then(respone =>{
        console.log(respone)
      })
      this.logsEdit=[]
    }
   ,
    //CaculateDayWork
    caculateDayWork(signs){
      let dayWork=0
      for(let sign of signs){
        if(sign.sign=="H")
          dayWork=dayWork+1;
        if(sign.sign=="H_KL")
          dayWork=dayWork+0.5;
        if(sign.sign=="KL_H")
          dayWork=dayWork+0.5;
      }
      return dayWork
    },
     checkWeekend(date){
      let formDate=this.currentYear+"-"+this.currentMonth+"-"+date;
      const today = new Date(formDate);
      const day = today.getDay();
      if(day==0||day==6)
        return true
      else return false
    },
    // Call API method
    exportExcel(){
      ExcelService.exportExcel();
    },
    getDepartment(){
      LogService.getDepartment().then(respone => {
        this.departments=respone.data
        console.log(respone.data)
      });
    },
    getLog(){
      LogService.getAllByMonthAndDepartment(
          {
            month : this.currentMonth,
            id:this.department
          }
      ).then(respone => {
        let dataCall=[]
        let data =respone.data;
        console.log(data.length)
        for(let users of data){
            let signs=[];
            for(let i=1;i<=31;i++){
              //get All LogDetail
              let dates=[]
              for(let user of users.logDetail){
                let date = Number(user.date_log.split("-")[2])
                let year = user.date_log.split("-")[0]
                this.currentYear=year
                dates.push(date)
                if(date==i){
                  signs.push(
                      {
                        sign: user.signs.name,
                        status:false,
                        date:user.date_log,
                        reason:user.reason
                      }
                  )
                }
                }
              let formDate=this.currentYear+"-"+this.currentMonth+"-"+i;
              if(!dates.includes(i)){
                signs.push(
                    {
                      sign: '_',
                      status:false,
                      date: formDate,
                      reason:null
                    }
                )
              }
            }
            dataCall.push(
                {
                  code: users.code,
                  log:signs,
                  name:users.name,
                  dayWork:this.caculateDayWork(signs),
                  dayEarn:this.caculateDayWork(signs)
                })
        }
        if(data.length>0){
          this.users=dataCall
          this.checkNone=false
        }
        if(data.length==0){
          this.users=[]
          this.checkNone=true
        }
        console.log(this.users)
      });
    },
  },
  computed:{
  },
  mounted(){
    this.getDepartment();
    this.getLog();

  },
};
</script>
<style>
.boder-round{
  border-radius: 6px;
}
.fix:hover {
  background-color: #e24146;
  color: white;
}
.fix{
  padding: 10px !important;
}
.edited{
  background-color: #e24146 !important;
  color: white;
}
.weekend{
  background-color: #F8CBAD !important;
}
.reason-popper{
  border: #a843a8 1px;
}
</style>