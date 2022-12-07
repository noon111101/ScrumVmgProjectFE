<template>
  <div>
    <h1>Danh sách đề xuất</h1>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane style="width: 100%" label="Tất cả" name="first">
        <br />
        <div className="container" style="text-align: center">
          <el-row :gutter="20">
            <el-col :md="6" :lg="6" :xl="6">
              <div class="grid-content" style="margin-bottom: 20px">
                <span>Phòng ban</span> &ensp;
                <el-select
                  v-model="departmentId"
                  placeholder="Chọn Phòng ban"
                  @change="getAll"
                >
                  <el-option value="0" label="Tất cả các phòng ban"></el-option>
                  <el-option
                    v-for="item in departments"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-col>

            <el-col :md="6" :lg="6" :xl="6" style="margin-bottom: 20px">
              <div class="grid-content">
                <span style="">Tìm kiếm</span> &ensp;
                <el-input
                  v-model="search"
                  @input="getAll"
                  size="medium"
                  placeholder="Tìm theo tên, email"
                  style="width: 200px; padding: 2px 0"
                />
              </div>
            </el-col>
            <el-col :md="6" :lg="6" :xl="6" style="margin-bottom: 20px">
              <div class="grid-content">
                <span style="">Trạng thái</span> &ensp;
                <el-select
                  v-model="status"
                  @change="getAll"
                  placeholder="Trạng thái"
                >
                  <el-option value="0" label="Tất cả"></el-option>
                  <el-option label="Chờ phê duyệt" value="1"></el-option>
                  <el-option label="Đã chấp thuận" value="2"></el-option>
                  <el-option label="Đã từ chối" value="3"></el-option>
                  <el-option label="Quá hạn duyệt" value="4"></el-option>
                </el-select>
              </div>
            </el-col>

            <el-col :md="6" :lg="6" :xl="6" class="div-buttons">
              <div class="grid-content div-buttons">
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
                      </el-link>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
          </el-row>
          <!--          <div style="float: right; margin-bottom: 20px" class="col-4 text-end">-->
          <!--            <el-dropdown>-->
          <!--              <el-button type="danger">-->
          <!--                Tạo đề xuất<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
          <!--              </el-button>-->
          <!--              <el-dropdown-menu slot="dropdown">-->
          <!--                <el-dropdown-item>-->
          <!--                  <el-link-->
          <!--                      class=""-->
          <!--                      type="danger"-->
          <!--                      style="margin-left: 20px; margin-right: 20px"-->
          <!--                      :underline="false"-->
          <!--                      round-->
          <!--                      @click="dialogFormNghi = true"-->
          <!--                  ><i class="el-icon-plus"></i>Đề xuất nghỉ-->
          <!--                  </el-link>-->
          <!--                </el-dropdown-item>-->
          <!--                <el-dropdown-item>-->
          <!--                  <el-link-->
          <!--                      class=""-->
          <!--                      type="danger"-->
          <!--                      style="margin-left: 20px; margin-right: 20px"-->
          <!--                      :underline="false"-->
          <!--                      round-->
          <!--                      @click="dialogFormChamCong = true"-->
          <!--                  ><i class="el-icon-plus"></i>Đề xuất chấm công-->
          <!--                  </el-link>-->
          <!--                </el-dropdown-item-->
          <!--                >-->
          <!--              </el-dropdown-menu>-->
          <!--            </el-dropdown>-->
        </div>
        <br />
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

        <el-table :data="requests" height="780" style="width: 100%">
          <el-table-column
            v-slot:="data"
            label="Đề xuất"
            align="center"
            width="380"
          >

            <router-link class="link" :to="{name: 'requestdetail', params: {id: data.row.id}}">{{ data.row.title }}</router-link>

          </el-table-column>
          <el-table-column
            prop="creator.fullName"
            label="Nhân viên"
            align="center"
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="creator.departments.name"
            label="Phòng ban"
            align="center"
            width="200"
          >
          </el-table-column>
          <el-table-column
            v-slot:="data"
            label="Trạng thái"
            align="center"
            width="200"
          >
            <button v-if="data.row.approveStatus.id == 1" class="btn-1">
              {{ data.row.approveStatus.name }}
            </button>
            <button v-if="data.row.approveStatus.id == 2" class="btn-2">
              {{ data.row.approveStatus.name }}
            </button>
            <button v-if="data.row.approveStatus.id == 3" class="btn-3">
              {{ data.row.approveStatus.name }}
            </button>
            <button v-if="data.row.approveStatus.id == 4" class="btn-4">
              {{ data.row.approveStatus.name }}
            </button>
            <!--            <button class="btn-2">-->
            <!--              Đã chấp thuận-->
            <!--            </button>-->
            <!--            <button class="btn-3">-->
            <!--              Đã từ chối-->
            <!--            </button>-->
            <!--            <button class="btn-4">-->
            <!--              Quá hạn duyệt-->
            <!--            </button>-->
          </el-table-column>
          <el-table-column
            v-slot:="data"
            label="Người duyệt"
            align="center"
            width="200"
          >
            <div
              v-for="(item, index) in data.row.approvers"
              :item="item"
              :index="index"
              :key="item.id"
            >
              <span>{{ item.fullName }}</span>
            </div>
          </el-table-column>
          <el-table-column
            v-slot:="data"
            label="Người theo dõi"
            align="center"
            width="200"
          >
            <div
              v-for="(item, index) in data.row.followers"
              :item="item"
              :index="index"
              :key="item.id"
            >
              <span>{{ item.fullName }}</span>
            </div>
          </el-table-column>
          <el-table-column
            prop="date"
            label="Ngày tạo"
            align="center"
            width="200"
          >
          </el-table-column>
          <el-table-column prop="" label="Thao tác" align="center" width="200">
            <el-button type="success" icon="el-icon-check" circle></el-button>
            <el-button type="danger" icon="el-icon-close" circle></el-button>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="Đề xuất của tôi" name="second">Config</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import RequestService from "@/services/request-service";
import UserService from "@/services/user.service";
export default {
  data() {
    return {
      options: [],
      value: [],
      list: [],
      users: [],
      activeName: "first",
      dialogFormNghi: false,
      dialogFormChamCong: false,
      form: {
        title: "",
        creator: "",
        approvers: "",
        followers: "",
        content: false,
        type: [],
        resource: "",
        desc: "",
      },
      requests: [],
      departments: [],
      departmentId: "",
      status: "",
      sendDepartmentId: 0,
      sendStatus: 0,
      search: "",
      totalItems: 0,
      page: 0,
      pageSize: 10,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.getParams();
    this.getAll();
    UserService.getAllUser()
      .then((response) => {
        this.users = response.data;
        console.log(1,  response.data);
        this.list = this.users.map((item) => {
          console.log(111)
          console.log(5, item);
          return { id: `id:${item.id}`, fullName: `${item.fullName}` };
        });
      })
      .catch((e) => {
        console.log(e);
      });

  },
  methods: {
    getParams() {
      this.fullName = this.currentUser.user.fullName;
    },
    remoteMethod(query) {
      console.log(query);
      console.log(2, this.list);
      if (query !== "") {
        this.loading = true;
   
          this.loading = false;
          this.options = this.list.filter((item) => {
            return item.fullName.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
       
      } else {
        this.options = [];
      }
    },
    getAll() {
      let params = null;

      if (this.departmentId == "" || this.departmentId == null) {
        this.sendDepartmentId = 0;
      } else {
        this.sendDepartmentId = this.departmentId;
      }
      if (this.status == "" || this.status == null) {
        this.sendStatus = 0;
      } else {
        this.sendStatus = this.status;
      }
      params = {
        page: this.page,
        size: this.pageSize,
        depart_id: this.sendDepartmentId,
        search: this.search,
        status: this.sendStatus,
      };
      RequestService.getAll(params)
        .then((response) => {
          this.requests = response.data.content;
          this.page = response.data.pageable.pageNumber;
          console.log(response.data.pageable.pageNumber);
          this.totalItems = response.data.totalElements;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style>
.link {
  text-decoration: none;
  color: #06bdb3;
  font-weight: 600;
}

.btn-1 {
  cursor: none;
  color: #df8620;
  background-color: #faecdb;
  border: none;
  border-radius: 20px;
  padding: 3px 20px;
}

.btn-2 {
  cursor: none;
  color: #2bbb6e;
  background-color: #def7ea;
  border: none;
  border-radius: 20px;
  padding: 3px 20px;
}

.btn-3 {
  cursor: none;
  color: #bf2c31;
  background-color: #f7dedf;
  border: none;
  border-radius: 20px;
  padding: 3px 20px;
}

.btn-4 {
  cursor: none;
  color: #6c6f93;
  background-color: #e4e5f1;
  border: none;
  border-radius: 20px;
  padding: 3px 20px;
}
</style>
