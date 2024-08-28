import { useState, useEffect } from 'react';
import { useUserInfo } from '@/hooks/useUserInfo';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { fetchAPI } from '@/api/fetch-api';

const useUserProfile = (session) => {
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
    const [quizIndex, setQuizIndex] = useState(0);
    const [quizzesPerPage, setQuizzesPerPage] = useState(5);
    const { getUserInfo, userInfo, error, loading } = useUserInfo();
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

                    if (editableUserInfo.password) {
                        toast.success('Contraseña cambiada');
                    }
                },
                (error) => {
                    console.error('Failed to update user info:', error);
                },
                headers
            );
        }
    };

    const handleCreateQuiz = (quizId) => {
        router.push(`new-question/${quizId}`);
    };

    const handleDeleteClick = (quizId) => {
        setSelectedQuizId(quizId);
        setIsDeleteModalOpen(true);
    };

    const handleEditQuiz = (quizId) => {
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
         const quiz = userInfo.quizzes.find((q) => q.id === quizId);

         if (quiz && quiz.questions && quiz.questions.length > 0) {
             router.push(`edit-question/${quizId}/1`);
         } else {
             router.push(`/new-question/${quizId}`);
         }
    };

    const handleNextPage = () => {
        setQuizIndex((prevIndex) => prevIndex + quizzesPerPage);
    };

    const handlePrevPage = () => {
        setQuizIndex((prevIndex) => prevIndex - quizzesPerPage);
    };

    const handlePlayQuiz = (quizId) => {
        // Abrir la ventana emergente con el QR
        const qrUrl = `/QR/${quizId}`;
        const width = 280;
        const height = 600;

        // dimensiones de la ventana del navegador
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const left = (screenWidth - width) / 2;
        const top = (screenHeight - height) / 2;

        const windowConf = `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`;

        // Abrir la ventana emergente
        window.open(qrUrl, '_blank', windowConf);

        // Redirigir a la página de match
        router.push(`/match/${quizId}`);
    };

    return {
        getUserInfo,
        userInfo,
        error,
        loading,
        handlePrevPage,
        handleNextPage,
        isEditModalOpen,
        setIsEditModalOpen,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        handleQuizUpdated,
        handleQuizDeleted,
        handleModalClose,
        handleDeleteClick,
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
        handleCreateQuiz,
        handlePlayQuiz,
        handleEditQuiz,
    };
};

export default useUserProfile;
