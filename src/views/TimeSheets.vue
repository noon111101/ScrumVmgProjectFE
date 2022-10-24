<template>
      <div>
        <div class="row mt-5">
          <div class="col-3">
            <label-wrap>Bộ phận:</label-wrap>
            <el-select v-model="department" placeholder="Select">
              <el-option
                  v-for="(item,index) in departments"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                  >
              </el-option>
            </el-select>
          </div>
          <div class="col-3">
            <el-input
                size="medium"
                placeholder="Tìm kiếm nhân viên"
                v-model="search">
            </el-input>
          </div>
          <div class="col-3">
            <el-select v-model="month" placeholder="Select">
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
          <div class="col-3">
            <el-button type="warning" class="el-icon-edit-outline" round>Chỉnh sửa</el-button>
            <el-button @click="exportExcel"  type="danger" class="el-icon-upload2" round> Xuất File</el-button>
          </div>
        </div>

        <div class="table-responsive" style="margin-top:50px">
            <table class="table table-bordered align-middle ">
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
              <tbody>

              <tr  v-for="(n,index) in 10 " :key="index">
                <td>{{n}}</td>
                <td style="white-space: pre">Phan Văn Đức</td>
                <td v-for="(n,index) in 31 " :key="index"></td>
                <td>1</td>
                <td>1</td>
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

      search: '',
      month:'',
      department:'',
      departments:[]
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    exportExcel(){
      ExcelService.exportExcel();
    },
    getDepartment(){
      LogService.getDepartment().then(respone => {
        this.departments=respone.data
        console.log(respone.data)
      });
    }

  },
mounted() {
    this.getDepartment();
}


};
</script>
<style>
.boder-round{
  border-radius: 6px;
}
</style>