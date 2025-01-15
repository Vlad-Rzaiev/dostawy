import './js/pixabay-api';
import './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { userRequest } from './js/pixabay-api';
import { renderMarkup } from './js/render-functions';
import { gallery } from './js/render-functions';
import xmarkSvg from './img/xmark.svg';
import ahtungSvg from './img/attention.svg';

const searchForm = document.querySelector('.search-form');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

let userInputValue;
let page = 1;
let per_page = 15;

const showLoader = () => {
  loader.style.display = 'block';
};

const hideLoader = () => {
  loader.style.display = 'none';
};

const endOfCollection = (totalImage, totalHits) => {
  if (totalImage >= totalHits) {
    loadMoreBtn.style.display = 'none';

    iziToast.show({
      message: `We're sorry, but you've reached the end of search results.`,
      messageColor: '#ffffff',
      iconUrl: ahtungSvg,
      backgroundColor: '#ffa000',
      position: 'topRight',
    });
  }
};

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  loadMoreBtn.style.display = 'none';

  gallery.innerHTML = '';

  userInputValue = e.target.elements.search.value.trim().toLowerCase();

  if (userInputValue === '') {
    iziToast.show({
      message: 'Input field can not be empty. Please enter your message.',
      messageColor: '#ffffff',
      iconUrl: xmarkSvg,
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
    return;
  }

  showLoader();

  page = 1;
  userRequest(userInputValue, page, per_page)
    .then(images => {
      if (images.hits.length === 0) {
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: '#ffffff',
          iconUrl: xmarkSvg,
          backgroundColor: '#ef4040',
          position: 'topRight',
        });
        return;
      }

      loadMoreBtn.style.display = 'block';

      endOfCollection(page * per_page, images.totalHits);

      renderMarkup(images.hits);
    })
    .catch(error => {
      iziToast.show({
        message: `${error}`,
        messageColor: '#ffffff',
        iconUrl: xmarkSvg,
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
      console.log(error);
    })
    .finally(() => {
      hideLoader();
    });

  searchForm.reset();
});

loadMoreBtn.addEventListener('click', e => {
  loadMoreBtn.style.display = 'none';
  page += 1;

  showLoader();
  userRequest(userInputValue, page, per_page)
    .then(images => {
      loadMoreBtn.style.display = 'block';

      endOfCollection(page * per_page, images.totalHits);

      renderMarkup(images.hits);

      const galleryCard = document.querySelector('.gallery-item');
      const galleryCardRect = galleryCard.getBoundingClientRect();

      window.scrollBy({
        top: galleryCardRect.height * 2,
        behavior: 'smooth',
      });
    })
    .catch(error => {
      iziToast.show({
        message: `${error}`,
        messageColor: '#ffffff',
        iconUrl: xmarkSvg,
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
      console.log(error);
    })
    .finally(() => {
      hideLoader();
    });
});
