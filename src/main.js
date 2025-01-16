const deliveryNumber = document.querySelector('.delivery-no-number');
const deliveriesDate = document.querySelector('.deliveries-form-date-js');
const deliveriesTime = document.querySelector('.deliveries-form-time-js');

const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const date = `${year}-${month}-${day}`;

  return date;
};

const getCurrentTime = () => {
  setInterval(() => {
    const currentDate = new Date();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    deliveriesTime.textContent = `${hours}:${minutes}:${seconds}`;
  }, 1000);
};

getCurrentTime();

deliveriesDate.textContent = `${getCurrentDate()}`;
