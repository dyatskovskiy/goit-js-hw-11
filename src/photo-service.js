import axios from 'axios';
import Notiflix from 'notiflix';
export default class PhotoApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.resultCount = 0;
  }

  async fetchPhoto() {
    const loadMoreBtn = document.querySelector('.load-more');

    const url = 'https://pixabay.com/api/';

    const options = {
      params: {
        key: '39697643-05aaf1ea096fe2d546d4f9e2e',
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: 40,
      },
    };

    const response = await axios.get(url, options);

    console.log(response);
    if (response.status < 200 || response.status > 299) {
      throw new Error(response.statusText);
    }

    if (response.data.totalHits == 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
        {
          position: 'center-center',
          cssAnimationStyle: 'zoom',
          timeout: 1500,
        }
      );

      throw new Error(response.statusText);
    }

    this.incrementPageCount();

    if (response.data.hits.length < 40 || this.page == 14) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreBtn.classList.add('visually-hidden');
    }
    this.resultCount = response.data.totalHits;
    return await response.data.hits;
  }

  incrementPageCount() {
    this.page += 1;
  }

  resetPageCount() {
    this.page = 1;
  }

  showResultCount() {
    Notiflix.Notify.success(`Hooray! We found ${this.resultCount} images.`);
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
