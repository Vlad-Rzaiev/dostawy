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
const deleteDeliveryForm = document.querySelector('.delete-delivery-form-js');

document.addEventListener('DOMContentLoaded', () => {
  setInterval(() => {
    getData()
      .then(deliveries => {
        if (deliveries.data.length === 0) {
          deliveryNumber.textContent = '0001';

          return;
        } else {
          const allDeliveries = deliveries.data;
          const lastDelivery =
            allDeliveries[allDeliveries.length - 1].deliveryNumber;
          const [lastNumber, year, suffix] = lastDelivery.split('/');
          const updateNumber = String(Number(lastNumber) + 1).padStart(4, '0');

          deliveryNumber.textContent = updateNumber;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, 5000);

  getData()
    .then(response => {
      renderMarkup(response.data);
    })
    .catch(err => {
      console.log(err);
    });
});

deliveryNumberYear.textContent = new Date().getFullYear();

deliveriesDate.textContent = `${getCurrentDate()}`;
getCurrentTime();

const onClickSubmitForm = e => {
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
    invoiceNumber: e.target.elements['invoice-num'].value.trim().toUpperCase(),
    comments: e.target.elements.comments.value.trim().toUpperCase(),
  };

  addDelivery(userEntry)
    .then(response => {
      iziToast.success({
        message: 'Dodano dostawę!',
        position: 'topRight',
      });
      console.log(response);
    })
    .catch(err => {
      iziToast.error({
        message: err,
        position: 'topRight',
      });
    });

  getData()
    .then(response => {
      renderMarkup(response.data);
    })
    .catch(err => {
      console.log(err);
    });

  deliveryForm.reset();
};

const onClickSubmitFormDelete = e => {
  e.preventDefault();

  const deleteID = e.target.elements['delivery-id'].value;
  deleteDelivery(deleteID)
    .then(response => {
      iziToast.success({
        message: 'Dostawa usunięta',
        position: 'topRight',
      });
    })
    .catch(err => {
      iziToast.error({
        message: err,
        position: 'topRight',
      });
    });

  deleteDeliveryForm.reset();
};

deliveryForm.addEventListener('submit', onClickSubmitForm);
deleteDeliveryForm.addEventListener('submit', onClickSubmitFormDelete);
