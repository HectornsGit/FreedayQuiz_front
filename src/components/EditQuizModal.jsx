import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchAPI } from '@/api/fetch-api';
import { useSession } from 'next-auth/react';

const EditQuizModal = ({ isOpen, onClose, quizId, onQuizUpdated }) => {
    const { data: session } = useSession();
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-md">
                <form className="flex flex-col">
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-6 h-6 bg-white text-black font-bold text-3xl rounded-sm flex items-center justify-center border border-black hover:bg-gray-200 mr-2"
                        >
                            &times; {/* Este es el símbolo de la X */}
                        </button>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-white">
                            Título del Quiz:
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-white">
                            Descripción:
                        </label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
                        />
                    </div>
                    <div className="flex flex-col justify-center mt-4">
                        <button
                            onClick={handleSaveQuiz}
                            className="text-black font-extrabold text-lg bg-gradient px-11 py-2 hover:box-shadow-yellow mb-4"
                        >
                            <p className="gradient-text">Guardar Quiz</p>
                        </button>
                        <button
                            onClick={handleEditQuestions}
                            className="text-black font-extrabold text-lg bg-gradient px-11 py-2 hover:box-shadow-yellow"
                        >
                            <p className="gradient-text">Editar preguntas</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditQuizModal;
