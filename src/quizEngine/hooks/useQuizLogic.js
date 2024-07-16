/* eslint-disable react-hooks/exhaustive-deps */
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams, useRouter } from 'next/navigation';
import {
    shuffleArray,
    findValue,
    startNewPlayer,
    signOutHandler,
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
} from '../handlers/index';

const useQuizLogic = () => {
    const params = useParams();
    const router = useRouter();
    const { data: session } = useSession();

    //Estados para manejar el master, con los datos comunes de todos los jugadores en tiempo real del quiz:
    const [quizData, setQuizData] = useState(null);
    const [question, setQuestion] = useState(null);
    const [playerData, setPlayerData] = useState([]);
    const [clickedResponses, setClickedResponses] = useState({});

    //Estados del cliente local, con la información particular del jugador:
    const [initialPlayerData, setInitialPlayerData] = useState([]);
    const [nickName, setNickName] = useState('');
    const [isNameSetted, setIsNameSetted] = useState(false);

    //Estados que se manejan automáticamente:
    const [_joinedQuiz, setJoinedQuiz] = useState(false);
    const [socket, setSocket] = useState(null);
    const [error, setError] = useState(null);
    const [shuffledQuestionResponses, setShuffledQuestionResponses] =
        useState(null);
    const [isQuestionRunning, setIsQuestionRunning] = useState(false);
    const [questionsToDelete, setQuestionsToDelete] = useState([]);
    const [timeLeft, setTimeLeft] = useState(null);
    const [showScores, setShowScores] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [sessionRecovery, setSessionRecovery] = useState(true);
    const [sessionTime, setSessionTime] = useState(0);
    const [sessionTimeLeft, setSessionTimeLeft] = useState(0);
    const [connectedClients, setConnectedClients] = useState(0);
    const [, setIsMasterOnline] = useState(false);

    //Para activar la recuperación y sincronización de datos en caso de que salga de la pantalla o la refresque por error:
    const loggedUserId = session?.user.data.id;
    const quizId = params.quizId.toString();
    let playerId;
    let playerName;
    let sameQuiz;
    let quizSessionDuration;

    //Si el quizId es diferente, se desecha el anterior playerId. Si es igual, se recupera:
    sameQuiz = window.localStorage.getItem('quizId');
    playerId =
        sameQuiz === quizId && window.localStorage.getItem('idNewPlayer');
    playerName = window.localStorage.getItem('playerName');
    //Solo para el master:
    quizSessionDuration = window.localStorage.getItem('QuizSessionDuration');

    //Solo se ejecutará una vez al montar el componente, para evitar el bucle infinito de renderizaciones:
    useEffect(() => {
        if (!playerId) {
            playerId = uuidv4();
            window.localStorage.setItem('idNewPlayer', playerId);
            window.localStorage.setItem('quizId', quizId);
            setSessionRecovery(false);
        }
        if (playerName) {
            setIsNameSetted(true);
        }
        if (quizSessionDuration) {
            setSessionTime(quizSessionDuration);
        }
    }, [playerId]);

    //Aquí van los handlers que necesitan useCallback:
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
        setClickedResponses,
        setIsMasterOnline,
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
            question
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
        initQuestion: () => initQuestion(socket, quizId, question),
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
            quizData?.number_of_questions
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
        sessionTimeLeft,
        clickedResponses,
    };
};
export default useQuizLogic;
