<template>
  <div>
    <h1>Danh sách đề xuất</h1>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane style="width: 100%" label="Tất cả" name="first">
        <div className="container" style="text-align: center">
          <div style="float: right; margin-bottom: 20px" class="col-4 text-end">
            <el-dropdown>
              <el-button type="danger">
                Tạo đề xuất<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-link
                    class=""
                    type="danger"
                    style="margin-left: 20px; margin-right: 20px"
                    :underline="false"
                    round
                    @click="dialogFormNghi = true"
                    ><i class="el-icon-plus"></i>Đề xuất nghỉ
                  </el-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-link
                    class=""
                    type="danger"
                    style="margin-left: 20px; margin-right: 20px"
                    :underline="false"
                    round
                    @click="dialogFormChamCong = true"
                    ><i class="el-icon-plus"></i>Đề xuất chấm công
                  </el-link></el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>

            <el-dialog
              style="text-align: center; font-weight: bold"
              title="TẠO ĐỀ XUẤT NGHỈ"
              :visible.sync="dialogFormNghi"
            >
              <el-form ref="form" :model="form" label-width="150px">
                <el-form-item label="Họ và tên *">
                  <el-col :span="16">
                    <el-input
                      type="text"
                      placeholder="Phạm Văn An"
                      style="width: 100%"
                    ></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="Bộ phận *">
                  <el-col :span="16">
                    <el-input
                      type="text"
                      placeholder="Phòng PTPM"
                      style="width: 100%"
                    ></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="Tên đề xuất *">
                  <el-col :span="16">
                    <el-input
                      placeholder="Họ và tên - Loại đề xuất - Thời gian nghỉ"
                      v-model="form.name"
                    ></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="Loại đề xuất *">
                  <el-col :span="15">
                    <el-select
                      style="width: 100%"
                      v-model="value"
                      placeholder="Chọn loại đề xuất nghỉ"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
                <el-form-item label="Nhập số ngày nghỉ *">
                  <el-col :span="16">
                    <el-input
                      type="number"
                      placeholder=""
                      style="width: 100%"
                    ></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="Nghỉ từ *">
                  <el-col :span="15">
                    <el-date-picker
                      type="date"
                      placeholder="Chọn ngày"
                      v-model="form.date1"
                      style="width: 52%"
                    ></el-date-picker>
                    &emsp;
                    <el-select
                      style="width: 43%"
                      v-model="value"
                      placeholder="Chọn ca bắt đầu"
                    >
                      <el-option-group
                        v-for="group in options"
                        :key="group.label"
                        :label="group.label"
                      >
                        <el-option
                          v-for="item in group.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-option-group>
                    </el-select>
                  </el-col>
                </el-form-item>
                <el-form-item label="Nghỉ đến *">
                  <el-col :span="15">
                    <el-date-picker
                      type="date"
                      placeholder="Chọn ngày"
                      v-model="form.date1"
                      style="width: 52%"
                    ></el-date-picker>
                    &emsp;
                    <el-select
                      style="width: 43%"
                      v-model="value"
                      placeholder="Chọn ca kết thúc"
                    >
                      <el-option-group
                        v-for="group in options"
                        :key="group.label"
                        :label="group.label"
                      >
                        <el-option
                          v-for="item in group.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-option-group>
                    </el-select>
                  </el-col>
                </el-form-item>
                <el-form-item label="Nhập nội dung *">
                  <el-col :span="16">
                    <el-input
                      style="width: 100%"
                      type="textarea"
                      v-model="form.desc"
                    ></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="Người theo dõi *">
                  <el-col :span="16">
                    <el-input style="width: 100%"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="Người phê duyệt *">
                  <el-col :span="16">
                    <el-input style="width: 100%"></el-input>
                  </el-col>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Hủy</el-button>
                <el-button type="primary" @click="dialogFormVisible = false"
                  >Gửi đề xuất</el-button
                >
              </span>
            </el-dialog>

            <el-dialog
              style="text-align: center; font-weight: bold"
              title="TẠO ĐỀ XUẤT CHẤM CÔNG"
              :visible.sync="dialogFormChamCong"
            >
              <el-form ref="form" :model="form" label-width="150px">
                <el-form-item label="Họ và tên *">
                  <el-col :span="16">
                    <el-input
                      type="text"
                      placeholder="Phạm Văn An"
                      style="width: 100%"
                    ></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="Bộ phận *">
                  <el-col :span="16">
                    <el-input
                      type="text"
                      placeholder="Phòng PTPM"
                      style="width: 100%"
                    ></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="Tên đề xuất *">
                  <el-col :span="16">
                    <el-input
                      placeholder="Họ và tên - Loại đề xuất - Thời gian nghỉ"
                      v-model="form.name"
                    ></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="Loại đề xuất *">
                  <el-col :span="15">
                    <el-select
                      style="width: 100%"
                      v-model="value"
                      placeholder="Chọn loại đề xuất chấm công"
                    >
                      <el-option
                        v-for="item in users"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
                <el-form-item label="Nhập số ngày nghỉ *">
                  <el-col :span="16">
                    <el-input
                      type="number"
                      placeholder=""
                      style="width: 100%"
                    ></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="Nghỉ từ *">
                  <el-col :span="15">
                    <el-date-picker
                      type="date"
                      placeholder="Chọn ngày"
                      v-model="form.date1"
                      style="width: 52%"
                    ></el-date-picker>
                    &emsp;
                    <el-select
                      style="width: 43%"
                      v-model="value"
                      placeholder="Chọn ca bắt đầu"
                    >
                      <el-option-group
                        v-for="group in options"
                        :key="group.label"
                        :label="group.label"
                      >
                        <el-option
                          v-for="item in group.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-option-group>
                    </el-select>
                  </el-col>
                </el-form-item>
                <el-form-item label="Nghỉ đến *">
                  <el-col :span="15">
                    <el-date-picker
                      type="date"
                      placeholder="Chọn ngày"
                      v-model="form.date1"
                      style="width: 52%"
                    ></el-date-picker>
                    &emsp;
                    <el-select
                      style="width: 43%"
                      v-model="value"
                      placeholder="Chọn ca kết thúc"
                    >
                      <el-option-group
                        v-for="group in options"
                        :key="group.label"
                        :label="group.label"
                      >
                        <el-option
                          v-for="item in group.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-option-group>
                    </el-select>
                  </el-col>
                </el-form-item>
                <el-form-item label="Nhập nội dung *">
                  <el-col :span="16">
                    <el-input
                      style="width: 100%"
                      type="textarea"
                      v-model="form.desc"
                    ></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="Người theo dõi *">
                  <el-col :span="16">
                    <!-- <el-input style="width: 100%"></el-input> -->
                    <el-select
                      style="width: 100%"
                      v-model="form.followers"
                      multiple
                      filterable
                      remote
                      reserve-keyword
                      placeholder="Please enter a keyword"
                      :remote-method="remoteMethod"
                      :loading="loading"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.fullName"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
                <el-form-item label="Người phê duyệt *">
                  <el-col :span="16">
                    <el-input style="width: 100%"></el-input>
                  </el-col>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Hủy</el-button>
                <el-button type="primary" @click="dialogFormVisible = false"
                  >Gửi đề xuất</el-button
                >
              </span>
            </el-dialog>
          </div>
          <el-table :data="tableData" height="250" style="width: 100%">
            <el-table-column
              prop="offer"
              label="Đề xuất"
              align="center"
              width="500"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="Nhân viên"
              align="center"
              width="200"
            >
            </el-table-column>
            <el-table-column
              prop="department"
              label="Phòng ban"
              align="center"
              width="200"
            >
            </el-table-column>
            <el-table-column
              prop="status"
              label="Trạng thái"
              align="center"
              width="200"
            >
              <button
                style="
                  color: black;
                  background-color: #75c4c0;
                  border: none;
                  border-radius: 5px;
                  padding: 3px 20px;
                "
                class="tt1"
              >
                Đã được duyệt
              </button>
            </el-table-column>
            <el-table-column
              prop="manage"
              label="Trưởng phòng"
              align="center"
              width="200"
            >
            </el-table-column>
            <el-table-column
              prop="date"
              label="Ngày tạo"
              align="center"
              width="200"
            >
            </el-table-column>
            <el-table-column
              prop=""
              label="Thao tác"
              align="center"
              width="200"
            >
              <el-button type="success" icon="el-icon-check" circle></el-button>
              <el-button type="danger" icon="el-icon-close" circle></el-button>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Đề xuất của tôi" name="second">Config</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import UserService from "@/services/user.service";
export default {
  data() {
    return {
      options: [],
      value: [],
      list: [],
      activeName: "first",
      dialogFormNghi: false,
      dialogFormChamCong: false,
      users: [],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        followers: "",
      },
      tableData: [
      
      ],
    };
  },
  created() {
    UserService.getAllUser()
      .then((response) => {
        this.users = response.data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  mounted() {
    this.list = this.users.map((item) => {
      return { id: `id:${item}`, fullName: `${item}` };
    });
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      console.log("submit!");
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter((item) => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
  },
};
</script>
