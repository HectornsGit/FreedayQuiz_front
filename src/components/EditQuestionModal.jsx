'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { fetchAPI } from '@/api/fetch-api';
import ListQuestions from './ListQuestions';
import NoImage from './icons/NoImage';
import YellowPencil from './icons/YellowPencil';

const EditQuestionForm = ({ quizId, questionNumber }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [quizTitle, setQuizTitle] = useState('');
    const [formData, setFormData] = useState({
        image: null,
        question: '',
        question_time: '',
        optionA: '',
        optionB: '',
        optionC: '',
        correctAnswer: '',
    });
    const [initialFormData, setInitialFormData] = useState(null);
    const [imagePreview, setImagePreview] = useState(
        <NoImage className="w-48 h-48" />
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchQuizData = async () => {
            if (quizId && questionNumber && session) {
                try {
                    const token = session.accessToken;
                    const headers = {
                        Authorization: `Bearer ${token}`,
                    };

                    await fetchAPI(
                        `/get-quiz/${quizId}`,
                        'GET',
                        null,
                        (data) => {
                            setQuizTitle(data.title);

                            const question = data.questions.find(
                                (q) =>
                                    q.questionNumber ===
                                    parseInt(questionNumber)
                            );

                            if (question) {
                                const initialData = {
                                    image: question.image || null,
                                    question: question.question || '',
                                    question_time: question.questionTime || '',
                                    optionA: question.optionA || '',
                                    optionB: question.optionB || '',
                                    optionC: question.optionC || '',
                                    correctAnswer: question.correctAnswer || '',
                                };

                                setFormData(initialData);
                                setInitialFormData(initialData);

                                if (question.image) {
                                    const imageUrl = `${process.env.NEXT_PUBLIC_API_HOST}/uploads/${question.image}`;
                                    setImagePreview(
                                        <img
                                            src={imageUrl}
                                            alt="Vista previa de la imagen"
                                            className="max-w-full h-[200px] object-cover"
                                            style={{
                                                maxWidth: '70vw',
                                                height: '200px',
                                                width: 'calc(200px * 16 / 9)',
                                            }}
                                        />
                                    );
                                } else {
                                    setImagePreview(
                                        <NoImage className="w-48 h-48" />
                                    );
                                }
                            }
                        },
                        (error) => {
                            console.error(
                                'Error al obtener los datos del quiz o preguntas:',
                                error
                            );
                        },
                        headers
                    );
                } catch (error) {
                    console.error(
                        'Error al obtener los datos del quiz o preguntas:',
                        error
                    );
                }
            }
        };

        fetchQuizData();
    }, [quizId, questionNumber, session]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(
                    <img
                        src={reader.result}
                        alt="Vista previa de la imagen"
                        className="max-w-full h-[200px] object-cover"
                        style={{
                            maxWidth: '70vw',
                            height: '200px',
                            width: 'calc(200px * 16 / 9)',
                        }}
                    />
                );
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(<NoImage className="w-48 h-48" />);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            const token = session.accessToken;
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            await fetchAPI(
                `/update-question/${quizId}/${questionNumber}`,
                'PATCH',
                formDataToSend,
                (data) => {
                    toast.success('Pregunta editada');
                    console.log('Pregunta editada:', data);
                    setInitialFormData({ ...formData });
                },
                (error) => {
                    toast.error(error.message);
                    console.error('Error al editar la pregunta:', error);
                },
                headers
            );
        } catch (error) {
            toast.error(error.message);
            console.error('Error al editar la pregunta:', error);
        }
    };

    const openModal = async () => {
        // Comparar el estado actual con el estado inicial
        if (JSON.stringify(formData) !== JSON.stringify(initialFormData)) {
            await handleSubmit(new Event('submit'));
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFinishEdit = async () => {
        if (JSON.stringify(formData) !== JSON.stringify(initialFormData)) {
            await handleSubmit(new Event('submit'));
        }
        router.push('/profile');
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-center w-80vw truncate mx-4">
                {quizTitle}
            </h1>
            <form onSubmit={handleSubmit}>
                <div
                    className="flex flex-col self-center items-center mb-4 relative cursor-pointer"
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
                    <div className="mt-4">{imagePreview}</div>
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
                            className="flex items-center text-center sm:w-80 w-[90vw] text-black"
                        />
                    </li>
                    <li className="flex flex-col">
                        <label>Pregunta</label>
                        <input
                            type="text"
                            name="question"
                            value={formData.question}
                            onChange={handleInputChange}
                            className="flex items-center text-center sm:w-80 w-[90vw] text-black"
                        />
                    </li>
                </ul>
                <ul className="flex flex-col self-center w-full items-center lg:gap-8 gap-6 mt-5">
                    <li className="p-[3PX] bg-gradient-to-br flex items-center from-[#4E39F5] via-[#03F7F9]">
                        <input
                            type="text"
                            name="optionA"
                            value={formData.optionA}
                            onChange={handleInputChange}
                            placeholder="Respuesta 1"
                            className="flex items-center h-full gap-6 text-center text-2xl p-4 bg-black sm:w-80 w-[90vw]"
                        />
                    </li>
                    <li className="p-[3PX] bg-gradient-to-br flex items-center from-[#4E39F5] via-[#03F7F9]">
                        <input
                            type="text"
                            name="optionB"
                            value={formData.optionB}
                            onChange={handleInputChange}
                            placeholder="Respuesta 2"
                            className="flex items-center h-full gap-6 text-center text-2xl p-4 bg-black sm:w-80 w-[90vw]"
                        />
                    </li>
                    <li className="p-[3PX] bg-gradient-to-br flex items-center from-[#4E39F5] via-[#03F7F9]">
                        <input
                            type="text"
                            name="optionC"
                            value={formData.optionC}
                            onChange={handleInputChange}
                            placeholder="Respuesta 3"
                            className="flex items-center h-full gap-6 text-center text-2xl p-4 bg-black sm:w-80 w-[90vw]"
                        />
                    </li>
                    <li className="p-[3PX] bg-gradient-to-br flex items-center from-[#4E39F5] via-[#03F7F9]">
                        <input
                            type="text"
                            name="correctAnswer"
                            value={formData.correctAnswer}
                            onChange={handleInputChange}
                            placeholder="Respuesta Correcta"
                            className="flex items-center h-full gap-6 text-center text-2xl p-4 bg-black sm:w-80 w-[90vw]"
                        />
                    </li>
                </ul>
                <div className="relative p-4 flex items-center justify-end">
                    <button
                        type="button"
                        onClick={handleFinishEdit}
                        className="absolute left-1/2 transform -translate-x-1/2 py-2 px-4 bg-blue-500 text-white font-bold rounded-sm"
                    >
                        Finalizar edición
                    </button>

                    <button
                        type="button"
                        onClick={openModal}
                        className="relative w-10 h-10 font-bold rounded-sm flex items-center justify-center"
                    >
                        <YellowPencil />
                    </button>
                </div>
            </form>
            {isModalOpen && (
                <ListQuestions quizId={quizId} closeModal={closeModal} />
            )}
        </div>
    );
};

export default EditQuestionForm;
