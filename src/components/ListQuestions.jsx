'use client'
//me traigo info de sesion para coger el token
import { useSession } from 'next-auth/react'

//Voy a necesitar hacer un fetch para traer las preguntas
import { fetchAPI } from '@/api/fetch-api'

//Con el estado puedo 'setear' las imagenes que me llegan del back :)
import { useState } from 'react'

import Slider from './Slider' //importamos slider para mover imgs de izquierda a derecha


export default function ListQuestions() {
    const url = process.env.NEXT_PUBLIC_API_HOST //para indicar mas facil la ruta dónde estan las imágenes
    const { data: session } = useSession() //para obtener el token de la sesion.
    const [imgPreview, setImgPreview] = useState([]) //iniciamos con un array vacío para poder hacer un .map
    const [modal, setModal]  = useState(false) // para activar un modal
    
    const handleUpdate = async (session) => {
        //funcion que se ejecuta cuando va todo bien :)
        const onSuccess = async (_data) => {
        const questions = _data[0].quizzes[0].questions; //esto son las preguntas del quizz
        const images = questions.map(question => question.image); //hago un map de las preguntas para traerme las img en un array
        setImgPreview(images); //las seteo en un estado
        setModal(!modal); //abre las imgs en un modal
        console.log('EXITOOO, aqui tienes las preguntas', images)
        }
    
        //funcion que se ejecuta cuando hay algun error
        const onError = async (_data) => {
        console.log('Esto no funciona T___T', _data)
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
        console.error('error');
        }
    };



    return ( 
        <>
        <button className='p-3 bg-[--cyan] text-black'  onClick={() => handleUpdate(session)}> Lista las preguntas</button>
        {modal &&
        <Slider>
            {imgPreview.length > 0 ? (
                imgPreview.map((imgQuestion, index) => (
                    <img key={index} src={`${url}/uploads/${imgQuestion}`} alt={`foto portada de la pregunta ${index}`} className='w-[300px] inline-block p-2 cursor-pointer'/>
            ))
            ):
                (''
            )}
        </Slider>
        }
        </>
    );
}