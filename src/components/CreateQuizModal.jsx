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
                className="text-[#FCFF00] font-bold text-sm w-38 h-32 border-2 border-[#FCFF00] bg-transparent px-5"
            >
                Añadir nuevo Quiz
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-md">
                        <form className="flex flex-col" onSubmit={handleSubmit}>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-6 h-6 bg-white text-black font-bold text-3xl rounded-sm flex items-center justify-center border border-black hover:bg-gray-200"
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
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
                                />
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="text-black font-extrabold text-base bg-gradient px-10 py-2 hover:box-shadow-yellow"
                                >
                                    Crear Pregunta
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
