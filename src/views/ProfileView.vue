<template>
  <div>
    <ProfileTopPart v-on:logout="onLogout()" />
    <ImagePreview
      :visible="showPreview"
      :images="selectedCollection"
      :index="clickedImageIndex"
      v-on:downloadImage="onDownloadImage"
      v-on:deleteImage="onDeleteImage"
      v-on:hide="showPreview = false"
    />

    <GalleryImageList
      :images="selectedCollection"
      :loading="isSelectedCollectionLoading"
      v-on:imageSelected="onImageSelected"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Image } from "@/types";
import { firebaseApp } from "@/firebase";
import { imageHelper } from "@/utils/imageHelper";
import { store, mutations } from "@/store";
import ProfileTopPart from "@/components/ProfileTopPart.vue";
import GalleryImageList from "@/components/GalleryImageList.vue";
import ImagePreview from "@/components/ImagePreview.vue";

@Component({
  components: {
    GalleryImageList,
    ProfileTopPart,
    ImagePreview
  }
})
export default class Profile extends Vue {
  public showPreview = false;
  public clickedImageIndex = 0;

  get selectedCollection(): Image[] {
    return store.selectedCollectionIndex
      ? store.rawImages
      : store.filteredImages;
  }

  get isSelectedCollectionLoading(): boolean {
    return store.selectedCollectionIndex
      ? store.loadingState.rawImageFetch
      : store.loadingState.filteredImageFetch;
  }

  mounted() {
    store.loadingState.rawImageFetch = true;
    imageHelper
      .getRawImages()
      .then(mutations.setRawImages)
      .catch((err: Error) => Vue.$toast.error(err.message))
      .finally(() => (store.loadingState.rawImageFetch = false));

    store.loadingState.filteredImageFetch = true;
    imageHelper
      .getFilteredImages()
      .then(mutations.setFilteredImages)
      .catch((err: Error) => Vue.$toast.error(err.message))
      .finally(() => (store.loadingState.filteredImageFetch = false));
  }

  onLogout() {
    mutations.setFilterResult(null);
    mutations.setSelectedPicture(null);
    firebaseApp
      .auth()
      .signOut()
      .then(() => setTimeout(() => this.$router.push("Login")));
  }

  onImageSelected(img: Image) {
    this.clickedImageIndex = this.selectedCollection.indexOf(img);
    this.showPreview = true;
  }

  onDownloadImage(imgIndex: number) {
    const src = this.selectedCollection?.[imgIndex]?.src;
    if (!src) {
      Vue.$toast.error("Could not download image");
      return;
    }

    Vue.$toast.info("Downloading image...");
    store.loadingState.downloadImage = true;

    imageHelper
      .downloadImage(src, "Image" + Date.now())
      .catch((err: Error) => Vue.$toast.error(err.message))
      .finally(() => (store.loadingState.downloadImage = false));
  }

  onDeleteImage(imgIndex: number) {
    const selectedImg = this.selectedCollection?.[imgIndex];
    if (!selectedImg?.id) {
      Vue.$toast.error("Could not delete image");
      return;
    }

    const newIndex = imgIndex - 1;
    if (newIndex < 0) {
      this.showPreview = this.selectedCollection.length - 1 > 0;
      if (this.showPreview) this.clickedImageIndex = 0;
    } else {
      this.clickedImageIndex = newIndex;
    }

    setTimeout(() => {
      const { promise, mutation } = store.selectedCollectionIndex
        ? {
            promise: imageHelper.deleteRawImage(selectedImg.id),
            mutation: mutations.setRawImages
          }
        : {
            promise: imageHelper.deleteFilteredImage(selectedImg.id),
            mutation: mutations.setFilteredImages
          };

      store.loadingState.deleteImage = true;
      promise
        .then(() => {
          mutation(this.selectedCollection.filter(img => img !== selectedImg));
          Vue.$toast.success("Image deleted");
        })
        .catch((err: Error) => Vue.$toast.error(err.message))
        .finally(() => (store.loadingState.deleteImage = false));
    });
  }
}
</script>
