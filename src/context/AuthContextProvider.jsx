'use client';
import { createContext } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage'; 

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useLocalStorage('token', '');

    /*Queda esto comentado porque queriamos hacerlo desde hook useLocalStorage
    const saveTokenInLocalStorage = (token) => {
    localStorage.setItem('token', token);
    } */

    return (
    <AuthContext.Provider value={{ token, setToken}}> 
      {children}
    </AuthContext.Provider>
    );
};
