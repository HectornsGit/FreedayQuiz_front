import { useState, useEffect, useCallback } from 'react';
import { useUserInfo } from '@/hooks/useUserInfo';
import { useRouter } from 'next/navigation';
import { fetchAPI } from '@/api/fetch-api';

const useUserProfile = (session) => {
    const { getUserInfo, userInfo, error, loading } = useUserInfo();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // quizz
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
    const [quizIndex, setQuizIndex] = useState(0);
    const [quizzesPerPage, setQuizzesPerPage] = useState(5);
    const router = useRouter();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) {
                setQuizzesPerPage(7);
            } else if (window.innerWidth >= 1024) {
                setQuizzesPerPage(5);
            } else if (window.innerWidth >= 768) {
                setQuizzesPerPage(3);
            } else {
                setQuizzesPerPage(2);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        getUserInfo();
    }, [getUserInfo]);

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

    const handleEditClick = useCallback((field) => {
        setIsEditing((prev) => ({ ...prev, [field]: true }));
    }, []);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setEditableUserInfo((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleAvatarChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result); // Actualiza la vista previa
                setEditableUserInfo((prev) => ({ ...prev, avatar: file }));
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const handleSave = useCallback(async () => {
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
    }, [editableUserInfo, getUserInfo, session]);

    const handleQuizClick = useCallback(
        (quizId) => {
            router.push(`new-question/${quizId}`);
        },
        [router]
    );

    const handlePlayClick = useCallback(
        (quizId) => {
            router.push(`/match/${quizId}`);
        },
        [router]
    );

    const handleDeleteClick = useCallback((quizId) => {
        setSelectedQuizId(quizId);
        setIsDeleteModalOpen(true);
    }, []);

    const handleEditQuizClick = useCallback((quizId) => {
        setSelectedQuizId(quizId);
        setIsEditModalOpen(true);
    }, []);

    const handleModalClose = useCallback(() => {
        setIsDeleteModalOpen(false);
        setIsEditModalOpen(false);
    }, []);

    const handleQuizDeleted = useCallback(() => {
        getUserInfo(); // Refresca la lista de quizzes después de eliminar uno
    }, [getUserInfo]);

    const handleQuizUpdated = useCallback(
        (quizId) => {
            router.push(`edit-question/${quizId}/1`);
        },
        [router]
    );

    const handleNextPage = useCallback(() => {
        setQuizIndex((prevIndex) => prevIndex + quizzesPerPage);
    }, [quizzesPerPage]);

    const handlePrevPage = useCallback(() => {
        setQuizIndex((prevIndex) => prevIndex - quizzesPerPage);
    }, [quizzesPerPage]);

    const handleQRButton = useCallback((quizId) => {
        const qrUrl = `/QR/${quizId}`;
        const width = 280;
        const height = 600;

        // dimensiones de la ventana del navegador
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const left = (screenWidth - width) / 2;
        const top = (screenHeight - height) / 2;

        const windowConf = `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`;

        window.open(qrUrl, '_blank', windowConf);
    }, []);

    return {
        getUserInfo,
        userInfo,
        error,
        loading,
        handleQRButton,
        handlePrevPage,
        handleNextPage,
        isEditModalOpen,
        setIsEditModalOpen,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        handleQuizUpdated,
        handleQuizDeleted,
        handleEditQuizClick,
        handleModalClose,
        handleDeleteClick,
        handlePlayClick,
        handleQuizClick,
        handleEditClick,
        handleChange,
        handleAvatarChange,
        handleSave,
        avatarPreview,
        setAvatarPreview,
        editableUserInfo,
        setEditableUserInfo,
        quizIndex,
        setQuizIndex,
        quizzesPerPage,
        setQuizzesPerPage,
        selectedQuizId,
        setSelectedQuizId,
        isEditing,
    };
};

export default useUserProfile;
