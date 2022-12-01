<template>
  <div class="note-wrapper "  >
    <div class="d-flex flex-column" >
      <div style="font-weight: bold;">Chú thích</div>
      <div>
        <div class="d-flex flex-row">
          <el-button round class="h-25 me-3" style="background-color: #ecc376" ></el-button>
          <div style="text-align: justify">
            <p><span style="font-weight: bold">KL/H,H/KL</span>: Nghỉ nửa ngày</p>
          </div>
        </div>
        <div class="d-flex flex-row">
          <el-button round class="h-25 me-3" style="background-color:#E97C7C" ></el-button>
          <p><span style="font-weight: bold">KL</span>: Nghỉ không lương</p>
        </div>
        <div class="d-flex flex-row">
          <el-button round class="h-25 me-3 position-relative" style="background-color: #c9e3c6" >
          </el-button>
          <p><span style="font-weight: bold">H</span>: Làm hành chính</p>
        </div>
        <div class="d-flex flex-row">
          <el-button round class="h-25 me-3" style="background-color: #f8cbad"></el-button>
          <p><span style="font-weight: bold">NT</span>: Nghỉ tuần</p>
        </div>
        <div class="d-flex flex-row">
          <el-button round class="h-25 me-3" style="background-color: #b3e3f7"></el-button>
          <p><span style="font-weight: bold">L</span>: Nghỉ lễ</p>
        </div>
        <div class="d-flex flex-row">
          <el-button round class="h-25 me-3 position-relative" >
            <svg class="position-absolute top-0 end-0 " x="0px" y="0px"
                 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;width: 10px;fill: #A843A8FF " xml:space="preserve">
              <g>
                <polygon points="5.8,0.6 0,6.4 0,378.3 5.8,384 384,384 512,512 512,5.8 506.3,0 6.4,0 	"/>
              </g>
          </svg>
          </el-button>
          <p>Ghi chú</p>
        </div>
        <div class="d-flex flex-row">
          <el-button round class="h-25 me-3" ></el-button>
          <p><span style="font-weight: bold"></span>  Không đi làm</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoteCalender"
}
</script>

<style scoped>

</style>