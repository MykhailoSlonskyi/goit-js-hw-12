import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const button = form.querySelector('button');
let isLoading = false;

form.addEventListener('submit', event => {
  event.preventDefault();
  if (isLoading) return;

  const query = new FormData(form).get('search-text').trim();
  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  isLoading = true;
  button.disabled = true;
  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }
      createGallery(data.hits);
    })
    .catch(() => {
      iziToast.error({
        message:
          'Unable to load images. Please check your connection and API key, then try again.',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
      isLoading = false;
      button.disabled = false;
    });
});
