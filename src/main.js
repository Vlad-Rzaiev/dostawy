const deliveryForm = document.querySelector('.deliveries-form-js');
const deliveryNumber = document.querySelector('.delivery-no-number');
const deliveryNumberYear = document.querySelector('.delivery-no-year');
const deliveriesDate = document.querySelector('.deliveries-form-date-js');
const deliveriesTime = document.querySelector('.deliveries-form-time-js');
const fullDeliveryNo = document.querySelector('.full-delivery-no-js');
let deliveryNoNumber = 1;

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

deliveryNumberYear.textContent = new Date().getFullYear();

deliveryNumber.textContent = String(deliveryNoNumber).padStart(4, '0');

const onClickSubmitForm = e => {
  e.preventDefault();

  const userSupplier = e.target.elements.supplier.value.trim().toUpperCase();
  const userAbroad = e.target.elements.abroad.value.trim().toUpperCase();
  const userCarrier = e.target.elements.carrier.value.trim().toUpperCase();
  console.log('dostawca:', userSupplier);
  console.log('zagranica:', userAbroad);

  deliveryForm.reset();
};

deliveryForm.addEventListener('submit', onClickSubmitForm);
