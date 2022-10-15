const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkup } from './js/createMarkup';// шаблон разметки
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import LoadMoreBtn from './js/loadMoreBtn';// импорт кнопки loadmorebtn
import { getRefs } from './js/getRefs';// импорт рефов
import NewAPI from './js/API'// импортирую класс

import { onScroll, onTopButton } from './js/scroll';

onScroll();
onTopButton();

const newApiService = new NewAPI();// экземпляр класса для получения методов и свойств
const refs = getRefs();// получаем рефы

refs.searchField.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    newApiService.query = e.currentTarget.searchQuery.value.trim();// записываем в query при помощи set введеную инвормацию в форму

    if (newApiService.query === '') {
        clearMarkup();
        loadMoreBtn.hide();
        return Notify.failure('Request cannot be empty');
        
    } 

        loadMoreBtn.show();//показать кнопку
        clearMarkup();//
        newApiService.resetPage(); // cбрасываем страницу
        runSimpleLightBox();
        fetchAll();
    
}

const loadMoreBtn = new LoadMoreBtn({
    selector: '.load-more',
    hidden: true,
});// теперь реф для кнопки loadmore не нужен
console.log(loadMoreBtn);

loadMoreBtn.refs.button.addEventListener('click', fetchAll);// обращение к кнопке через класс


function fetchAll() {
    loadMoreBtn.disable();
    newApiService.fetchArticles()
        .then(card => {
            if (card.length === 0) {
                loadMoreBtn.hide();
                return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            }
            loadMoreBtn.enable();
            runMarkup(card); //функция разметки
            lightbox.refresh(); // обновить lightbox
            console.log(card.totalHits)
        });
}

function runMarkup(c) {// создание разметки
    refs.getGallery.insertAdjacentHTML('beforeend', createMarkup(c));
}

function clearMarkup() {// очистка разметки
    refs.getGallery.innerHTML = '';
}

function runSimpleLightBox() {
    lightbox = new SimpleLightbox('.gallery .gallery__link', {
        captionsData: 'alt',
        captionDelay: 250,
    });

}






