const axios = require('axios').default;

export default function fetchImages(searchQuery) {
  const BASE_URL = 'https://pixabay.com/api/?key=';
  const API_KEY = '33161482-d6f209deccbe404fb00ae6950';
  const options = {
    parameters: {
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    },
  };
  const imgs = axios
    .get(`${BASE_URL}${API_KEY}&q=${searchQuery}`, options)
    .then(resp => {
      return resp.data;
    });
  return imgs;
}
