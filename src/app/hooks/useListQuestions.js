/* NOTA: Este hook utiliza una lógica para listar preguntas de un quizz creado*/

//Voy a necesitar hacer un fetch para traer las preguntas
//import { fetchAPI } from '@/api/fetch-api'
import useFetch from './useFetch'

//me traigo info de sesion para coger el token
import { useSession } from 'next-auth/react'

import { useState } from 'react'

export const useListQuestions =  () => {
    const { data: session } = useSession() //para obtener el token de la sesion.
    const { apiFetch } = useFetch(); //llamo al hokk para poder hacer fetch
    const [dataQuizz, setDataQuizz] = useState([]) //iniciamos con un array vacío para poder hacer un .map

    const [modal, setModal]  = useState(false) // para activar un modal (se abre cuando haces click al boton)

    const getQuestions = async () => {
         //funcion que se ejecuta cuando va todo bien :)
        const onSuccess = async (_data) => {
            const idQuiz = _data[0].quizzes[0].id
            const questions = _data[0].quizzes[0].questions; //de toda la data(JSON) del back, cojo la parte de las preguntas
            
            //me guardo en la constante dataQuestions los datos que quiero 'pintar en el front'
            const dataQuestions = questions?.map(question => ({
                idQuiz: idQuiz,
                questionId: question.id,
                questionImage: question.image,
                questionNumber: question.questionNumber,
            })); //me creo un objeto, dataQuestions con los datos que me interesan recuperar del back
            setDataQuizz(dataQuestions); //para setear los datos e imprimir lo que corresponda
            setModal(!modal); //muestra listado de preguntas en un modal
        }
    
        //funcion que se ejecuta cuando hay algun error
        const onError = async (_data) => {
        console.log('Error:', _data)
        }

        try {
            const token = session.accessToken; //en esta constante me guardo el token
            const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` //metemos token en la cabecera
            }

            const data = {
                method: 'GET',
                headers: headers
            }

            apiFetch('/user-info', data, onSuccess, onError);
        } catch (error) {
            console.error(error)
        }
        
    }
        
    /* Funcion pequeña para poder cerrar el modal y asignarlo a un boton*/
    const closeModal = () => {
        setModal(false);
    }

    return { getQuestions, dataQuizz, modal, closeModal}
}