import db, { firebaseApp } from "@/firebase";
import { store, mutations } from "@/store";
import { Image, ArtImage } from "@/types";
import { uuid } from "vue-uuid";
import Vue from "vue";

function dataURLToBlob(dataURL: string): Blob {
  const byteString = atob(dataURL.split(",")[1]);
  const mimeString = dataURL
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeString });
  return blob;
}

function downloadBlob(blob: Blob, filename: string) {
  if (typeof window.navigator.msSaveBlob !== "undefined") {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const blobURL =
      window.URL && window.URL.createObjectURL
        ? window.URL.createObjectURL(blob)
        : window.webkitURL.createObjectURL(blob);

    const tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = blobURL;
    tempLink.setAttribute("download", filename);

    if (typeof tempLink.download === "undefined") {
      tempLink.setAttribute("target", "_blank");
    }

    document.body.appendChild(tempLink);
    tempLink.click();

    setTimeout(function() {
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobURL);
    }, 0);
  }
}

async function fetchImages(storagePath: string): Promise<Image[]> {
  const listResult = await firebaseApp
    .storage()
    .ref(storagePath)
    .listAll();

  const result: Image[] = [];
  for (const i of listResult.items) {
    const downloadURL = (await i.getDownloadURL()) as string;
    result.push({
      src: downloadURL,
      id: i.name
    });
  }
  return result.slice().reverse();
}

async function uploadImage(
  file: File | Blob,
  folderPath: string
): Promise<Image> {
  if (!file.type.startsWith("image/")) {
    throw new Error("You can only upload images!");
  }

  const imageName = Date.now() + uuid.v1();
  const metadata = {
    contentType: file.type,
    cacheControl: "public, max-age=7200"
  };
  const fileExtension = file.type.split("/")[1];

  const imageRef = firebaseApp
    .storage()
    .ref()
    .child(`${folderPath}/${imageName}.${fileExtension}`);

  await imageRef.put(file, metadata);

  const downloadURL = await imageRef.getDownloadURL();
  return { id: imageRef.name, src: downloadURL } as Image;
}

async function deleteImage(filePath: string) {
  const imageRef = firebaseApp
    .storage()
    .ref()
    .child(filePath);

  return imageRef.delete().catch(() => {
    throw new Error("Delete failed!");
  });
}

class ImageHelper {
  async downloadImage(
    imageData: Blob | string,
    filename: string
  ): Promise<void> {
    let blob: Blob;
    if (typeof imageData === "string") {
      // check if base64
      if (imageData.startsWith("data:")) {
        blob = dataURLToBlob(imageData);
      } else {
        try {
          blob = await fetch(imageData).then(resp => resp.blob());
        } catch {
          throw new Error("Cannot download the desired image");
        }
      }
    } else {
      blob = imageData;
    }
    const fileExtension = blob.type.split("/")[1];
    downloadBlob(blob, filename + "." + fileExtension);
  }

  async getArtImages(): Promise<ArtImage[]> {
    if (!store.user) {
      throw new Error("User is not authenticated!");
    }

    const artImages: ArtImage[] = [];
    const res = await db.collection("artStyles").get();
    res.forEach(doc => {
      artImages.push({
        id: doc.id,
        src: doc.data().src as string,
        title: doc.data().title as string
      } as ArtImage);
    });
    return artImages;
  }

  async getRawImages(): Promise<Image[]> {
    if (!store.user) {
      throw new Error("User is not authenticated!");
    }

    return await fetchImages(`images/${store.user.uid}/`);
  }

  async getFilteredImages(): Promise<Image[]> {
    if (!store.user) {
      throw new Error("User is not authenticated!");
    }

    return await fetchImages(`filteredImages/${store.user.uid}/`);
  }

  async uploadImage(file: File): Promise<Image> {
    if (!store.user) {
      throw new Error("User is not authenticated!");
    }

    return uploadImage(file, `images/${store.user.uid}`);
  }

  async saveFilteredImage(src: string): Promise<Image> {
    if (!store.user) {
      throw new Error("User is not authenticated!");
    }

    let blob: Blob;
    try {
      blob = await fetch(src).then(resp => resp.blob());
    } catch {
      throw new Error("Invalid image!");
    }

    return uploadImage(blob, `filteredImages/${store.user.uid}`);
  }
  async deleteRawImage(imageName: string): Promise<Image> {
    if (!store.user) {
      throw new Error("User is not authenticated!");
    }
    return deleteImage(`images/${store.user.uid}/${imageName}`);
  }

  async deleteFilteredImage(imageName: string): Promise<Image> {
    if (!store.user) {
      throw new Error("User is not authenticated!");
    }
    return deleteImage(`filteredImages/${store.user.uid}/${imageName}`);
  }
}

export const imageHelper = new ImageHelper();
