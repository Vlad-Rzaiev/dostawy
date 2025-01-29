import { refs } from './refs';

export const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const date = `${day}-${month}-${year}`;

  return date;
};

export const getCurrentTime = () => {
  setInterval(() => {
    const currentDate = new Date();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    refs.deliveriesTime.textContent = `${hours}:${minutes}:${seconds}`;
  }, 1000);
};
