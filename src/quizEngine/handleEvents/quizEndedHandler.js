'use client';
import { toast } from 'react-toastify';

const quizEndedHandler = (
    socket,
    router,
    loggedUserId,
    quizData,
    quizId,
    questionsToDelete
) => {
    if (socket) {
        const id = loggedUserId?.toString();

        socket.on('quizEnded', (message) => {
            const numberOfQuestions = quizData.number_of_questions;
            window.localStorage.removeItem('idNewPlayer');
            window.localStorage.removeItem('playerName');
            window.localStorage.removeItem('QuizSessionDuration');
            window.localStorage.removeItem('quizId');
            window.localStorage.removeItem('isMaster');
            if (id && id === quizData?.owner_id) {
                socket.emit(
                    'endQuiz',
                    quizId,
                    numberOfQuestions,
                    questionsToDelete
                );
                toast.success(message.message);
            }

            socket.disconnect();
            router.push('/');
        });
    }
};
export default quizEndedHandler;
