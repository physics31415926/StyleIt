<template>
  <div class="wrapper">
    <template v-if="selectedPicture || filterResult">
      <div class="imageContainer">
        <img :src="selectedPicture.src" v-if="!filterResult" />
        <img :src="filterResult.src" v-else />
      </div>
      <div class="buttons">
        <template v-if="filterResult">
          <button
            class="btn btnSmall btnDangerOutline discard"
            @click="discardClicked = true"
            v-if="!discardClicked"
          >
            Discard changes
          </button>
          <template v-else>
            <button
              class="btn btnSmall btnDanger confirm"
              @click="discardChanges()"
              key="1"
            >
              Discard
            </button>
            <button
              class="btn btnSmall btnPrimary discard"
              @click="discardClicked = false"
              key="2"
            >
              Cancel
            </button>
          </template>
          <button
            class="btn btnSmall btnPrimaryOutline"
            @click="persistImage()"
            :disabled="isSaveToAlbumLoading || filterResult.savedToAlbum"
          >
            {{ filterResult.savedToAlbum ? "Saved" : "Save to album" }}
          </button>
        </template>
        <button
          class="btn btnSmall btnPrimaryOutline"
          @click="downloadImage()"
          :disabled="isDownloadImageLoading"
        >
          Download
        </button>
        <template v-if="!filterResult">
          <button
            v-if="!deleteClicked"
            class="btn btnSmall btnDangerOutline"
            @click="deleteClicked = true"
            key="3"
          >
            Delete
          </button>
          <template v-else>
            <button
              class="btn btnDanger btnSmall delete"
              @click="deleteImage()"
              key="4"
            >
              Delete
            </button>
            <button
              class="btn btnSmall btnPrimary"
              @click="deleteClicked = false"
              key="5"
            >
              Cancel
            </button>
          </template>
        </template>
      </div>
    </template>
    <template v-else>
      <div class="noImage">
        Select or upload an image to begin
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Image, FilterResult } from "@/types";
import { store } from "@/store";

@Component
export default class ImagePanel extends Vue {
  public discardClicked = false;
  public deleteClicked = false;

  get filterResult(): FilterResult | null {
    return store.filterResult;
  }

  get selectedPicture(): Image | null {
    return store.selectedPicture;
  }

  get isSaveToAlbumLoading(): boolean {
    return store.loadingState.saveToAlbum;
  }

  get isDownloadImageLoading(): boolean {
    return store.loadingState.downloadImage;
  }

  downloadImage() {
    this.$emit("downloadImage");
  }
  deleteImage() {
    this.deleteClicked = false;
    this.$emit("deleteImage");
  }

  persistImage() {
    this.$emit("persistImage");
  }

  discardChanges() {
    this.discardClicked = false;
    this.$emit("discardChanges");
  }
}
</script>

<style scoped>
.wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: var(--image-panel-height);
}

.imageContainer {
  height: calc(100% - 2rem - 33px);
  margin: 1rem;
  display: flex;
  justify-content: center;
}

.imageContainer > img {
  object-fit: scale-down;
  max-width: 50vw;
  min-width: 200px;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  padding: 0 1rem;
  height: 33px;
}

.buttons > button:last-child {
  margin-left: 0.5rem;
}

.buttons > .discard {
  margin-right: auto;
}

.buttons > .confirm {
  margin-right: 0.5rem;
}

.buttons > .delete {
  margin-left: 0.5rem;
}

.noImage {
  color: var(--light-blue);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  user-select: none;
}
</style>
