/* NOTA: Este hook utiliza una lógica para listar preguntas de un quizz creado*/

//Voy a necesitar hacer un fetch para traer las preguntas
import { fetchAPI } from '@/api/fetch-api';

//me traigo info de sesion para coger el token
import { useSession } from 'next-auth/react';

import { useState } from 'react';

export const useListQuestions = () => {
    const { data: session } = useSession(); //para obtener el token de la sesion.
    const [dataQuizz, setDataQuizz] = useState([]); //iniciamos con un array vacío para poder hacer un .map

    const [modal, setModal] = useState(false); // para activar un modal (se abre cuando haces click al boton)

    const getQuestions = async (quizId) => {
        //funcion que se ejecuta cuando va todo bien :)
        const onSuccess = async (data) => {
            const idQuiz = data.id;
            const questions = data.questions; //de toda la data(JSON) del back, cojo la parte de las preguntas

            //me guardo en la constante dataQuestions los datos que quiero 'pintar en el front'
            const dataQuestions = questions?.map((question) => ({
                idQuiz: idQuiz,
                questionId: question.id,
                questionImage: question.image,
                questionNumber: question.questionNumber,
            })); //me creo un objeto, dataQuestions con los datos que me interesan recuperar del back
            setDataQuizz(dataQuestions); //para setear los datos e imprimir lo que corresponda
            setModal(!modal); //muestra listado de preguntas en un modal
        };

        //funcion que se ejecuta cuando hay algun error
        const onError = async (data) => {
            console.log('Error:', data);
        };

        try {
            const token = session.accessToken; //en esta constante me guardo el token
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, //metemos token en la cabecera
            };

            await fetchAPI(
                `/get-quiz/${quizId}`,
                'GET',
                null,
                onSuccess,
                onError,
                headers
            );
        } catch (error) {
            console.error(error);
        }
    };

    /* Funcion pequeña para poder cerrar el modal y asignarlo a un boton*/
    const closeModal = () => {
        setModal(false);
    };

    return { getQuestions, dataQuizz, modal, closeModal };
};
