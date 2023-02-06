import { Notify } from 'notiflix';
import ImagesApiService from './fetchImages';
import LoadMoreBtn from './load-more-btn';

const formEl = document.querySelector('#search-form');
const inputEl = document.querySelector('form input');
const galleryEl = document.querySelector('.gallery');
formEl.addEventListener('submit', onSearchImages);

const imagesApiService = new ImagesApiService();

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

loadMoreBtn.refs.button.addEventListener('click', onloadMore);

async function onSearchImages(e) {
  e.preventDefault();
  loadMoreBtn.show();
  loadMoreBtn.disable();
  try {
    const formEl = e.target.elements;
    let searchQuery = inputEl.value.trim();
    imagesApiService.searchQuery = searchQuery;

    if (!searchQuery) {
      return Notify.failure('Please, enter your search query!');
    }
    imagesApiService.resetPage();
    const imgs = await imagesApiService.fetchImages(searchQuery);
    if (imgs.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notify.success(`Hooray! We found ${imgs.total} images.`);
    }
    clearGallery();
    renderGallery(imgs);
    loadMoreBtn.enable();
  } catch (error) {
    Notify.failure(`Sorry, ${error.message} Try again leter!`);
  }
}

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
  <a href="${largeImageURL}"><div class="img__wrapper"><img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery__image"  /></div>
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
  galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);
  if (imgs.hits.length < 40) {
    loadMoreBtn.hide();
    loadMoreBtn.disable();
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
  loadMoreBtn.enable();
}

async function onloadMore() {
  loadMoreBtn.disable();
  await imagesApiService
    .fetchImages(this.searchQuery)
    .then(imgs => renderGallery(imgs));
  loadMoreBtn.enable();
}

function clearGallery() {
  galleryEl.innerHTML = ' ';
}
