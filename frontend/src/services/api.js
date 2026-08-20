import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://redproduct-backend-sv0p.onrender.com/api'

const api = axios.create({
  baseURL: API_BASE_URL,
})

// Ajoute automatiquement le token à chaque requête si connecté
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api