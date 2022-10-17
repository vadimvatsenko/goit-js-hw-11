// import axios from 'axios';
// import { createMarkup } from './js/createMarkup';// шаблон разметки
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
// import LoadMoreBtn from './js/loadMoreBtn';// импорт кнопки loadmorebtn
// import { getRefs } from './js/getRefs';// импорт рефов
// import NewAPI from './js/API'// импортирую класс
// import { onScroll, onTopButton } from './js/scroll';
// import { emptySearchMessage, noImagesFoundMessage, imagesFoundMessage, endOfSearchMessage } from './js/notify';

// onScroll();//запуск скролла
// onTopButton();
// let lightbox;

// const newApiService = new NewAPI();// экземпляр класса для получения методов и свойств
// const refs = getRefs();// получаем рефы

// refs.searchField.addEventListener('submit', handleSubmit);

// function handleSubmit(e) {
//     e.preventDefault();
//     newApiService.query = e.currentTarget.searchQuery.value.trim();// записываем в query при помощи set введеную инвормацию в форму
    

//     if (newApiService.query === '') {
//         clearMarkup();
//         loadMoreBtn.hide();
//         return emptySearchMessage();
        
//     }

//     loadMoreBtn.show();//показать кнопку
//     clearMarkup();//очистить разметку
//     newApiService.resetPage(); // cбрасываем страницу на 1ю
//     runSimpleLightBox();// запустить lightbox
//     fetchAll();//

    
    
// }

// export const loadMoreBtn = new LoadMoreBtn({
//     selector: '.load-more',
//     hidden: true,
// });// теперь реф для кнопки loadmore не нужен

// loadMoreBtn.refs.button.addEventListener('click', onClickMoreBtn);// обращение к кнопке через класс

// function onClickMoreBtn() {
//     fetchAll();
// }

// function fetchAll() {
//     loadMoreBtn.disable();
//     newApiService.fetchArticles()
//         .then(card => {
            
//             loadMoreBtn.enable();
//             runMarkup(card); //функция разметки
//             lightbox.refresh(); // обновить lightbox
            
//         });
// }

// function runMarkup(c) {// создание разметки
//     refs.getGallery.insertAdjacentHTML('beforeend', createMarkup(c));
// }

// function clearMarkup() {// очистка разметки
//     refs.getGallery.innerHTML = '';
// }

// function runSimpleLightBox() {
//     lightbox = new SimpleLightbox('.gallery .gallery__link', {
//         captionsData: 'alt',
//         captionDelay: 250,
//     });

// }



import { createMarkup } from './js/createMarkup';// шаблон разметки
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import LoadMoreBtn from './js/loadMoreBtn';// импорт кнопки loadmorebtn
import { getRefs } from './js/getRefs';// импорт рефов
import NewAPI from './js/API'// импортирую класс
import { onScroll, onTopButton } from './js/scroll';
import { emptySearchMessage, noImagesFoundMessage, imagesFoundMessage, endOfSearchMessage } from './js/notify';
// import { runSimpleLightBox } from './js/simpleLigthBoxSettings';

onScroll();//запуск скролла
onTopButton();

function runSimpleLightBox() {
    lightbox = new SimpleLightbox('.gallery .gallery__link', {
        captionsData: 'alt',
        captionDelay: 250,
    });

}

const newApiService = new NewAPI();// экземпляр класса для получения методов и свойств
const refs = getRefs();// получаем рефы

refs.searchField.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    newApiService.query = e.currentTarget.searchQuery.value.trim();// записываем в query при помощи set введеную инвормацию в форму
    

    if (newApiService.query === '') {
        clearMarkup();
        // loadMoreBtn.hide();
        emptySearchMessage();
        return;
        
    } 

   
    clearMarkup();//очистить разметку
    newApiService.resetPage(); // cбрасываем страницу на 1ю
    runSimpleLightBox();// запустить lightbox
    fetchAll();//
    loadMoreBtn.show();//показать кнопку
    

    
    
}

export const loadMoreBtn = new LoadMoreBtn({
    selector: '.load-more',
    hidden: true,
});// теперь реф для кнопки loadmore не нужен

loadMoreBtn.refs.button.addEventListener('click', onClickMoreBtn);// обращение к кнопке через класс

function onClickMoreBtn() {
    fetchAll();
}

function fetchAll() {
    loadMoreBtn.disable();
    newApiService.fetchArticles()
        .then(data => {
            const totalPage = Math.ceil(data.totalHits / 40);
            console.log(totalPage);
            loadMoreBtn.enable();
            runMarkup(data.hits); //функция разметки
            lightbox.refresh(); // обновить lightbox
           
            if (data.totalHits === 0) {
                loadMoreBtn.hide();
                noImagesFoundMessage();
            }
            if (newApiService.page === 2 && data.totalHits !== 0) {

                 imagesFoundMessage(data.totalHits);
            }
            if (totalPage < newApiService.page && newApiService.page > 2) {
                loadMoreBtn.hide();
                 endOfSearchMessage();
            }
            if (data.totalHits <= 40) {
                loadMoreBtn.hide();
            }
         

            
            
    });
}

function runMarkup(c) {// создание разметки
    refs.getGallery.insertAdjacentHTML('beforeend', createMarkup(c));
}

function clearMarkup() {// очистка разметки
    refs.getGallery.innerHTML = '';
}







