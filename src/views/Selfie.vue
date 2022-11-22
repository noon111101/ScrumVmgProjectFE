<template>
  <div class="container" >
    <div class="web-camera-container text-center" >
<!--      <div class="camera-button">-->
<!--        <button type="button" class="button is-rounded" @click="toggleCamera">-->
<!--          <span v-if="!isCameraOpen">open camera</span>-->
<!--          <span v-else>close camera</span>-->
<!--        </button>-->
<!--      </div>-->
<!--      <div class="camera-loading" v-show="isCameraOpen && isLoading">-->
<!--        <ul class="loader-circle">-->
<!--          <li></li>-->
<!--          <li></li>-->
<!--          <li></li>-->
<!--        </ul>-->
<!--      </div>-->

      <div
          v-if="isCameraOpen"
          v-show="!isLoading"
          class="camera-box"
          :class="{ flash: isShotPhoto }"
      >
        <div class="camera-shutter" :class="{ flash: isShotPhoto }"></div>
        <video v-show="!isPhotoTaken" ref="camera" :width="450"
               :height="337.5" autoplay></video>
        <canvas
            v-show="isPhotoTaken"
            id="photoTaken"
            ref="canvas"
            :width="450"
            :height="337.5"
        ></canvas>
      </div>

      <div v-if="isCameraOpen && !isLoading" class="">
        <el-button type="button" class="button" @click="takePhoto" round>
          <img
              src="../assets/camera.png"
              style="width: 50px; height: 50px"
          />
        </el-button>
      </div>

      <div v-if="isPhotoTaken && isCameraOpen" class="camera-download">
        <a
            id="downloadPhoto"
            download="my-photo.jpg"
            class="button"
            role="button"
            @click="downloadImage"
            style="margin-bottom: 100px"
        >
          Download
        </a>
        <br>

        <table class="text-center" style="display: inline-block; margin: auto">
          <tr>
            <td width="200px">Mã nhân viên</td>
            <td>{{currentUser.user.code}}</td>
          </tr>
          <tr>
              <td width="200px">Họ và tên</td>
              <td>{{currentUser.user.fullName}}</td>
          </tr>
          <tr>
            <td width="200px">Email</td>
            <td>{{currentUser.user.username}}</td>
          </tr>
          

        </table>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: "App",
  data() {
    return {
      isCameraOpen: false,
      isPhotoTaken: false,
      isShotPhoto: false,
      isLoading: false,
      link: "#",
    };
  },

  created(){
    this.isCameraOpen = true;
    this.createCameraElement();
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      console.log(localStorage.getItem('user'))
      // return JSON.parse(localStorage.getItem('user'));
      // console.log("dddd"+this.$store.state.auth.user)
      return this.$store.state.auth.user;

    },
  },
  methods: {
    // toggleCamera() {
    //   if (this.isCameraOpen) {
    //     this.isCameraOpen = false;
    //     this.isPhotoTaken = false;
    //     this.isShotPhoto = false;
    //     this.stopCameraStream();
    //   } else {
    //     this.isCameraOpen = true;
    //     this.createCameraElement();
    //   }
    // },
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

    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    },

    takePhoto() {
      if (!this.isPhotoTaken) {
        this.isShotPhoto = false;
        const FLASH_TIMEOUT = 50;
        setTimeout(() => {
          this.isShotPhoto = false;
        }, FLASH_TIMEOUT);
      }
      this.isPhotoTaken = !this.isPhotoTaken;
      const context = this.$refs.canvas.getContext("2d");
      context.drawImage(this.$refs.camera, 0, 0, 450, 337.5);
    },

    downloadImage() {
      const download = document.getElementById("downloadPhoto");
      const canvas = document
          .getElementById("photoTaken")
          .toDataURL("image/jpeg")
          .replace("image/jpeg", "image/octet-stream");
      download.setAttribute("href", canvas);
    },
  },
};
</script>
