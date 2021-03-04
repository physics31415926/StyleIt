<template>
  <div class="scrollable">
    <div class="imageContainer tiny">
      <ImageUpload> </ImageUpload>
    </div>
    <div
      v-for="image in images"
      :key="image.id"
      class="imageContainer"
      v-bind:class="{
        selected: selectedImage === image
      }"
      v-on:click="onSelectImage(image)"
    >
      <img :src="image.src" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Image } from "@/types";
import { Prop } from "vue-property-decorator";
import { store } from "@/store";
import ImageUpload from "@/components/ImageUpload.vue";
@Component({
  components: { ImageUpload }
})
export default class ImageListHorizontal extends Vue {
  @Prop({ default: () => [] })
  public images!: Image[];

  get selectedImage(): Image | null {
    return store.selectedPicture;
  }

  onSelectImage(selected: Image) {
    const newSelection = selected === this.selectedImage ? null : selected;
    this.$emit("imageSelected", newSelection);
  }
}
</script>

<style scoped>
.scrollable {
  margin: 0 0.5rem;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: hidden;
  height: var(--image-list-horizontal-height);
  min-height: var(--image-list-horizontal-height);
}

.imageContainer {
  margin: 0 0.25rem;
  height: 100px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: 0.1s linear;
  border-radius: 10px;
}

.imageContainer img {
  height: 100%;
  width: 150px;
  object-fit: cover;
  border-radius: inherit;
}
.tiny {
  word-break: break-all;
  min-width: 150px;
}

.selected {
  border-color: hsl(232, 78%, 63%);
  filter: brightness(60%);
}
</style>
