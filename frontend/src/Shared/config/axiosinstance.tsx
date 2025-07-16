import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust if your backend runs elsewhere
  withCredentials: true, // If you need cookies/auth
});

export default axiosInstance;
