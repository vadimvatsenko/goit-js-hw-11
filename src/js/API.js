import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export default class NewApi {
    constructor() {
        this.searchQuery = ''// по умолчанию форма пуста, класс должен хранить эту информацию
        this.page = 1;// по умолчанию страница 1
        this.perPage = 40;
        this.params = {
            params: {
            key: '29703536-3492bea623abb7896113a32cf',
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: this.perPage,
    },
  };
    }// конструктор
    async fetchArticles() {// ничего не будем получать, только отправлять
        
        try {
            const urlAXIOS = `?page=${this.page}&q=${this.query}`;
            const { data } = await axios.get(urlAXIOS, this.params);
            this.incrementPage();
            return data;
            
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




// import axios from 'axios';

// axios.defaults.baseURL = 'https://pixabay.com/api/';

// export default class NewApi {
//     constructor() {
//         this.searchQuery = ''// по умолчанию форма пуста, класс должен хранить эту информацию
//         this.page = 1;// по умолчанию страница 1
//     }// конструктор
//     async fetchArticles() {// ничего не будем получать
//         const API_KEY = '29703536-3492bea623abb7896113a32cf';
//         const BASE_URL = 'https://pixabay.com/api/';
//         const SEARCH_SETTINGS = `image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
//         const URL = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&${SEARCH_SETTINGS}`;

//         try {
//             const { response } = await axios.get(URL);// возращаем данные промиса во внешний код
//             this.incrementPage();// если запрос успешный то увеличиваем страницу на 1
//             console.log(await response.json());
//             // return await response.json(); //возвращаем данные промиса во внешний код
            
//         } catch (error) {
//             console.log(error.message);
//         }

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