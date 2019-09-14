import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { AUTH_TOKEN } from './localstorage-keys';

const axiosInstance = axios.create({
  baseURL: 'https://studentpress-backend.herokuapp.com/api/',
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
