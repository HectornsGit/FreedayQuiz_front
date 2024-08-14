'use client';

import React, { useState, useEffect } from 'react';
import { useUserInfo } from '@/hooks/useUserInfo';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import CreateQuizModal from './CreateQuizModal';
import DeleteQuizModal from './DeleteQuizModal';
import EditQuizModal from './EditQuizModal';
import YellowPencil from './icons/YellowPencil';
import Delete from './icons/Delete';
import { fetchAPI } from '@/api/fetch-api';

const UserProfile = () => {
    const { getUserInfo, userInfo, error, loading } = useUserInfo();
    const { data: session } = useSession();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); //quizz
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedQuizId, setSelectedQuizId] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState('');
    const [isEditing, setIsEditing] = useState({
        name: false,
        email: false,
        avatar: false,
        password: false,
    });
    const [editableUserInfo, setEditableUserInfo] = useState({
        name: '',
        email: '',
        avatar: '',
        password: '',
    });
    const router = useRouter();

    useEffect(() => {
        getUserInfo();
    }, []);

    useEffect(() => {
        if (userInfo) {
            setEditableUserInfo({
                name: userInfo.name,
                email: userInfo.email,
                avatar: userInfo.avatar,
                password: '', // Iniciar vacío
            });
        }
    }, [userInfo]);

    const handleEditClick = (field) => {
        setIsEditing((prev) => ({ ...prev, [field]: true }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableUserInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result); // Actualiza la vista previa
                setEditableUserInfo((prev) => ({ ...prev, avatar: file }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('name', editableUserInfo.name);
        formData.append('email', editableUserInfo.email);
        if (editableUserInfo.avatar) {
            formData.append('avatar', editableUserInfo.avatar);
        }
        if (editableUserInfo.password) {
            formData.append('password', editableUserInfo.password);
        }

        if (session) {
            const token = session.accessToken;
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            await fetchAPI(
                '/edit-user',
                'PATCH',
                formData,
                () => {
                    setIsEditing({
                        name: false,
                        email: false,
                        avatar: false,
                        password: false,
                    });
                    setAvatarPreview('');
                    getUserInfo();
                },
                (error) => {
                    console.error('Failed to update user info:', error);
                },
                headers
            );
        }
    };

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

    const handleEditQuizClick = (quizId) => {
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
        <div className="flex flex-col items-center mx-auto max-w-[80%]">
            {userInfo ? (
                <div className="text-center">
                    <div
                        className="text-center relative justify-center items-center flex mb-5"
                        onClick={() => handleEditClick('avatar')}
                    >
                        {isEditing.avatar ? (
                            <div className="relative w-32 h-32">
                                <input
                                    type="file"
                                    accept="image/jpeg, image/png, image/gif"
                                    onChange={handleAvatarChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <button
                                    onClick={handleSave}
                                    className="absolute bottom-1 right-0 z-20"
                                >
                                    <YellowPencil className="w-8 h-8 text-black cursor-pointer bg-yellow-400" />
                                </button>
                                <div className="w-full h-full flex justify-center items-center rounded-full">
                                    {avatarPreview ? (
                                        <img
                                            src={avatarPreview}
                                            alt="Avatar Preview"
                                            className="w-full h-full object-cover rounded-full border-2 border-[var(--yellow)]"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex justify-center items-center bg-gray-200 rounded-full border-2 border-[var(--yellow)]">
                                            <span className="text-gray-500">
                                                No image selected
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <img
                                src={`${process.env.NEXT_PUBLIC_API_HOST}/uploads/${userInfo.avatar}`}
                                alt="Avatar"
                                className="w-32 h-32 object-cover rounded-full border-2 border-[var(--yellow)]"
                            />
                        )}
                    </div>
                    <ul className="list-none p-0 mb-5 text-xl">
                        <li
                            className="flex items-center justify-center mb-2"
                            onClick={() => handleEditClick('name')}
                        >
                            {isEditing.name ? (
                                <>
                                    <button onClick={handleSave}>
                                        <YellowPencil className="w-5 h-5 ml-5 text-yellow-400" />
                                    </button>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editableUserInfo.name}
                                        onChange={handleChange}
                                        className="border p-1 bg-transparent max-w-24"
                                    />
                                </>
                            ) : (
                                <>
                                    <YellowPencil className="w-3 h-3 mr-1 text-yellow-400" />
                                    {userInfo.name}
                                </>
                            )}
                        </li>
                        <li
                            className="flex items-center justify-center mb-2 ml-[10px]"
                            onClick={() => handleEditClick('email')}
                        >
                            {isEditing.email ? (
                                <>
                                    <button onClick={handleSave}>
                                        <YellowPencil className="w-5 h-5 ml-5 text-yellow-400" />
                                    </button>
                                    <input
                                        type="email"
                                        name="email"
                                        value={editableUserInfo.email}
                                        onChange={handleChange}
                                        className="border p-1 bg-transparent max-w-24"
                                    />
                                </>
                            ) : (
                                <>
                                    <YellowPencil className="w-3 h-3 mr-1 text-yellow-400" />
                                    {userInfo.email.length > 15
                                        ? `${userInfo.email.substring(0, 15)}...`
                                        : userInfo.email}
                                </>
                            )}
                        </li>
                        <li
                            className="flex items-center justify-center mb-2 ml-[10px]"
                            onClick={() => handleEditClick('password')}
                        >
                            {isEditing.password ? (
                                <>
                                    <button onClick={handleSave}>
                                        <YellowPencil className="w-5 h-5 ml-5 text-yellow-400" />
                                    </button>
                                    <input
                                        type="password"
                                        name="password"
                                        value={editableUserInfo.password}
                                        onChange={handleChange}
                                        className="border p-1 bg-transparent max-w-24"
                                    />
                                </>
                            ) : (
                                <>
                                    <YellowPencil className="w-3 h-3 mr-1 text-yellow-400" />
                                    {'Cambiar contraseña'.substring(0, 15)}...
                                </>
                            )}
                        </li>
                    </ul>
                    <CreateQuizModal onQuizCreated={handleQuizClick} />
                    {userInfo.quizzes && userInfo.quizzes.length > 0 && (
                        <div className="text-center mb-10">
                            <h2 className="mt-4 font-extrabold text-2xl">
                                Quizzes creados
                            </h2>
                            <ul className="list-none p-0 mx-auto">
                                {userInfo.quizzes.map((quiz, index) => (
                                    <li
                                        key={index}
                                        className="mt-4 p-[2px] bg-gradient-to-br from-[var(--cyan)] to-[var(--yellow)]"
                                    >
                                        <section className="bg-[var(--bg-hab-black)]">
                                            <h3 className="mx-auto text-lg font-bold break-words">
                                                {quiz.title}
                                            </h3>
                                            <p className="mx-auto text-sm break-words">
                                                {quiz.description}
                                            </p>
                                            <div className="flex justify-between items-center gap-4 mx-auto mt-2 w-4/5">
                                                <button
                                                    onClick={() =>
                                                        handleEditQuizClick(
                                                            quiz.id
                                                        )
                                                    }
                                                    className="text-[#FCFF00] hover:underline flex-shrink-0"
                                                >
                                                    <YellowPencil className="w-3 h-3 mr-1" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteClick(
                                                            quiz.id
                                                        )
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
                                        </section>
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
