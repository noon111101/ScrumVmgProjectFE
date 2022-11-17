<template>
  <div class="container" >
    <div class="web-camera-container text-center" >
      <div class="camera-button">
        <button type="button" class="button is-rounded" @click="toggleCamera">
          <span v-if="!isCameraOpen">open camera</span>
          <span v-else>close camera</span>
        </button>
      </div>
      <div class="camera-loading" v-show="isCameraOpen && isLoading">
        <ul class="loader-circle">
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>

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
        <button type="button" class="button" @click="takePhoto">
          <img
              src="../assets/camera.png"
              style="width: 50px; height: 50px"
          />
        </button>
      </div>

      <div v-if="isPhotoTaken && isCameraOpen" class="camera-download">
        <a
            id="downloadPhoto"
            download="my-photo.jpg"
            class="button"
            role="button"
            @click="downloadImage"
        >
          Download
        </a>
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

  methods: {
    toggleCamera() {
      if (this.isCameraOpen) {
        this.isCameraOpen = false;
        this.isPhotoTaken = false;
        this.isShotPhoto = false;
        this.stopCameraStream();
      } else {
        this.isCameraOpen = true;
        this.createCameraElement();
      }
    },
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
