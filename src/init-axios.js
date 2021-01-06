import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { AUTH_TOKEN } from './localstorage-keys';

// https://pacific-spire-65720.herokuapp.com/
// https://studentpress-backend.herokuapp.com/api/
const axiosInstance = axios.create({
  baseURL: 'https://pacific-spire-65720.herokuapp.com/api/',
});

// http interceptor to add `authorization` field in requests
axiosInstance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return {
    ...config,
    headers: {
      authorization: `Bearer ${authToken}`,
    },
  };
});

Vue.use(VueAxios, axiosInstance);
