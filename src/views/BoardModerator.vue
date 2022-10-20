<template>
  <div class="ml-auto" >
    <hr>
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
          label="Name"
          prop="name">
      </el-table-column>
      <el-table-column width="100"
                       label="User ID"
                       prop="id">
      </el-table-column>
      <el-table-column
          label="Department"
          prop="department">
      </el-table-column>
      <el-table-column width="100"
                       label="Date"
                       prop="date">
      </el-table-column>
      <el-table-column
          label="Shift"
          prop="shift">
      </el-table-column>
      <el-table-column width="100"
                       label="In"
                       prop="in">
      </el-table-column>
      <el-table-column width="100"
                       label="Out"
                       prop="out">
      </el-table-column>
      <el-table-column
          label="Exception"
          prop="exception">
      </el-table-column>
      <el-table-column
          align="right">
        <template slot="header" slot-scope="">
          <el-input
              v-model="search"
              size="mini"
              placeholder="Type to search"/>
        </template>
        <!--        <template slot-scope="scope">-->
        <!--          <el-button-->
        <!--              size="mini"-->
        <!--              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>-->
        <!--          <el-button-->
        <!--              size="mini"-->
        <!--              type="danger"-->
        <!--              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>-->
        <!--        </template>-->
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