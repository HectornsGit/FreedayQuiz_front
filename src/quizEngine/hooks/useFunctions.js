import quizReducer from '../reducer/quizReducer';
import { ActionTypes } from '../reducer/actions';
import { initialState } from '../reducer/initialState';
import { useCallback, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useFunctions = (Arguments) => {
    const [state, dispatch] = useReducer(quizReducer, initialState);

    const initializePlayer = useCallback(() => {
        let {
            isMaster,
            playerId,
            quizId,
            playerName,
            quizSessionDuration,
            setSessionTime,
            setItemWithExpiry,
        } = Arguments;

        if (!playerId && !isMaster) {
            playerId = uuidv4();
            setItemWithExpiry('idNewPlayer', playerId, 12);
            setItemWithExpiry('quizId', quizId, 12);
            dispatch({
                type: ActionTypes.SET_SESSION_RECOVERY,
                payload: false,
            });
        }

        if (playerName) {
            dispatch({ type: ActionTypes.SET_IS_NAME_SETTED, payload: true });
        }

        if (quizSessionDuration) {
            setSessionTime(quizSessionDuration);
        }
    }, [Arguments, dispatch]);
    //Funciones manejadoras de dispatchs:
    const setIsInput = useCallback(
        (value) => {
            dispatch({ type: ActionTypes.SET_IS_INPUT, payload: value });
        },
        [dispatch]
    );

    const setIsNameSetted = useCallback(
        (value) => {
            dispatch({ type: ActionTypes.SET_IS_NAME_SETTED, payload: value });
        },
        [dispatch]
    );

    const setSessionRecovery = useCallback(
        (value) => {
            dispatch({
                type: ActionTypes.SET_SESSION_RECOVERY,
                payload: value,
            });
        },
        [dispatch]
    );

    const setIsQuestionRunning = useCallback(
        (value) => {
            dispatch({
                type: ActionTypes.SET_IS_QUESTION_RUNNING,
                payload: value,
            });
        },
        [dispatch]
    );

    const setIsClockInput = useCallback(
        (value) => {
            dispatch({ type: ActionTypes.SET_IS_CLOCK_INPUT, payload: value });
        },
        [dispatch]
    );

    const setIsThereAWinner = useCallback(
        (value) => {
            dispatch({
                type: ActionTypes.SET_IS_THERE_A_WINNER,
                payload: value,
            });
        },
        [dispatch]
    );

    const setIsDisabled = useCallback(
        (value) => {
            dispatch({ type: ActionTypes.SET_IS_DISABLED, payload: value });
        },
        [dispatch]
    );

    const setJoinedQuiz = useCallback(
        (value) => {
            dispatch({ type: ActionTypes.SET_JOINED_QUIZ, payload: value });
        },
        [dispatch]
    );

    const setShowScores = useCallback(
        (value) => {
            dispatch({ type: ActionTypes.SET_SHOW_SCORES, payload: value });
        },
        [dispatch]
    );

    const setIsMasterOnline = useCallback(
        (value) => {
            dispatch({
                type: ActionTypes.SET_IS_MASTER_ONLINE,
                payload: value,
            });
        },
        [dispatch]
    );

    return {
        initializePlayer,
        state,
        setIsThereAWinner,
        setIsClockInput,
        setIsQuestionRunning,
        setSessionRecovery,
        setIsNameSetted,
        setIsInput,
        setIsDisabled,
        setJoinedQuiz,
        setShowScores,
        setIsMasterOnline,
    };
};
export default useFunctions;
