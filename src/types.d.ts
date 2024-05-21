interface GalleryItem {
  filename: string;
  title: string;
  alt_text: string;
  src: any;
}

interface GalleryImageItem {
  image: GetImageResult;
  thumb: GetImageResult;
  file: GalleryItem;
}

