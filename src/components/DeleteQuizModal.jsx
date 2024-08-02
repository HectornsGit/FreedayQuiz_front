import React from 'react';
import { toast } from 'react-toastify';
import { fetchAPI } from '@/api/fetch-api';
import { useSession } from 'next-auth/react';

const DeleteQuizModal = ({ isOpen, onClose, quizId, onQuizDeleted }) => {
    const { data: session } = useSession();
    const handleDelete = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${session?.accessToken}`,
            };

            const onSuccess = () => {
                toast.success('Quiz eliminado');
                if (onQuizDeleted) onQuizDeleted();
                onClose();
            };

            const onError = (error) => {
                toast.error(error.message);
                console.error('Error al eliminar el quiz:', error);
            };

            await fetchAPI(
                `/delete-quiz/${quizId}`,
                'DELETE',
                null,
                onSuccess,
                onError,
                headers
            );
        } catch (error) {
            toast.error(error.message);
            console.error('Error al eliminar el quiz:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Eliminar Quiz</h2>
                <p>¿Estás seguro de que deseas eliminar este quiz?</p>
                <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-500 font-bold text-lg px-4 py-2 mr-2"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="text-white font-bold text-lg bg-red-500 px-4 py-2 rounded-md hover:bg-red-700"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteQuizModal;
