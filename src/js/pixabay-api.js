import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import xmarkSvg from '../img/xmark.svg';

export const userRequest = async (userInputValue, page, per_page) => {
  try {
    const response = await axios.get(`https://pixabay.com/api/`, {
      params: {
        key: '47679134-c77d37d01e499358209d43473',
        q: userInputValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: per_page,
        page: page,
      },
    });

    return response.data;
  } catch (error) {
    iziToast.show({
      message: `${error}`,
      messageColor: '#ffffff',
      iconUrl: xmarkSvg,
      backgroundColor: '#ef4040',
      position: 'topRight',
    });

    console.log(error);
  }
};
