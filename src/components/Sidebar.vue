<template>
  <div class="sidebar" v-bind:class="{ processing: isProcessLoading }">
    <div class="filters">
      <div class="sidebarItem">
        <div class="header">
          <div>Super Resolution</div>
          <toggle-button
            :width="30"
            :height="18"
            v-model="superResolutionEffect"
            :sync="true"
          ></toggle-button>
        </div>
        <span class="description">Clarify, sharpen, and upscale images</span>
      </div>
      <div class="sidebarItem">
        <div class="header">
          <div>Colorization</div>
          <toggle-button
            :width="30"
            :height="18"
            v-model="colorizeEffect"
            :sync="true"
          ></toggle-button>
        </div>
        <span class="description">Colorize black and white images</span>
      </div>
      <div class="sidebarItem">
        <div>Art Style</div>
        <span class="description">Transfer an art style to your images</span>
        <div class="artImages">
          <div class="artImageItem" v-for="image in artImages" :key="image.id">
            <div
              class="imageContainer"
              v-bind:class="{ selected: artImage && artImage.id === image.id }"
              v-on:click="onSelectArtImage(image)"
            >
              <img :src="image.src" alt="" />
            </div>
            <div class="imageTitle" :title="image.title">
              {{ image.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      class="btn btnGradient start"
      @click="submitFilter()"
      :disabled="!canStartFilter"
    >
      Start Processing
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ArtImage, Image, FilterConfig, FilterResult } from "@/types";
import { store } from "@/store";
import ImageUpload from "@/components/ImageUpload.vue";
import { Watch } from "vue-property-decorator";
@Component({
  components: { ImageUpload }
})
export default class Sidebar extends Vue {
  public superResolutionEffect = false;
  public colorizeEffect = false;
  public artImage: ArtImage | null = null;

  get artImages(): ArtImage[] {
    return store.artImages;
  }

  get filterResult(): FilterResult | null {
    return store.filterResult;
  }

  get canStartFilter(): boolean {
    return (
      (this.superResolutionEffect || this.colorizeEffect || !!this.artImage) &&
      !!(store.selectedPicture || store.filterResult)
    );
  }

  get isProcessLoading(): boolean {
    return store.loadingState.filterProcess;
  }

  get selectedUserPicture(): Image | null {
    return store.selectedPicture;
  }

  @Watch("filterResult")
  resetSettings() {
    this.superResolutionEffect = false;
    this.colorizeEffect = false;
    this.artImage = null;
  }

  onSelectArtImage(artImage: ArtImage) {
    this.artImage = artImage.id === this.artImage?.id ? null : artImage;
  }

  submitFilter() {
    if (!this.canStartFilter) {
      return;
    }
    this.$emit("submitFilter", {
      superResolutionEffect: this.superResolutionEffect,
      colorizeEffect: this.colorizeEffect,
      artImage: this.artImage
    } as FilterConfig);
  }
}
</script>

<style scoped>
.sidebar {
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.filters {
  overflow-y: auto;
}

.sidebarItem {
  color: white;
  margin: 1rem;
}

.sidebarItem:not(:last-child) {
  border-bottom: 2px solid var(--dark-grey-blue);
  padding-bottom: 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header > :first-child {
  padding-right: 0.5rem;
}

.description {
  font-size: x-small;
}

.artImages {
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  justify-content: flex-start;
}

.artImageItem {
  flex: 1 1 100px;
  text-align: center;
  padding: 0.25rem;
  max-width: 100%;
}

.imageContainer {
  height: 100px;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 10px;
  transition: 0.1s linear;
}

.imageContainer img {
  border-radius: 10px;
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.imageContainer.selected {
  filter: brightness(60%);
  border-color: var(--main-blue);
}

.imageTitle {
  text-align: center;
  font-size: x-small;
}

.start {
  width: 100%;
  margin-top: 0.75rem;
}

.processing {
  filter: brightness(60%);
  pointer-events: none !important;
}
</style>
