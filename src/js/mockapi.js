import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const addDelivery = async userDara => {
  try {
    axios
      .post('https://6788090fc4a42c9161091efe.mockapi.io/deliveries', userDara)
      .then(response => {
        iziToast.success();
        console.log(response.data);
      });
  } catch (err) {
    iziToast.error();
  }
};
