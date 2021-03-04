<template>
  <vue-easy-lightbox
    :visible="visible"
    :imgs="images"
    :index="index"
    @hide="hide"
    @on-index-change="indexChange"
  >
    <template v-slot:toolbar="{ toolbarMethods }">
      <div class="buttons">
        <button
          class="btn btnSmall btnPrimaryOutline"
          @click="toolbarMethods.zoomIn"
        >
          +
        </button>
        <button
          class="btn btnSmall btnPrimaryOutline"
          @click="toolbarMethods.zoomOut"
        >
          -
        </button>
        <button
          v-if="!deleteClicked"
          class="btn btnSmall btnDangerOutline"
          @click="deleteClicked = true"
          :disabled="isDeleteImageLoading"
          key="1"
        >
          Delete
        </button>
        <template v-else>
          <button class="btn btnSmall btnDanger" @click="deleteImage" key="2">
            Delete
          </button>
          <button
            class="btn btnSmall btnPrimary"
            @click="deleteClicked = false"
            key="3"
          >
            Cancel
          </button>
        </template>
        <button
          class="btn btnSmall btnPrimaryOutline"
          @click="downloadImage"
          :disabled="isDownloadImageLoading"
        >
          Download
        </button>
      </div>
    </template>
  </vue-easy-lightbox>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { Image } from "@/types";
import { store, mutations } from "@/store";

@Component
export default class ImagePreview extends Vue {
  @Prop({ default: false })
  public visible!: boolean;

  @Prop({ default: () => [] })
  public images!: Image[];

  @Prop({ default: 0 })
  public index!: number;

  public deleteClicked = false;

  private currentIndex?: number;

  mounted() {
    this.currentIndex = this.index;
  }

  @Watch("index")
  setCurrentIndex() {
    this.currentIndex = this.index;
  }

  get isDownloadImageLoading(): boolean {
    return store.loadingState.downloadImage;
  }

  get isDeleteImageLoading(): boolean {
    return store.loadingState.deleteImage;
  }

  hide() {
    this.$emit("hide");
  }

  indexChange(oldIndex: number, newIndex: number) {
    this.currentIndex = newIndex;
    this.deleteClicked = false;
  }

  downloadImage() {
    this.$emit("downloadImage", this.currentIndex);
  }

  deleteImage() {
    this.deleteClicked = false;
    this.$emit("deleteImage", this.currentIndex);
  }
}
</script>

<style scoped>
.buttons {
  user-select: none;
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translate(-50%);
  background: hsl(0, 0%, 5%);
  border-radius: 5px;
  overflow: hidden;
}

.buttons > button {
  border-radius: 2px !important;
  border-width: 0 !important;
  margin: 5px;
}
</style>
