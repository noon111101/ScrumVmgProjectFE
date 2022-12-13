<template>

  <div style="padding-bottom: 310px">
    <el-tooltip placement="bottom" effect="light" style="display: none" id="button-note" >
      <el-button type="primary" class="el-icon-info el-button--info el-calendar__header" style="border-radius: 10px" > Chú thích</el-button>
      <div slot="content">
        <note-calender />
      </div>
    </el-tooltip>
    <div class="d-flex flex-row justify-content-center">

      <el-calendar  style="width: 70% ; margin-top: 50px; border-radius: 10px" v-model="value" >
        <template  slot="dateCell" slot-scope="{date,data,Sign = getSign(data.day)}">
          <div :class="{
              weekend:getSign(data.day).weekend,
              halfOff:Sign.halfOff,
              off:Sign.off,
              allDay:Sign.allDay,
              holiday:Sign.holiday,
              standard:Sign.standard,
              regime:Sign.regime,
              sick:Sign.sick,
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
      <note-calender id="table-note" style="margin-left: 80px ;margin-top: 100px"/>
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
import NoteCalender from "@/views/calendar/NoteCalender";

export default {
  name: "CalenderReport",
  components: {NoteCalender},
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
        allDay:false,
        weekend:false,
        halfOff:false,
        off:false,
        sick:false,
        standard:false,
        holiday:false,
        regime:false,
        timeIn:null,
        timeOut:null,
        reason:null
      };
      for (let log of this.logs) {
        if(log.dateLog==date){
          if(log.signs!=null)
            sign.name= log.signs.name
          sign.timeIn= log.timeIn
          sign.timeOut= log.timeOut
          sign.reason= log.reason
          if(sign.name.includes("H") && !sign.name.includes("_"))
            sign.allDay=true
          if(sign.name.includes("NT"))
            sign.weekend=true
          if(sign.name.includes("P_H") || sign.name.includes("H_P") || sign.name.includes("KL_H") || sign.name.includes("H_KL"))
            sign.halfOff=true;
          if((sign.name.includes("KL") && !sign.name.includes("_")) || sign.name.includes("P_KL") || sign.name.includes("KL_P") || (sign.name.includes("P") && !sign.name.includes("_")) )
            sign.off=true
          if(sign.name.includes("Ô"))
            sign.sick=true;
          if(sign.name.includes("TC"))
            sign.standard=true;
          if(sign.name.includes("L") && !sign.name.includes("K"))
            sign.holiday=true
          if(sign.name.includes("CĐ"))
            sign.regime=true;
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
.allDay{
  background-color: #C9E3C6 ;
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

.sick{
  background-color: #CFD0E2;
}

.standard{
  background-color: #CBA4F3;
}
.holiday{
  background-color: #b3e3f7;
}
.regime{
  background-color: #e381e3;
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
@media only screen and (max-width:600px){
  .note-wrapper {
    display: none;
  }
  .mounthSelect{
    right: 0% !important;
    top: 100px !important;
  }
  .el-calendar{
    width: 100% !important;
  }
  .cellSign{
    margin: 2px !important;
    height: unset !important;
  }
  .el-calendar-table .el-calendar-day {
    height: 80px;
  }
}

</style>