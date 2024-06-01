'use client'
import { AuthContext } from '@/context/AuthContextProvider'
import { useSession, SessionProvider } from 'next-auth/react'
import { useContext } from 'react'
const Prueba = () => {
    const { setToken } = useContext(AuthContext)
    const { data: session, status } = useSession()
    console.log(session)
    console.log(status)
    return (
        <>
            <button
                onClick={() => {
                    setToken(null)
                }}
                style={{ color: 'white' }}
            >
                Cerrar sesión
            </button>
        </>
    )
}

export default function MyPage({ session }) {
    return (
        <SessionProvider session={session}>
            <Prueba />
        </SessionProvider>
    )
}
export { Prueba }
