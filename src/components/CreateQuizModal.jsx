import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { fetchAPI } from '@/api/fetch-api';

function CreateQuizModal({ onQuizCreated }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: session } = useSession();

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
                console.log('Quiz creado:', data);
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

    return (
        <div className="flex flex-col justify-center items-center">
            <button
                onClick={() => setIsModalOpen(true)}
                className="text-white font-bold text-lg bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-700"
            >
                Crear nuevo Quiz
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">
                            Crear Nuevo Quiz
                        </h2>
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
                                    Descripcion:
                                </label>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-500 font-bold text-lg px-4 py-2 mr-2"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="text-white font-bold text-lg bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-700"
                                >
                                    Crear Quiz
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateQuizModal;
