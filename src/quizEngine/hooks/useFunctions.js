import quizReducer from '../reducer/quizReducer';
import { ActionTypes } from '../reducer/actions';
import { initialState } from '../reducer/initialState';
import { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useFunctions = (Arguments) => {
    const [state, dispatch] = useReducer(quizReducer, initialState);

    const initializePlayer = () => {
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
    };
    //Funciones manejadoras de dispatchs:
    const setIsInput = (value) =>
        dispatch({ type: ActionTypes.SET_IS_INPUT, payload: value });

    const setIsNameSetted = (value) =>
        dispatch({ type: ActionTypes.SET_IS_NAME_SETTED, payload: value });

    const setSessionRecovery = (value) =>
        dispatch({
            type: ActionTypes.SET_SESSION_RECOVERY,
            payload: value,
        });

    const setIsQuestionRunning = (value) =>
        dispatch({
            type: ActionTypes.SET_IS_QUESTION_RUNNING,
            payload: value,
        });

    const setIsClockInput = (value) =>
        dispatch({ type: ActionTypes.SET_IS_CLOCK_INPUT, payload: value });

    const setIsThereAWinner = (value) =>
        dispatch({
            type: ActionTypes.SET_IS_THERE_A_WINNER,
            payload: value,
        });

    const setIsDisabled = (value) => {
        dispatch({ type: ActionTypes.SET_IS_DISABLED, payload: value });
    };
    const setJoinedQuiz = (value) =>
        dispatch({ type: ActionTypes.SET_JOINED_QUIZ, payload: value });

    const setShowScores = (value) =>
        dispatch({ type: ActionTypes.SET_SHOW_SCORES, payload: value });

    const setIsMasterOnline = (value) =>
        dispatch({
            type: ActionTypes.SET_IS_MASTER_ONLINE,
            payload: value,
        });

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
