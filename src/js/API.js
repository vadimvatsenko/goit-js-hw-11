// import axios from 'axios';
// import { emptySearchMessage, noImagesFoundMessage, imagesFoundMessage, endOfSearchMessage } from './notify';
// import LoadMoreBtn from './loadMoreBtn';
// import loadMoreBtn from '../index';

// export default class NewApi {
//     constructor() {
//         this.searchQuery = ''// по умолчанию форма пуста, класс должен хранить эту информацию
//         this.page = 1;// по умолчанию страница 1
//     }// конструктор
//     fetchArticles() {// ничего не будем получать
//         const API_KEY = '29703536-3492bea623abb7896113a32cf';
//         const BASE_URL = 'https://pixabay.com/api/';
//         const SEARCH_SETTINGS = `image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
//         const URL = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&${SEARCH_SETTINGS}`;

//        return fetch(URL)// возращаем данные промиса во внешний код
//             .then(response => response.json())
//            .then(data => {
//                console.log(data);
//                if (this.page === 1 && data.totalHits !== 0 ) {
//                    imagesFoundMessage(data.totalHits);
//                }
//                if (data.totalHits < 40) {
//                   endOfSearchMessage();
//                 //    loadMoreBtn.hide();

//                }
              

            
        
//                this.incrementPage();// если запрос успешный то увеличиваем страницу на 1
//                return data.hits ; //возвращаем данные промиса во внешний код
//         });
//     }
  
//     incrementPage() {
//         this.page += 1;
//     }
//     resetPage() {
//         this.page = 1;
//     }
//     get currentPage() {
//         return this.page;
//     }
//     get query() {
//         return this.searchQuery// если нужно будет получить значение query
//     }

//     set query(newQeury) {// если нужно будет обновить searchQuery
//         this.searchQuery = newQeury;
//     }

// }

import axios from 'axios';
import { emptySearchMessage, noImagesFoundMessage, imagesFoundMessage, endOfSearchMessage } from './notify';
import LoadMoreBtn from './loadMoreBtn';
import loadMoreBtn from '../index';

export default class NewApi {
    constructor() {
        this.searchQuery = ''// по умолчанию форма пуста, класс должен хранить эту информацию
        this.page = 1;// по умолчанию страница 1
    }// конструктор
    async fetchArticles() {// ничего не будем получать
        const API_KEY = '29703536-3492bea623abb7896113a32cf';
        const BASE_URL = 'https://pixabay.com/api/';
        const SEARCH_SETTINGS = `image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
        const URL = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&${SEARCH_SETTINGS}`;

        try {
            const response = await fetch(URL);// возращаем данные промиса во внешний код
            this.incrementPage();// если запрос успешный то увеличиваем страницу на 1
           
            return await response.json(); //возвращаем данные промиса во внешний код
            
        } catch (error) {
            console.log(error.message);
        }

    }
  
    incrementPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }
    get currentPage() {
        return this.page;
    }
    get query() {
        return this.searchQuery// если нужно будет получить значение query
    }

    set query(newQeury) {// если нужно будет обновить searchQuery
        this.searchQuery = newQeury;
    }

}

