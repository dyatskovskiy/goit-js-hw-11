import axios from 'axios';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const API_KEY = '39697643-05aaf1ea096fe2d546d4f9e2e';
const galleryWrapper = document.querySelector('.gallery');

// export async function fetchPhotoByQuery(query, page) {
//   const response = await axios.get(`https://pixabay.com/api/`, {
//     params: {
//       key: API_KEY,
//       q: query,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//       page: page,
//       per_page: 40,
//     },
//   });
//   console.log(response);
//   if (response.status < 200 || response.status > 299) {
//     throw new Error(response.statusText);
//   }

//   if (response.data.totalHits == 0) {
//     Notiflix.Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//   }

//   const data = await response.data.hits;
//   return data;
// }

export async function renderPhotoCard(data) {
  const markup = await data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
        <a class="photo-link" href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b> ${likes}
          </p>
          <p class="info-item">
            <b>Views</b> ${views}
          </p>
          <p class="info-item">
            <b>Comments</b> ${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b> ${downloads}
          </p>
        </div>
      </div> `;
      }
    )
    .join('');

  galleryWrapper.insertAdjacentHTML('beforeend', markup);
}
