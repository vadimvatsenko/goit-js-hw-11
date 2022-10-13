// const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkup } from './js/createMarkup';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { getRefs } from './js/getRefs';
import { searchImg } from './js/API';

const refs = getRefs();




refs.searchField.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    const searchWord = e.currentTarget.searchQuery.value;
    console.log(searchWord);

    searchImg(searchWord).then(data => {
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
        refs.getGallery.innerHTML = createMarkup(data.hits);
        runSimpleLightBox();
       
        }).catch(error => {
        console.log(error);
        
    });

}

function runSimpleLightBox() {
     lightbox = new SimpleLightbox('.gallery .gallery__link', {
            captionsData: 'alt',
            captionDelay: 250,
     });
    lightbox.refresh();
}

refs.searchBtn.addEventListener('click', test);

function test() {
    console.log('click')
    refs.loadMoreBtn.classList.toggle('is-hidden');
   
};

