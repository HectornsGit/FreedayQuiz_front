'use client'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContextProvider'

const Prueba = () => {
    const { setToken } = useContext(AuthContext)

    return (
        <>
            <p style={{ color: 'white' }}>Esto es prueba</p>
            <button style={{ color: 'white' }} onClick={() => setToken(null)}>
                Cerrar sesión
            </button>
        </>
    )
}

export default Prueba
