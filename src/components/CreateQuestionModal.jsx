'use client';
import { useParams } from 'next/navigation';
import ListQuestions from './ListQuestions';
import useCreateQuestionForm from '@/hooks/useCreateQuestionForm';
import { useSession } from 'next-auth/react';

const CreateQuestionForm = () => {
    const { quizId } = useParams();
    const { data: session, status } = useSession();
    const {
        quizTitle,
        isModalOpen,
        formData,
        imagePreview,
        handleInputChange,
        handleFileChange,
        openModal,
        closeModal,
        handleImageClick,
        handleFinishEdit,
        fileInputRef,
        resetForm,
    } = useCreateQuestionForm(quizId, session);

    return (
        <div>
            <h1 className="text-4xl font-bold text-center w-80vw truncate mx-4">
                {quizTitle}
            </h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <div
                    className="flex flex-col self-center items-center mb-4 relative cursor-pointer xl:w-[30vw] lg:w-[50vw] sm:w-[70vw] w-[90vw] mx-auto"
                    onClick={handleImageClick}
                >
                    <label className="block mb-2">Imagen</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="hidden"
                    />
                    <div className="mt-4 w-full aspect-video">
                        {imagePreview}
                    </div>
                </div>

                <ul className="flex flex-col self-center w-full items-center lg:gap-1 space-y-5">
                    <li className="flex flex-col">
                        <label>
                            Limite de tiempo{' '}
                            <span className="text-sm">(en segundos)</span>
                        </label>
                        <input
                            type="number"
                            name="question_time"
                            value={formData.question_time}
                            onChange={handleInputChange}
                            className="flex items-center text-center xl:w-[30vw] lg:w-[50vw] sm:w-[70vw] w-[90vw] input-default"
                        />
                    </li>
                    <li className="flex flex-col">
                        <label>Pregunta</label>
                        <input
                            type="text"
                            name="question"
                            value={formData.question}
                            onChange={handleInputChange}
                            className="flex items-center text-center xl:w-[30vw] lg:w-[50vw] sm:w-[70vw] w-[90vw] input-default"
                        />
                    </li>
                </ul>
                <ul className="flex flex-col self-center w-full items-center lg:gap-8 gap-6 mt-5">
                    <li
                        className={
                            'p-[3PX] bg-gradient-to-br  flex items-center from-[#4E39F5] via-[#03F7F9]'
                        }
                    >
                        <input
                            type="text"
                            name="optionA"
                            value={formData.optionA}
                            onChange={handleInputChange}
                            placeholder="Respuesta 1"
                            className="flex items-center h-full gap-6 text-center text-2xl p-4  bg-black xl:w-[30vw] lg:w-[50vw] sm:w-[70vw] w-[90vw]"
                        />
                        <input
                            type="radio"
                            name="correctAnswer"
                            value={formData.optionA}
                            checked={
                                formData.correctAnswer === formData.optionA
                            }
                            onChange={handleInputChange}
                        />
                    </li>
                    <li
                        className={
                            'p-[3PX] bg-gradient-to-br  flex items-center from-[#4E39F5] via-[#03F7F9]'
                        }
                    >
                        <input
                            type="text"
                            name="optionB"
                            value={formData.optionB}
                            onChange={handleInputChange}
                            placeholder="Respuesta 2"
                            className="flex items-center h-full gap-6 text-center text-2xl p-4 bg-black xl:w-[30vw] lg:w-[50vw] sm:w-[70vw] w-[90vw]"
                        />
                        <input
                            type="radio"
                            name="correctAnswer"
                            value={formData.optionB}
                            checked={
                                formData.correctAnswer === formData.optionB
                            }
                            onChange={handleInputChange}
                        />
                    </li>
                    <li
                        className={
                            'p-[3PX] bg-gradient-to-br  flex items-center from-[#4E39F5] via-[#03F7F9]'
                        }
                    >
                        <input
                            type="text"
                            name="optionC"
                            value={formData.optionC}
                            onChange={handleInputChange}
                            placeholder="Respuesta 3"
                            className="flex items-center h-full gap-6 text-center text-2xl p-4  bg-black xl:w-[30vw] lg:w-[50vw] sm:w-[70vw] w-[90vw]"
                        />
                        <input
                            type="radio"
                            name="correctAnswer"
                            value={formData.optionC}
                            checked={
                                formData.correctAnswer === formData.optionC
                            }
                            onChange={handleInputChange}
                        />
                    </li>
                    <li
                        className={
                            'p-[3PX] bg-gradient-to-br  flex items-center from-[#4E39F5] via-[#03F7F9]'
                        }
                    >
                        <input
                            type="text"
                            name="optionD"
                            value={formData.optionD}
                            onChange={handleInputChange}
                            placeholder="Respuesta 4"
                            className="flex items-center h-full gap-6 text-center text-2xl p-4  bg-black xl:w-[30vw] lg:w-[50vw] sm:w-[70vw] w-[90vw]"
                        />
                        <input
                            type="radio"
                            name="correctAnswer"
                            value={formData.optionD}
                            checked={
                                formData.correctAnswer === formData.optionD
                            }
                            onChange={handleInputChange}
                        />
                    </li>
                </ul>
                <div className="relative p-4 flex items-center justify-center">
                    <button
                        type="button"
                        onClick={handleFinishEdit}
                        className="py-2 px-4 bg-[--yellow] text-black font-bold rounded-sm mx-2"
                    >
                        Volver a perfil
                    </button>

                    <button
                        type="button"
                        onClick={openModal}
                        className="py-2 px-4 bg-[--yellow] text-black font-bold rounded-sm mx-2"
                    >
                        Guardar pregunta
                    </button>
                </div>
            </form>
            {isModalOpen && (
                <ListQuestions
                    quizId={quizId}
                    closeModal={closeModal}
                    resetForm={resetForm}
                />
            )}
        </div>
    );
};

export default CreateQuestionForm;
