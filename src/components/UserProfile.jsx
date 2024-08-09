'use client';

import React, { useState, useEffect } from 'react';
import { useUserInfo } from '@/hooks/useUserInfo';
import { useRouter } from 'next/navigation';
import CreateQuizModal from './CreateQuizModal';
import DeleteQuizModal from './DeleteQuizModal';
import EditQuizModal from './EditQuizModal';
import YellowPencil from './icons/YellowPencil';
import Delete from './icons/Delete';

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
        router.push(`edit-question/${quizId}/1`);
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
                    <div className="text-center relative justify-center items-center flex mb-5">
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_HOST}/uploads/${userInfo.avatar}`}
                            alt="Avatar"
                            className="w-32 h-32 object-cover rounded-full"
                        />
                        <YellowPencil className="w-6 h-6 text-yellow-400 absolute bottom-1 right-9" />
                    </div>
                    <ul className="list-none p-0 mb-5">
                        <li className="flex items-center justify-center mb-2">
                            <YellowPencil className="w-3 h-3 mr-1 text-yellow-400" />
                            {userInfo.name}
                        </li>
                        <li className="flex items-center justify-center mb-2">
                            <YellowPencil className="w-3 h-3 mr-1 text-yellow-400" />
                            {userInfo.email}
                        </li>
                    </ul>
                    <CreateQuizModal onQuizCreated={handleQuizClick} />
                    {userInfo.quizzes && userInfo.quizzes.length > 0 && (
                        <div className="text-center mb-10">
                            <h2 className="mt-4 font-extrabold text-2xl">
                                Quizzes creados
                            </h2>
                            <ul className="list-none p-0 max-w-[80%] mx-auto">
                                {userInfo.quizzes.map((quiz, index) => (
                                    <li key={index} className="mt-4">
                                        <h3 className="mx-auto text-lg font-bold break-words">
                                            {quiz.title}
                                        </h3>
                                        <p className="mx-auto text-sm break-words">
                                            {quiz.description}
                                        </p>
                                        <div className="flex justify-between items-center gap-4 mx-auto mt-2">
                                            <button
                                                onClick={() =>
                                                    handleEditClick(quiz.id)
                                                }
                                                className="text-[#FCFF00] hover:underline flex-shrink-0"
                                            >
                                                <YellowPencil className="w-3 h-3 mr-1" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteClick(quiz.id)
                                                }
                                                className="text-[#FCFF00] hover:underline flex-shrink-0"
                                            >
                                                <Delete className="w-3 h-3 mr-1 fill-[--yellow]" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handlePlayClick(quiz.id)
                                                }
                                                className="text-[#FCFF00] hover:underline flex-shrink-0"
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
                        className="mt-4"
                    />
                    <DeleteQuizModal
                        isOpen={isDeleteModalOpen}
                        onClose={handleModalClose}
                        quizId={selectedQuizId}
                        onQuizDeleted={handleQuizDeleted}
                        className="mt-4"
                    />
                </div>
            ) : (
                <p>No user info available</p>
            )}
        </div>
    );
};

export default UserProfile;
