<template>
  <div>
    <div class="mounthSelect ">
      <span class="demonstration mx-4">Month</span>
      <el-date-picker
          v-model="mounth"
          type="month"
          placeholder="Pick a month"
          format="yyyy/MM"
          value-format="yyyy-MM">
      </el-date-picker>
    </div>
    <div class="d-flex flex-row ">
      <el-calendar  style="width: 70% ; margin-top: 50px" v-model="value">
        <template  slot="dateCell" slot-scope="{date}">
          <div :class="{
              weekend:getSign(date.getDate(),date.getMonth()).weekend,
              halfOff:getSign(date.getDate(),date.getMonth()).halfOff,
              off:getSign(date.getDate(),date.getMonth()).off,
              allDay:getSign(date.getDate(),date.getMonth()).allDay,
              cellSign:true
        }">
            <p style="font-size: 18px; margin-left: 2px">
              {{ date.getDate() }}
              <br>
            </p>
            <p class="sign-calender text-center align-middle" >
              {{getSign(date.getDate(),date.getMonth()).name}}
            </p>
          </div>
        </template>
      </el-calendar>
      <div class="note-wrapper " style="margin-left: 80px ;margin-top: 100px" >
        <div class="d-flex flex-column" >
          <div style="font-weight: bold;">Chú thích</div>
          <div>
            <div class="d-flex flex-row">
              <el-button round class="h-25 me-3" style="background-color: #EAB756" ></el-button>
              <div style="text-align: justify">
                <p><span style="font-weight: bold">KL/H,H/KL</span>: Nghỉ nửa ngày</p>
              </div>
            </div>
            <div class="d-flex flex-row">
              <el-button round class="h-25 me-3" style="background-color:#e24146" ></el-button>
              <p><span style="font-weight: bold">KL</span>: Nghỉ không lương</p>
            </div>
            <div class="d-flex flex-row">
              <el-button round class="h-25 me-3 position-relative" style="background-color: #92C88D" >
              </el-button>
              <p><span style="font-weight: bold">H</span>: Làm hành chính</p>
            </div>
            <div class="d-flex flex-row">
              <el-button round class="h-25 me-3" style="background-color: #C2C2C2"></el-button>
              <p><span style="font-weight: bold">NT</span>: Nghỉ tuần</p>
            </div>
          </div>
        </div>
      </div>
    </div>

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
   getSign(date,month){
     let sign={
       name:'',
       weekend:false,
       halfOff:false,
       off:false,
       allDay:false
     };
     for (let log of this.logs) {
       let dateLog = log.date_log.split("-")[2]
       let monthLog =log.date_log.split("-")[1]
       if(dateLog==date && monthLog==month ){
         sign.name= log.signs.name
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
    const mounth = this.mounth.split("-")[1]
    this.value=new Date().setMonth(mounth,1)
  }
  },
  mounted(){
    this.getAll()
  }
}

</script>

<style scoped>
.sign-calender{
  font-weight: bold;
}
.green{
  color: #42b983;
}
.red{
  color: #e24146;
}
.mounthSelect{
  position: absolute;
  left: 10px;
  top:60px;
}
.weekend{
  background-color: #C2C2C2 ;
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

</style>