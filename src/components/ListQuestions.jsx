/* eslint-disable @next/next/no-img-element */
'use client';

import AddQuestion from './icons/AddQuestion';
import Slider from './Slider';
import { useListQuestions } from '@/hooks/useListQuestions';
import { useDeleteQuestions } from '@/hooks/useDeleteQuestions';
import { useRouter } from 'next/navigation';
import Delete from './icons/Delete';

export default function ListQuestions({ quizId, closeModal }) {
    const url = process.env.NEXT_PUBLIC_API_HOST;
    const router = useRouter();

    const {
        dataQuizz,
        modal,
        closeModal: listCloseModal,
        valueCheckbox,
        setValueCheckbox,
        handleRouteQuestion,
        handleAddQuestion,
    } = useListQuestions(router, quizId);

    const { deleteQuestions, handleValue, isGrey, iconDelete } =
        useDeleteQuestions(
            valueCheckbox,
            dataQuizz,
            setValueCheckbox,
            closeModal
        );

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
                        {/* Solo muestra el botón 'eliminar preguntas' si hay checks marcados */}
                        {valueCheckbox.length > 0 && (
                            <button
                                onClick={deleteQuestions}
                                className="text-black font-extrabold text-lg bg-white px-11 py-2 hover:bg-black hover:text-white hover:box-shadow-white"
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
                                className="inline-flex mx-8 md:mx-4 justify-center cursor-pointer"
                            >
                                <AddQuestion />
                            </div>

                            {dataQuizz &&
                                dataQuizz.map((question) => (
                                    <div
                                        key={question.questionId}
                                        className="max-w-[500px] md:w-[400px] inline-flex gap-x10 md:mx-4"
                                    >
                                        <div className="flex flex-col items-center pr-1">
                                            <p className="text-2xl mb-4">
                                                {question.questionNumber}
                                            </p>
                                            <input
                                                type="checkbox"
                                                value={question.questionId}
                                                onChange={handleValue}
                                                className="appearance-none cursor-pointer w-[30px] h-[30px] border-2 border-solid border-[#fcff00] bg-black checked:before:content-['✔'] text-center text-[#fcff00] leading-[1.5rem] text-2xl"
                                            />
                                        </div>
                                        <img
                                            className={`cursor-pointer w-[350px] h-[205px] overflow-auto p-[0.35rem] hover:border-2 hover:border-solid hover:border-[--yellow] hover:rounded ${isGrey[question.questionId] ? 'grayscale opacity-25' : ''}`}
                                            onClick={() =>
                                                handleRouteQuestion(
                                                    quizId,
                                                    question.questionNumber
                                                )
                                            }
                                            src={`${url}/uploads/${question.questionImage}`}
                                            alt={`foto portada de la pregunta ${question.questionId}`}
                                        />
                                        {isGrey[question.questionId] && (
                                            <div className="relative right-[45%] flex items-center justify-center overflow-auto">
                                                <Delete className="w-12 h-12 fill-[--yellow]" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </Slider>
                </>
            )}
        </>
    );
}
