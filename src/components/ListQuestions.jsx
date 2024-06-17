'use client'
//importacion de iconos
import Delete from './icons/Delete' //icono papelera
import AddQuestion from './icons/AddQuestion' //recuadro dentro de modal para agregar question

//me traigo info de sesion para coger el token
import { useSession } from 'next-auth/react'

//Voy a necesitar hacer un fetch para traer las preguntas
import { fetchAPI } from '@/api/fetch-api'

//Con el estado puedo 'setear' las imagenes que me llegan del back :)
import { useState } from 'react'

//importamos slider para mover imgs de izquierda a derecha
import Slider from './Slider' 

//importamos useRouter para usar enrutados (al hacer click en la imagen lleva a la ruta de cada pregunta)
import { useRouter } from 'next/navigation'


export default function ListQuestions() {
    const url = process.env.NEXT_PUBLIC_API_HOST //para indicar mas facil la ruta dónde estan las imágenes
    const { data: session } = useSession() //para obtener el token de la sesion.
    const [dataQuizz, setDataQuizz] = useState([]) //iniciamos con un array vacío para poder hacer un .map
    const [modal, setModal]  = useState(false) // para activar un modal (se abre cuando haces click al boton)

    const router = useRouter() //llamo al router para hacer enrutado (para llevar a la ruta de las questions)
    
    const handleUpdate = async (session) => {
        //funcion que se ejecuta cuando va todo bien :)
        const onSuccess = async (_data) => {
            const questions = _data[0].quizzes[0].questions; //de toda la data(JSON) del back, cojo la parte de las preguntas
            //me guardo en la constante dataQuestions los datos que quiero 'pintar en el front'
            const dataQuestions = questions.map(question => ({
                id: question.id,
                image: question.image,
                questionNumber: question.questionNumber
            })); //me creo un objeto, dataQuestions con los datos que me interesan (imagen e id)
            setDataQuizz(dataQuestions); //para setear los datos e imprimir lo que corresponda
            setModal(!modal); //abre las imgs en un modal
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
        console.error('error');
        }
    };

    //funcion para que cargue ruta dinámica, al hacer click en la imagen nos lleva a editar la pregunta que toque (id params, questionNUmber params)
    const handleRouteQuestion =  (id, questionNumber) => {
        router.push(`/update-question/${id}/${questionNumber}`) //lleva a la ruta con la id de la pregunta TODO !! esto es una ruta de ejemplo
    }

    const handleRouteAddQuestion =  () => {
        router.push(`/create-questions/`) //lleva a la ruta para crear nueva pregunta TODO !! esto es una ruta de ejemplo
    }


    return ( 
    <>
        <button className='p-3 bg-[--cyan] text-black'  onClick={() => handleUpdate(session)}> Lista las preguntas</button>
        {modal &&
        <Slider>
        <p onClick={() => setModal(false)} className='cursor-pointer md:w-10 md:h-10 w-10 h-8 flex items-center justify-center text-black font-extrabold md:text-xl text-base bg-white
        hover:bg-black hover:text-white hover:box-shadow-white relative md:bottom-[100px] md:right-[47px] bottom-[60px] right-[26px]'>X</p>
            <div id='slider' className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth'>
            <div className='w-[200px] md:w-[400px] inline-flex mx-8 md:mx-4 justify-center'> <AddQuestion onClick={() => handleRouteAddQuestion()}/> </div>
            {dataQuizz ? (
                dataQuizz.map((question) => (
                    <div key={question.id} className='w-[200px] md:w-[400px] inline-flex mx-8 md:mx-4 justify-center'>
                        <div className='flex flex-col items-center pr-1'>
                            <p className='text-2xl mb-4'>{question.questionNumber}</p>
                            <Delete className='w-[12px] md:w-[16px] box-content p-2 bg-[--yellow] rounded cursor-pointer'/>
                        </div>
                        <img 
                        className='cursor-pointer hover: p-[0.35rem] hover:border-2 hover:border-solid hover:border-[--yellow] hover: rounded '
                        onClick={() => handleRouteQuestion(question.id,question.questionNumber)}
                        src={`${url}/uploads/${question.image}`} 
                        alt={`foto portada de la pregunta ${question.id}`}/>
                    </div>
            ))
            ):
                (''
            )}
            </div>
        </Slider>
        }
    </>
    );
}