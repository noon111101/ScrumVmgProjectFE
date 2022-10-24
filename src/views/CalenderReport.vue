<template>
  <div>
    <div class="mounthSelect">
      <span class="demonstration mx-4">Month</span>
      <el-date-picker
          v-model="mounth"
          type="month"
          placeholder="Pick a month"
          format="yyyy/MM"
          value-format="yyyy-MM">
      </el-date-picker>
    </div>
    <el-calendar v-model="value">
      <template  slot="dateCell" slot-scope="{date}">
        <p>
          {{ date.getDate() }}
          <br>
        </p>
        <p class="sign-calender">
          {{getSign(date.getDate(),date.getMonth()+1)}}
        </p>
      </template>
    </el-calendar>
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
        'code': this.currentUser.code,
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
     let sign;
     for (let log of this.logs) {
       let dateLog = log.date_log.split("-")[2]
       let monthLog =log.date_log.split("-")[1]
       if(dateLog==date && monthLog==month){
         sign = log.signs.name
         return sign
       }
       else
         sign = null
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
    const year = this.mounth.split("-")[0]
    console.log(mounth,year)
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
.mounthSelect{
  float:right
}
</style>