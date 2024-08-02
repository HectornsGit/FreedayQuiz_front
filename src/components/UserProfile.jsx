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

    const handleQuizUpdated = () => {
        getUserInfo(); // Refresca la lista de quizzes después de actualizar uno
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            {userInfo ? (
                <div>
                    <img
                        src={`${process.env.NEXT_PUBLIC_API_HOST}/uploads/${userInfo.avatar}`}
                        alt="Avatar"
                    />
                    <p>Name: {userInfo.name}</p>
                    <p>Email: {userInfo.email}</p>
                    <CreateQuizModal onQuizCreated={handleQuizClick} />

                    {userInfo.quizzes && userInfo.quizzes.length > 0 && (
                        <div>
                            <h2>Quizzes creados</h2>
                            <ul>
                                {userInfo.quizzes.map((quiz, index) => (
                                    <li key={index}>
                                        <h3>{quiz.title}</h3>
                                        <p>{quiz.description}</p>
                                        <button
                                            onClick={() =>
                                                handleEditClick(quiz.id)
                                            }
                                            className="text-yellow-500 hover:underline ml-4"
                                        >
                                            Editar Quiz
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteClick(quiz.id)
                                            }
                                            className="text-red-500 hover:underline ml-4"
                                        >
                                            Eliminar Quiz
                                        </button>
                                        <button
                                            onClick={() =>
                                                handlePlayClick(quiz.id)
                                            }
                                            className="text-blue-500 hover:underline ml-4"
                                        >
                                            Iniciar Quiz
                                        </button>
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
                    />
                    <DeleteQuizModal
                        isOpen={isDeleteModalOpen}
                        onClose={handleModalClose}
                        quizId={selectedQuizId}
                        onQuizDeleted={handleQuizDeleted}
                    />
                </div>
            ) : (
                <p>No user info available</p>
            )}
        </div>
    );
};

export default UserProfile;
