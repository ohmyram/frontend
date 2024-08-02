import React, { createContext, useReducer, useEffect, useContext } from 'react';
import axios from 'axios';

// Crear el contexto de usuario
const UserContext = createContext();

// Definir las acciones del reducer
const actionTypes = {
    SET_USER: 'SET_USER',
    SET_LOADING: 'SET_LOADING',
    SET_AUTHENTICATED: 'SET_AUTHENTICATED',
};

// Definir el estado inicial
const initialState = {
    user: null,
    loading: true,
    isAuthenticated: false,
};

// Reducer para manejar el estado del usuario
const userReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return { ...state, user: action.payload };
        case actionTypes.SET_LOADING:
            return { ...state, loading: action.payload };
        case actionTypes.SET_AUTHENTICATED:
            return { ...state, isAuthenticated: action.payload };
        default:
            return state;
    }
};

// Función para obtener el token del localStorage
const getToken = () => localStorage.getItem('token');

// Función para configurar el token en el localStorage
const setToken = (token) => localStorage.setItem('token', token);

// Función para remover el token del localStorage
const removeToken = () => localStorage.removeItem('token');

// Función para hacer la petición de login
const login = async (dispatch, { email, password }) => {
    try {
        const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
        setToken(res.data.token);
        dispatch({ type: actionTypes.SET_USER, payload: res.data.user });
        dispatch({ type: actionTypes.SET_AUTHENTICATED, payload: true });
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// Función para hacer la petición de logout
const logout = async (dispatch) => {
    try {
        removeToken();
        dispatch({ type: actionTypes.SET_USER, payload: null });
        dispatch({ type: actionTypes.SET_AUTHENTICATED, payload: false });
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};

// Función para hacer la petición de actualización de usuario
const updateUser = async (dispatch, updatedData) => {
    try {
        const token = getToken();
        const res = await axios.put('http://localhost:3000/api/auth/update-profile', updatedData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({ type: actionTypes.SET_USER, payload: res.data.user });
        return res.data.user;
    } catch (error) {
        console.error('Update user error:', error);
        throw error;
    }
};

// Componente proveedor de contexto
export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    // Hook de efecto para cargar los datos del usuario cuando el componente se monta
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = getToken();
                if (token) {
                    const res = await axios.get('http://localhost:3000/api/auth/me', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    dispatch({ type: actionTypes.SET_USER, payload: res.data });
                    dispatch({ type: actionTypes.SET_AUTHENTICATED, payload: true });
                } else {
                    dispatch({ type: actionTypes.SET_AUTHENTICATED, payload: false });
                }
            } catch (error) {
                console.error('Error loading user:', error);
                logout(dispatch);
            } finally {
                dispatch({ type: actionTypes.SET_LOADING, payload: false });
            }
        };

        fetchUserData();
    }, []);

    return (
        <UserContext.Provider
            value={{
                ...state,
                login: (data) => login(dispatch, data),
                logout: () => logout(dispatch),
                updateUser: (data) => updateUser(dispatch, data),
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

// Hook personalizado para usar el contexto de usuario
export const useUser = () => useContext(UserContext);

export default UserContext;
