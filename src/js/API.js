const API_KEY = '29703536-3492bea623abb7896113a32cf';
const BASE_URL = 'https://pixabay.com/api/';
const SEARCH_SETTINGS = 'image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40';
const options = {
    headers: {
        Authorization: API_KEY,
    },
};

export function searchImg(name) {
    return fetch(`${BASE_URL}?key=${API_KEY}&q=${name}&${SEARCH_SETTINGS}`)
        .then((response) => {
              if (!response.ok) {
        throw new Error(response.status);
      }
            return response.json();
    });
}


