'use client';

import React, { useState, useEffect } from 'react';
import { useUserInfo } from '@/hooks/useUserInfo';
import { useRouter } from 'next/navigation';
import CreateQuizModal from './CreateQuizModal';
import DeleteQuizModal from './DeleteQuizModal';
import EditQuizModal from './EditQuizModal';

const UserProfile = () => {
    const { getUserInfo, userInfo, error, loading } = useUserInfo();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedQuizId, setSelectedQuizId] = useState(null);
    const router = useRouter();

    useEffect(() => {
        getUserInfo();
    }, []);

    const handleQuizClick = (quizId) => {
        router.push(`new-question/${quizId}`);
    };

    const handlePlayClick = (quizId) => {
        router.push(`/match/${quizId}`);
    };

    const handleDeleteClick = (quizId) => {
        setSelectedQuizId(quizId);
        setIsDeleteModalOpen(true);
    };

    const handleEditClick = (quizId) => {
        setSelectedQuizId(quizId);
        setIsEditModalOpen(true);
    };

    const handleModalClose = () => {
        setIsDeleteModalOpen(false);
        setIsEditModalOpen(false);
    };

    const handleQuizDeleted = () => {
        getUserInfo(); // Refresca la lista de quizzes después de eliminar uno
    };

    const handleQuizUpdated = (quizId) => {
        router.push(`edit-question/${quizId}`);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="flex flex-col items-center">
            {userInfo ? (
                <div className="text-center">
                    <img
                        src={`${process.env.NEXT_PUBLIC_API_HOST}/uploads/${userInfo.avatar}`}
                        alt="Avatar"
                        className="w-32 h-32 object-cover rounded-full mx-auto mb-5" // Espacio debajo de la imagen
                    />
                    <ul className="list-none p-0 mb-5">
                        <li>{userInfo.name}</li>
                        <li>{userInfo.email}</li>
                    </ul>
                    <CreateQuizModal
                        onQuizCreated={handleQuizClick}
                    />{' '}
                    {/* Espacio debajo del modal */}
                    {userInfo.quizzes && userInfo.quizzes.length > 0 && (
                        <div className="text-center mb-10">
                            <h2 className="mt-4">Quizzes creados</h2>{' '}
                            {/* Espacio debajo del título */}
                            <ul className="list-none p-0">
                                {userInfo.quizzes.map((quiz, index) => (
                                    <li key={index} className="mt-4">
                                        <h3 className="">{quiz.title}</h3>{' '}
                                        {/* Espacio debajo del título del quiz */}
                                        <p className="">
                                            {quiz.description}
                                        </p>{' '}
                                        {/* Espacio debajo de la descripción del quiz */}
                                        <div className="flex justify-center gap-4">
                                            <button
                                                onClick={() =>
                                                    handleEditClick(quiz.id)
                                                }
                                                className="text-[#FCFF00] hover:underline"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteClick(quiz.id)
                                                }
                                                className="text-[#FCFF00] hover:underline"
                                            >
                                                Eliminar
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handlePlayClick(quiz.id)
                                                }
                                                className="text-[#FCFF00] hover:underline"
                                            >
                                                Iniciar
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <EditQuizModal
                        isOpen={isEditModalOpen}
                        onClose={handleModalClose}
                        quizId={selectedQuizId}
                        onQuizUpdated={handleQuizUpdated}
                        className="mt-4" // Espacio encima del modal de edición
                    />
                    <DeleteQuizModal
                        isOpen={isDeleteModalOpen}
                        onClose={handleModalClose}
                        quizId={selectedQuizId}
                        onQuizDeleted={handleQuizDeleted}
                        className="mt-4" // Espacio encima del modal de eliminación
                    />
                </div>
            ) : (
                <p>No user info available</p>
            )}
        </div>
    );
};

export default UserProfile;
