'use client'
import ListQuestions from '@/components/ListQuestions'
import { useSession } from 'next-auth/react'

const ListaPreguntas = () => {
    const { data: session, status } = useSession()
    console.log(session ? session?.user.email : 'no hay sesion')
    return (
        <>
            {session?.accessToken ? (
                <>
{/*                     <p style={{ color: 'white' }}>Puedes pasar</p>
                    <p style={{ color: 'white' }}>{session?.user.message}</p>
                    <p style={{ color: 'white' }}>{session?.user.email}</p>
                    <p style={{ color: 'white' }}>{status}</p> */}
                    <ListQuestions/>
                </>
            ) : (
                <p style={{ color: 'white' }}>No puedes pasar</p>
            )}
        </>
    )
}
export default ListaPreguntas
