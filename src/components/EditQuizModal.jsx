import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchAPI } from '@/api/fetch-api';
import { useSession } from 'next-auth/react';

const EditQuizModal = ({ isOpen, onClose, quizId, onQuizUpdated}) => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = { title, description };

        try {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.accessToken}`,
            };

            const onSuccess = () => {
                toast.success('Quiz actualizado');
                if (onQuizUpdated) onQuizUpdated();
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Editar Quiz</h2>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Título del Quiz:
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Descripción:
                        </label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={onAddQuestion}
                        className="text-green-500 font-bold text-lg px-4 py-2 ml-2"
                    >
                        Agregar Pregunta
                    </button>
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-500 font-bold text-lg px-4 py-2 mr-2"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="text-white font-bold text-lg bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Actualizar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditQuizModal;
