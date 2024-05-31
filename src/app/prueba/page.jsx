'use client'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/context/AuthContextProvider'

const Prueba = () => {
    const router = useRouter()
    const { token, setToken } = useContext(AuthContext)

    useEffect(() => {
        if (!token) {
            router.push('/')
        }
    }, [token, router])

    const handleLogout = () => {
        setToken(null)
    }

    console.log(token)

    return (
        <>
            <p style={{ color: 'white' }}>Esto es prueba</p>
            <button style={{ color: 'white' }} onClick={handleLogout}>
                Cerrar sesión
            </button>
            <p style={{ color: 'white' }}>
                {token ? 'Hay token' : 'No hay token'}
            </p>
        </>
    )
}

export default Prueba
