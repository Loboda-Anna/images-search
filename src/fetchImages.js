import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default async function fetchImages(searchQuery) {
  const BASE_URL = 'https://pixabay.com/api/?key=';
  const API_KEY = '33161482-d6f209deccbe404fb00ae6950';
  const parametersMarkup = `image_type=photo&orientation=horizontal&safesearch=true`;

  const resp = await fetch(
    `${BASE_URL}${API_KEY}&q=${searchQuery}&${parametersMarkup}`
  );
  if (!resp.ok) {
    Notify.failure('Sorry, server is not available. Please try again later.');
    throw new Error(resp.status);
  }
  const imgsPromise = await resp.json();
  return imgsPromise;
}
