import { refs } from './refs';

const updateDeliveryLabelText = {
  updateSupplier: 'dostawca',
  updateAbroad: 'zagranica',
  updateCarrier: 'Przewożnik',
  updateDeliveryNumber: 'Numer dostawy',
  updateDeliveryDescr: 'Opis dostawy',
  updateIncomingShipmentID: 'incoming shipment id',
  updatePallets: 'palety',
  updateBoxes: 'kartony',
  updatePieces: 'sztuki',
  updateShipingNoteNumber: 'numer listu przesyłki',
  updateAdmissionDate: 'data przyjęcia',
  updateAdmissionTime: 'godzina przyjęcia',
  updateInvoiceNumber: 'numer faktury',
  updateComments: 'uwagi',
};

const updateDeliveryInputType = {
  updateSupplier: 'text',
  updateAbroad: 'text',
  updateCarrier: 'text',
  updateDeliveryNumber: 'text',
  updateDeliveryDescr: 'text',
  updateIncomingShipmentID: 'number',
  updatePallets: 'number',
  updateBoxes: 'number',
  updatePieces: 'number',
  updateShipingNoteNumber: 'text',
  updateAdmissionDate: 'text',
  updateAdmissionTime: 'text',
  updateInvoiceNumber: 'text',
  updateComments: 'text',
};

export const renderMarkup = deliveries => {
  const markup = deliveries
    .map(
      delivery => `
        <tr class="deliveries-table-body-row">
            <td class="deliveries-table-body-text">${delivery.id}</td>
            <td class="deliveries-table-body-text">${delivery.deliveryNumber}</td>
            <td class="deliveries-table-body-text">${delivery.deliveryDescr}</td>
            <td class="deliveries-table-body-text">${delivery.supplier}</td>
            <td class="deliveries-table-body-text">${delivery.carrier}</td>
            <td class="deliveries-table-body-text">${delivery.shipingNoteNumber}</td>
            <td class="deliveries-table-body-text">${delivery.pallets}</td>
            <td class="deliveries-table-body-text">${delivery.boxes}</td>
            <td class="deliveries-table-body-text">${delivery.pieces}</td>
            <td class="deliveries-table-body-text">${delivery.incomingShipmentID}</td>
            <td class="deliveries-table-body-text">${delivery.admissionDate}</td>
            <td class="deliveries-table-body-text">${delivery.admissionTime}</td>
            <td class="deliveries-table-body-text">${delivery.recipientFullName}</td>
            <td class="deliveries-table-body-text">${delivery.abroad}</td>
            <td class="deliveries-table-body-text">${delivery.invoiceNumber}</td>
            <td class="deliveries-table-body-text">${delivery.comments}</td>
        </tr>
    `
    )
    .join('');

  refs.tableBody.insertAdjacentHTML('beforeend', markup);
};

export const createInputForUpdateDelivery = value => {
  const inputEl = document.createElement('input');
  const labelEl = document.createElement('label');

  labelEl.htmlFor = value;
  labelEl.className = 'deliveries-form-label';
  labelEl.textContent = updateDeliveryLabelText[value] || value;

  inputEl.type = updateDeliveryInputType[value] || value;
  inputEl.name = value;
  inputEl.id = value;
  inputEl.placeholder = `Wprowadź nowe dane`;
  inputEl.className = 'deliveries-form-input';

  refs.inputContainer.appendChild(labelEl);
  refs.inputContainer.appendChild(inputEl);
};
