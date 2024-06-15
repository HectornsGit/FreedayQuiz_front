'use client'
//me traigo info de sesion para coger el token
import { useSession } from 'next-auth/react'

//Voy a necesitar hacer un fetch para traer las preguntas
import { fetchAPI } from '@/api/fetch-api'

//Con el estado puedo 'setear' las imagenes que me llegan del back :)
import { useState } from 'react'

//importamos slider para mover imgs de izquierda a derecha
import Slider from './Slider' 

//importamos unseRouter para usar enrutados
import { useRouter } from 'next/navigation' 


export default function ListQuestions() {
    const url = process.env.NEXT_PUBLIC_API_HOST //para indicar mas facil la ruta dónde estan las imágenes
    const { data: session } = useSession() //para obtener el token de la sesion.
    const [imgPreview, setImgPreview] = useState([]) //iniciamos con un array vacío para poder hacer un .map
    const [modal, setModal]  = useState(false) // para activar un modal (se abre cuando haces click al boton)

    const router = useRouter() //llamo al router para hacer enrutado (para llevar a la ruta de las questions)
    
    const handleUpdate = async (session) => {
        //funcion que se ejecuta cuando va todo bien :)
        const onSuccess = async (_data) => {
            const questions = _data[0].quizzes[0].questions; //de toda la data(JSON) del back, cojo la parte de las preguntas
            const dataQuestions = questions.map(question => ({
                image: question.image,
                id: question.id
            })); //me creo un objeto, dataQuestions con los datos que me interesan (imagen e id)
        setImgPreview(dataQuestions); //para setear los datos e imprimir lo que corresponda
        setModal(!modal); //abre las imgs en un modal
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

    //funcion para que cargue ruta dinámica, al hacer click en la imagen nos lleva a editar la pregunta que toque (id params)
    const handleRoute =  (id) => {
        router.push(`/preguntas/${id}`) //lleva a la ruta con la id de la pregunta TODO !! esto es una ruta de ejmplo
    }


    return ( 
        <>
        <button className='p-3 bg-[--cyan] text-black'  onClick={() => handleUpdate(session)}> Lista las preguntas</button>
        {modal &&
        <Slider>
            {imgPreview ? (
                imgPreview.map((question, index) => (
                    <img 
                    onClick={() => handleRoute(question.id)}
                    key={index} 
                    src={`${url}/uploads/${question.image}`} 
                    alt={`foto portada de la pregunta ${question.id}`} 
                    className='w-[300px] inline-block p-2 cursor-pointer'
                    />
            ))
            ):
                (''
            )}
        </Slider>
        }
        </>
    );
}