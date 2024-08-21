import React, { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from 'react-toastify';
import { fetchAPI } from '@/api/fetch-api';
import NoImage from '../components/icons/NoImage';

const useEditQuestionForm = (quizId, questionNumber, session) => {
    const [quizTitle, setQuizTitle] = useState('');
    const [formData, setFormData] = useState({
        image: null,
        question: '',
        question_time: '',
        optionA: '',
        optionB: '',
        optionC: '',
        correctAnswer: '',
        question_number: '',
    });
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
                                setFormData({
                                    image: question.image || null,
                                    question: question.question || '',
                                    question_time: question.questionTime || '',
                                    optionA: question.optionA || '',
                                    optionB: question.optionB || '',
                                    optionC: question.optionC || '',
                                    correctAnswer: question.correctAnswer || '',
                                    question_number:
                                        question.questionNumber || '',
                                });
                                if (question.image) {
                                    const imageUrl = `${process.env.NEXT_PUBLIC_API_HOST}/uploads/${question.image}`;
                                    setImagePreview(
                                        // eslint-disable-next-line @next/next/no-img-element
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

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleFileChange = useCallback((e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, image: file }));

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(
                    // eslint-disable-next-line @next/next/no-img-element
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
    }, []);

    const handleSubmit = useCallback(
        async (e) => {
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
                    `/update-question/${quizId}/${formData.question_number}`,
                    'PATCH',
                    formDataToSend,
                    (data) => {
                        toast.success('Pregunta editada');
                        console.log('Pregunta editada:', data);
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
        },
        [formData, quizId, session]
    );

    const openModal = useCallback(async () => {
        await handleSubmit(new Event('submit'));
        setIsModalOpen(true);
    }, [handleSubmit]);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const handleImageClick = useCallback(() => {
        fileInputRef.current.click();
    }, []);

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
    };
};

export default useEditQuestionForm;
