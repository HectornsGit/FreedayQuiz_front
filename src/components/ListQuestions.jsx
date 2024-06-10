'use client'
//me traigo info de sesion para coger el token
import { useSession } from 'next-auth/react'

//Voy a necesitar hacer un fetch para traer las preguntas
import { fetchAPI } from '@/api/fetch-api'


const handleUpdate = async (session) => {
        //funcion que se ejecuta cuando va todo bien :)
        const onSuccess = async (_data) => {
        const questions = _data[0].quizzes[0].questions
        console.log('EXITOOO, aqui tienes las preguntas', questions)
        }
    
        //funcion que se ejecuta cuando hay algun error
        const onError = async (_data) => {
        console.log('Esto no funciona T___T')
        }

    try {
        const token = session.accessToken;
        const headers = {
        'Authorization': `Bearer ${token}`,
        };

        await fetchAPI('/user-info',
        'GET', //me obliga a poner un metodo, aunque sea GET
        headers,
        null, //no hay payload como esta dentro de parametros, me obliga a poner algo
        onSuccess, onError);
        } 

        catch (error) {
        console.error('error');
        }

};

export default function ListQuestions() {
    const { data: session, status } = useSession()
    console.log('TOKEN:', session.accessToken);

    return ( 
        <>
            {session?.accessToken ? (
                <>
        <button className='p-3 bg-[--cyan] text-black'  onClick={() => handleUpdate(session)}> Lista las preguntas</button>
                {/*  <button
                        style={{ color: 'white' }}
                        onClick={async () => await signOut({ redirect: false })}
                    >
                        Cerrar sesión
                    </button> */}
                </>
            ) : (
                <p style={{ color: 'white' }}>...</p>
            )}
        </>
    );
}