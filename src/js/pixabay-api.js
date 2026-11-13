import axios from 'axios';

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

export function getImagesByQuery(query) {
  if (!API_KEY) {
    return Promise.reject(new Error('Pixabay API key is not configured.'));
  }

  return axios
    .get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
      timeout: 15000,
    })
    .then(response => response.data);
}
