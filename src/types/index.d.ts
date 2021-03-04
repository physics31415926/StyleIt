export type User = firebase.User | null;

export interface DeepAiResult {
  id: string;
  output_url: string;
}

export interface Image {
  id: string;
  src: string;
}

export interface ArtImage extends Image {
  title: string;
}

export interface FilterResult {
  src: string;
  savedToAlbum: boolean;
}

export interface FilterConfig {
  superResolutionEffect: boolean;
  colorizeEffect: boolean;
  artImage: ArtImage | null;
}

export interface LoadingState {
  saveToAlbum: boolean;
  filterProcess: boolean;
  downloadImage: boolean;
  deleteImage: boolean;
  rawImageFetch: boolean;
  filteredImageFetch: boolean;
  auth: boolean;
}
