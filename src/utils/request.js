/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const request = {
  async get({route, id, url}) {
    const response = id
      ? await axios.get(`${url}/${route}/${id}`)
      : await axios.get(`${url}/${route}`);
    return response.data.data;
  },
  async delete({route, id, url}) {
    const response = await axios.delete(`${url}/${route}/${id}`);
    return response.data.data;
  },
  async post({route, data, type, url}) {
    const response = await axios.post(`${url}/${route}`, data, {
      headers: type === 'json' ? { 'Content-Type': 'application/json' } : { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  },
  try(func) {
    try {
      func();
    }
    catch (err) {
      console.log("Retourner l'erreur au dev", err);
    }
  },
};
