const axios = require('axios').default;
export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchImages(searchQuery) {
    const BASE_URL = 'https://pixabay.com/api/?key=';
    const API_KEY = '33161482-d6f209deccbe404fb00ae6950';
    const params = new URLSearchParams({
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: this.page,
      per_page: 40,
    });
    const imgs = axios
      .get(`${BASE_URL}${API_KEY}&q=${this.searchQuery}&${params}`)
      .then(resp => {
        this.page += 1;
        return resp.data;
      });
    return imgs;
  }
  resetPage() {
    this.page = 1;
  }
}
