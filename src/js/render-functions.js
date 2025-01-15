import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const modalSimpleLiteBox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

export const gallery = document.querySelector('.gallery');

export const renderMarkup = images => {
  const markup = images
    .map(
      image => `
       <li class="gallery-item">
          <a class="gallery-link" href="${image.largeImageURL}">
            <img
            class="gallery-image"
            src="${image.webformatURL}"
            alt="${image.tags}"
            />
          </a>
          <div class="stat-container">
            <div>
                <span class="stat-span"><b>Likes</b></span>
                <span class="stat-span">${image.likes}</span>
            </div>
            <div>
                <span class="stat-span"><b>Views</b></span>
                <span class="stat-span">${image.views}</span>
            </div>
             <div>
                <span class="stat-span"><b>Comments</b></span>
                <span class="stat-span">${image.comments}</b></span>
            </div>
             <div>
                <span class="stat-span"><b>Downloads</b></span>
                <span class="stat-span">${image.downloads}</span>
            </div>
          </div>
        </li>
      `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  modalSimpleLiteBox.refresh();
};
