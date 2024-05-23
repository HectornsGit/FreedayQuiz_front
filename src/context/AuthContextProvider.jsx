'use client';
import { createContext, useState, useEffect } from 'react';
//import { getDataUserLoggedService } from '../service/getDataUserLoggedService';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  //guardamos token en local Storage
  useEffect(() => {
    localStorage.setItem('token', token);
    //localStorage.getItem('token')
  }, [token]);


  useEffect(() => {
    const getDataUserLogged = async () => {
      try {
        const data = await getDataUserLoggedService({ token }); //TO DO: hacer el service
        setUser(data);
      } catch (error) {
        logout();
      }
    };
    getDataUserLogged();
  }, [token]);

  //Creo una funcion para cuando se desloga y que redirija a la home
  const logout = () => {
    setToken('');
    setUser(null); 
   // navigate('/') TODO: con next esto se hace de otra manera
  };


  return (
    <AuthContext.Provider value={{ token, user, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
