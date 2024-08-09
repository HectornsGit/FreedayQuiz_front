'use client';

import AddQuestion from './icons/AddQuestion'; //recuadro dentro de modal para agregar question

//importamos slider para mover imgs de izquierda a derecha
import Slider from './Slider';

//me traigo el hook que lista las preguntas
import { useListQuestions } from '@/hooks/useListQuestions';

//me traigo hook para eliminar preguntas
import { useDeleteQuestions } from '@/hooks/useDeleteQuestions';

//importamos useRouter para usar enrutados (al hacer click en la imagen lleva a la ruta de cada pregunta)
import { useRouter } from 'next/navigation';

import { useState, useEffect } from 'react';

export default function ListQuestions({ quizId, closeModal }) {
    const url = process.env.NEXT_PUBLIC_API_HOST; //para indicar mas facil la ruta dónde estan las imágenes

    const [valueCheckbox, setValueCheckbox] = useState([]);
    const {
        getQuestions,
        dataQuizz,
        modal,
        closeModal: listCloseModal,
    } = useListQuestions();

    const { deleteQuestions, handleValue } = useDeleteQuestions(
        valueCheckbox,
        dataQuizz,
        setValueCheckbox,
        closeModal
    );

    const router = useRouter(); //llamo al router para hacer enrutado (para llevar a la ruta de las questions)

    //funcion para que cargue ruta dinámica, al hacer click en la imagen nos lleva a editar la pregunta que toque (id params, questionNUmber params)
    const handleRouteQuestion = (quizId, questionNumber) => {
        router.push(`/edit-question/${quizId}/${questionNumber}`);
    };

    const handleAddQuestion = () => {
        console.log('quizId:', quizId);
        window.location.href = `/new-question/${quizId}`;
    };

    useEffect(() => {
        getQuestions(quizId);
    }, [quizId]);

    return (
        <>
            {modal && (
                <>
                    <div className="flex flex-row justify-between mx-11 my-3">
                        <p
                            onClick={closeModal}
                            className="cursor-pointer md:w-10 md:h-10 w-10 h-8 flex items-center justify-center text-black font-extrabold md:text-xl text-base bg-white hover:bg-black hover:text-white hover:box-shadow-white relative"
                        >
                            X
                        </p>
                        {/*Sólo muestra botón 'eliminar preguntas' si hay checks marcados   */}
                        {valueCheckbox.length > 0 && (
                            <button
                                onClick={deleteQuestions}
                                className="text-black font-extrabold text-lg bg-white px-11 py-2 
                                    hover:bg-black hover:text-white hover:box-shadow-white"
                            >
                                Eliminar preguntas
                            </button>
                        )}
                    </div>
                    <Slider>
                        <div
                            id="slider"
                            className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth"
                        >
                            <div
                                onClick={handleAddQuestion}
                                className="w-[200px] md:w-[400px] inline-flex mx-8 md:mx-4 justify-center cursor-pointer"
                            >
                                <AddQuestion />
                            </div>

                            {dataQuizz &&
                                dataQuizz?.map((question) => (
                                    <div
                                        key={question.questionId}
                                        className="w-[200px] md:w-[400px] inline-flex mx-8 md:mx-4 justify-center"
                                    >
                                        <div className="flex flex-col items-center pr-1">
                                            <p className="text-2xl mb-4">
                                                {question.questionNumber}
                                            </p>
                                            <input
                                                type="checkbox"
                                                value={question.questionId}
                                                onChange={handleValue}
                                                className="appearance-none cursor-pointer w-[30px] h-[30px] border-2 border-solid border-[#fcff00] bg-black
                                            checked:before:content-['✔']
                                            text-center
                                            text-[#fcff00]
                                            leading-[1.5rem]
                                            text-2xl
                                            "
                                            />
                                        </div>
                                        <img
                                            className="cursor-pointer hover: p-[0.35rem] hover:border-2 hover:border-solid hover:border-[--yellow] hover: rounded "
                                            onClick={() =>
                                                handleRouteQuestion(
                                                    quizId,
                                                    question.questionNumber
                                                )
                                            }
                                            src={`${url}/uploads/${question.questionImage}`}
                                            alt={`foto portada de la pregunta ${question.questionId}`}
                                        />
                                    </div>
                                ))}
                        </div>
                    </Slider>
                </>
            )}
        </>
    );
}
