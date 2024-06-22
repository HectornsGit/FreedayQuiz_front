'use client'
//importacion de iconos
import Delete from './icons/Delete' //icono papelera

//me traigo info de sesion para coger el token
import { useSession } from 'next-auth/react'

//Voy a necesitar hacer un fetch para eliminar preguntas
import { fetchAPI } from '@/api/fetch-api'


import { useState } from 'react'


//Toast para imprimir mensajes de exito o fracaso T__T
import { toast } from 'react-toastify'


export default function DeleteQuestions(idQuestion, question) {
    console.log('data', question);
    const { data: session } = useSession() //para obtener el token de la sesion.

    const [stateCheckbox , setStateCheckbox] = useState([]) // estado para controlar el valor de los checkboxes
    //const [idQuiz, setIdQuiz] = useState('')//para obtener el Id del quiz para componente eliminar




    /* Para saber qué preguntas se eligieron y formar un array */
    const handleValueCheck =  (e) => {
        const value = e.target.value; //recojo valor (el id de la pregunta)
        const checked = e.target.checked; //recojo si está marcado o no
        setStateCheckbox(prevState => //añado el valor anterior
        checked ? [...prevState, value] //si está checado añade valor al valor anterior
        : prevState.filter(item => item !== value) // si no está checkado quita su valor del array
        );
    }

    /* para ELIMINAR preguntas y hacer el fetch */
    const handleDelete =   async () => {
        const payload = { 
            'questionIds': stateCheckbox,
            'quizId': idQuiz
        }
        
       // const payload = JSON.stringify(deleteQuestion)

        console.log ('informacion', payload);

        const onSuccess =  () => {
            console.log('Preguntas eliminadas')
            toast.success('Preguntas eliminadas')
            //setDataQuizz(dataQuizz.filter(question => !stateCheckbox.includes(question.id)));
            //setStateCheckbox([]);
        }

        const onError =  (error) => {
            console.log('hubo un error al eliminar preguntas')
            toast.error(error.error)
        }

        try {
        const token = session.accessToken; //en esta constante me guardo el token
        const headers = {
        'Authorization': `Bearer ${token}`, //metemos token en la cabecera
        };
        await fetchAPI(
            '/delete-question',
            'DELETE', 
            payload,
            headers,
            onSuccess, onError);

        } catch (error) {
            console.error('error', error);
        }
    }



    return ( 
        <>
        {stateCheckbox.length > 0 && (
        <button className='p-3 bg-red-500 text-white' onClick={handleDelete}>BORRAR</button>
        )}

        <input 
            type="checkbox"
            value={idQuestion} 
            onChange={handleValueCheck}
            />
        </>
    );

}