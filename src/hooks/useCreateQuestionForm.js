import React, { useState, useEffect, useRef } from 'react';
import NoImage from '../components/icons/NoImage';
import { toast } from 'react-toastify';
import { fetchAPI } from '@/api/fetch-api';
import { useRouter } from 'next/navigation';

const useCreateQuestionForm = (quizId, session) => {
    const [quizTitle, setQuizTitle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(true);
    const router = useRouter();
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
        <NoImage className="w-full aspect-video" />
    );

    const fileInputRef = useRef(null);

    useEffect(() => {
        // Función para obtener el título del quiz y el numero de ultima pregunta creada
        const fetchQuizData = async () => {
            if (quizId && session) {
                try {
                    const token = session.accessToken;

                    const headers = {
                        Authorization: `Bearer ${token}`,
                    };

                    const onSuccess = (data) => {
                        setQuizTitle(data.title);

                        const lastQuestionNumber = Math.max(
                            0,
                            ...data.questions.map((q) => q.questionNumber || 0)
                        );

                        setFormData((prevData) => ({
                            ...prevData,
                            question_number: lastQuestionNumber + 1,
                        }));
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

        fetchQuizData();
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
                        className="w-full aspect-video"
                    />
                );
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(<NoImage className="w-full aspect-video" />);
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
            !formData.correctAnswer
        ) {
            toast.error(
                'Por favor, completa los campos obligatorios, solo la imagen es opcional'
            );
            return false;
        }

        // Verificación de tiempo mínimo para question_time
        const minimumTime = 5;
        if (formData.question_time < minimumTime) {
            toast.error(
                `El tiempo mínimo permitido para responder es de ${minimumTime} segundos.`
            );
            return false;
        }

        // Verificación de respuestas duplicadas
        const answers = [
            formData.optionA,
            formData.optionB,
            formData.optionC,
            formData.correctAnswer,
        ];
        const uniqueAnswers = new Set(answers);

        if (uniqueAnswers.size !== answers.length) {
            toast.error('No puede haber dos respuestas iguales');
            return false;
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

            await fetchAPI(
                '/create-questions',
                'POST',
                formDataToSend,
                (data) => {
                    toast.success('Pregunta creada');
                    console.log('Pregunta creada:', data);
                },
                (error) => {
                    toast.error(error.message);
                    console.error('Error al crear la pregunta:', error);
                    return false;
                },
                headers
            );

            return true;
        } catch (error) {
            toast.error(error.message);
            console.error('Error al crear la pregunta:', error);
            return false;
        }
    };

    const openModal = async () => {
        const isFormEmpty = Object.keys(formData).every(
            (key) =>
                (key === 'question_number' && formData[key] !== '') ||
                formData[key] === null ||
                formData[key] === ''
        );

        if (isFormEmpty) {
            setIsModalOpen(true);
            return;
        }

        const isSuccess = await handleSubmit(new Event('submit'));

        if (isSuccess) {
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFinishEdit = async () => {
        try {
            const isFormEmpty = Object.keys(formData).every(
                (key) =>
                    (key === 'question_number' && formData[key] !== '') ||
                    formData[key] === null ||
                    formData[key] === ''
            );

            // Redirige directamente si el formulario está vacío
            if (isFormEmpty) {
                router.push('/profile');
                return;
            }

            const isSuccess = await handleSubmit(new Event('submit'));

            // Solo redirige si el submit fue exitoso
            if (isSuccess) {
                router.push('/profile');
            }
        } catch (error) {
            console.error('Error al guardar y redirigir:', error);
            toast.error('Error al guardar los cambios.');
        }
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
        handleFinishEdit,
        fileInputRef,
    };
};
export default useCreateQuestionForm;
