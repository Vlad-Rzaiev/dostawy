import axios from 'axios';

const API_URL = 'https://6788090fc4a42c9161091efe.mockapi.io/deliveries';

export const addDelivery = async userDara => {
  try {
    const response = await axios.post(API_URL, userDara);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteDelivery = async deliveryId => {
  try {
    const response = await axios.delete(`${API_URL}/${deliveryId}`);

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getData = async () => {
  try {
    const response = await axios.get(API_URL);

    return response;
  } catch (err) {
    console.log(err);
  }
};
