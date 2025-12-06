import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  });

api.interceptors.response.use(
    (response) => response,  (error) => {
        if (error.response.status === 401) {
          
          console.error('Unauthorized, logging out...');
          //localStorage.removeItem('token');
         //window.location.href = '/login'; // Redireciona para a página de login
        }
        return Promise.reject(error);
      }
);

export default api;