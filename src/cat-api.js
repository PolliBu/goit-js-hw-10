// const URL_BREEDS = "https://api.thecatapi.com/v1/breeds";
// const URL_IMG = "https://api.thecatapi.com/v1/images/search"; 
// const API_KEY = "live_DojQuxcwAMCGUDOFBXuGzJfcnTeitgncG90AdyW6X66oKgcKwbvPYzZ5jicjmWV7";

// function fetchBreeds() {
//     return fetch(`${URL_BREEDS}?api_key=${API_KEY}`)
//         .then((response) => {
//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }
//       return response.json();
//     });
// }

// function fetchCatByBreed(breedId) {
//   return fetch(`${URL_IMG}?api_key=${API_KEY}&breed_ids=${breedId}`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }
//       return response.json();
//     });
// };

// export { fetchBreeds, fetchCatByBreed }

import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com';
const END_POINT = '/v1/breeds';
const CAT_END_POINT = '/v1/images/search';

axios.defaults.headers.common['x-api-key'] =
  'live_DojQuxcwAMCGUDOFBXuGzJfcnTeitgncG90AdyW6X66oKgcKwbvPYzZ5jicjmWV7';

function fetchBreeds() {
  return axios.get(`${BASE_URL}${END_POINT}`).then(({ data }) => data);
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}${CAT_END_POINT}?breed_ids=${breedId}`)
    .then(({ data }) => data[0]);
}

export { fetchBreeds, fetchCatByBreed };