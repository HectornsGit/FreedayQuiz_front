import { useRef, useState } from 'react';

const useAutomaticQuiz = () => {
    const [isAutomaticOn, setIsAutomaticOn] = useState(false);
    const [disableWhenAutomatic, setDisableWhenAutomatic] = useState(false);
    const [systemPaused, setSystemPaused] = useState(false);

    const isRunningRef = useRef(false);
    const isQuizPausedRef = useRef(false);
    const isQuizResumedRef = useRef(false);
    const waitingTime = useRef(null);
    const waitingTime2 = useRef(null);
    const backData = useRef(null);

    const isPaused = () => isQuizPausedRef.current;

    const handleSwitchOffAutomatic = () => {
        isQuizPausedRef.current = false;
        isRunningRef.current = false;
        setDisableWhenAutomatic(false);
        setIsAutomaticOn(false);
    };

    const checkPaused = () => {
        if (isPaused()) {
            return true;
        }
        return false;
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
        waitingTime,
        waitingTime2,
        backData,
        systemPaused,
        setSystemPaused,
    };
};
export default useAutomaticQuiz;
