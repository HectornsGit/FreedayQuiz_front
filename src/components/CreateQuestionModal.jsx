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
        handleTouchStart,
        handleTouchEnd,
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
                <ul className="flex flex-col self-center w-full items-center lg:gap-y-8 gap-y-6 mt-5">
                    <label className="lg:-mb-8 -mb-6 xl:w-[30vw] lg:w-[50vw] sm:w-[70vw] w-[90vw]">
                        Selecciona la respuesta correcta
                    </label>
                    <li className="flex items-center relative mt-0">
                        <div className="p-[3PX] bg-gradient-to-br flex items-center from-[#4E39F5] via-[#03F7F9]">
                            <input
                                type="text"
                                name="optionA"
                                value={formData.optionA}
                                onChange={handleInputChange}
                                onTouchStart={(e) =>
                                    handleTouchStart(e, formData.optionA)
                                }
                                onTouchEnd={handleTouchEnd}
                                placeholder="Respuesta 1"
                                className={`flex items-center h-full gap-6 text-center text-2xl p-4 bg-black xl:w-[30vw] lg:w-[50vw] sm:w-[70vw] w-[90vw] 
                                    ${
                                        formData.correctAnswer ===
                                            formData.optionA && formData.optionA
                                            ? 'bg-gradient-to-br from-[#4E39F5] via-[#03F7F9]'
                                            : 'bg-black'
                                    }`}
                            />
                        </div>
                        <label className="custom-radio-wrapper absolute right-[-30px]">
                            <input
                                type="radio"
                                name="correctAnswer"
                                value={formData.optionA}
                                checked={
                                    formData.correctAnswer === formData.optionA
                                }
                                onChange={handleInputChange}
                                className="custom-radio"
                            />
                            <span className="custom-radio-checkmark absolute"></span>
                        </label>
                    </li>

                    <li className="flex items-center relative">
                        <div className="p-[3PX] bg-gradient-to-br flex items-center from-[#4E39F5] via-[#03F7F9]">
                            <input
                                type="text"
                                name="optionB"
                                value={formData.optionB}
                                onChange={handleInputChange}
                                onTouchStart={(e) =>
                                    handleTouchStart(e, formData.optionB)
                                }
                                onTouchEnd={handleTouchEnd}
                                placeholder="Respuesta 2"
                                className={`flex items-center h-full gap-6 text-center text-2xl p-4 bg-black xl:w-[30vw] lg:w-[50vw] sm:w-[70vw] w-[90vw] 
                                    ${
                                        formData.correctAnswer ===
                                            formData.optionB && formData.optionB
                                            ? 'bg-gradient-to-br from-[#4E39F5] via-[#03F7F9]'
                                            : 'bg-black'
                                    }`}
                            />
                        </div>
                        <label className="custom-radio-wrapper absolute right-[-30px]">
                            <input
                                type="radio"
                                name="correctAnswer"
                                value={formData.optionB}
                                checked={
                                    formData.correctAnswer === formData.optionB
                                }
                                onChange={handleInputChange}
                                className="custom-radio"
                            />
                            <span className="custom-radio-checkmark absolute"></span>
                        </label>
                    </li>

                    <li className="flex items-center relative">
                        <div className="p-[3PX] bg-gradient-to-br flex items-center from-[#4E39F5] via-[#03F7F9]">
                            <input
                                type="text"
                                name="optionC"
                                value={formData.optionC}
                                onChange={handleInputChange}
                                onTouchStart={(e) =>
                                    handleTouchStart(e, formData.optionC)
                                }
                                onTouchEnd={handleTouchEnd}
                                placeholder="Respuesta 3"
                                className={`flex items-center h-full gap-6 text-center text-2xl p-4 bg-black xl:w-[30vw] lg:w-[50vw] sm:w-[70vw] w-[90vw] 
                                    ${
                                        formData.correctAnswer ===
                                            formData.optionC && formData.optionC
                                            ? 'bg-gradient-to-br from-[#4E39F5] via-[#03F7F9]'
                                            : 'bg-black'
                                    }`}
                            />
                        </div>
                        <label className="custom-radio-wrapper absolute right-[-30px]">
                            <input
                                type="radio"
                                name="correctAnswer"
                                value={formData.optionC}
                                checked={
                                    formData.correctAnswer === formData.optionC
                                }
                                onChange={handleInputChange}
                                className="custom-radio"
                            />
                            <span className="custom-radio-checkmark absolute"></span>
                        </label>
                    </li>

                    <li className="flex items-center relative">
                        <div className="p-[3PX] bg-gradient-to-br flex items-center from-[#4E39F5] via-[#03F7F9]">
                            <input
                                type="text"
                                name="optionD"
                                value={formData.optionD}
                                onChange={handleInputChange}
                                onTouchStart={(e) =>
                                    handleTouchStart(e, formData.optionD)
                                }
                                onTouchEnd={handleTouchEnd}
                                placeholder="Respuesta 4"
                                className={`flex items-center h-full gap-6 text-center text-2xl p-4 bg-black xl:w-[30vw] lg:w-[50vw] sm:w-[70vw] w-[90vw] 
                                    ${
                                        formData.correctAnswer ===
                                            formData.optionD && formData.optionD
                                            ? 'bg-gradient-to-br from-[#4E39F5] via-[#03F7F9]'
                                            : 'bg-black'
                                    }`}
                            />
                        </div>
                        <label className="custom-radio-wrapper absolute right-[-30px]">
                            <input
                                type="radio"
                                name="correctAnswer"
                                value={formData.optionD}
                                checked={
                                    formData.correctAnswer === formData.optionD
                                }
                                onChange={handleInputChange}
                                className="custom-radio"
                            />
                            <span className="custom-radio-checkmark absolute"></span>
                        </label>
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
