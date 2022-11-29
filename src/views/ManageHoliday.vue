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

        <h1 class="title-header" style="margin-bottom: 20px">Danh Sách Ngày Lễ Trong Năm 2022</h1>


        <div class="grid-content" style="margin-bottom: 30px">
          <span class="demonstration">Year</span>&ensp;
          <el-date-picker
              @change="getAll"
              v-model="year"
              type="year"
              placeholder="Chọn Năm"
              value-format="yyyy">
          </el-date-picker>
          <div class="div-buttons">
            <span style="">Tìm kiếm</span> &ensp;
            <el-input
                size="medium"
                v-model="search"
                @input="getAll"
                placeholder="Tìm tên nghỉ lễ"
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


        </div>
        <el-dialog
            style="text-align: center; font-weight: bold"
            title="Chỉnh sửa ngày nghỉ lễ"
            :visible.sync="dialogFormVisible"
        >

          <form id="formAddHoliday">
            <div class="row register-form">
              <div class="col-md-8">
                <table class="text-start">
                  <tr style="height: 70px">
                    <td style="width: 150px">
                      Họ và tên<span style="color: red">*</span>
                    </td>
                    <td style="width: 500px">
                      <div class="form-group">
                        <el-input
                            v-model="form.name"
                            type="text"
                            name="name"
                            placeholder="Họ và tên"
                            autocomplete="off"
                        >
                        </el-input>
                        <small v-if="errName !== null" style="color: red">
                          {{ errName }}
                        </small>
                      </div>
                    </td>
                  </tr>
                  <tr style="height: 70px">
                    <td style="width: 150px">
                      Email<span style="color: red">*</span>
                    </td>
                    <td style="width: 500px">
                      <div class="form-group">
                        <el-date-picker
                            v-model="form.dateFrom"
                            placeholder="Chọn ngày bắt đầu"
                            value=""
                            name="dateFrom"
                            autocomplete="off"
                        >
                        </el-date-picker>
                      </div>
                      <small v-if="errDateFrom !== null" style="color: red">
                        {{ errDateFrom }}
                      </small>
                    </td>
                  </tr>
                  <tr style="height: 70px">
                    <td style="width: 150px">
                      Mã nhân viên<span style="color: red">*</span>
                    </td>
                    <td style="width: 500px">
                      <div class="form-group">
                        <el-date-picker
                            placeholder="Chọn ngày kết thúc"
                            v-model="form.dateTo"
                            name="dateTo"
                            autocomplete="off"
                        >
                        </el-date-picker>
                      </div>
                      <small v-if="errDateTo !== null" style="color: red">
                        {{ errDateTo }}
                      </small>
                    </td>
                  </tr>
                </table>
                <br/>
              </div>
              <small style="color: green">
                {{ message }}
              </small>
            </div>
          </form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="removeValidate(false)">Hủy</el-button>

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
                v-slot:="data"
                label="Thao tác"
                width="200px"
                align="center"
            >
              <button style="margin-right: 10px" class="btn-action" @click="openEditHoliday(data.row.id)">
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
        <el-dialog
            style="text-align: center; font-weight: bold"
            title="Chỉnh sửa ngày nghỉ lễ"
            :visible.sync="dialogFormVisible2"
        >

          <form id="formEditHoliday">
            <div class="row register-form">
              <div class="col-md-8">
                <table class="text-start">
                  <tr style="height: 70px">
                    <td style="width: 150px">
                      Họ và tên<span style="color: red">*</span>
                    </td>
                    <td style="width: 500px">
                      <div class="form-group">
                        <el-input
                            v-model="formEdit.name"
                            type="text"
                            name="name"
                            placeholder="Họ và tên"
                            autocomplete="off"
                        >
                        </el-input>
                        <small v-if="errName !== null" style="color: red">
                          {{ errName }}
                        </small>
                      </div>
                    </td>
                  </tr>
                  <tr style="height: 70px">
                    <td style="width: 150px">
                      Email<span style="color: red">*</span>
                    </td>
                    <td style="width: 500px">
                      <div class="form-group">
                        <el-date-picker
                            v-model="formEdit.dateFrom"
                            placeholder="Chọn ngày bắt đầu"
                            value=""
                            name="dateFrom"
                            autocomplete="off"
                        >
                        </el-date-picker>
                      </div>
                      <small v-if="errDateFrom !== null" style="color: red">
                        {{ errDateFrom }}
                      </small>
                    </td>
                  </tr>
                  <tr style="height: 70px">
                    <td style="width: 150px">
                      Mã nhân viên<span style="color: red">*</span>
                    </td>
                    <td style="width: 500px">
                      <div class="form-group">
                        <el-date-picker
                            placeholder="Chọn ngày kết thúc"
                            v-model="formEdit.dateTo"
                            name="dateTo"
                            autocomplete="off"
                        >
                        </el-date-picker>
                      </div>
                      <small v-if="errDateTo !== null" style="color: red">
                        {{ errDateTo }}
                      </small>
                    </td>
                  </tr>
                </table>
                <br/>
              </div>
              <small style="color: green">
                {{ message }}
              </small>
            </div>
          </form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="removeValidate(false)">Hủy</el-button>

            <el-button type="primary" @click="sendForm2">Lưu</el-button>
          </span>
        </el-dialog>
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
      dialogFormVisible2: false,

      form: {
        name: "",
        dateFrom: "",
        dateTo: "",
      },
      formEdit: {
        id: "",
        name: "",
        dateFrom: "",
        dateTo: "",
      },
      totalItems: 0,
      page: 0,
      pageSize: 12,
      holidays: [],
      search: "",

      year: '',


      errName: "",
      checkName: true,
      errDateTo: "",
      checkDateTo: true,
      errDateFrom: "",
      checkDateFrom: true,

    };
  },
  created() {
    this.getAll();

  },
  methods: {

    removeValidate(check) {
      (this.dialogFormVisible = check), (this.form.name = "");
      this.form.dateFrom = "";
      this.form.dateTo = "";
      this.checkName = false;
      this.errName = "";
      this.checkDateTo = false;
      this.errDateTo = "";
      this.checkDateFrom = false;
      this.errDateFrom = "";
      this.dialogFormVisible2 = check;
    },


    showLoading: function () {
      const iconLoading = document.getElementById("loading");
      iconLoading.style.display = "flex";
    },

    hideLoading: function () {
      const iconLoading = document.getElementById("loading");
      iconLoading.style.display = "none";
    },
    async sendForm() {

      let response = await HolidayService.getAll();
      this.holidays = response.data;

      if (!this.form.name) {
        this.errName = "Vui lòng nhập họ và tên";
        this.checkName = false;
      } else {
        this.errName = "";
        this.checkName = true;
      }

      for (let i = 0; i < this.holidays.length; i++) {
        if (this.form.name === this.holidays[i].name) {
          this.errName = "Ngày nghỉ lễ đã tồn tại";
          this.checkName = false;
          break;
        } else {
          this.errName = "";
          this.checkName = true;
        }
      }

      if (!this.form.dateFrom) {
        this.errDateFrom = "Vui lòng chọn ngày bắt đầu";
        this.checkDateFrom = false;
      } else {
        this.errDateFrom = "";
        this.checkDateFrom = true;
      }

      if (!this.form.dateTo) {
        this.errDateTo = "Vui lòng chọn ngày kết thúc";
        this.checkDateTo = false;
      } else {
        this.errDateTo = "";
        this.checkDateTo = true;
      }
      if (this.checkName === true && this.checkDateTo === true) {
        this.dialogFormVisible = false;
        this.submitted = true;
        let form = document.querySelector("#formAddHoliday");
        HolidayService.addHoliday(form).then((response) => {
          this.$notify.success({
            message: response.data.message,
            title: "Success",
            timer: 2000,
            timerProgressBar: true,
          });
          this.removeValidate(false);
          this.getAll();
        })
            .catch(e => {
              this.$notify.success({
                message: e.data.error.message,
                title: "Success",
                timer: 2000,
                timerProgressBar: true,
              });
              this.getAll();
            });
      }
    },
    async sendForm2() {

      let response = await HolidayService.getAll();
      this.holidays = response.data;

      if (!this.formEdit.name) {
        this.errName = "Vui lòng nhập họ và tên";
        this.checkName = false;
      } else {
        this.errName = "";
        this.checkName = true;
      }

      for (let i = 0; i < this.holidays.length; i++) {
        if (this.formEdit.name === this.holidays[i].name) {
          this.errName = "Ngày nghỉ lễ đã tồn tại";
          this.checkName = false;
          break;
        } else {
          this.errName = "";
          this.checkName = true;
        }
      }

      if (!this.formEdit.dateFrom) {
        this.errDateFrom = "Vui lòng chọn ngày bắt đầu";
        this.checkDateFrom = false;
      } else {
        this.errDateFrom = "";
        this.checkDateFrom = true;
      }

      if (!this.formEdit.dateTo) {
        this.errDateTo = "Vui lòng chọn ngày kết thúc";
        this.checkDateTo = false;
      } else {
        this.errDateTo = "";
        this.checkDateTo = true;
      }
      if (this.checkName === true && this.checkDateTo === true) {
        this.dialogFormVisible2 = false;
        this.submitted = true;
        let form = document.querySelector("#formEditHoliday");
        HolidayService.updateHoliday(this.formEdit.id,form).then(() => {
          this.$notify.success({
            message: "Chỉnh sửa thông tin ngày lễ thành công",
            title: "Thành công",
            timer: 2000,
            timerProgressBar: true,
          });
          this.removeValidate(false);
          this.getAll();
        })
            .catch(e => {
              this.$notify.success({
                message: e.data.error.message,
                title: "Thành công",
                timer: 2000,
                timerProgressBar: true,
              });
              this.getAll();
            });
      }
    },

    tableRowClassName({rowIndex}) {
      if (rowIndex % 2 === 1) {
        return "warning-row";
      } else if (rowIndex % 2 === 0) {
        return "success-row";
      }
      return "success-row";
    },
    getAll() {

      this.year = this.year !== null ? this.year : 0;
      // if (this.search != null && this.search != "") {
      //   this.page = 0;
      const params = {
        page: this.page,
        size: this.pageSize,
        search: this.search,
        year: this.year
      };
      // } else {
      //   params = {
      //     page: this.page,
      //     size: this.pageSize,
      //   };
      // }


      HolidayService.getAll(params).then((response) => {
        this.holidays = response.data.content;
        this.totalItems = response.data.totalElements;
      });
    },

    getHoliday(id){
      HolidayService.getHoliday(id).then(response =>{
        this.formEdit.id = response.data.id
        this.formEdit.name = response.data.holidayName
        this.formEdit.dateFrom = response.data.dateFrom
        this.formEdit.dateTo = response.data.dateTo
      })
    },
    openEditHoliday(id) {
        this.getHoliday(id);
        this.dialogFormVisible2 =true
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
