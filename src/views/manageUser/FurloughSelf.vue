<template>
  <div style="padding-bottom: 20px">
    <h2 style="font-weight: 700;line-height:29.26px;margin-left: 40px">Thống kê nghỉ phép của tôi</h2>
    <div class="selected_year">
      <span class="demonstration">Năm </span>
      <el-date-picker
          v-model="currentYear"
          type="year"
          placeholder="Chọn một năm"
          value-format="yyyy"
          @change="getAllByYear"
      >
      </el-date-picker>
    </div>
    <div style="top: 35vh;position: relative">
    <div class="position-absolute top-50 start-50 translate-middle">
      <div class="content-wrap">Số phép được nghỉ năm {{currentYear}}<span class="value-content">0</span></div>
      <div class="content-wrap">Số phép dư đầu kỳ năm {{currentYear}}<span class="value-content">0</span></div>
      <div class="content-wrap">Số phép đã sử dụng theo tháng<span class="value-content">0</span></div>
      <div class="content-wrap">Tổng số phép nghỉ trước tháng 4<span class="value-content">0</span></div>
      <div class="d-flex flex-row"  >
        <div class="halfContent-wrap">Tổng số phép còn lại năm {{currentYear -1}}<span class="value-content">0</span></div>
        <div class="halfContent-wrap">Tổng số phép còn lại năm {{ currentYear }}<span class="value-content">0</span></div>
      </div>
      <div class="d-flex flex-row">
        <div class="halfContent-wrap">Tổng số phép nghỉ năm {{ currentYear }}<span class="value-content">0</span></div>
        <div class="halfContent-wrap">Trả phép<span class="value-content">0</span></div>
      </div>

      <div class="content-wrap">Tổng số phép được sử dụng đến tháng hiện tại<span class="value-content">0</span></div>

    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FurloughSelf",
  data(){
    return{
      currentYear:new Date().getFullYear().toString(),
    }
  }
}
</script>

<style scoped>
.content-wrap{
  width: 70vw;
  height:51px;
  background-color: #E0E0E0;
  border-radius: 8px;
  padding-left: 16px;
  padding-top: 12px;
  padding-bottom: 5px;
  font-size: 20px;
  font-weight: bold;
  line-height: 24.38px;
  margin-bottom: 15px;
}
.halfContent-wrap{
  width: 34.4vw;
  height:51px;
  background-color: #E0E0E0;
  border-radius: 8px;
  padding-left: 16px;
  padding-top: 12px;
  padding-bottom: 5px;
  font-size: 20px;
  font-weight: bold;
  line-height: 24.38px;
  margin-bottom: 15px;
  margin-right: 22px;
}
.selected_year{
  position: absolute;
  right: 15%;
}
.value-content{
  font-size: 20px;
  font-weight: bold;
  line-height: 24.38px;
  float: right;
  padding-right: 16px;
}

</style>