/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const api = process.env.REACT_APP_API_URL;
console.log(api)
export const request = {
  async get(route, id) {
    const response = id
      ? await axios.get(`${api}${route}/${id}`)
      : await axios.get(`${api}${route}`);
    return response.data.data;
  },
  async delete(route, id) {
    const response = await axios.delete(`${api}${route}/${id}`);
    return response.data.data;
  },
  async post(route, data, type) {
    const response = await axios.post(`${api}${route}`, data, {
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
