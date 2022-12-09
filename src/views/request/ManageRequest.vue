<template>
  <div>
    <h1 style="text-transform: uppercase">Danh sách đề xuất</h1>

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
                  <el-option label="Đã hủy" value="5"></el-option>
                  <el-option label="Hoàn thành" value="6"></el-option>
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
                        @click="openFormNghi"
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
                        @click="openFormChamCong"
                        ><i class="el-icon-plus"></i>Đề xuất chấm công
                      </el-link>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
          </el-row>
        </div>

        <el-dialog
          style="text-align: center; font-weight: bold"
          title="TẠO ĐỀ XUẤT NGHỈ"
          :visible.sync="dialogFormNghi"
        >
          <el-form id="formNghi" ref="form" :model="form" label-width="150px">
            <el-input
              type="text"
              placeholder=""
              v-model="username"
              style="width: 100%"
              name="creator"
              hidden
            ></el-input>
            <el-input
              type="text"
              placeholder=""
              v-model="categoryRequestId"
              style="width: 100%"
              name="catergoryRequest"
              hidden
            ></el-input>
            <el-input
              type="text"
              placeholder=""
              v-model="form.approveStatus"
              style="width: 100%"
              name="approveStatus"
              hidden
            ></el-input>
            <el-form-item label="Họ và tên *">
              <el-col :span="16">
                <el-input
                  type="text"
                  placeholder=""
                  v-model="fullName"
                  style="width: 100%"
                  readonly
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="Bộ phận *">
              <el-col :span="16">
                <el-input
                  type="text"
                  v-model="departmentName"
                  style="width: 100%"
                  readonly
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="Tên đề xuất *">
              <el-col :span="16">
                <el-input
                  placeholder="Họ và tên - Loại đề xuất - Thời gian nghỉ"
                  v-model="form.title"
                  name="title"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="Loại đề xuất *">
              <el-col :span="15">

                <b-form-select
                  style="width: 107%; padding: 9px 0;"
                  v-model="form.categoryReason"
                  placeholder="Chọn loại đề xuất nghỉ"
                  name="categoryReason"
                >
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >Chọn loại đề xuất</b-form-select-option
                    >
                  </template>

                  <b-form-select-option
                    v-for="(item, index) in categoryReasons"
                    :key="index"
                    :value="item.id"
                    >{{ item.name }}</b-form-select-option
                  >
                </b-form-select>

              </el-col>
            </el-form-item>

            <el-form-item label="Nghỉ từ *">
              <el-col :span="15">
                <el-date-picker
                  type="date"
                  placeholder="Chọn ngày"
                  v-model="form.dateFrom"
                  style="width: 52%"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  name="dateFrom"
                ></el-date-picker>
                &emsp;
                <el-time-select
                  name="timeStart"
                  style="width: 43%"
                  v-model="form.timeStart"
                  placeholder="Chọn giờ bắt đầu"
                  :picker-options="{
                    start: '07:00',
                    step: '00:15',
                    end: '19:00',
                  }"
                  format="HH:mm"
                  value-format="HH:mm"
                >
                </el-time-select>
              </el-col>
            </el-form-item>
            <el-form-item label="Nghỉ đến *">
              <el-col :span="15">
                <el-date-picker
                  name="dateTo"
                  type="date"
                  placeholder="Chọn ngày"
                  v-model="form.dateTo"
                  style="width: 52%"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
                &emsp;
                <el-time-select
                  name="timeEnd"
                  style="width: 43%"
                  v-model="form.timeEnd"
                  placeholder="Chọn giờ kết thúc"
                  :picker-options="{
                    start: '07:00',
                    step: '00:15',
                    end: '19:00',
                  }"
                  format="HH:mm"
                  value-format="HH:mm"
                >
                </el-time-select>
              </el-col>
            </el-form-item>
            <el-form-item label="Nhập nội dung *">
              <el-col :span="16">
                <el-input
                  name="content"
                  style="width: 100%"
                  type="textarea"
                  v-model="form.content"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="Người theo dõi *">
              <el-col :span="16">
                <div>
                  <b-form-tags
                    id="tags-with-dropdown"
                    no-outer-focus
                    class="mb-2"
                    v-model="form.followers"
                    name="followers"
                  >
                    <template v-slot="{ tags, disabled, addTag, removeTag }">
                      <ul
                        v-if="tags.length > 0"
                        class="list-inline d-inline-block mb-2"
                      >
                        <li
                          v-for="tag in tags"
                          :key="tag"
                          class="list-inline-item"
                        >
                          <b-form-tag
                            style="color: black; background-color: #abdbe3"
                            @remove="removeTag(tag)"
                            :title="tag"
                            :disabled="disabled"
                            variant="info"
                            >{{ tag }}</b-form-tag
                          >
                        </li>
                      </ul>
                      <b-dropdown
                        size="sm"
                        variant="outline-secondary"
                        block
                        menu-class="w-100"
                      >
                        <template #button-content>
                          <b-icon icon="tag-fill"></b-icon>Gắn thẻ người theo
                          dõi
                        </template>
                        <b-dropdown-form @submit.stop.prevent="() => {}">
                          <b-form-group
                            label="Search tags"
                            label-for="tag-search-input"
                            label-cols-md="auto"
                            class="mb-0"
                            label-size="sm"
                            :description="searchDesc"
                            :disabled="disabled"
                          >
                            <b-form-input
                              v-model="search"
                              id="tag-search-input"
                              type="search"
                              size="sm"
                              autocomplete="off"
                            ></b-form-input>
                          </b-form-group>
                        </b-dropdown-form>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item-button
                          v-for="option in availableOptions"
                          :key="option"
                          :value="option.username"
                          @click="onOptionClick({ option, addTag })"
                        >
                          {{ option.fullName }}
                        </b-dropdown-item-button>
                        <b-dropdown-text v-if="availableOptions.length === 0">
                          There are no tags available to select
                        </b-dropdown-text>
                      </b-dropdown>
                    </template>
                  </b-form-tags>
                </div>
              </el-col>
            </el-form-item>
            <el-form-item label="Người phê duyệt *">
              <el-col :span="16">
                <div>
                  <b-form-tags
                    id="tags-with-dropdown"
                    no-outer-focus
                    class="mb-2"
                    v-model="form.approvers"
                    name="approvers"
                  >
                    <template v-slot="{ tags, disabled, addTag, removeTag }">
                      <ul
                        v-if="tags.length > 0"
                        class="list-inline d-inline-block mb-2"
                      >
                        <li
                          v-for="tag in tags"
                          :key="tag"
                          class="list-inline-item"
                        >
                          <b-form-tag
                            style="color: black; background-color: #abdbe3"
                            @remove="removeTag(tag)"
                            :title="tag"
                            :disabled="disabled"
                            variant="info"
                            >{{ tag }}</b-form-tag
                          >
                        </li>
                      </ul>
                      <b-dropdown
                        size="sm"
                        variant="outline-secondary"
                        block
                        menu-class="w-100"
                      >
                        <template #button-content>
                          <b-icon icon="tag-fill"></b-icon> Gắn thẻ người phê
                          duyệt
                        </template>
                        <b-dropdown-form @submit.stop.prevent="() => {}">
                          <b-form-group
                            label="Search tags"
                            label-for="tag-search-input"
                            label-cols-md="auto"
                            class="mb-0"
                            label-size="sm"
                            :description="searchDesc"
                            :disabled="disabled"
                          >
                            <b-form-input
                              v-model="search"
                              id="tag-search-input"
                              type="search"
                              size="sm"
                              autocomplete="off"
                            ></b-form-input>
                          </b-form-group>
                        </b-dropdown-form>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item-button
                          v-for="option in availableOptions"
                          :key="option"
                          :value="option.username"
                          @click="onOptionClick({ option, addTag })"
                        >
                          {{ option.fullName }}
                        </b-dropdown-item-button>
                        <b-dropdown-text v-if="availableOptions.length === 0">
                          There are no tags available to select
                        </b-dropdown-text>
                      </b-dropdown>
                    </template>
                  </b-form-tags>
                </div>
              </el-col>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormNghi = false">Hủy</el-button>
            <el-button type="primary" @click="sendFormNghi"
              >Gửi đề xuất</el-button
            >
          </span>
        </el-dialog>

        <el-dialog
          style="text-align: center; font-weight: bold"
          title="TẠO ĐỀ XUẤT CHẤM CÔNG"
          :visible.sync="dialogFormChamCong"
        >
         <el-form id="formChamCong" ref="form" :model="form" label-width="150px">
            <el-input
              type="text"
              placeholder=""
              v-model="username"
              style="width: 100%"
              name="creator"
              hidden
            ></el-input>
            <el-input
              type="text"
              placeholder=""
              v-model="categoryRequestId"
              style="width: 100%"
              name="catergoryRequest"
              hidden
            ></el-input>
            <el-input
              type="text"
              placeholder=""
              v-model="form.approveStatus"
              style="width: 100%"
              name="approveStatus"
              hidden
            ></el-input>
            <el-form-item label="Họ và tên *">
              <el-col :span="16">
                <el-input
                  type="text"
                  placeholder=""
                  v-model="fullName"
                  style="width: 100%"
                  readonly
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="Bộ phận *">
              <el-col :span="16">
                <el-input
                  type="text"
                  v-model="departmentName"
                  style="width: 100%"
                  readonly
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="Tên đề xuất *">
              <el-col :span="16">
                <el-input
                  placeholder="Họ và tên - Loại đề xuất - Thời gian nghỉ"
                  v-model="form.title"
                  name="title"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="Loại đề xuất *">
              <el-col :span="15">
                <b-form-select
                  style="width: 107%; padding: 9px 0;"
                  v-model="form.categoryReason"
                  placeholder="Chọn loại đề xuất nghỉ"
                  name="categoryReason"
                >
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >Chọn loại đề xuất</b-form-select-option
                    >
                  </template>
                  <b-form-select-option
                    v-for="(item, index) in categoryReasons"
                    :key="index"
                    :value="item.id"
                    >{{ item.name }}</b-form-select-option
                  >
                </b-form-select>
              </el-col>
            </el-form-item>

            <el-form-item label="Nghỉ từ *">
              <el-col :span="15">
                <el-date-picker
                  type="date"
                  placeholder="Chọn ngày"
                  v-model="form.dateFrom"
                  style="width: 52%"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  name="dateFrom"
                ></el-date-picker>
                &emsp;
                <el-time-select
                  name="timeStart"
                  style="width: 43%"
                  v-model="form.timeStart"
                  placeholder="Chọn giờ bắt đầu"
                  :picker-options="{
                    start: '07:00',
                    step: '00:15',
                    end: '19:00',
                  }"
                  format="HH:mm"
                  value-format="HH:mm"
                >
                </el-time-select>
              </el-col>
            </el-form-item>
            <el-form-item label="Nghỉ đến *">
              <el-col :span="15">
                <el-date-picker
                  name="dateTo"
                  type="date"
                  placeholder="Chọn ngày"
                  v-model="form.dateTo"
                  style="width: 52%"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
                &emsp;
                <el-time-select
                  name="timeEnd"
                  style="width: 43%"
                  v-model="form.timeEnd"
                  placeholder="Chọn giờ kết thúc"
                  :picker-options="{
                    start: '07:00',
                    step: '00:15',
                    end: '19:00',
                  }"
                  format="HH:mm"
                  value-format="HH:mm"
                >
                </el-time-select>
              </el-col>
            </el-form-item>
            <el-form-item label="Nhập nội dung *">
              <el-col :span="16">
                <el-input
                  name="content"
                  style="width: 100%"
                  type="textarea"
                  v-model="form.content"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="Người theo dõi *">
              <el-col :span="16">
                <div>
                  <b-form-tags
                    id="tags-with-dropdown"
                    no-outer-focus
                    class="mb-2"
                    v-model="form.followers"
                    name="followers"
                  >
                    <template v-slot="{ tags, disabled, addTag, removeTag }">
                      <ul
                        v-if="tags.length > 0"
                        class="list-inline d-inline-block mb-2"
                      >
                        <li
                          v-for="tag in tags"
                          :key="tag"
                          class="list-inline-item"
                        >
                          <b-form-tag
                            style="color: black; background-color: #abdbe3"
                            @remove="removeTag(tag)"
                            :title="tag"
                            :disabled="disabled"
                            variant="info"
                            >{{ tag }}</b-form-tag
                          >
                        </li>
                      </ul>
                      <b-dropdown
                        size="sm"
                        variant="outline-secondary"
                        block
                        menu-class="w-100"
                      >
                        <template #button-content>
                          <b-icon icon="tag-fill"></b-icon>Gắn thẻ người theo
                          dõi
                        </template>
                        <b-dropdown-form @submit.stop.prevent="() => {}">
                          <b-form-group
                            label="Search tags"
                            label-for="tag-search-input"
                            label-cols-md="auto"
                            class="mb-0"
                            label-size="sm"
                            :description="searchDesc"
                            :disabled="disabled"
                          >
                            <b-form-input
                              v-model="search"
                              id="tag-search-input"
                              type="search"
                              size="sm"
                              autocomplete="off"
                            ></b-form-input>
                          </b-form-group>
                        </b-dropdown-form>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item-button
                          v-for="option in availableOptions"
                          :key="option"
                          :value="option.username"
                          @click="onOptionClick({ option, addTag })"
                        >
                          {{ option.fullName }}
                        </b-dropdown-item-button>
                        <b-dropdown-text v-if="availableOptions.length === 0">
                          There are no tags available to select
                        </b-dropdown-text>
                      </b-dropdown>
                    </template>
                  </b-form-tags>
                </div>
              </el-col>
            </el-form-item>
            <el-form-item label="Người phê duyệt *">
              <el-col :span="16">
                <div>
                  <b-form-tags
                    id="tags-with-dropdown"
                    no-outer-focus
                    class="mb-2"
                    v-model="form.approvers"
                    name="approvers"
                  >
                    <template v-slot="{ tags, disabled, addTag, removeTag }">
                      <ul
                        v-if="tags.length > 0"
                        class="list-inline d-inline-block mb-2"
                      >
                        <li
                          v-for="tag in tags"
                          :key="tag"
                          class="list-inline-item"
                        >
                          <b-form-tag
                            style="color: black; background-color: #abdbe3"
                            @remove="removeTag(tag)"
                            :title="tag"
                            :disabled="disabled"
                            variant="info"
                            >{{ tag }}</b-form-tag
                          >
                        </li>
                      </ul>
                      <b-dropdown
                        size="sm"
                        variant="outline-secondary"
                        block
                        menu-class="w-100"
                      >
                        <template #button-content>
                          <b-icon icon="tag-fill"></b-icon> Gắn thẻ người phê
                          duyệt
                        </template>
                        <b-dropdown-form @submit.stop.prevent="() => {}">
                          <b-form-group
                            label="Search tags"
                            label-for="tag-search-input"
                            label-cols-md="auto"
                            class="mb-0"
                            label-size="sm"
                            :description="searchDesc"
                            :disabled="disabled"
                          >
                            <b-form-input
                              v-model="search"
                              id="tag-search-input"
                              type="search"
                              size="sm"
                              autocomplete="off"
                            ></b-form-input>
                          </b-form-group>
                        </b-dropdown-form>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item-button
                          v-for="option in availableOptions"
                          :key="option"
                          :value="option.username"
                          @click="onOptionClick({ option, addTag })"
                        >
                          {{ option.fullName }}
                        </b-dropdown-item-button>
                        <b-dropdown-text v-if="availableOptions.length === 0">
                          There are no tags available to select
                        </b-dropdown-text>
                      </b-dropdown>
                    </template>
                  </b-form-tags>
                </div>
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

        <el-table :data="requests" height="700" style="width: 100%">

          <el-table-column
            v-slot:="data"
            label="Đề xuất"
            align="center"
            width="380"
          >
            <router-link
              class="link"
              :to="{ name: 'requestdetail', params: { id: data.row.id } }"
              >{{ data.row.title }}
            </router-link>
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
            <button v-if="data.row.approveStatus.id == 5" class="btn-3">
              {{ data.row.approveStatus.name }}
            </button>
            <button v-if="data.row.approveStatus.id == 6" class="btn-2">
              {{ data.row.approveStatus.name }}
            </button>
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
          <el-table-column prop="" label="Thao tác" align="center" width="200" v-slot:="data">
            <el-button type="success" v-if="data.row.approveStatus.id==1" @click="changeStatus(data.row.id, 2)"
                       icon="el-icon-check" circle></el-button>
            <el-button type="danger" v-if="data.row.approveStatus.id==1" @click="changeStatus(data.row.id, 3)"
                       icon="el-icon-close" circle></el-button>
            <el-button type="warning" v-if="data.row.approveStatus.id==2 || data.row.approveStatus.id==3"
                       @click="changeStatus(data.row.id, 1)" icon="el-icon-refresh-left" circle></el-button>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="Đề xuất của tôi" name="second">
        <MyRequests/>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
import RequestService from "@/services/request-service";
import UserService from "@/services/user.service";
import MyRequests from "@/views/request/MyRequests";

export default {
  components: {MyRequests},
  data() {
    return {
      options: [],
      value: [],
      list: [],
      users: [],
      activeName: "first",
      dialogFormNghi: false,
      dialogFormChamCong: false,
      fullName: "",
      username: "",
      departmentName: "",
      categoryRequestId: "",
      categoryReasons: [],
      approvestatus: "1",
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
      form: {
        title: "",
        creator: "",
        approvers: [],
        followers: [],
        content: "",
        approveStatus: 1,
        catergoryRequest: null,
        categoryReason: null,
        dateFrom: "",
        dateTo: "",
        timeStart: "",
        timeEnd: "",
      },

    };
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    criteria() {
      // Compute the search criteria
      return this.search.trim().toLowerCase();
    },
    availableOptions() {
      const criteria = this.criteria;
      // Filter out already selected options
      const options = this.users.filter(
        (opt) => this.value.indexOf(opt) === -1
      );
      if (criteria) {
        // Show only options that match criteria
        return options.filter(
          (opt) => opt.fullName.toLowerCase().indexOf(criteria) > -1
        );
      }
      // Show all options available
      return options;
    },
    searchDesc() {
      if (this.criteria && this.availableOptions.length === 0) {
        return "There are no tags matching your search criteria";
      }
      return "";
    },
  },
  created() {
    this.getParams();
    this.getAll();
    UserService.getAllUser()

      .then((response) => {
        this.users = response.data;
        console.log(1, response.data);
        this.list = this.users.map((item) => {
          console.log(5, item);
          return { username: `${item.username}`, fullName: `${item.fullName}` };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    onOptionClick({ option, addTag }) {
      addTag(option.username);
      this.search = "";
    },
    getParams() {
      this.fullName = this.currentUser.user.fullName;
      this.departmentName = this.currentUser.user.departments.name;
      this.username = this.currentUser.user.username;
    },
    changeStatus(requestId, statusId) {
      if (statusId == 1) {
        this.$swal
            .fire({
              title: "Xác nhận hoàn tác",
              showDenyButton: true,
              confirmButtonColor: "#75C4C0",
              confirmButtonText: "Hoàn Tác",
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
                RequestService.changeStatus(requestId,statusId).then((response) => {
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
      }
      if (statusId == 2) {
        this.$swal
            .fire({
              title: "Xác nhận chấp thuận",
              showDenyButton: true,
              confirmButtonColor: "#75C4C0",
              confirmButtonText: "Chấp thuận",
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
                RequestService.changeStatus(requestId,statusId).then((response) => {
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
      }
      if (statusId == 3) {
        this.$swal
            .fire({
              title: "Xác nhận từ chối",
              showDenyButton: true,
              confirmButtonColor: "#75C4C0",
              confirmButtonText: "Tù chối",
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
                RequestService.changeStatus(requestId,statusId).then((response) => {
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
      }

    },
    remoteMethod(query) {
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

    async sendFormNghi() {
      this.creator = this.currentUser.user.username;
      this.catergoryRequest = this.categoryRequestId;
      this.approveStatus = 1;
      // const params ={
      //   "title": this.title,
      //   "creator": this.currentUser.user.username,
      //   "approvers": this.approvers,
      //   "followers": this.followers,
      //   "content": this.content,
      //   "approveStatus": 1,
      //   "catergoryRequest": this.categoryRequestId,
      //   "categoryReason": this.categoryReason,
      //   "dateFrom": this.dateFrom,
      //   "dateTo": this.dateTo,
      //   "timeStart": this.timeStart,
      //   "timeEnd": this.timeEnd
      // }
      this.dialogFormNghi = false;
      let form = document.querySelector("#formNghi");
      console.log(this.form);
      RequestService.addRequest(form).then(() => {
        this.$notify.success({
          message: "Tạo đề xuất thành công",
          title: "Thành Công",
          timer: 2000,
          timerProgressBar: true,
        });
        this.getAll();
      });
    },
    openFormNghi() {
      this.dialogFormNghi = true;
      this.categoryRequestId = 1;
      RequestService.getCategoryReason(this.categoryRequestId).then(
        (response) => {
          this.categoryReasons = response.data;
          console.log(this.categoryReasons);
        }
      );
    },
    openFormChamCong() {
      this.dialogFormChamCong = true;
      this.categoryRequestId = 2;
      RequestService.getCategoryReason(this.categoryRequestId).then(
        (response) => {
          this.categoryReasons = response.data;
        }
      );
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
          this.requests = response.data;
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
