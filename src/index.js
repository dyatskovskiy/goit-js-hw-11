import 'simplelightbox/dist/simple-lightbox.min.css';
import PhotoApiService from './photo-service.js';
import { renderPhotoCard } from './render.js';
import Notiflix from 'notiflix';
// =====================================================

const searchForm = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');
const footerWrapper = document.querySelector('.container-footer');
const topButton = document.querySelector('.top-button');

const photoApiService = new PhotoApiService();

topButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();

  if (searchForm.searchQuery.value.length <= 2) {
    return Notiflix.Notify.warning('Please enter more than 2 characters!', {
      position: 'center-center',
      cssAnimationStyle: 'zoom',
      backOverlay: true,
      backOverlayColor: '#149390',
      timeout: 1500,
    });
  }
  photoApiService.query = searchForm.searchQuery.value;
  photoApiService.resetPageCount();

  try {
    const data = await photoApiService.fetchPhoto();
    photoApiService.showResultCount();
    clearGallery();
    renderPhotoCard(data);
    if (data.length >= 40) {
      showTopBtn();
    } else {
      hideTopBtn();
    }
    loadMoreBtn.classList.remove('visually-hidden');
    footerWrapper.classList.remove('visually-hidden');
  } catch (error) {
    console.log(error.message);
  }
}

async function onLoadMore() {
  try {
    const data = await photoApiService.fetchPhoto();

    renderPhotoCard(data);
    scrollDown();
  } catch (error) {
    console.log(error.message);
  }
}

function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

function scrollDown() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 3.4,
    behavior: 'smooth',
  });
}

function showTopBtn() {
  topButton.classList.add('js-is-show');
}
function hideTopBtn() {
  topButton.classList.remove('js-is-show');
}
