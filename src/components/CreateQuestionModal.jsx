'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { fetchAPI } from '@/api/fetch-api';
import ListQuestions from './ListQuestions';

const CreateQuestionForm = () => {
    const { data: session } = useSession();
    const { quizId } = useParams();
    const [quizTitle, setQuizTitle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    useEffect(() => {
        // Función para obtener el título del quiz
        const fetchQuizTitle = async () => {
            if (quizId && session) {
                try {
                    const token = session.accessToken;

                    const headers = {
                        Authorization: `Bearer ${token}`,
                    };

                    const onSuccess = (data) => {
                        setQuizTitle(data.title);
                    };

                    const onError = (error) => {
                        console.error(
                            'Error al obtener el título del quiz:',
                            error
                        );
                    };

                    await fetchAPI(
                        `/get-quiz/${quizId}`,
                        'GET',
                        null,
                        onSuccess,
                        onError,
                        headers
                    );
                } catch (error) {
                    console.error(
                        'Error al obtener el título del quiz:',
                        error
                    );
                }
            }
        };

        fetchQuizTitle();
    }, [quizId, session]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('quiz_id', quizId);
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            const token = session.accessToken;

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const onSuccess = (data) => {
                toast.success('Pregunta creada');
                console.log('Pregunta creada:', data);
            };

            const onError = (error) => {
                toast.error(error.message);
                console.error('Error al crear la pregunta:', error);
            };

            await fetchAPI(
                '/create-questions',
                'POST',
                formDataToSend,
                onSuccess,
                onError,
                headers
            );
        } catch (error) {
            toast.error(error.message);
            console.error('Error al crear la pregunta:', error);
        }
    };

    const openModal = async () => {
        await handleSubmit(new Event('submit'));
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <h1>{quizTitle}</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label>Imagen</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                    />
                </div>
                <div>
                    <label>Tiempo de pregunta</label>
                    <input
                        type="number"
                        name="question_time"
                        value={formData.question_time}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Pregunta</label>
                    <input
                        type="text"
                        name="question"
                        value={formData.question}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Opción A</label>
                    <input
                        type="text"
                        name="optionA"
                        value={formData.optionA}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Opción B</label>
                    <input
                        type="text"
                        name="optionB"
                        value={formData.optionB}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Opción C</label>
                    <input
                        type="text"
                        name="optionC"
                        value={formData.optionC}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Respuesta correcta</label>
                    <input
                        type="text"
                        name="correctAnswer"
                        value={formData.correctAnswer}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Número de pregunta</label>
                    <input
                        type="number"
                        name="question_number"
                        value={formData.question_number}
                        onChange={handleInputChange}
                    />
                </div>
                <button type='button' onClick={openModal}>Ver Preguntas</button>
            </form>
                {isModalOpen && (
                    <ListQuestions quizId={quizId} closeModal={closeModal} />
                )}
        </div>
    );
};

export default CreateQuestionForm;
