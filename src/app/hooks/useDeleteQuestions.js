/* NOTA: Este hook utiliza una lógica para Eliminar preguntas seleccionadas con un checkbox*/

//Voy a necesitar hacer un fetch para eliminar preguntas
//import { fetchAPI } from '@/api/fetch-api'
import useFetch from './useFetch'

//me traigo info de sesion para coger el token
import { useSession } from 'next-auth/react'


//Toast para imprimir mensajes de exito o fracaso (avisaré que se han eliminado las preguntas)
import { toast } from 'react-toastify'


export const useDeleteQuestions =  (valueCheckbox, dataQuizz, setValueCheckbox, closeModal) => {
    const IdQuiz = dataQuizz[0]?.idQuiz

    const { data: session } = useSession() //para obtener el token de la sesion.
    const { apiFetch } = useFetch(); //para hacer el fecth.

    const deleteQuestions = async () => {
    
        const onSuccess =  () => {
            toast.success('Preguntas eliminadas')
            setValueCheckbox([]); //dejar los checkboxes vacíos
             //al terminar cierra el modal
            closeModal()
        }

        const onError =  (error) => {
            toast.error('Hubo un error al eliminar preguntas')
            console.log('hubo un error al eliminar preguntas', error)
        }

        try {

            const token = session.accessToken; //en esta constante me guardo el token
            const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` //metemos token en la cabecera
            }

            const data = {
                method: 'DELETE',
                headers: headers,
                body: JSON.stringify
                ({  
                    "questionIds": valueCheckbox,
                    "quizId": IdQuiz,
                })
            }

        apiFetch('/delete-question', data, onSuccess, onError);    
            
        } catch (error) {
            console.error(error)
        }
    }


    //aqui va la funcion de handle

    return{ deleteQuestions } 
}