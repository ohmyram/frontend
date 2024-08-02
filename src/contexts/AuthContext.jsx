import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Proveedor de autenticación que envuelve la aplicación
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Función para iniciar sesión
    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token); // Guardar token en localStorage
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    // Función para cerrar sesión
    const logout = async () => {
        try {
            setUser(null);
            localStorage.removeItem('token'); // Eliminar token de localStorage
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
