import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_URL = 'https://6788090fc4a42c9161091efe.mockapi.io/deliveries';

export const addDelivery = userData => {
  return axios
    .post(API_URL, userData)
    .then(() => {
      iziToast.success({
        title: 'Dodano dostawę!',
        position: 'topRight',
        timeout: 7000,
      });
    })
    .catch(err => {
      iziToast.error({
        message: err,
        position: 'topRight',
        timeout: 7000,
      });
    });
};

export const deleteDelivery = deliveryId => {
  return axios
    .delete(`${API_URL}/${deliveryId}`)
    .then(response => {
      iziToast.success({
        message: 'Dostawa usunięta',
        position: 'topRight',
        timeout: 7000,
      });
    })
    .catch(err => {
      iziToast.error({
        message: err,
        position: 'topRight',
        timeout: 7000,
      });
    });
};

export const getData = () => {
  return axios.get(API_URL);
};

export const updateData = (dataForUpdate, id) => {
  return axios.put(`${API_URL}/${id}`, dataForUpdate);
};
