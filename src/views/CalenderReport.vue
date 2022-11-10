<template>

  <div style="padding-bottom: 225px">

    <div class="d-flex flex-row justify-content-center ">
        <el-calendar  style="width: 70% ; margin-top: 50px" v-model="value">
          <template  slot="dateCell" slot-scope="{date,data,Sign=getSign(data.day)}">
            <div :class="{
              weekend:getSign(data.day).weekend,
              halfOff:Sign.halfOff,
              off:Sign.off,
              allDay:Sign.allDay,
              cellSign:true,
              'position-relative':true

        }"
                 v-b-modal="'my-modal'"
                 @click="setCell(data.day,Sign)"
            >
              <p style="font-size: 18px; margin-left: 2px">
                {{ date.getDate() }}
                <br>
              </p>
              <div class="sign-calender text-center align-middle " >
                {{Sign.name}}
                <el-tooltip popper-class="reason-popper" v-if="Sign.reason!=null" placement="right" effect="light">
                  <div slot="content"><div class="note-wrapper">{{Sign.reason}}</div></div>
                  <svg class="position-absolute top-0 end-0 " x="0px" y="0px"
                       viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;width: 15px;fill: #A843A8FF " xml:space="preserve">
              <g>
                <polygon points="5.8,0.6 0,6.4 0,378.3 5.8,384 384,384 512,512 512,5.8 506.3,0 6.4,0 	"/>
              </g>
              </svg>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-calendar>
        <div class="mounthSelect ">
          <el-date-picker
              v-model="mounth"
              type="month"
              placeholder="Chọn tháng"
              format="yyyy/MM"
              value-format="yyyy-MM">
          </el-date-picker>
        </div>
      <div class="note-wrapper " style="margin-left: 80px ;margin-top: 100px" >
        <div class="d-flex flex-column" >
          <div style="font-weight: bold;">Chú thích</div>
          <div>
            <div class="d-flex flex-row">
              <el-button round class="h-25 me-3" style="background-color: #ecc376" ></el-button>
              <div style="text-align: justify">
                <p><span style="font-weight: bold">KL/H,H/KL</span>: Nghỉ nửa ngày</p>
              </div>
            </div>
            <div class="d-flex flex-row">
              <el-button round class="h-25 me-3" style="background-color:#E97C7C" ></el-button>
              <p><span style="font-weight: bold">KL</span>: Nghỉ không lương</p>
            </div>
            <div class="d-flex flex-row">
              <el-button round class="h-25 me-3 position-relative" style="background-color: #c9e3c6" >
              </el-button>
              <p><span style="font-weight: bold">H</span>: Làm hành chính</p>
            </div>
            <div class="d-flex flex-row">
              <el-button round class="h-25 me-3" style="background-color: #f8cbad"></el-button>
              <p><span style="font-weight: bold">NT</span>: Nghỉ tuần</p>
            </div>
            <div class="d-flex flex-row">
              <el-button round class="h-25 me-3 position-relative" >
                <svg class="position-absolute top-0 end-0 " x="0px" y="0px"
                     viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;width: 10px;fill: #A843A8FF " xml:space="preserve">
              <g>
                <polygon points="5.8,0.6 0,6.4 0,378.3 5.8,384 384,384 512,512 512,5.8 506.3,0 6.4,0 	"/>
              </g>
          </svg>
              </el-button>
              <p>Ghi chú</p>
            </div>
          </div>
        </div>
      </div>
    </div>
<!--    MODAL-->
    <b-modal id="my-modal" centered size="sm" >
      <template #modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <h5>Chi tiết ngày {{cellDate}}</h5>
        <b-icon-x-circle-fill style="color: #d8363a" size="sm" @click="close()">
        </b-icon-x-circle-fill>
      </template>
      <div class="text-center" style="font-size: 16px;line-height: 19.5px;letter-spacing: 1px;">
        <div v-if="cellSign.timeIn!=null">{{cellSign.timeIn}}</div>
        <div v-if="cellSign.timeIn==null">None</div>
        <div>...</div>
        <div v-if="cellSign.timeOut!=null">{{cellSign.timeOut}}</div>
        <div v-if="cellSign.timeOut==null">None</div>
      </div>

      <template #modal-footer="{ok}">
        <b-button size="sm" variant="success" style="display:none;" @click="ok()">
        </b-button>
      </template>
    </b-modal>
  </div>

</template>

<script>
import LogdetailService from "@/services/logdetail-service";

export default {
  name: "CalenderReport",
  data() {
    return {
      value: new Date(),
      logs:[],
      mounth:"",
      cellDate:'',
      cellSign:{}
    }
  },
  methods: {
    getAll() {
      const params = {
        'code': this.currentUser.user.code,
      }
      LogdetailService.getAllByUser(params).then(response => {
        this.logs = response.data;
        console.log(this.logs)
      })
          .catch(error => {
            console.log(error);
          })

    },
    setCell(date,sign){
      date = date.split("-").reverse().join("/");
      this.cellDate=date;
      this.cellSign=sign
    },
   getSign(date){
     let sign={
       name:'',
       weekend:false,
       halfOff:false,
       off:false,
       allDay:false,
       timeIn:null,
       timeOut:null,
       reason:null
     };
     for (let log of this.logs) {
       if(log.date_log==date){
         sign.name= log.signs.name
         sign.timeIn= log.timeIn
         sign.timeOut= log.timeOut
         sign.reason= log.reason
         if(sign.name.includes("_"))
           sign.halfOff=true;
         if(sign.name.includes("H") && !sign.name.includes("_"))
           sign.allDay=true
         if(sign.name.includes("KL") && !sign.name.includes("_"))
           sign.off=true
         if(sign.name.includes("NT"))
           sign.weekend=true
         return sign
       }
     }
     return sign
   },
  },
  computed: {
    currentUser() {
      console.log(this.$store.state.auth.user)
      return this.$store.state.auth.user;
    }
  },
  watch:{
  mounth :function (){

    const mounth = this.mounth.split("-")[1]-1
    this.value=new Date().setMonth(mounth,1)
  }
  },
  mounted(){
    this.getAll()
  }
}

</script>

<style scoped>

.note-wrapper .el-button:hover{
  cursor: default;
}
.sign-calender{
  font-weight: bold;
}
.mounthSelect{
  position: absolute;
  right: 30%;
  top: 130px;
}
.weekend{
  background-color: #F8CBAD ;
}
.halfOff{
  background-color: #ECC376 ;
}
.off{
  background-color: #E97C7CCC ;
}
.allDay{
  background-color: #C9E3C6 ;
}
.cellSign{
  margin: 5px;
  box-sizing: content-box;
  border-radius: 10px;
  height: inherit;
  width: inherit;
}
.reason-popper{
  border: #a843a8 1px;
}

</style>