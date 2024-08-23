import useCreateQuizModal from '@/hooks/useCreateQuizModal';
import { useSession } from 'next-auth/react';

import { toast } from 'react-toastify';
import { fetchAPI } from '@/api/fetch-api';
import XMark from './icons/XMark';


function CreateQuizModal({ onQuizCreated }) {
    const { data: session } = useSession();
    const {
        isModalOpen,
        setIsModalOpen,
        description,
        setDescription,
        title,
        setTitle,
        handleSubmit,
    } = useCreateQuizModal(session, onQuizCreated);
    return (
        <div className="flex flex-col justify-center items-center md:h-[80px]">
            <button
                onClick={() => setIsModalOpen(true)}
                className="text-[#FCFF00] font-bold text-sm w-38 h-32 border-2 border-[#FCFF00] bg-[var(--bg-hab-black)] px-5 flex flex-col items-center justify-center"
            >
                <XMark className="w-6 h-6" />
                <span className="mt-2 text-[1em]">Añadir nuevo Quiz</span>
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
                                    <p className="gradient-text">
                                        Crear Pregunta
                                    </p>
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
