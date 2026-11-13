import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const searchButton = form.querySelector('button');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
let query = '';
let page = 1;
let loadedImages = 0;
let hasMore = false;
let isLoading = false;

form.addEventListener('submit', async event => {
  event.preventDefault();
  if (isLoading) return;
  const value = new FormData(form).get('search-text').trim();
  if (!value) {
    iziToast.warning({
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }
  query = value;
  page = 1;
  loadedImages = 0;
  hasMore = false;
  hideLoadMoreButton();
  clearGallery();
  await loadImages(false);
});

loadMoreButton.addEventListener('click', async () => {
  if (isLoading || !hasMore) return;
  await loadImages(true);
});

async function loadImages(shouldScroll) {
  isLoading = true;
  searchButton.disabled = true;
  loadMoreButton.disabled = true;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    if (data.hits.length === 0 && loadedImages === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }
    if (data.hits.length > 0) {
      createGallery(data.hits);
      loadedImages += data.hits.length;
      page += 1;
      if (shouldScroll) {
        const { height: cardHeight } =
          gallery.firstElementChild.getBoundingClientRect();
        window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
      }
    }
    hasMore = data.hits.length > 0 && loadedImages < data.totalHits;
    if (!hasMore) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch {
    iziToast.error({
      message:
        'Unable to load images. Please check your connection and API key, then try again.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    isLoading = false;
    searchButton.disabled = false;
    loadMoreButton.disabled = false;
    if (hasMore) showLoadMoreButton();
  }
}
