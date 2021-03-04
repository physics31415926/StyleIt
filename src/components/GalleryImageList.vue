<template>
  <div class="gallery">
    <div>
      <div class="tabs">
        <div
          v-bind:class="{ selected: selectedCollectionIndex === 0 }"
          @click="selectGallery(0)"
        >
          My Gallery
        </div>
        <div
          v-bind:class="{ selected: selectedCollectionIndex === 1 }"
          @click="selectGallery(1)"
        >
          My Uploads
        </div>
      </div>
    </div>
    <template v-if="loading">
      <div class="noImages">Loading...</div>
    </template>
    <template v-else>
      <template v-if="images.length">
        <div
          v-for="image in images"
          :key="image.id"
          class="imageContainer"
          v-on:click="onSelectImage(image)"
        >
          <img :src="image.src" alt="" />
        </div>
      </template>
      <template v-else>
        <div class="noImages">We found no images here</div>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Image } from "@/types";
import { Prop } from "vue-property-decorator";
import { store, mutations } from "@/store";

@Component
export default class GalleryImageList extends Vue {
  @Prop({ default: () => [] })
  public images!: Image[];

  @Prop({ default: false })
  public loading!: boolean;

  get selectedCollectionIndex(): number {
    return store.selectedCollectionIndex;
  }

  onSelectImage(selected: Image) {
    this.$emit("imageSelected", selected);
  }

  selectGallery(index: number) {
    mutations.setSelectedCollectionIndex(index);
  }
}
</script>

<style scoped>
.imageContainer {
  height: 120px;
  cursor: pointer;
  margin: 1rem;
  display: inline-block;
  max-width: 45%;
}

.imageContainer img {
  height: 100%;
  object-fit: cover;
  max-width: 100%;
}

.gallery {
  padding: 1.5rem;
}

.noImages {
  text-align: center;
  color: #ccc;
  padding-top: 2rem;
  font-size: 0.9em;
}

.tabs {
  display: flex;
  justify-content: space-evenly;
  margin-top: 1rem;
}

.tabs div {
  cursor: pointer;
  padding-bottom: 0.5rem;
}

.tabs div.selected {
  font-weight: bolder;
  border-bottom: 2px solid var(--main-blue);
}
</style>
