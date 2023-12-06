import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_taBY4mSnoio8L0ZO0REzRlGcHebiHkan5sm41STXCIgNsCzmwWClqqJj6d0P4Ibb';
axios.defaults.baseURL = 'https://api.thecatapi.com';

function fetchBreeds() {
  return axios.get('/v1/breeds').then(response => {
    return response.data;
  });
}

function fetchCatByBreed(breedId) {
  return axios.get(`/v1/images/search?breed_ids=${breedId}`).then(response => {
    return response.data;
  });
}

export { fetchBreeds, fetchCatByBreed };
