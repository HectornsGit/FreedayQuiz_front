import { fetchAPI } from '@/api/fetch-api';
import { useSession } from 'next-auth/react';
import { useState, useEffect, useCallback } from 'react';

export const useListQuestions = (router, quizId, resetForm, pathname) => {
    const { data: session } = useSession();
    const [dataQuizz, setDataQuizz] = useState([]);
    const [valueCheckbox, setValueCheckbox] = useState([]);
    const [modal, setModal] = useState(false);
    console.log('dataquiz', dataQuizz);
    const getQuestions = async (quizId) => {
        const onSuccess = async (data) => {
            const idQuiz = data.id;
            const questions = data.questions;

            const dataQuestions = questions?.map((question) => ({
                idQuiz: idQuiz,
                questionId: question.id,
                questionImage: question.image,
                questionNumber: question.questionNumber,
            }));
            setDataQuizz(dataQuestions);
            setModal(!modal);
        };

        const onError = async (data) => {
            console.log('Error:', data);
        };

        try {
            const token = session.accessToken;
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
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
            console.error(error);
        }
    };

    const closeModal = () => {
        setModal(false);
    };

    const handleRouteQuestion = useCallback(
        (quizId, questionNumber) => {
            router.push(`/edit-question/${quizId}/${questionNumber}`);
        },
        [router]
    );

    const handleAddQuestion = useCallback(() => {
        if (pathname === `/new-question/${quizId}`) {
            resetForm();
        } else {
            router.push(`/new-question/${quizId}`);
        }
    }, [router, quizId, resetForm]);

    useEffect(() => {
        getQuestions(quizId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quizId]);

    return {
        dataQuizz,
        modal,
        closeModal,
        valueCheckbox,
        setValueCheckbox,
        handleRouteQuestion,
        handleAddQuestion,
    };
};
