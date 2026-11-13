import axios from 'axios';

const API_KEY = '58600925-7744e6c37419001b92137e385';

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
