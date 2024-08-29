/* NOTA: Este hook utiliza una lógica para Eliminar preguntas seleccionadas con un checkbox*/

//Voy a necesitar hacer un fetch para eliminar preguntas
import { fetchAPI } from '@/api/fetch-api'

//me traigo info de sesion para coger el token
import { useSession } from 'next-auth/react'

//Toast para imprimir mensajes de exito o fracaso (avisaré que se han eliminado las preguntas)
import { toast } from 'react-toastify'

import { useState } from 'react';


export const useDeleteQuestions =  (valueCheckbox, dataQuizz, setValueCheckbox, closeModal) => {
    const IdQuiz = dataQuizz[0]?.idQuiz //obtengo el id del quiz

    const { data: session } = useSession() //para obtener el token de la sesion.

    const [isGrey, setIsGrey] = useState({}); //aplicará un filter:grayscale al seleccionar la img a eliminar
    const [iconDelete, setIconDelete] = useState({}); // dibujará el icono de una papelera cuando se seleccione una img para borrar

    const deleteQuestions = async () => {


        const onSuccess =  () => {
            toast.success('Pregunta eliminada');
            setValueCheckbox([]); //dejar los checkboxes vacíos
             //al terminar cierra el modal
            closeModal()
        }

        const onError =  (error) => {
            toast.error('Hubo un error al eliminar preguntas')
            console.log(error)
        }

        try {

            const token = session.accessToken; //en esta constante me guardo el token
            const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` //metemos token en la cabecera
            }

            const body = {  
                questionIds: valueCheckbox,
                quizId: IdQuiz
            }

            await fetchAPI('/delete-question','DELETE', body, onSuccess, onError, headers);  
            
            
        } catch (error) {
            console.error(error)
        }
    }

    //Funcion para obtener el valor del checkbox (ide de las preguntas)
    const handleValue = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        
    if (checked) {
            setValueCheckbox((prevstate) => [...prevstate, value]);
            setIsGrey((prevState) => ({...prevState,[value]: checked,})); //muestra filtro escala de grises si está el check marcado
        } else {
            setValueCheckbox((prevState) =>
                prevState.filter((item) => item !== value)
            );
            setIsGrey((prevState) => ({...prevState,[value]: checked,}));
        }

    };


    return{ deleteQuestions, handleValue, isGrey, iconDelete } 
}