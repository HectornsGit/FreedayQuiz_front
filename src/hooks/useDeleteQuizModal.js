import { toast } from 'react-toastify';
import { fetchAPI } from '@/api/fetch-api';

const useDeleteQuizModal = (session, quizId, onQuizDeleted, onClose) => {
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
    return { handleDelete };
};
export default useDeleteQuizModal;
