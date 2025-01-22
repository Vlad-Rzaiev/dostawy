import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  getCurrentDate,
  getCurrentTime,
  deliveriesTime,
} from './js/time-functions.js';
import { addDelivery, deleteDelivery, getData } from './js/mockapi.js';
import { renderMarkup } from './js/render-function.js';

const deliveryForm = document.querySelector('.deliveries-form-js');
const deliveryNumber = document.querySelector('.delivery-no-number');
const deliveryNumberYear = document.querySelector('.delivery-no-year');
const deliveriesDate = document.querySelector('.deliveries-form-date-js');
const fullDeliveryNo = document.querySelector('.full-delivery-no-js');
const recipientName = document.querySelector('.recipient-name-user-login');
const userDeliveryDescr = document.querySelector('.delivery-descr-js');
const deleteDeliveryForm = document.querySelector('.delete-delivery-form-js');
const tableBody = document.querySelector('.deliveries-table-body');
const incShipID = document.querySelector('.inc-ship-id');

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const { data } = await getData();
    renderMarkup(data);

    const lastDeliveryNumber = data[data.length - 1].deliveryNumber;
    const [lastNumber, year, suffix] = lastDeliveryNumber.split('/');
    const newNumber = String(Number(lastNumber) + 1).padStart(4, '0');
    deliveryNumber.textContent = newNumber;
  } catch (err) {
    console.log(err);
  }
});

deliveryNumberYear.textContent = new Date().getFullYear();

deliveriesDate.textContent = `${getCurrentDate()}`;
getCurrentTime();

userDeliveryDescr.addEventListener('input', () => {
  const deliveryDescrValue = userDeliveryDescr.value.trim().toUpperCase();

  if (deliveryDescrValue.includes('TERMINALE_INGENICO_')) {
    incShipID.disabled = false;
  } else {
    incShipID.disabled = true;
  }
  if (deliveryDescrValue.includes('TERMINALE_INGENICO_ZWROT')) {
    incShipID.disabled = true;
  }
});

const onClickSubmitForm = async e => {
  try {
    e.preventDefault();

    const userEntry = {
      supplier: e.target.elements.supplier.value.trim().toUpperCase(),
      abroad: e.target.elements.abroad.value.trim().toUpperCase(),
      carrier: e.target.elements.carrier.value.trim().toUpperCase(),
      deliveryNumber: fullDeliveryNo.textContent.trim(),
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
      invoiceNumber: e.target.elements['invoice-num'].value
        .trim()
        .toUpperCase(),
      comments: e.target.elements.comments.value.trim().toUpperCase(),
    };

    addDelivery(userEntry);

    const { data } = await getData();
    const newID = Number(data[data.length - 1].id) + 1;

    const arr = [];
    arr.push(userEntry);
    arr[0].id = newID;
    renderMarkup(arr);

    incShipID.disabled = true;

    deliveryForm.reset();
  } catch (err) {
    console.log(err);
  }
};

const onClickSubmitFormDelete = async e => {
  try {
    e.preventDefault();

    const deleteID = e.target.elements['delivery-id'].value;
    deleteDelivery(deleteID);

    tableBody.innerHTML = '';

    const { data } = await getData();
    renderMarkup(data);

    deleteDeliveryForm.reset();
  } catch (err) {
    console.log(err);
  }
};

deliveryForm.addEventListener('submit', onClickSubmitForm);
deleteDeliveryForm.addEventListener('submit', onClickSubmitFormDelete);
