interface GalleryItem {
    filename: string;
    title: string;
    alt_text: string;
}

interface GalleryImageItem {
    image: GetImageResult;
    thumb: GetImageResult;
    file: GalleryItem;
}