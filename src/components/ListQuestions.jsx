'use client'
import AddQuestion from './icons/AddQuestion' //recuadro dentro de modal para agregar question

//importamos slider para mover imgs de izquierda a derecha
import Slider from './Slider' 

//me traigo el hook que lista las preguntas
import { useListQuestions } from '@/app/hoooks/useListQuestions'

//importamos useRouter para usar enrutados (al hacer click en la imagen lleva a la ruta de cada pregunta)
import { useRouter } from 'next/navigation'



export default function ListQuestions() {
    const url = process.env.NEXT_PUBLIC_API_HOST //para indicar mas facil la ruta dónde estan las imágenes
    //const [modal, setModal]  = useState(false) // para activar un modal (se abre cuando haces click al boton)

    const { getquestions, dataQuizz } = useListQuestions ()
    //setModal(!modal); //abre las imgs en un modal


    const router = useRouter() //llamo al router para hacer enrutado (para llevar a la ruta de las questions)


    //funcion para que cargue ruta dinámica, al hacer click en la imagen nos lleva a editar la pregunta que toque (id params, questionNUmber params)
    const handleRouteQuestion =  (id, questionNumber) => {
        router.push(`/update-question/${id}/${questionNumber}`) //lleva a la ruta con la id de la pregunta TODO !! esto es una ruta de ejemplo
    }

    const handleRouteAddQuestion =  () => {
        router.push(`/create-questions/`) //lleva a la ruta para crear nueva pregunta TODO !! esto es una ruta de ejemplo
    }


    return ( 
    <>
        <button className='p-3 bg-[--cyan] text-black'  onClick={getquestions}> Lista las preguntas</button>
        
        <Slider>
  {/*       <p onClick={() => setModal(false)} className='cursor-pointer md:w-10 md:h-10 w-10 h-8 flex items-center justify-center text-black font-extrabold md:text-xl text-base bg-white
        hover:bg-black hover:text-white hover:box-shadow-white relative md:bottom-[100px] md:right-[47px] bottom-[60px] right-[26px]'>X</p> */}
            <div id='slider' className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth'>
            <div className='w-[200px] md:w-[400px] inline-flex mx-8 md:mx-4 justify-center'> <AddQuestion onClick={() => handleRouteAddQuestion()}/> </div>
            
        
            {dataQuizz && 
                dataQuizz.map((question, index) => (
                    <div key={index} className='w-[200px] md:w-[400px] inline-flex mx-8 md:mx-4 justify-center'>
                        <div className='flex flex-col items-center pr-1'>
                            <p className='text-2xl mb-4'>{question.questionNumber}</p>
                        </div>
                        <img 
                        className='cursor-pointer hover: p-[0.35rem] hover:border-2 hover:border-solid hover:border-[--yellow] hover: rounded '
                        onClick={() => handleRouteQuestion(question.questionId,question.questionNumber)}
                        src={`${url}/uploads/${question.questionImage}`} 
                        alt={`foto portada de la pregunta ${question.questionId}`}/>
                    </div>
            ))} 


            </div>
        </Slider>
    
    </>
    );
}