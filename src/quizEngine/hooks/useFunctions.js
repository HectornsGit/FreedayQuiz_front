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
            setItemWithExpiry,
        } = Arguments;

        if (!playerId && !isMaster) {
            playerId = uuidv4();
            setItemWithExpiry('idNewPlayer', playerId, 2);
            setItemWithExpiry('quizId', quizId, 2);
            dispatch({
                type: ActionTypes.SET_SESSION_RECOVERY,
                payload: false,
            });
        }

        if (playerName) {
            dispatch({ type: ActionTypes.SET_IS_NAME_SETTED, payload: true });
        }

        if (quizSessionDuration) {
            dispatch({
                type: ActionTypes.SET_SESSION_TIME,
                payload: quizSessionDuration,
            });
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
    const setTimeLeft = useCallback(
        (value) => {
            dispatch({
                type: ActionTypes.SET_TIME_LEFT,
                payload: value,
            });
        },
        [dispatch]
    );
    const setError = useCallback(
        (value) => {
            dispatch({
                type: ActionTypes.SET_ERROR,
                payload: value,
            });
        },
        [dispatch]
    );
    const setSocket = useCallback(
        (value) => {
            dispatch({
                type: ActionTypes.SET_SOCKET,
                payload: value,
            });
        },
        [dispatch]
    );
    const setSessionTime = useCallback(
        (value) => {
            dispatch({
                type: ActionTypes.SET_SESSION_TIME,
                payload: value,
            });
        },
        [dispatch]
    );
    const setNickName = useCallback(
        (value) => {
            dispatch({
                type: ActionTypes.SET_NICKNAME,
                payload: value,
            });
        },
        [dispatch]
    );

    const setClickedResponses = useCallback(
        (value) => {
            dispatch({
                type: ActionTypes.SET_CLICKED_RESPONSES,
                payload: value,
            });
        },
        [dispatch]
    );
    const setSessionTimeLeft = useCallback(
        (value) => {
            dispatch({
                type: ActionTypes.SET_SESSION_TIME_LEFT,
                payload: value,
            });
        },
        [dispatch]
    );
    const setConnectedClients = useCallback(
        (value) => {
            dispatch({
                type: ActionTypes.SET_CONNECTED_CLIENTS,
                payload: value,
            });
        },
        [dispatch]
    );
    const setQuestion = useCallback(
        (value) => {
            dispatch({
                type: ActionTypes.SET_QUESTION,
                payload: value,
            });
        },
        [dispatch]
    );
    const setQuestionsToDelete = useCallback(
        (value) => {
            dispatch({
                type: ActionTypes.SET_QUESTION_TO_DELETE,
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
        setTimeLeft,
        setError,
        setSocket,
        setSessionTime,
        setNickName,
        setClickedResponses,
        setSessionTimeLeft,
        setConnectedClients,
        setQuestion,
        setQuestionsToDelete,
    };
};
export default useFunctions;
