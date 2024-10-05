import { useRef, useState } from 'react';

const useAutomaticQuiz = () => {
    const [isAutomaticOn, setIsAutomaticOn] = useState(false);
    const [disableWhenAutomatic, setDisableWhenAutomatic] = useState(false);
    const isRunningRef = useRef(false);
    const isQuizPausedRef = useRef(false);
    const isQuizResumedRef = useRef(false);
    const isPaused = () => isQuizPausedRef.current;

    const handleSwitchOffAutomatic = () => {
        isQuizPausedRef.current = false;
        isRunningRef.current = false;
        setDisableWhenAutomatic(false);
        setIsAutomaticOn(false);
    };

    const checkPaused = () => {
        if (isPaused()) {
            console.log('Quiz pausado, deteniendo ejecución.');
            return true;
        }
        return false;
    };

    const pauseQuiz = () => {
        questionTimeLeft = 0;
        startTimeLeft = 0;
        isQuizPausedRef.current = true;
        isQuizResumedRef.current = false;
        if (socket && questionTimeLeft === 0) {
            socket.emit('pauseQuiz', quizId);
        }
    };

    return {
        isRunningRef,
        isQuizPausedRef,
        isQuizResumedRef,
        checkPaused,
        isAutomaticOn,
        setIsAutomaticOn,
        disableWhenAutomatic,
        setDisableWhenAutomatic,
        handleSwitchOffAutomatic,
        pauseQuiz,
    };
};
export default useAutomaticQuiz;
