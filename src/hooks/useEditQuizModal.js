import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { fetchAPI } from '@/api/fetch-api';

const useEditQuizModal = (session, isOpen, onClose, quizId, onQuizUpdated) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (isOpen && quizId) {
            const fetchQuizDetails = async () => {
                try {
                    const headers = {
                        Authorization: `Bearer ${session?.accessToken}`,
                    };

                    const onSuccess = (data) => {
                        setTitle(data.title);
                        setDescription(data.description);
                    };

                    const onError = (error) => {
                        toast.error('Error al obtener los detalles del quiz');
                        console.error(
                            'Error al obtener los detalles del quiz:',
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
                    toast.error(error.message);
                    console.error(
                        'Error al obtener los detalles del quiz:',
                        error
                    );
                }
            };

            fetchQuizDetails();
        }
    }, [isOpen, quizId, session]);

    const saveQuiz = useCallback(
        async (shouldUpdate) => {
            const payload = {
                title,
                description,
            };

            try {
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.accessToken}`,
                };

                const onSuccess = (data) => {
                    toast.success('Quiz actualizado');
                    setTitle('');
                    setDescription('');

                    if (shouldUpdate) {
                        onQuizUpdated(quizId);
                    }

                    onClose();
                };

                const onError = (error) => {
                    toast.error('Error al actualizar el quiz');
                    console.error('Error al actualizar el quiz:', error);
                };

                await fetchAPI(
                    `/update-quiz/${quizId}`,
                    'PATCH',
                    payload,
                    onSuccess,
                    onError,
                    headers
                );
            } catch (error) {
                toast.error(error.message);
                console.error('Error al actualizar el quiz:', error);
            }
        },
        [title, description, session, quizId, onQuizUpdated, onClose] // Dependencias
    );

    const handleSaveQuiz = useCallback(
        (e) => {
            e.preventDefault();
            saveQuiz(false); // No llamar a onQuizUpdated
        },
        [saveQuiz] // Dependencia
    );

    const handleEditQuestions = useCallback(
        (e) => {
            e.preventDefault();
            saveQuiz(true); // Llamar a onQuizUpdated
        },
        [saveQuiz] // Dependencia
    );

    return {
        title,
        setTitle,
        description,
        setDescription,
        handleSaveQuiz,
        handleEditQuestions,
        saveQuiz,
    };
};

export default useEditQuizModal;
