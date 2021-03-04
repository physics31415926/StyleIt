import Vue from "vue";
import { User, Image, ArtImage, LoadingState, FilterResult } from "@/types";

interface Store {
  user: User;
  selectedPicture: Image | null;
  filterResult: FilterResult | null;
  artImages: ArtImage[];
  rawImages: Image[];
  filteredImages: Image[];
  loadingState: LoadingState;
  selectedCollectionIndex: number;
  imagePreviewIndex: number;
}

export const store = Vue.observable<Store>({
  user: null,
  selectedPicture: null,
  filterResult: null,
  artImages: [],
  rawImages: [],
  filteredImages: [],
  loadingState: {
    filterProcess: false,
    saveToAlbum: false,
    downloadImage: false,
    deleteImage: false,
    auth: false,
    rawImageFetch: false,
    filteredImageFetch: false
  },
  selectedCollectionIndex: 0,
  imagePreviewIndex: 0
});

// Use mutations to change the store!
export const mutations = {
  setUser(user: User | null) {
    store.user = user;
  },

  setSelectedPicture(picture: Image | null) {
    store.selectedPicture = picture;
  },

  setArtImages(images: ArtImage[]) {
    store.artImages = images;
  },

  setRawImages(images: Image[]) {
    store.rawImages = images;
  },

  setFilteredImages(images: Image[]) {
    store.filteredImages = images;
  },

  setFilterResult(filterResult: FilterResult | null) {
    store.filterResult = filterResult;
  },

  setSelectedCollectionIndex(collection: number) {
    store.selectedCollectionIndex = collection;
  },

  setImagePreviewIndex(index: number) {
    store.imagePreviewIndex = index;
  }
};
