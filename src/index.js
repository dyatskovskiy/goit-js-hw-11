import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPhotoByQuery, renderPhotoCard } from './fetch-api.js';
import axios from 'axios';

const searchForm = document.querySelector('#search-form');
const galleryWrapper = document.querySelector('.gallery');

searchForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  galleryWrapper.innerHTML = '';
  const query = e.target['searchQuery'].value;

  fetchPhotoByQuery(query).then(data => renderPhotoCard(data));
}
