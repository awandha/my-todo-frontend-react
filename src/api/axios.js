import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Change if your Go backend is hosted elsewhere
});

export default api;
