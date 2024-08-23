/* eslint-disable react-hooks/exhaustive-deps */
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import {
    shuffleArray,
    findValue,
    startNewPlayer,
    signOutHandler,
    getItemWithExpiry,
    setItemWithExpiry,
} from '../utils';
import useSocketConfig from './useSocketConfig';
import { useQuizHandlers } from './useQuizHandlers';
import {
    handleQuestionChange,
    nextQuestionHandler,
    previousQuestionHandler,
    updateQuestionDataInBackend,
    updateQuizDataInBackend,
    handleQuizChange,
    endQuiz,
    initQuestion,
    showScoresHandler,
    recoverySession,
    setSessionTimeHandler,
    deleteQuestionHandler,
    getQuestionFromList,
    startRandomQuestion,
    requestSetWinnerOn,
} from '../handlers/index';
import useFunctions from './useFunctions';

const useQuizLogic = () => {
    const params = useParams();
    const router = useRouter();
    const { data: session } = useSession();

    //Estados complejos: (setQuestion está en el reducer):
    const [quizData, setQuizData] = useState(null); //Datos del quiz.
    const [playerData, setPlayerData] = useState([]); //Datos de todos los jugadores.
    const [initialPlayerData, setInitialPlayerData] = useState([]); //Datos del jugador conectado.
    const [shuffledQuestionResponses, setShuffledQuestionResponses] =
        useState(null); //Preguntas desordenadas:
    const [questionsExecuted, setQuestionsExecuted] = useState([]); //Preguntas ya ejecutadas.

    //Para activar la recuperación y sincronización de datos en caso de que salga de la pantalla o la refresque por error:
    const loggedUserId = session?.user.data.id;
    const quizId = params.quizId.toString();
    let playerId;
    let playerName;
    let sameQuiz;
    let quizSessionDuration;

    //Si el quizId es diferente, se desecha el anterior playerId. Si es igual, se recupera:
    sameQuiz = getItemWithExpiry('quizId');
    playerId = sameQuiz === quizId && getItemWithExpiry('idNewPlayer');
    playerName = getItemWithExpiry('playerName');

    //Solo para el master:
    quizSessionDuration = getItemWithExpiry('QuizSessionDuration');
    let isMaster = getItemWithExpiry('isMaster');

    const {
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
    } = useFunctions({
        isMaster,
        playerId,
        quizId,
        playerName,
        quizSessionDuration,
        setItemWithExpiry,
    });

    //Estados procedentes del reducer:
    const {
        question,
        clickedResponses,
        nickName,
        isNameSetted,
        joinedQuiz, //Se setea, pero no se usa como tal.
        socket,
        error,
        isQuestionRunning,
        questionsToDelete,
        timeLeft,
        showScores,
        isDisabled,
        sessionRecovery,
        sessionTime,
        sessionTimeLeft,
        connectedClients,
        isMasterOnline, //Se setea, pero no se usa como tal.
        isThereAWinner,
        isClockInput,
        isInput,
    } = state;

    //Ver en useFunctions:
    useEffect(() => {
        initializePlayer();
    }, [playerId]);

    //Aquí van los socket handlers que necesitan useCallback:
    const {
        handleAnswerSubmitted,
        handleAnswerSubmit,
        handleInitialPlayerData,
        handleStartQuiz,
    } = useQuizHandlers({
        socket,
        quizId,
        quizData,
        question,
        initialPlayerData,
        playerData,
        setPlayerData,
        playerId,
        nickName,
        setInitialPlayerData,
        loggedUserId,
        timeLeft,
        setIsDisabled,
    });

    //Desordenar las preguntas:
    useEffect(() => {
        if (question) {
            const questionResponses = [
                { optionA: question.optionA },
                { optionB: question.optionB },
                { optionC: question.optionC },
                { correctAnswer: question.correctAnswer },
            ];
            const Responses = shuffleArray(questionResponses);
            setShuffledQuestionResponses(Responses);
        }
    }, [question]);

    //Este es el hook que escucha los eventos del socket:
    useSocketConfig({
        socket,
        quizId,
        question,
        quizData,
        loggedUserId,
        setQuizData,
        setQuestion,
        setError,
        setSocket,
        router,
        setJoinedQuiz,
        setPlayerData,
        setQuestion,
        playerData,
        handleAnswerSubmitted,
        setIsQuestionRunning,
        isQuestionRunning,
        setTimeLeft,
        timeLeft,
        setShowScores,
        showScores,
        setIsDisabled,
        setConnectedClients,
        playerData,
        isNameSetted,
        sessionRecovery,
        setSessionRecovery,
        setInitialPlayerData,
        playerId,
        setSessionTimeLeft,
        sessionTime,
        setClickedResponses,
        setIsMasterOnline,
        questionsToDelete,
        setQuestionsExecuted,
        setIsThereAWinner,
    });

    //Las funciones que dependen de uno o varios estados, habrá que envolverlas en funciones anónimas. Las demás, no es necesario, pero habrá que hacer en la función original una función que devuelva una función:

    return {
        endQuiz: () => endQuiz(quizData, socket, quizId, questionsToDelete),
        findValue,
        handleQuestionChange: () =>
            handleQuestionChange(
                setShuffledQuestionResponses,
                shuffledQuestionResponses
            ),
        handleQuizChange: handleQuizChange(setQuizData),
        updateQuestionDataInBackend: updateQuestionDataInBackend(
            setQuestion,
            socket,
            quizId,
            question,
            setIsInput
        ),
        updateQuizDataInBackend: updateQuizDataInBackend(
            quizData,
            socket,
            quizId
        ),
        nextQuestionHandler: () =>
            nextQuestionHandler(question, quizData, socket, quizId),
        previousQuestionHandler: () =>
            previousQuestionHandler(question, quizData, socket, quizId),
        handleAnswerSubmit,
        initQuestion: () =>
            initQuestion(
                socket,
                quizId,
                question,
                setQuestionsExecuted,
                questionsExecuted
            ),
        handleStartQuiz,
        showScoresHandler: () => showScoresHandler(socket, quizId, playerData),
        handleInitialPlayerData,
        question,
        quizData,
        playerId,
        loggedUserId,
        quizId,
        setNickName,
        error,
        playerData,
        startNewPlayer: () =>
            startNewPlayer(
                router,
                params,
                setIsNameSetted,
                setSessionRecovery,
                socket
            ),
        signOutHandler: () => signOutHandler(router, setIsNameSetted),
        recoverySession: () => recoverySession(socket, quizId),
        nickName,
        shuffledQuestionResponses,
        isQuestionRunning,
        setIsQuestionRunning,
        setSessionTimeHandler: setSessionTimeHandler(
            socket,
            setSessionTime,
            quizId,
            quizData?.number_of_questions,
            setIsClockInput
        ),
        timeLeft,
        showScores,
        isDisabled,
        initialPlayerData,
        deleteQuestionHandler: deleteQuestionHandler(
            socket,
            quizId,
            question?.questionNumber,
            setQuestionsToDelete,
            question?.id,
            setQuizData
        ),
        socket,
        connectedClients,
        sessionRecovery,
        isNameSetted,
        sessionTime,
        isClockInput,
        setIsClockInput,
        isInput,
        setIsInput,
        getQuestionFromList: getQuestionFromList(quizId, socket),
        sessionTimeLeft,
        isThereAWinner,
        requestSetWinnerOn: requestSetWinnerOn(socket, quizId),
        setIsThereAWinner,
        clickedResponses,
        startRandomQuestion: () =>
            startRandomQuestion(
                socket,
                setQuestionsExecuted,
                questionsExecuted,
                quizData?.number_of_questions,
                quizId,
                quizData.list_of_questions
            ),
    };
};
export default useQuizLogic;
