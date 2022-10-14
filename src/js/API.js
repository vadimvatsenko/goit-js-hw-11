export default class NewApi {
    constructor() {
        this.searchQuery = ''// по умолчанию форма пуста, класс должен хранить эту информацию
        this.page = 1;// по умолчаю страница 1
    }// конструктор
    fetchArticles() {// ничего не будем получать
        console.log(this)
        const API_KEY = '29703536-3492bea623abb7896113a32cf';
        const BASE_URL = 'https://pixabay.com/api/';
        const SEARCH_SETTINGS = `image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=4`;
        const URL = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&${SEARCH_SETTINGS}`;

       return fetch(URL)// возращаем данные промиса во внешний код
            .then(response => response.json())
           .then(data => {
               
               this.incrementPage();// если запрос успешный то увеличиваем страницу на 1
               console.log(data.hits)
               return data.hits; //возращаем данные промиса во внешний код
        });
    }
    incrementPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchQuery// если нужно будет получить значение query
    }

    set query(newQeury) {// если нужно будет обновить searchQuery
        this.searchQuery = newQeury;
    }


}









// const API_KEY = '29703536-3492bea623abb7896113a32cf';
// const BASE_URL = 'https://pixabay.com/api/';
// const SEARCH_SETTINGS = `image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;


// export function searchImg(name) {
//     return fetch(`${BASE_URL}?key=${API_KEY}&q=${name}&${SEARCH_SETTINGS}`)
//         .then((response) => {
//               if (!response.ok) {
//         throw new Error(response.status);
//       }
//             return response.json();
//     });
// }
