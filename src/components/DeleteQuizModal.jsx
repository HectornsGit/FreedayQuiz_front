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
            <div className="bg-black p-2 rounded-lg shadow-lg w-full max-w-md flex flex-col">
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="mb-4 w-6 h-6 bg-white text-black font-bold text-3xl rounded-sm flex items-center justify-center border border-black hover:bg-gray-200 mr-2"
                    >
                        &times; {/* Este es el símbolo de la X */}
                    </button>
                </div>
                <p className="block text-sm font-medium text-white mb-4">
                    ¿Seguro/a quieres eliminar el quiz?
                </p>
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="mb-4 text-black font-extrabold text-lg bg-gradient px-11 py-2 hover:box-shadow-yellow"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteQuizModal;
