import {
  getCurrentDate,
  getCurrentTime,
  deliveriesTime,
} from './js/time-functions.js';
import { addDelivery } from './js/mockapi.js';

const deliveryForm = document.querySelector('.deliveries-form-js');
const deliveryNumber = document.querySelector('.delivery-no-number');
const deliveryNumberYear = document.querySelector('.delivery-no-year');
const deliveriesDate = document.querySelector('.deliveries-form-date-js');
const fullDeliveryNo = document.querySelector('.full-delivery-no-js');
const recipientName = document.querySelector('.recipient-name-user-login');
let deliveryNoNumber = 1;

const userData = [];

deliveryNumber.textContent = String(deliveryNoNumber).padStart(4, '0');
deliveryNumberYear.textContent = new Date().getFullYear();

deliveriesDate.textContent = `${getCurrentDate()}`;
getCurrentTime();

const onClickSubmitForm = e => {
  e.preventDefault();

  const userEntry = {
    supplier: e.target.elements.supplier.value.trim().toUpperCase(),
    abroad: e.target.elements.abroad.value.trim().toUpperCase(),
    carrier: e.target.elements.carrier.value.trim().toUpperCase(),
    deliveryNumber: fullDeliveryNo.textContent.trim,
    deliveryDescr: e.target.elements['delivery-descr'].value
      .trim()
      .toUpperCase(),
    incomingShipmentID: e.target.elements['incoming-shipment-id'].value,
    pallets: e.target.elements.pallets.value,
    boxes: e.target.elements.boxes.value,
    pieces: e.target.elements.pieces.value,
    shipingNoteNumber: e.target.elements['shiping-note-number'].value
      .trim()
      .toUpperCase(),
    admissionDate: deliveriesDate.textContent,
    admissionTime: deliveriesTime.textContent,
    recipientFullName: recipientName.textContent.toUpperCase(),
    invoiceNumber: e.target.elements['invoice-num'].value.trim().toUpperCase(),
    comments: e.target.elements.comments.value.trim().toUpperCase(),
  };

  console.log(userEntry);

  addDelivery(userEntry);

  deliveryNoNumber++;

  deliveryForm.reset();
};

deliveryForm.addEventListener('submit', onClickSubmitForm);
