import { refs } from './refs';

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

  inputEl.type = 'text';
  inputEl.name = value;
  inputEl.placeholder = `Wprowadź nowe dane`;
  inputEl.className = 'deliveries-form-input';

  refs.inputContainer.appendChild(inputEl);
};
