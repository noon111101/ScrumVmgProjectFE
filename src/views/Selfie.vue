<template>
  <div  id="snapShoot" class="container" style="background-color: white" >
    <div v-show="isCameraOpen">
      <video  ref="camera" :width="450"
             :height="337.5" autoplay>
      </video>
      <el-button type="button" class="button-camera" @click="takePhoto" round>
        <img
            src="../assets/camera.png"
            style="width: 50px; height: 50px"
        />
      </el-button>


    </div>
    <div class="text-center mt-5 position-relative" v-show="!isCameraOpen">
      <canvas
          v-show="isPhotoTaken"
          id="photoTaken"
          ref="canvas"
          :width="450"
          :height="337.5"
      ></canvas>
      <div class="text-center mt-5">
        <el-button  v-show="isPhotoTaken" type="danger"  @click="confirm" round>Xác nhận</el-button>
        <el-button type="info"  @click="openFullscreen" round>Chụp ảnh</el-button>

      </div>
    </div>
  </div>

</template>
<script>
import logdetailService from "@/services/logdetail-service";

export default {
  name: "App",
  data() {
    return {
      isCameraOpen: false,
      isPhotoTaken: false,
      isShotPhoto: false,
      isLoading: false,
    };
  },

  created(){
    this.createCameraElement();
  },
  computed: {
  },
  methods: {
    createCameraElement() {
      this.isLoading = true;
      const constraints = (window.constraints = {
        audio: false,
        video: true,
      });
      navigator.mediaDevices
          .getUserMedia(constraints)
          .then((stream) => {
            this.isLoading = false;
            this.$refs.camera.srcObject = stream;
          })
          .catch((error) => {
            this.isLoading = false;
            alert("May the browser..." + error);
          });
    },
    takePhoto() {
      this.isPhotoTaken = true;
      this.isCameraOpen=false;
      const context = this.$refs.canvas.getContext("2d");
      context.drawImage(this.$refs.camera, 0, 0, 450, 337.5);
    },
    sendImage() {
      const canvas = document.getElementById("photoTaken");
      if (canvas.toBlob) {
        canvas.toBlob(function (blob) {
          // Do something with the blob object,
          // e.g. create multipart form data for file uploads:
          var formData = new FormData()
          formData.append('file', blob, 'image.jpg');
          formData.append('code',2026 );
          formData.append('fullName', "Phạm Bảo Ngọc");
          logdetailService.sendImg(formData).then(respone=>{
              console.log(respone.data)
          })
        }, 'image/jpeg')

      }
    },
    confirm(){
      this.sendImage();
    },
    openFullscreen() {
      this.isPhotoTaken=false
      this.isCameraOpen=true
      var elem = document.getElementById("snapShoot");
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
}
  }
};
</script>

<style>
video {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
  -webkit-transition: all 1s;
  -moz-transition: all 1s;
  -o-transition: all 1s;
  transition: all 1s;
}
.button-camera{
  background-color: #666;
  border: medium none;
  color: #fff;
  display: block;
  font-size: 18px;
  left: 50%;
  margin: 0 auto;
  padding: 8px 16px;
  position: absolute;
  bottom: 30px;
}
.button-camera.active {
  background-color: #0077a2;
}

</style>

