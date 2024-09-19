import { fetchAPI } from '@/api/fetch-api';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useState, useContext } from 'react';
import { profileContext } from '@/context/profileContext';
import { useRouter } from 'next/navigation';
export const useDeleteQuestions = (
    valueCheckbox,
    dataQuizz,
    setValueCheckbox,
    closeModal
) => {
    const router = useRouter();
    const { deleteQuestion } = useContext(profileContext);
    const IdQuiz = dataQuizz[0]?.idQuiz;
    const { data: session } = useSession();
    const [isGrey, setIsGrey] = useState({});
    const [iconDelete, setIconDelete] = useState({});

    const deleteQuestions = async () => {
        const onSuccess = (data) => {
            deleteQuestion(data.questionIds);
            toast.success('Pregunta eliminada');
            setValueCheckbox([]);
            // router.push(`${IdQuiz}`);
        };

        const onError = (error) => {
            toast.error('Hubo un error al eliminar preguntas');
            console.log(error);
        };

        try {
            const token = session.accessToken;
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const body = {
                questionIds: valueCheckbox,
                quizId: IdQuiz,
            };

            await fetchAPI(
                '/delete-question',
                'DELETE',
                body,
                onSuccess,
                onError,
                headers
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleValue = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;

        if (checked) {
            setValueCheckbox((prevstate) => [...prevstate, value]);
            setIsGrey((prevState) => ({ ...prevState, [value]: checked }));
        } else {
            setValueCheckbox((prevState) =>
                prevState.filter((item) => item !== value)
            );
            setIsGrey((prevState) => ({ ...prevState, [value]: checked }));
        }
    };

    return { deleteQuestions, handleValue, isGrey, iconDelete };
};
