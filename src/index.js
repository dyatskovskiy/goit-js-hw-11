import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import PhotoApiService from './photo-service.js';
import { renderPhotoCard } from './fetch-api.js';
// =====================================================

const searchForm = document.querySelector('#search-form');
const galleryWrapper = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const photoApiService = new PhotoApiService();

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();
  galleryWrapper.innerHTML = '';
  photoApiService.query = searchForm.searchQuery.value;
  try {
    const data = await photoApiService.fetchPhoto();
    renderPhotoCard(data);
  } catch (error) {
    console.log(error.message);
  }
}

async function onLoadMore() {
  try {
    const data = await photoApiService.fetchPhoto();
    renderPhotoCard(data);
  } catch (error) {
    console.log(error.message);
  }
}
