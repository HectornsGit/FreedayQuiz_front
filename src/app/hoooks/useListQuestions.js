/* NOTA: Este hook utiliza una lógica para listar preguntas de un quizz creado*/

//Voy a necesitar hacer un fetch para traer las preguntas
import { fetchAPI } from '@/api/fetch-api'

//Con el estado puedo 'setear' las imagenes que me llegan del back :)
import { useState } from 'react'

//me traigo info de sesion para coger el token
import { useSession } from 'next-auth/react'


export const useListQuestions =  () => {
    const { data: session } = useSession() //para obtener el token de la sesion.
    const [dataQuizz, setDataQuizz] = useState([]) //iniciamos con un array vacío para poder hacer un .map

    const getquestions = async () => {
         //funcion que se ejecuta cuando va todo bien :)
        const onSuccess = async (_data) => {
            const idQuiz = _data[0].quizzes[0].id
            const questions = _data[0].quizzes[0].questions; //de toda la data(JSON) del back, cojo la parte de las preguntas
            
            //me guardo en la constante dataQuestions los datos que quiero 'pintar en el front'
            const dataQuestions = questions.map(question => ({
                idQuiz: idQuiz,
                questionId: question.id,
                questionImage: question.image,
                questionNumber: question.questionNumber
            })); //me creo un objeto, dataQuestions con los datos que me interesan
            setDataQuizz(dataQuestions); //para setear los datos e imprimir lo que corresponda
        }
    
        //funcion que se ejecuta cuando hay algun error
        const onError = async (_data) => {
        console.log('Error:', _data)
        }


        try {
            const token = session.accessToken; //en esta constante me guardo el token
            const headers = {
            'Authorization': `Bearer ${token}`, //metemos token en la cabecera
            };

            await fetchAPI(
            '/user-info',
            'GET', 
            null,// no hay payload ni información en el body
            headers,
            onSuccess, onError);
            } 

            catch (error) {
            console.error('error', error);
            }

    }

    return {getquestions, dataQuizz}
}