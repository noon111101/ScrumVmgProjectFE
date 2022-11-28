<template>
  <div>
    <div class="loading" id="loading">
      <img
        src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700"
        alt="loading"
      />
    </div>
    <div style="padding-bottom: 20px">
      <div className="container" style="width: 90%; margin: auto">
        <h1 class="title-header">Danh Sách Ngày Lễ Trong Năm 2022</h1>

        <div class="grid-content div-buttons" style="margin-bottom: 30px">
          <span style="">Tìm kiếm</span> &ensp;
          <el-input
            size="medium"
            v-model="search"
            @input="getAll"
            placeholder="Tìm theo tên, email"
            class="text-start buttons btn-import"
            style="width: 200px; padding: 2px 0; margin-right: 20px"
          />
          <el-button
            class="buttons btn-add"
            type="danger"
            style=""
            round
            @click="dialogFormVisible = true"
            ><i class="el-icon-plus"></i> Thêm Nghỉ Lễ
          </el-button>
        </div>
        <el-dialog
          style="text-align: center; font-weight: bold"
          title="Chỉnh sửa ngày nghỉ lễ"
          :visible.sync="dialogFormVisible"
        >
          <el-form id="formAddHoliday">
            <el-form-item label="Tên ngày nghỉ lễ *">
              <el-col :span="16">
                <el-input
                  type="text"
                  v-model="form.name"
                  name="name"
                  placeholder="Tết Dương lịch"
                  style="width: 100%"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="Nghỉ từ *">
              <el-col :span="16">
                <el-date-picker
                  type="date"
                  placeholder="Chọn ngày bắt đầu"
                  v-model="form.dateFrom"
                  name="dateFrom"
                  style="width: 100%"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="Nghỉ đến *">
              <el-col :span="16">
                <el-date-picker
                  type="date"
                  placeholder="Chọn ngày kết thúc"
                  v-model="form.dateTo"
                  name="dateTo"
                  style="width: 100%"
                ></el-date-picker>
              </el-col>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Hủy</el-button>
            <el-button type="primary" @click="sendForm">Lưu</el-button>
          </span>
        </el-dialog>

        <div>
          <el-table
            :data="holidays"
            height="745px"
            :header-cell-style="{
              background: '#D9D9D9',
              color: 'black',
              align: 'center',
            }"
            style="
              width: 100%;
              display: inline-block;
              font-size: 16px;
              border-radius: 10px;
              box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
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
              label="Tên ngày nghỉ lễ"
              prop="holidayName"
              align="center"
            ></el-table-column>
            <el-table-column
              label="Từ Ngày"
              prop="dateFrom"
              align="center"
            ></el-table-column>
            <el-table-column
              label="Đến Ngày"
              prop="dateTo"
              align="center"
            ></el-table-column>
            <el-table-column label="Số ngày nghỉ" align="center">
              10
            </el-table-column>

            <el-table-column
              label="Lặp"
              v-slot:="data"
              align="center"
              width="150px"
            >
              <span v-if="data.row.isLoop">Hàng Năm</span>
              <span v-if="!data.row.isLoop">Không</span>
            </el-table-column>

            <el-table-column
              v-slot:="data"
              label="Thao tác"
              width="200px"
              align="center"
            >
              <button style="margin-right: 10px" class="btn-action">
                <i class="el-icon-edit-outline" style="width: 30px"></i>
              </button>
              <button
                class="btn-action"
                @click="deleteHoliday(data.row.id, data.row.holidayName)"
              >
                <i class="el-icon-delete" style="width: 30px"></i>
              </button>
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
import HolidayService from "@/services/holiday-service";

export default {
  name: "ManageLe",
  data() {
    return {
      dialogFormVisible: false,

      form: {
        name: "",
        dateFrom: "",
        dateTo: "",
      },
      totalItems: 0,
      page: 0,
      pageSize: 12,
      holidays: [],
      search: "",
    };
  },
  created() {
    this.getAll();
  },
  methods: {
    showLoading: function () {
      const iconLoading = document.getElementById("loading");
      iconLoading.style.display = "flex";
    },

    hideLoading: function () {
      const iconLoading = document.getElementById("loading");
      iconLoading.style.display = "none";
    },
    async sendForm() {
      this.showLoading();
      this.dialogFormVisible = false;
      setTimeout(() => {
        this.submitted = true;
        let form = document.querySelector("#formAddHoliday");
        HolidayService.addHoliday(form).then(() => {
          this.$notify.success({
            message: "Tạo tài khoản thành công",
            title: "Success",
            timer: 2000,
            timerProgressBar: true,
          });
          this.hideLoading();
          this.getAll();
        });
      }, 2000).catch(() => {
        this.message = "";
      });
    },

    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "warning-row";
      } else if (rowIndex % 2 === 0) {
        return "success-row";
      }
      return "success-row";
    },
    getAll() {
      let params = null;
      if (this.search != null && this.search != "") {
        this.page = 0;
        params = {
          page: this.page,
          size: this.pageSize,
          search: this.search,
        };
      } else {
        params = {
          page: this.page,
          size: this.pageSize,
        };
      }

      HolidayService.getAll(params).then((response) => {
        this.holidays = response.data.content;
        this.totalItems = response.data.totalElements;
      });
    },
    deleteHoliday(id, name) {
      this.$swal
        .fire({
          title: "Xóa ngày lễ " + name + "?",
          showDenyButton: true,
          confirmButtonColor: "#75C4C0",
          confirmButtonText: "Xóa",
          denyButtonColor: "#ED9696",
          denyButtonText: "Đóng",
          customClass: {
            actions: "my-actions",
            cancelButton: "order-1 right-gap",
            confirmButton: "order-2",
            denyButton: "order-3",
          },
        })
        .then((result) => {
          if (result.isConfirmed) {
            HolidayService.deleteHoliday(id)
              .then((response) => {
                this.$swal.fire({
                  title: response.data.message,
                  icon: "success",
                  timer: 2000,
                  timerProgressBar: true,
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  width: "24em",
                });
                this.getAll();
              })
              .catch((e) => {
                this.$swal.fire({
                  title: e.data.error.message,
                  icon: "error",
                  timer: 2000,
                  timerProgressBar: true,
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  width: "24em",
                });
              });
          } else if (result.isDenied) {
            this.$swal.fire({
              title: "Thay đổi thất bại",
              icon: "error",
              timer: 2000,
              timerProgressBar: true,
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              width: "24em",
            });
          }
        });
    },
    handlePageChange(value) {
      this.page = value - 1;
      this.getAll();
    },
  },
};
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
  background: #ededed;
}

.el-table .success-row {
  background: #f5f5f5;
}

.el-table .btn-action {
  border: none;
  padding: 5px 5px;
  background-color: #f8cbad;
  border-radius: 5px;
}

.el-table .btn-action:hover {
  border: none;
  padding: 5px 5px;
  background-color: #f4e4d4;
  border-radius: 5px;
}

.title-header {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 24px;
}

.div-buttons {
  float: right;
}

.loading {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: none;
  align-items: center;
  justify-content: center;
  /* background: rgba(0, 0, 0, 0.479); */
}

.loading img {
  width: 25rem;
}
</style>
