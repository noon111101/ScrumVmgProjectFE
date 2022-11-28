<template>
  <div>

    <div style="padding-bottom: 20px">

      <div className="container" style="width: 90%; margin: auto">
        <h1 class="title-header">Danh Sách Ngày Lễ Trong Năm 2022</h1>

        <div class="grid-content div-buttons" style="margin-bottom: 10px">
          <span style="">Tìm kiếm</span> &ensp;
          <el-input size="medium" placeholder="Tìm theo tên, email" class="text-start buttons btn-import"
                    style="width: 200px;padding: 2px 0;margin-right: 20px;"/>
          <el-button class="buttons btn-add" type="danger" style="" round
                     @click="dialogFormVisible = true"
          ><i class="el-icon-plus"></i> Thêm nhân viên
          </el-button>
        </div>

        <div>
          <el-table
              :data="users"
              height="780px"
              :header-cell-style="{
          background: '#D9D9D9',
          color: 'black',
          align: 'center',
        }"
              style="width: 100%; display: inline-block; font-size: 16px;border-radius: 10px;box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
"
              :row-class-name="tableRowClassName"
          >
            >
            <el-table-column
                label="STT"
                type="index"
                align="center"
                width="100px"
            ></el-table-column>
            <el-table-column
                label="Ngày nghỉ"
                v-slot:="data"
                align="center"
                width="120px"
            >{{data.row.code}}</el-table-column>
            <el-table-column
                label="Tên ngày nghỉ lễ"
                prop="fullName"
                align="center"
            ></el-table-column>
            <el-table-column
                label="Số ngày nghỉ"
                prop="departments.name"
                align="center"
            >
            </el-table-column>
            <el-table-column
                label="Tính Công"
                prop="username"
                align="center"
            ></el-table-column>
            <el-table-column
                label="Lặp"
                v-slot:="data"
                align="center"
                width="150px"
            >

            </el-table-column>
            <el-table-column
                v-slot:="data"
                label="Phòng ban"
                width="200px"
                align="center"
            >

            </el-table-column>

            <el-table-column
                v-slot:="data"
                label="Thao tác"
                width="200px"
                align="center"
            >
              <!--          <font-awesome-icon icon="fa-duotone fa-pen-to-square" />-->

              <router-link :to="`/user/${data.row.id}`">
                <!--            <el-button type="danger" icon="el-icon-edit-outline" circle></el-button>-->
                <button style="margin-right: 10px" class="btn-action">
                  <i class="el-icon-edit-outline" style="width: 30px"></i>
                </button>
              </router-link>

              <!--          <div v-if="data.row.id == currentUser.user.id">-->
              <button
                  v-if="data.row.avalible == 1 && data.row.id == currentUser.user.id"
                  class="btn-action"
                  @click="
              changeStatus(data.row.id, data.row.fullName, data.row.avalible)
            "
                  disabled
              >
                <i class="el-icon-unlock" style="width: 30px"></i>
              </button>
              <button
                  v-if="data.row.avalible == 0 && data.row.id == currentUser.user.id"
                  class="btn-action"
                  @click="
              changeStatus(data.row.id, data.row.fullName, data.row.avalible)
            "
                  disabled
              >
                <i class="el-icon-lock" style="width: 30px"></i>
              </button>
              <!--          </div>-->
              <!--          <div v-if="data.row.id != currentUser.user.id">-->
              <button
                  v-if="data.row.avalible == 1 && data.row.id != currentUser.user.id"
                  class="btn-action"
                  @click="
              changeStatus(data.row.id, data.row.fullName, data.row.avalible)
            "
              >
                <i class="el-icon-unlock" style="width: 30px"></i>
              </button>
              <button
                  v-if="data.row.avalible == 0 && data.row.id != currentUser.user.id"
                  class="btn-action"
                  @click="
              changeStatus(data.row.id, data.row.fullName, data.row.avalible)
            "
              >
                <i class="el-icon-lock" style="width: 30px"></i>
              </button>
              <!--          </div>-->
            </el-table-column>
          </el-table>

        </div>
        <el-pagination
            class="text-end"
            background
            layout="prev, pager, next"
            :total="totalItems"
            :page-size="pageSize"
            @current-change="handlePageChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManageLe",
  data() {
    return {
      dialogFormVisible: false,
      totalItems: 0,
      page: 0,
      pageSize: 10,
    }
  },
  methods:{
    tableRowClassName({rowIndex}) {
      if (rowIndex % 2 === 1) {
        return 'warning-row';
      } else if (rowIndex % 2 === 0) {
        return 'success-row';
      }
      return 'success-row';
    },
  }
}
</script>

<style scoped>

* {
  font-size: 16px;
}

.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #c9f5eb !important;

}

.el-date-picker:focus {
  cursor: default;
}

.el-table .warning-row {
  background: #EDEDED;
}


.el-table .success-row {
  background: #F5F5F5;
}
.title-header {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 24px;
}

.div-buttons{
  float: right;
}
</style>