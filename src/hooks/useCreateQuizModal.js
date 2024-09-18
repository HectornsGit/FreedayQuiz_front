import { useState } from 'react';
import { toast } from 'react-toastify';
import { fetchAPI } from '@/api/fetch-api';

const useCreateQuizModal = (session, onQuizCreated) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                toast.success('Quiz creado');
                setTitle('');
                setDescription('');
                setIsModalOpen(false);
                onQuizCreated(data.data.id);
            };

            const onError = (error) => {
                toast.error(error.message);
                console.error('Error al crear el quiz:', error);
            };

            await fetchAPI(
                '/create-quiz',
                'POST',
                payload,
                onSuccess,
                onError,
                headers
            );
        } catch (error) {
            toast.error(error.message);
            console.error('Error al crear el quiz:', error);
        }
    };
    return {
        isModalOpen,
        setIsModalOpen,
        description,
        setDescription,
        title,
        setTitle,
        handleSubmit,
    };
};
export default useCreateQuizModal;
