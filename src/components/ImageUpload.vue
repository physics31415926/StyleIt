<template>
  <div id="ImageUpload" class="zone">
    <vue-dropzone
      ref="imgDropZone"
      id="customdropzone"
      :options="dropzoneOptions"
      @vdropzone-complete="afterComplete"
    ></vue-dropzone>
  </div>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { store, mutations } from "@/store";
import { imageHelper } from "@/utils/imageHelper";
import Vue from "vue";
export default {
  name: "ImageUpload",
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 100,
        thumbnailHeight: 100,
        addRemoveLinks: false,
        acceptedFiles: ".jpg, .jpeg, .png",
        dictDefaultMessage: `<p class='text-default'><i class='fa fa-cloud-upload mr-2'></i>Click here<br/>to upload</p>
          `
      }
    };
  },
  methods: {
    async afterComplete(upload) {
      imageHelper
        .uploadImage(upload)
        .then(img => {
          store.rawImages.unshift(img);
          Vue.$toast.info("Image uploaded");
        })
        .catch(err => Vue.$toast.error(err.message))
        .finally(() => this.$refs.imgDropZone.removeFile(upload));
    }
  }
};
</script>
<style scoped>
.zone {
  height: 100%;
  width: 100%;
  border-radius: 10px;
}
.dropzone {
  width: 100%;
  height: 100%;
  min-height: 100px;
  padding: 0 0;
  background-color: var(--dark-grey-blue);
  border-radius: inherit;
}
.vue-dropzone {
  border: 0px;
  text-align: center;
  color: white;
  font-family: "Open Sans", sans-serif;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
  border-radius: inherit;
}
</style>
