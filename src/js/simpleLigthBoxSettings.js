 

function runSimpleLightBox() {
    lightbox = new SimpleLightbox('.gallery .gallery__link', {
        captionsData: 'alt',
        captionDelay: 250,
    });

}

export { runSimpleLightBox };