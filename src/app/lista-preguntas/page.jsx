/* LIDIA: ESTA PAGINA ES TEMPORAL, sólo vale para renderizar componente ListQuestions y comprobar que funciona bien*/

'use client';
import ListQuestions from '@/components/ListQuestions';
import { useSession } from 'next-auth/react';

const ListaPreguntas = () => {
    const { data: session, status } = useSession();
    console.log(session ? session?.user.email : 'no hay sesion');
    return (
        <>
            {session?.accessToken ? (
                <>
                    <ListQuestions />
                </>
            ) : (
                <p style={{ color: 'white' }}>No puedes pasar</p>
            )}
        </>
    );
};
export default ListaPreguntas;
