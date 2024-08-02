import axios from 'axios';

// Crear una instancia de axios con la configuración base
const api = axios.create({
    baseURL: 'http://localhost:3000', // URL base para todas las solicitudes
});

// Interceptor para agregar el token de autorización a las solicitudes
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Agregar el token al encabezado de autorización
    }
    return config; // Devolver la configuración modificada
}, error => {
    return Promise.reject(error); // Manejar errores en la configuración de la solicitud
});

export default api;
