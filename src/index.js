const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    searchField: document.querySelector('#search-form'),
    gallerySection: document.querySelector('.gallery__container'),
    
};

refs.searchField.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    const searchWord = e.currentTarget.searchQuery.value;

    searchImg(searchWord).then(data => {
        if (data.hits === '') {
            Notify.warning("Sorry, there are no images matching your search query. Please try again.");
        }
        console.log(data.hits);
        createMarkup(data.hits);


    }).catch(error => {
        console.log(error);
        
    });

    
}





const API_KEY = '29703536-3492bea623abb7896113a32cf';
const BASE_URL = 'https://pixabay.com/api/';
const SEARCH_SETTINGS = 'image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40'
const options = {
    headers: {
        Authorization: API_KEY,
    },
};

searchImg('beautiful+girl')

function searchImg(name) {
    return fetch(`${BASE_URL}?key=${API_KEY}&q=${name}&${SEARCH_SETTINGS}`)
        .then((response) => {
              if (!response.ok) {
        throw new Error(response.status);
      }
            return response.json();
    });
}

function createMarkup(e) {
    const markup = e.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
                <div class="gallery">
                    <a class ="gallery__item "href ="${largeImageURL}">
                        <div class="photo-card">
                            <img class = "photo-card__img" src="${webformatURL}" alt="${tags}" loading="lazy" width = 270 />
                                <div class="info">
                                    <p class="info-item">
                                        <b>Likes: </b>
                                        <b>${likes}</b>
                                    </p>
                                     <p class="info-item">
                                        <b>Views: </b>
                                        <b>${views}</b>

                                    </p>
                                    <p class="info-item">
                                        <b>Comments: </b>
                                        <b>${comments}</b>
                                    </p>
                                    <p class="info-item">
                                        <b>Downloads: </b>
                                        <b>${downloads}</b>

                                    </p>
                                </div>
                        </div>
                    </a>
                </div>
                `;
    }).join('');
    refs.gallerySection.innerHTML = markup;

}



let lightbox = new SimpleLightbox('.gallery .gallery__item', {
  captionsData: 'alt',
  captionDelay: 250,
});



