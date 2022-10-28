<template>
  <div className="container" style="text-align: center; width: 90%;margin: auto">
    <div class="row mt-5">
      <div class="col-3">
        <label-wrap>Bộ phận:</label-wrap>
        <el-select v-model="department" @change="getLog" placeholder="Chọn Bộ phận">
          <el-option
              v-for="(item,index) in departments"
              :key="index"
              :label="item.name"
              :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="col-3">
        <el-input
            size="medium"
            placeholder="Tìm kiếm nhân viên"
            v-model="search"
            @input="handelSearch"
        >
        </el-input>
      </div>
      <div class="col-3">
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
        <el-button v-if="!editMod" type="warning" @click="inEditMode" class="el-icon-edit-outline" round> Chỉnh sửa</el-button>
        <el-button v-if="!editMod" @click="exportExcel"  type="danger" class="el-icon-download" round> Xuất File</el-button>
        <el-button v-if="editMod" @click="outEditMode"  type="primary" class="el-icon-upload2" round> Cập nhật</el-button>
      </div>
    </div>

    <div class="table-responsive" style="margin-top:50px">
      <table class="table table-bordered  align-middle ">
        <thead>
        <tr>
          <th rowspan="2">TT</th>
          <th rowspan="2" style="white-space: pre">Họ tên</th>
          <th colspan="31">Ngày trong tháng</th>
          <th rowspan="2" style="white-space: pre" >Tổng số <br>ngày làm <br>việc</th>
          <th rowspan="2" style="white-space: pre" >Tổng số <br>ngày hưởng <br>lương</th>
        </tr>
        <tr>
          <th v-for="(n,index) in 31 " :key="index">{{n}}</th>
        </tr>
        </thead>
        <tbody v-if="!editMod">
        <tr  v-for="(log,indexLog) in logs " :key="indexLog">
          <td>{{indexLog+1}}</td>
          <td style="white-space: pre">{{log.name}}</td>
          <td v-for="(nSign,index) in 31 " :class="edited(log.code,nSign)?'edited':'fix'" :key="index">
            {{getSign(nSign,log.code)}}
          </td>
          <td>1</td>
          <td class="fix">1</td>
        </tr>
        </tbody>
        <tbody v-if="editMod">
        <tr  v-for="(log,indexLog) in logs " :key="indexLog">
          <td>{{indexLog+1}}</td>
          <td style="white-space: pre">{{log.name}}</td>
          <td v-b-modal="'my-modal'" :class="edited(log.code,nSign)?'edited':'fix'" v-on:click="infoEdit(nSign,log.code)" v-for="(nSign,index) in 31 " :key="index">
            {{getSign(nSign,log.code)}}
          </td>
          <td>1</td>
          <td class="fix">1</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div style="display: flex; margin-top:20px">
      <h5 style="font-weight: bold;">Ký hiệu:</h5>
      <div style="margin-left:20px;text-align: justify">
        <p>H: Làm hành chính</p>
        <p>NT: Nghỉ thứ 7, Chủ nhật</p>
      </div>
    </div>
    <b-modal id="my-modal" centered size="sm" >
      <template #modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <h5>Chỉnh sửa chấm công</h5>
        <b-icon-x-circle-fill style="color: #d8363a" size="sm" @click="close()">
        </b-icon-x-circle-fill>
      </template>
      <b-form-radio v-model="selected" v-for="(sign,index) in signs" :key="index"  :name="sign" :value="sign">{{ sign }}</b-form-radio>
      <template #modal-footer="{ok}">
        <b-button size="sm" variant="success" @click="handleEdit(dateEdit,codeEdit,selected),ok()">
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
      user:[],
      editMod:false,
      search: '',
      department:'',
      departments:[],
      signs:["H","NT","KL","H_KL","KL_H"],
      selected: '',
      logs:[],
      dateEdit:'',
      codeEdit:'',
      logsEdit:[
        {
          date:"",
          code:""
        }

      ],
      currentMonth:new Date().getMonth()+1,
      currentDepartment:'',
    }
  },

  methods: {
    //event handler
    inEditMode(){
      this.editMod=!this.editMod;
    },
    outEditMode(){
      this.editMod=!this.editMod;
    },
    infoEdit(date,code){
      this.dateEdit=date;
      this.codeEdit=code;
    },
    handelSearch(){
      if(this.search!=null)
        this.logs=this.logs.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()))
      if(this.search=="")
        this.getLog();
    },
    handleEdit(date, code,sign) {
      for (let log of this.logs) {
        for(let logDetail of log.logDetail){
          if( logDetail.date_log.split("-")[2]==date && log.code==code ){
            logDetail.signs.name=sign
            this.logsEdit.push({
              date:logDetail.date_log,
              code:log.code
            });
          }
        }
      }
      console.log(this.logsEdit)
    },
    //Caculate
    getSign(date ,code){
      let sign='';
      for (let log of this.logs) {
        for(let logDetail of log.logDetail){
          if( logDetail.date_log.split("-")[2]==date && log.code==code ){
            sign= logDetail.signs.name
            return sign
          }
        }
      }
      return sign
    },
    edited (code,date){
      for(let log of this.logsEdit){
        if(log.date.split("-")[2]==date && log.code==code)
          return true
        else return false
      }
    },
    // Call API method
    exportExcel(){
      const params = {
        "id": this.department,
        "month": this.currentMonth
      }
      ExcelService.exportExcel(params);
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
        this.logs=respone.data
        console.log(respone.data)
      });
      this.logsEdit=[];
    },
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
  opacity: 0.6;
}
.edited{
  background-color: #e24146 !important;
  color: white;
  opacity: 0.6;
}
</style>