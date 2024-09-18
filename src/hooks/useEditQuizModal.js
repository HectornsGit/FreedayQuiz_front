import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { fetchAPI } from '@/api/fetch-api';
import { profileContext } from '@/context/profileContext';

const useEditQuizModal = (session, isOpen, onClose, quizId, onQuizUpdated) => {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const { updateBasicData } = useContext(profileContext);

    React.useEffect(() => {
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

    const saveQuiz = async (shouldUpdate) => {
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
                updateBasicData(data.data.quizToUpdate);

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
    };

    // Funciones para manejar cada botón
    const handleSaveQuiz = (e) => {
        e.preventDefault();
        saveQuiz(false); // No llamar a onQuizUpdated
    };

    const handleEditQuestions = (e) => {
        e.preventDefault();
        saveQuiz(true); // Llamar a onQuizUpdated
    };

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
