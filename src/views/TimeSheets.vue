<template>
     <div class="container">
      <div style="margin-top:50px" class="row">
         <div class="col-lg">
           <el-button @click="importExcel"  type="info" class="el-icon-upload2" round> Import Excel File</el-button>
           <el-button @click="exportExcel"  type="danger" class="el-icon-download" round> Export Excel File</el-button>
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
   </div>
</template>

<script>
// import UserService from '../services/user.service';
import ExcelService from "@/services/excel-service";

export default {
  name: 'HomeVue',
  data() {
    return {
      tableData: [{
        name: 'Nguyễn Đình Phú',
        id: "123",
        department: "All Users/Thuc tap PTPM",
        date: '2016-05-03',
        shift: "CHAM CONG HANH CHINH",
        in: "8:10:11",
        out: "5:24:22",
        exception: "Late In"
      }, {
        name: 'Nguyễn Trường Thọ',
        id: "123",
        department: "All Users/Thuc tap PTPM",
        date: '2016-05-02',
        shift: "CHAM CONG HANH CHINH",
        in: "8:00:00",
        out: "5:24:22",
        exception: "Late In"
      }, {
        name: 'Phạm Minh Giang',
        id: "123",
        department: "All Users/Thuc tap PTPM",
        date: '2016-05-04',
        shift: "CHAM CONG HANH CHINH",
        in: "12:00:00",
        out: "5:24:22",
        exception: "Late In"
      }, {
        name: 'Khuất Tiến Quang',
        id: "123",
        department: "All Users/Thuc tap PTPM",
        date: '2016-05-01',
        shift: "CHAM CONG HANH CHINH",
        in: "12:00:00",
        out: "5:24:22",
        exception: "Late In"
      }],
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