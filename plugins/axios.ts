import axios from 'axios';

export default defineNuxtPlugin(() => {
  const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com', 
  });

  return {
    provide: {
      axios: axiosInstance,
    },
  };
});