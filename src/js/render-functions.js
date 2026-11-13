import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const fragment = document.createDocumentFragment();

  images.forEach(image => {
    const item = document.createElement('li');
    item.className = 'gallery-item';
    const link = document.createElement('a');
    link.className = 'gallery-link';
    link.href = image.largeImageURL;
    const photo = document.createElement('img');
    photo.src = image.webformatURL;
    photo.alt = image.tags;
    photo.width = 360;
    photo.height = 200;
    photo.loading = 'lazy';
    link.append(photo);

    const info = document.createElement('div');
    info.className = 'info';
    const fields = [
      ['Likes', image.likes],
      ['Views', image.views],
      ['Comments', image.comments],
      ['Downloads', image.downloads],
    ];
    fields.forEach(([label, value]) => {
      const stat = document.createElement('p');
      const title = document.createElement('b');
      title.textContent = label;
      const count = document.createElement('span');
      count.textContent = value;
      stat.append(title, count);
      info.append(stat);
    });
    item.append(link, info);
    fragment.append(item);
  });

  gallery.append(fragment);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.replaceChildren();
  lightbox.refresh();
}

export function showLoader() {
  loader.classList.add('is-visible');
  loader.setAttribute('aria-hidden', 'false');
}

export function hideLoader() {
  loader.classList.remove('is-visible');
  loader.setAttribute('aria-hidden', 'true');
}

export function showLoadMoreButton() {
  loadMoreButton.classList.add('is-visible');
}

export function hideLoadMoreButton() {
  loadMoreButton.classList.remove('is-visible');
}
