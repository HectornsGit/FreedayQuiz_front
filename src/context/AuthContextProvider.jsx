'use client'
import { createContext } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useLocalStorage('token', null)

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}
