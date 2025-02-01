import 'font-awesome/css/font-awesome.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { refs } from './js/refs.js';
import { getCurrentDate, getCurrentTime } from './js/time-functions.js';
import {
  addDelivery,
  deleteDelivery,
  getData,
  updateData,
  getlastDeliveries,
} from './js/mockapi.js';
import {
  renderMarkup,
  createInputForUpdateDelivery,
} from './js/render-function.js';
import { showBtn, hideBtn } from './js/load-more-btn.js';

let page = 1;
const pagination = async () => {
  page++;

  const { data } = await getlastDeliveries(page);
  renderMarkup(data);

  if (data.length < 12) {
    hideBtn();

    iziToast.info({
      message: 'Doszedleś do końca listy.',
      position: 'topRight',
      timeout: 10000,
    });
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const { data } = await getData();
    const lastDeliveryNumber = data[data.length - 1].deliveryNumber;
    const [lastNumber, year, suffix] = lastDeliveryNumber.split('/');
    const newNumber = String(Number(lastNumber) + 1).padStart(4, '0');
    refs.deliveryNumber.textContent = newNumber;

    const dataForRenderMarkup = await getlastDeliveries(page);
    refs.tableBody.innerHTML = '';
    renderMarkup(dataForRenderMarkup.data);
  } catch (err) {
    console.log(err);
  }
});

const currentYear = new Date().getFullYear();
refs.deliveryNumberYear.textContent = currentYear;

refs.deliveriesDate.textContent = `${getCurrentDate()}`;
getCurrentTime();

refs.userDeliveryDescr.addEventListener('input', () => {
  const deliveryDescrValue = refs.userDeliveryDescr.value.trim().toUpperCase();

  if (deliveryDescrValue.includes('TERMINALE_INGENICO_')) {
    refs.incShipID.disabled = false;
  } else {
    refs.incShipID.disabled = true;
  }

  if (deliveryDescrValue === 'TERMINALE_INGENICO_ZWROT') {
    refs.incShipID.disabled = true;
  }
});

const onClickSubmitForm = async e => {
  try {
    e.preventDefault();

    const { data } = await getData();
    const lastDeliveryNumber = data[data.length - 1].deliveryNumber;
    const [lastNumber, year, suffix] = lastDeliveryNumber.split('/');
    const newNumber = `${String(Number(lastNumber) + 1).padStart(
      4,
      '0'
    )}/${currentYear}/D`;

    const userEntry = {
      supplier: e.target.elements.supplier.value.trim().toLowerCase(),
      abroad: e.target.elements.abroad.value.trim().toLowerCase(),
      carrier: e.target.elements.carrier.value.trim().toLowerCase(),
      deliveryNumber: newNumber,
      deliveryDescr: e.target.elements['delivery-descr'].value
        .trim()
        .toLowerCase(),
      incomingShipmentID: e.target.elements['incoming-shipment-id'].value,
      pallets: e.target.elements.pallets.value,
      boxes: e.target.elements.boxes.value,
      pieces: e.target.elements.pieces.value,
      shipingNoteNumber: e.target.elements['shiping-note-number'].value
        .trim()
        .toLowerCase(),
      admissionDate: refs.deliveriesDate.textContent,
      admissionTime: refs.deliveriesTime.textContent,
      recipientFullName: refs.recipientName.textContent.toLowerCase(),
      invoiceNumber: e.target.elements['invoice-num'].value
        .trim()
        .toLowerCase(),
      comments: e.target.elements.comments.value.trim().toLowerCase(),
    };

    await addDelivery(userEntry);

    const { data: lastData } = await getData();
    const nextDelivery = lastData[lastData.length - 1].deliveryNumber;
    const [currentNumber, nextYear, NextSuffix] = nextDelivery.split('/');
    const nextDeliveryNumber = String(Number(currentNumber) + 1).padStart(
      4,
      '0'
    );
    refs.deliveryNumber.textContent = nextDeliveryNumber;

    refs.incShipID.disabled = true;

    page = 1;
    const dataForRenderMarkup = await getlastDeliveries(page);
    refs.tableBody.innerHTML = '';
    renderMarkup(dataForRenderMarkup.data);
    showBtn();

    refs.deliveryForm.reset();
  } catch (err) {
    console.log(err);
  }
};

const onClickSubmitFormDelete = async e => {
  try {
    e.preventDefault();

    const deleteID = e.target.elements['delivery-id'].value;
    await deleteDelivery(deleteID);

    page = 1;
    const { data } = await getlastDeliveries(page);
    refs.tableBody.innerHTML = '';
    renderMarkup(data);
    showBtn();

    refs.deleteDeliveryForm.reset();
  } catch (err) {
    console.log(err);
  }
};

const onSelectDeliveryField = e => {
  const selectedValue = e.target.value;

  if (selectedValue) {
    createInputForUpdateDelivery(selectedValue);
  }

  function resetSelect() {
    refs.updateDeliverySelect.value = '';
    refs.updateDeliverySelect.selectedIndex = 0;
  }
  setTimeout(resetSelect, 500);
};

const onClickUpdateDeliverySubmit = async e => {
  try {
    e.preventDefault();

    const formData = new FormData(e.target);
    const submitedData = {};

    formData.forEach((value, key) => {
      submitedData[key] = value;
    });

    const newData = {
      supplier: submitedData.updateSupplier,
      abroad: submitedData.updateAbroad,
      carrier: submitedData.updateCarrier,
      deliveryNumber: submitedData.updateDeliveryNumber,
      deliveryDescr: submitedData.updateDeliveryDescr,
      incomingShipmentID: submitedData.updateIncomingShipmentID,
      pallets: submitedData.updatePallets,
      boxes: submitedData.updateBoxes,
      pieces: submitedData.updatePieces,
      shipingNoteNumber: submitedData.updateShipingNoteNumber,
      admissionDate: submitedData.updateAdmissionDate,
      admissionTime: submitedData.updateAdmissionTime,
      invoiceNumber: submitedData.updateInvoiceNumber,
      comments: submitedData.updateComments,
    };

    await updateData(newData, submitedData['update-delivery-id']);
    refs.tableBody.innerHTML = '';

    page = 1;
    const { data } = await getlastDeliveries(page);
    renderMarkup(data);

    refs.updateDeliveryOverlay.classList.toggle('is-open');
    refs.inputContainer.innerHTML = '';
    showBtn();

    refs.updateDeliveryForm.reset();
  } catch (err) {
    console.log(err);
  }
};

refs.deliveryForm.addEventListener('submit', onClickSubmitForm);
refs.deleteDeliveryForm.addEventListener('submit', onClickSubmitFormDelete);

refs.updateDeliveryBtn.addEventListener('click', () =>
  refs.updateDeliveryOverlay.classList.toggle('is-open')
);
refs.modalWindowCloseBtn.addEventListener('click', () =>
  refs.updateDeliveryOverlay.classList.toggle('is-open')
);

refs.updateDeliverySelect.addEventListener('change', onSelectDeliveryField);
refs.updateDeliveryForm.addEventListener('submit', onClickUpdateDeliverySubmit);

refs.loadMoreBtn.addEventListener('click', pagination);

refs.moreShipingNoteBtn.addEventListener('click', () => {
  console.log('hello');
});
