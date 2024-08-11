import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:1337', // Replace with your Strapi API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
