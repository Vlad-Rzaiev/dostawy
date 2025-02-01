import { refs } from './refs';

export const hideBtn = () => (refs.loadMoreBtn.style.display = 'none');

export const showBtn = () => (refs.loadMoreBtn.style.display = 'block');
