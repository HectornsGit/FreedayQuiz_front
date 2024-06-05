'use client'
import { signOut } from 'next-auth/react'

const Page = () => {
    return (
        <>
            <p style={{ color: 'white' }}>Esta es una página restringida</p>
            <button
                style={{ color: 'white' }}
                onClick={async () => await signOut({ redirect: false })}
            >
                Cerrar sesion
            </button>
        </>
    )
}
export default Page
