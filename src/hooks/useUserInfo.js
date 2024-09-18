import { fetchAPI } from '@/api/fetch-api';
import { profileContext } from '@/context/profileContext';
import { useSession } from 'next-auth/react';
import { useState, useEffect, useCallback, useContext } from 'react';

export const useUserInfo = () => {
    const { data: session, status } = useSession();
    const { userInfo, setUserInfo } = useContext(profileContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getUserInfo = useCallback(async () => {
        if (status === 'loading' || !session) {
            return;
        }

        setLoading(true);

        const onSuccess = async (responseData) => {
            if (responseData && responseData.length > 0) {
                const { name, email, avatar, quizzes } = responseData[0];
                // Extraer quizzes con title y description
                const quizzesData = quizzes.map((quiz) => ({
                    id: quiz.id,
                    title: quiz.title,
                    description: quiz.description,
                    questions: quiz.questions,
                }));
                setUserInfo({ name, email, avatar, quizzes: quizzesData });
            }
            setLoading(false);
        };

        const onError = async (errorData) => {
            console.log('Error data:', errorData);
            setError(errorData);
            setLoading(false);
        };

        try {
            const token = session.accessToken;

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            await fetchAPI(
                '/user-info',
                'GET',
                null,
                onSuccess,
                onError,
                headers
            );
        } catch (error) {
            console.log('Caught error:', error);
            setError(error);
            setLoading(false);
        }
    }, [session, status, setUserInfo]);

    useEffect(() => {
        getUserInfo();
    }, [session, status, getUserInfo]);

    return { getUserInfo, userInfo, error, loading };
};
