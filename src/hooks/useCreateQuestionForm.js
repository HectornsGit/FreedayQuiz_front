import React, { useState, useEffect, useRef } from 'react';
import NoImage from '../components/icons/NoImage';
import { toast } from 'react-toastify';
import { fetchAPI } from '@/api/fetch-api';

const useCreateQuestionForm = (quizId, session) => {
    const [quizTitle, setQuizTitle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        image: null,
        question: '',
        question_time: '',
        optionA: '',
        optionB: '',
        optionC: '',
        correctAnswer: '',
        question_number: '',
    });

    // Icono NoImage por defecto
    const [imagePreview, setImagePreview] = useState(
        <NoImage className="w-48 h-48" />
    );

    const fileInputRef = useRef(null);

    useEffect(() => {
        // Función para obtener el título del quiz
        const fetchQuizTitle = async () => {
            if (quizId && session) {
                try {
                    const token = session.accessToken;

                    const headers = {
                        Authorization: `Bearer ${token}`,
                    };

                    const onSuccess = (data) => {
                        setQuizTitle(data.title);
                    };

                    const onError = (error) => {
                        console.error(
                            'Error al obtener el título del quiz:',
                            error
                        );
                    };

                    await fetchAPI(
                        `/get-quiz/${quizId}`,
                        'GET',
                        null,
                        onSuccess,
                        onError,
                        headers
                    );
                } catch (error) {
                    console.error(
                        'Error al obtener el título del quiz:',
                        error
                    );
                }
            }
        };

        fetchQuizTitle();
    }, [quizId, session]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });

        // Crear una vista previa de la imagen
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={reader.result}
                        alt="Vista previa de la imagen"
                        className="max-w-full h-[200px] object-cover"
                        style={{
                            maxWidth: '70vw',
                            height: '200px',
                            width: 'calc(200px * 16 / 9)',
                        }}
                    />
                );
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(<NoImage className="w-48 h-48" />);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificación de campos obligatorios
        if (
            !formData.question ||
            !formData.question_time ||
            !formData.optionA ||
            !formData.optionB ||
            !formData.optionC ||
            !formData.correctAnswer ||
            !formData.question_number
        ) {
            toast.error(
                'Por favor, completa los campos obligatorios, solo la imagen es opcional'
            );
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('quiz_id', quizId);
        Object.keys(formData).forEach((key) => {
            if (formData[key] !== null && formData[key] !== '') {
                formDataToSend.append(key, formData[key]);
            }
        });

        try {
            const token = session.accessToken;

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const onSuccess = (data) => {
                toast.success('Pregunta creada');
                console.log('Pregunta creada:', data);
            };

            const onError = (error) => {
                toast.error(error.message);
                console.error('Error al crear la pregunta:', error);
            };

            await fetchAPI(
                '/create-questions',
                'POST',
                formDataToSend,
                onSuccess,
                onError,
                headers
            );
        } catch (error) {
            toast.error(error.message);
            console.error('Error al crear la pregunta:', error);
        }
    };

    const openModal = async () => {
        await handleSubmit(new Event('submit'));
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    return {
        quizTitle,
        isModalOpen,
        formData,
        setFormData,
        imagePreview,
        handleInputChange,
        handleFileChange,
        handleSubmit,
        openModal,
        closeModal,
        handleImageClick,
        fileInputRef,
    };
};
export default useCreateQuestionForm;