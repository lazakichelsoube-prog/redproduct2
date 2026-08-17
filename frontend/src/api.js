import axios from 'axios';

const api = axios.create({
  baseURL: 'https://redproduct2.onrender.com/api',
});

export default api;