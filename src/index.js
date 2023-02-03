import { Notify } from 'notiflix';
import ImagesApiService from './fetchImages';

// let gallery = new SimpleLightbox('.gallery a', {
//   captionDelay: 250,
//   captionsData: 'alt',
// });
const formEl = document.querySelector('#search-form');
const inputEl = document.querySelector('form input');
const galleryEl = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

const imagesApiService = new ImagesApiService();

formEl.addEventListener('submit', async e => {
  e.preventDefault();
  try {
    const formEl = e.target.elements;
    let searchQuery = inputEl.value.trim();
    imagesApiService.searchQuery = searchQuery;

    if (!searchQuery) {
      return;
    }

    const imgs = await imagesApiService.fetchImages(searchQuery);
    if (imgs.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notify.success(`Hooray! We found ${imgs.total} images.`);
    }
    console.log(imgs);
    renderGallery(imgs);
  } catch (error) {
    console.log(error.message);
  }
});

function renderGallery(imgs) {
  const galleryMarkup = imgs.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
  <a href="${largeImageURL}"><div class="img__wrapper"><img src="${webformatURL}" alt="${tags}" loading="lazy"  /></div>
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
  </div></a>
</div>`
    )
    .join(' ');
  galleryEl.innerHTML = galleryMarkup;
}

loadBtn.addEventListener('click', onloadMore);

async function onloadMore() {}
