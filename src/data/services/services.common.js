import axios from 'axios';

export const baseApi = 'https://jsonplaceholder.typicode.com/';

const error = (e) => {
  return { status: 'error', isSuccessful: false, message: e };
};

const success = (data) => {
  return { status: 'success', isSuccessful: true, data: data };
};

// axios get method
export const get = async (url, headers = {}) => {
  try {
    let response = await axios.get(url, { headers });
    return success(response.data);
  } catch (e) {
    if (e.response?.data) {
      return error(e.response.data.message);
    }
    return error(e);
  }
};

// axios post method
export const post = async (url, data, headers = {}) => {
  try {
    let response = await axios.post(url, data, { headers });
    return success(response.data);
  } catch (e) {
    if (e.response?.data) {
      return error(e.response.data.message);
    }
    return error(e);
  }
};

// here we can create all other required methods like put, delete, patch etc...