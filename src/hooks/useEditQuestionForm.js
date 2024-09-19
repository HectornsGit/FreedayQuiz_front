/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef, useContext } from 'react';
import { toast } from 'react-toastify';
import { fetchAPI } from '@/api/fetch-api';
import NoImage from '../components/icons/NoImage';
import { profileContext } from '@/context/profileContext';

const useEditQuestionForm = (quizId, questionNumber, session) => {
    const { updateQuizData } = useContext(profileContext);
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
        <NoImage className="w-full aspect-video" />
    );
    const [isModalOpen, setIsModalOpen] = useState(true);
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
                                    optionD: question.correctAnswer || '',
                                };

                                setFormData(initialData);
                                setInitialFormData(initialData);

                                if (question.image) {
                                    const imageUrl = question.image;
                                    setImagePreview(
                                        <img
                                            src={imageUrl}
                                            alt="Vista previa de la imagen"
                                            className="w-full aspect-video"
                                        />
                                    );
                                } else {
                                    setImagePreview(
                                        <NoImage className="w-full aspect-video" />
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
        if (name === 'correctAnswer') {
            setFormData({ ...formData, correctAnswer: value });
        } else {
            setFormData({ ...formData, [name]: value });
        }
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
                        className="w-full aspect-video"
                    />
                );
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(<NoImage className="w-full aspect-video" />);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificación de campos obligatorios
        if (
            !formData.question ||
            !formData.question_time ||
            !formData.correctAnswer
        ) {
            toast.error(
                'La pregunta, el tiempo y la respuesta correcta son obligatorios.'
            );
            return false;
        }

        // Verificación de tiempo mínimo
        const minimumTime = 5;
        if (formData.question_time < minimumTime) {
            toast.error(
                `El tiempo mínimo permitido para responder es de ${minimumTime} segundos.`
            );
            return false;
        }

        // Verificación de respuestas duplicadas
        let allOptions = [
            formData.optionA,
            formData.optionB,
            formData.optionC,
            formData.optionD,
        ].filter((option) => option);

        if (new Set(allOptions).size !== allOptions.length) {
            toast.error('No puede haber dos respuestas iguales.');
            return false;
        }

        let options = allOptions.filter(
            (option) => option !== formData.correctAnswer
        );

        // Reorganización automática de las respuestas
        const [optionA, optionB, optionC] = options;

        const formDataToSend = new FormData();
        formDataToSend.append('question', formData.question);
        formDataToSend.append('questionTime', formData.question_time);
        formDataToSend.append('correctAnswer', formData.correctAnswer);
        formDataToSend.append('optionA', optionA || '');
        formDataToSend.append('optionB', optionB || '');
        formDataToSend.append('optionC', optionC || '');
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }

        try {
            const token = session.accessToken;
            const headers = { Authorization: `Bearer ${token}` };

            await fetchAPI(
                `/update-question/${quizId}/${questionNumber}`,
                'PATCH',
                formDataToSend,
                (data) => {
                    toast.success('Pregunta editada');
                    setInitialFormData({ ...formData });
                    updateQuizData(data.data.questionUpdated);
                },
                (error) => {
                    toast.error(error.message);
                    console.error('Error al editar la pregunta:', error);
                    return false;
                },
                headers
            );

            return true;
        } catch (error) {
            toast.error(error.message);
            console.error('Error al editar la pregunta:', error);
            return false;
        }
    };

    const openModal = async () => {
        // Comparar el estado actual con el estado inicial
        if (JSON.stringify(formData) !== JSON.stringify(initialFormData)) {
            const isSuccess = await handleSubmit(new Event('submit'));
            if (isSuccess) {
                setIsModalOpen(true);
            }
        } else {
            setIsModalOpen(true); // Abre el modal si no hay cambios
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFinishEdit = async () => {
        if (JSON.stringify(formData) !== JSON.stringify(initialFormData)) {
            const isSuccess = await handleSubmit(new Event('submit'));
            if (isSuccess) {
                router.push('/profile');
            }
        } else {
            router.push('/profile');
        }
    };

    return {
        handleImageClick,
        closeModal,
        openModal,
        handleSubmit,
        handleFileChange,
        handleInputChange,
        isModalOpen,
        setIsModalOpen,
        imagePreview,
        setImagePreview,
        quizTitle,
        setQuizTitle,
        formData,
        setFormData,
        fileInputRef,
        handleFinishEdit,
    };
};

export default useEditQuestionForm;
