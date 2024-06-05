'use client'
import { signOut, useSession } from 'next-auth/react'

const Page = () => {
    const { data: session, loading, status } = useSession()
    console.log(session ? session?.user.email : 'no hay sesion')
    return (
        <>
            {loading && <p>Cargando...</p>}
            {session?.accessToken ? (
                <>
                    <p style={{ color: 'white' }}>Puedes pasar</p>
                    <p style={{ color: 'white' }}>{session?.user.message}</p>
                    <p style={{ color: 'white' }}>{session?.user.email}</p>
                    <p style={{ color: 'white' }}>{status}</p>
                    <button
                        style={{ color: 'white' }}
                        onClick={async () => await signOut({ redirect: false })}
                    >
                        Cerrar sesión
                    </button>
                </>
            ) : (
                <p style={{ color: 'white' }}>No puedes pasar</p>
            )}
        </>
    )
}
export default Page
