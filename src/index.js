import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import PhotoApiService from './photo-service.js';
import { renderPhotoCard } from './render.js';
import Notiflix from 'notiflix';
// =====================================================

const searchForm = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');

const photoApiService = new PhotoApiService();

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();

  photoApiService.query = searchForm.searchQuery.value;
  photoApiService.resetPageCount();

  try {
    const data = await photoApiService.fetchPhoto();
    clearGallery();
    renderPhotoCard(data);
    loadMoreBtn.classList.remove('visually-hidden');
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

function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}
