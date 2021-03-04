<template>
  <div class="mainContent">
    <Sidebar class="left" v-on:submitFilter="onSubmitFilter($event)" />
    <div class="right">
      <ImagePanel
        v-on:downloadImage="onDownloadImage()"
        v-on:persistImage="onPersistImage()"
        v-on:discardChanges="onDiscardChanges()"
        v-bind:class="{ noImageBar: filterResult }"
        v-on:deleteImage="onDeleteImage()"
      />
      <ImageListHorizontal
        v-if="!filterResult"
        :images="rawImages"
        v-on:imageSelected="selectImage($event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import Sidebar from "@/components/Sidebar.vue";
import { Image, ArtImage, FilterConfig, FilterResult } from "@/types";
import ImageListHorizontal from "@/components/ImageListHorizontal.vue";
import ImagePanel from "@/components/ImagePanel.vue";
import { store, mutations } from "@/store";
import { imageHelper } from "@/utils/imageHelper";
import { deepAiClient } from "@/utils/deepai";

@Component({
  components: {
    Sidebar,
    ImageListHorizontal,
    ImagePanel
  }
})
export default class Home extends Vue {
  get filterResult(): FilterResult | null {
    return store.filterResult;
  }

  get artImages(): ArtImage[] {
    return store.artImages;
  }

  get rawImages(): Image[] {
    return store.rawImages;
  }

  get selectedPicture(): Image | null {
    return store.selectedPicture;
  }

  mounted() {
    // we only need to fetch it once, since these won't change
    if (!store.artImages.length) {
      imageHelper
        .getArtImages()
        .then(mutations.setArtImages)
        .catch((err: Error) => Vue.$toast.error(err.message));
    }

    imageHelper
      .getRawImages()
      .then(mutations.setRawImages)
      .catch((err: Error) => Vue.$toast.error(err.message));
  }

  beforeDestroy() {
    mutations.setSelectedPicture(null);
  }

  async onDownloadImage() {
    const src = this.filterResult?.src || this.selectedPicture?.src;
    try {
      if (src) {
        Vue.$toast.info("Downloading image...");
        store.loadingState.downloadImage = true;
        await imageHelper.downloadImage(src, "Image" + Date.now());
      }
    } catch (err) {
      Vue.$toast.error(err.message);
    } finally {
      store.loadingState.downloadImage = false;
    }
  }

  onPersistImage() {
    if (!this.filterResult) {
      return;
    }
    store.loadingState.saveToAlbum = true;
    Vue.$toast.info("Saving image...");
    imageHelper
      .saveFilteredImage(this.filterResult.src)
      .then(() => {
        mutations.setFilterResult({
          src: this.filterResult?.src,
          savedToAlbum: true
        } as FilterResult);
        Vue.$toast.success("Image saved to collection");
      })
      .catch((err: Error) => Vue.$toast.error(err.message))
      .finally(() => (store.loadingState.saveToAlbum = false));
  }

  onDiscardChanges() {
    mutations.setFilterResult(null);
  }
  onDeleteImage() {
    if (!this.selectedPicture) {
      return;
    }
    imageHelper
      .deleteRawImage(this.selectedPicture.id)
      .then(() => {
        mutations.setRawImages(
          store.rawImages.filter(img => img !== this.selectedPicture)
        );
        mutations.setSelectedPicture(null);
        Vue.$toast.success("Image deleted!");
      })
      .catch((err: Error) => Vue.$toast.error(err.message));
  }

  onSubmitFilter(config: FilterConfig) {
    const url = this.filterResult?.src || this.selectedPicture?.src;
    if (!url) {
      return;
    }
    Vue.$toast.info("Image processing started...");
    store.loadingState.filterProcess = true;
    deepAiClient
      .callApiWithConfig(url, config)
      .then((resUrl: string) => {
        if (store.user) {
          mutations.setFilterResult({
            src: resUrl,
            savedToAlbum: false
          } as FilterResult);
          Vue.$toast.info("Image filtering done", {
            onClick: () => {
              if (this.$route.name !== "Home") {
                this.$router.push("Home");
              }
            }
          });
        }
      })
      .catch((err: Error) => Vue.$toast.error(err.message))
      .finally(() => (store.loadingState.filterProcess = false));
  }

  selectImage(image: Image) {
    mutations.setSelectedPicture(image);
  }
}
</script>

<style scoped>
.mainContent {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.left {
  width: 35%;
  background-color: var(--dark-blue);
  margin-right: 16px;
  max-width: 360px;
}

.right {
  min-width: 65%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: var(--dark-blue);
  flex: 1;
}

.noImageBar {
  padding-bottom: 1rem;
  height: calc(100% - 1rem);
}

@media screen and (max-width: 640px) {
  .mainContent {
    flex-direction: column;
  }

  .right {
    width: 100%;
    overflow-y: auto;
    height: 65%;
    display: block;
  }

  .left {
    max-width: 100%;
    width: calc(100% - 2rem);
    height: 35%;
    margin-right: 0;
    margin-bottom: 1rem;
  }
}
</style>
