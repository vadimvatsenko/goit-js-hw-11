const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkup } from './js/createMarkup';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { getRefs } from './js/getRefs';
// import { searchImg } from './js/API';

import NewAPI from './js/API'// импортирую класс

const newApiService = new NewAPI();// экземпляр класса для получения методов и свойств


const refs = getRefs();// получаем рефы

let lightbox;

refs.searchField.addEventListener('submit', handleSubmit);



function handleSubmit(e) {
    e.preventDefault();
    newApiService.query = e.currentTarget.searchQuery.value.trim();// записываем в query при помощи set введеную инвормацию в форму

    if (newApiService.query === '') {
        clearMarkup();
        return Notify.failure('Request cannot be empty');
    }

    newApiService.resetPage(); // cбрасываем страницу
    newApiService.fetchArticles() // вызываем fetchArticles в API не нужно передавать слово, так как оно записано сеттером выше
        .then(card => {
            clearMarkup();
            runMarkup(card);
            runSimpleLightBox() // вызов SimpleLightBox
    })

}

refs.loadMoreBtn.addEventListener('click', onLoadMore);
function onLoadMore() {
    newApiService.fetchArticles()
    .then(card => {
        runMarkup(card); //функция разметки
        runSimpleLightBox(); // вызов SimpleLightBox
        
        
    })
};

function runMarkup(c) {
    refs.getGallery.insertAdjacentHTML('beforeend', createMarkup(c));
}

function clearMarkup() {
    refs.getGallery.innerHTML = '';
}






function runSimpleLightBox() {
   lightbox = new SimpleLightbox('.gallery .gallery__link', {
        captionsData: 'alt',
        captionDelay: 250,
    }).refresh()

}




