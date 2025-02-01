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
        timeout: 10000,
      });
    })
    .catch(err => {
      iziToast.error({
        message: err,
        position: 'topRight',
        timeout: 10000,
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
        timeout: 10000,
      });
      console.log(response);
    })
    .catch(err => {
      iziToast.error({
        message: err,
        position: 'topRight',
        timeout: 10000,
      });
    });
};

export const updateData = (dataForUpdate, id) =>
  axios
    .put(`${API_URL}/${id}`, dataForUpdate)
    .then(response => {
      iziToast.success({
        message: 'Korekta zrobiona',
        position: 'topRight',
        timeout: 10000,
      });
      console.log(response);
    })
    .catch(err => console.log(err));

export const getData = () => axios.get(API_URL);

export const getlastDeliveries = page => {
  const API_URL = new URL(
    'https://6788090fc4a42c9161091efe.mockapi.io/deliveries'
  );
  API_URL.searchParams.append('sortBy', 'deliveryNumber');
  API_URL.searchParams.append('order', 'desc');
  API_URL.searchParams.append('page', page);
  API_URL.searchParams.append('limit', 12);

  const response = axios.get(API_URL);

  return response;
};
