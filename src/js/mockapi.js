import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_URL = 'https://6788090fc4a42c9161091efe.mockapi.io/deliveries';

export const addDelivery = userDara => {
  const response = axios
    .post(API_URL, userDara)
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

  return response.data;
};

export const deleteDelivery = deliveryId => {
  const response = axios
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

  return response;
};

export const getData = () => {
  const response = axios.get(API_URL);

  return response;
};
