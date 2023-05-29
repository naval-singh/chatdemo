import { baseApi, get } from '../services.common';

// get all chats api service
const getAllChats = async () => {
  const url = `${baseApi}photos`;
  const headers = {}; // we can fetch and pass token or other headers from here
  const response = await get(url, headers);
  return response;
};

// .................. 
// .
// .
// .
// we can put all other services related to same api here
// .
// .
// .
// .................. 

export const chatServices = {
  getAllChats,
};