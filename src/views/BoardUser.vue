<template>
  <div class="ml-auto">

    <div class="block" right>
      <span class="demonstration">Thời gian</span> &ensp;&ensp;&ensp;&ensp;
      <el-date-picker style="width: 30%"
                      v-model="value1"
                      type="daterange"
                      range-separator="To"
                      start-placeholder="Start date"
                      end-placeholder="End date">
      </el-date-picker>
    </div>
    <br><br>
    <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
      <el-table-column
          label="Date"
          prop="date">
      </el-table-column>
      <el-table-column
          label="Ngày trong tuần"
          prop="day">
      </el-table-column>
      <el-table-column
          label="Số giờ làm"
          prop="hoursWork">
      </el-table-column>
      <el-table-column
          label="In"
          prop="in">
      </el-table-column>
      <el-table-column
          label="Out"
          prop="out">
      </el-table-column>
      <el-table-column
          label="Exception"
          prop="exception">
      </el-table-column>
    </el-table>
    <el-pagination
        :page-size="20"
        :pager-count="5"
        layout="prev, pager, next"
        :total="1000">
    </el-pagination>
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
        date: '05-05-2022',
        day: 'Thứ sáu',
        in: "8:10:11",
        out: "5:24:22",
        hoursWork: '',
        name: 'Nguyễn Đình Phú',
        department: "All Users/Thuc tap PTPM",
        shift: "CHAM CONG HANH CHINH",
        exception: "H"
      }, {
        date: '06-05-2022',
        day: 'Thứ bảy',
        in: "",
        out: "",
        hoursWork: '',
        name: 'Nguyễn Đình Phú',
        department: "All Users/Thuc tap PTPM",
        shift: "CHAM CONG HANH CHINH",
        exception: "NT"
      }, {
        date: '07-05-2022',
        day: 'Chủ nhật',
        in: "",
        out: "",
        hoursWork: '',
        name: 'Nguyễn Đình Phú',
        department: "All Users/Thuc tap PTPM",
        shift: "CHAM CONG HANH CHINH",
        exception: "NT"
      }, {
        date: '08-05-2022',
        day: 'Thứ hai',
        in: "8:10:11",
        out: "5:24:22",
        hoursWork: '',
        name: 'Nguyễn Đình Phú',
        department: "All Users/Thuc tap PTPM",
        shift: "CHAM CONG HANH CHINH",
        exception: "H"
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
    exportExcel() {
      ExcelService.exportExcel();
    }

  },


};
</script>