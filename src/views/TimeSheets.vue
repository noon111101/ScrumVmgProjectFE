<template>
     <div class="container">
       <br><br>
       <div style="float: left">
         <el-button @click="importExcel"  type="info" class="el-icon-upload2" round> Import Excel File</el-button>
         <el-button @click="exportExcel"  type="danger" class="el-icon-download" round> Export Excel File</el-button>
       </div>

      <div style="margin-top:50px" class="row">
         <div class="col-lg">
            <table class="table table-responsive table-bordered">
               <thead>
                  <tr>
                     <th>TT</th>
                     <th style="width:200px">Họ và tên</th>
                     <th colspan="31">Ngày trong tháng</th>
                     <th>Tổng số ngày làm việc</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td></td>
                     <td></td>
                     <td v-for="(n,index) in 30 " :key="index">{{n}}
                    </td>
                  </tr>
                  <tr>
                     <td>1</td>
                     <td>Phan Văn Đức</td>
                          <td v-for="(n,index) in 30 " :key="index"></td>
                  </tr>
                     <tr>
                     <td>2</td>
                     <td>Phan Văn Hải</td>
                          <td v-for="(n,index) in 30 " :key="index"></td>
                  </tr>

            <tr>
              <td></td>
              <td></td>
              Tổng cộng
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div style="display: flex; margin-top:20px">
      <h5 style="font-weight: bold;">Ký hiệu:</h5>
      <h5 style="margin-left: 20px; font-weight: bold;">Ca:</h5>
           <div style="float:left;margin-left:20px;">
      <p style="margin-left: 20px">H: Làm hành chính</p>
      <p style="margin-left: 20px">NT: Nghỉ thứ 7, Chủ nhật</p>
      </div>
    </div>
  </div>
</template>

<script>
// import UserService from '../services/user.service';
import ExcelService from "@/services/excel-service";

export default {
  name: 'HomeVue',
  data() {
    return {

      search: '',
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
    }

  },


};
</script>