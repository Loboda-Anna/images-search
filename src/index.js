import { Notify } from 'notiflix';
import fetchImages from './fetchImages';

const formEl = document.querySelector('#search-form');
const inputEl = document.querySelector('form input');
const galleryEl = document.querySelector('.gallery');

formEl.addEventListener('submit', async e => {
  e.preventDefault();
  try {
    const formEl = e.target.elements;
    let searchQuery = inputEl.value.trim();
    if (!searchQuery) {
      return;
    }

    const imgs = await fetchImages(searchQuery);
    if (imgs.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notify.success(`Hooray! We found ${imgs.totalHits} images.`);
    }
    console.log(imgs);
    renderGallery(imgs);
  } catch (error) {
    console.log(error.message);
  }
  //   e.currentTarget.reset();
});

function renderGallery(imgs) {
  const galleryMarkup = imgs.hits
    .map(
      ({
        webformatURL,
        // largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`
    )
    .join(' ');
  galleryEl.innerHTML = galleryMarkup;
}
