import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Change if your Go backend is hosted elsewhere
});

export default api;
