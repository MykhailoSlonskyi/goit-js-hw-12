import axios from 'axios';

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

export async function getImagesByQuery(query, page) {
  if (!API_KEY) {
    throw new Error('Pixabay API key is not configured.');
  }
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: query,
      page,
      per_page: 15,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
    timeout: 15000,
  });
  return response.data;
}
