/* eslint-disable @next/next/no-img-element */
'use client';

import AddQuestion from './icons/AddQuestion';
import Slider from './Slider';
import { useListQuestions } from '@/hooks/useListQuestions';
import { useDeleteQuestions } from '@/hooks/useDeleteQuestions';
import { useRouter, usePathname } from 'next/navigation';
import Delete from './icons/Delete';

export default function ListQuestions({ quizId, closeModal, resetForm }) {
    const url = process.env.NEXT_PUBLIC_API_HOST;
    const router = useRouter();
    const pathname = usePathname();

    const {
        dataQuizz,
        modal,
        closeModal: listCloseModal,
        valueCheckbox,
        setValueCheckbox,
        handleRouteQuestion,
        handleAddQuestion,
    } = useListQuestions(router, quizId, resetForm, pathname);

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
                                className="text-black font-extrabold lg:text-lg text-sm bg-white lg:px-11 lg:py-2 px-2.5 py-1 hover:bg-black hover:text-white hover:box-shadow-white"
                            >
                                Eliminar preguntas
                            </button>
                        )}
                    </div>
                    <Slider>
                        <ul
                            id="slider"
                            className="w-full h-full flex content-center whitespace-nowrap scroll-smooth no-scroll no-scroll2"
                        >
                            <li
                                onClick={handleAddQuestion}
                                className="cursor-pointer p-3 inline-flex flex-col items-center justify-center md:gap-y-12 gap-y-5 lg:w-80 lg:h-52 md:w-2/5 md:h-[123px] bg-black border-2 border-solid border-[--yellow] rounded"
                            >
                                <AddQuestion />
                            </li>

                            {dataQuizz &&
                                dataQuizz.map((question) => (
                                    <li
                                        key={question.questionId}
                                        className="lg:max-w-[500px] inline-flex md:mx-4 mx-6"
                                    >
                                        <div className="flex flex-col items-center pr-1">
                                            <p className="text-2xl mb-4">
                                                {question.questionNumber}
                                            </p>
                                            <div className="box-content flex flex-col items-center gap-y-2">
                                                <label
                                                    htmlFor={`delete-checkbox-${question.questionId}`}
                                                    className="cursor-pointer flex items-center"
                                                >
                                                    <Delete
                                                        className={`w-5 h-5 ${isGrey[question.questionId] ? 'fill-gray-500' : 'fill-[#fcff00]'}`}
                                                    />
                                                    <input
                                                        type="checkbox"
                                                        id={`delete-checkbox-${question.questionId}`}
                                                        value={
                                                            question.questionId
                                                        }
                                                        onChange={handleValue}
                                                        className="appearance-none w-5 h-5 absolute opacity-0 cursor-pointer"
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        {isGrey[question.questionId] ? (
                                            <div className="grid place-items-center relative lg:max-w-[350px] lg:max-h-[205px] max-w-[200px]">
                                                <Delete className="lg:w-[50px] lg:h-[50px] md:w-[35px] md:h-[35px] w-[30px] h-[30px] fill-[--yellow] absolute z-50" />
                                                <img
                                                    className={`cursor-pointer lg:max-w-[350px] lg:max-h-[205px] max-w-[200px] p-[0.35rem] box-content hover:border-2 hover:border-solid hover:border-[--yellow] hover:rounded ${isGrey[question.questionId] ? 'grayscale brightness-50' : ''}`}
                                                    onClick={() =>
                                                        handleRouteQuestion(
                                                            quizId,
                                                            question.questionNumber
                                                        )
                                                    }
                                                    src={question.questionImage}
                                                    alt={`foto portada de la pregunta ${question.questionId}`}
                                                />
                                            </div>
                                        ) : (
                                            <div className="grid place-items-center relative lg:max-w-[350px] lg:max-h-[205px] max-w-[200px]">
                                                <img
                                                    className={`cursor-pointer lg:max-w-[350px] lg:max-h-[205px] max-w-[200px] p-[0.35rem] box-content hover:border-2 hover:border-solid hover:border-[--yellow] hover:rounded ${isGrey[question.questionId] ? 'grayscale brightness-50' : ''}`}
                                                    onClick={() =>
                                                        handleRouteQuestion(
                                                            quizId,
                                                            question.questionNumber
                                                        )
                                                    }
                                                    src={question.questionImage}
                                                    alt={`foto portada de la pregunta ${question.questionId}`}
                                                />
                                            </div>
                                        )}
                                    </li>
                                ))}
                        </ul>
                    </Slider>
                </>
            )}
        </>
    );
}
