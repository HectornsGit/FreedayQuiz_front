import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { setItemWithExpiry } from '../utils';

export const useQuizHandlers = ({
    socket,
    quizId,
    question,
    initialPlayerData,
    setPlayerData,
    playerId,
    nickName,
    setInitialPlayerData,
    loggedUserId,
    timeLeft,
    setIsDisabled,
    setNumberAnswersPerQuestion,
}) => {
    const handleAnswerSubmitted = useCallback(
        (backData) => {
            //Se actualiza para todos los jugadores en cada una de las respuestas de todos los jugadores:
            setPlayerData((prevPlayerData) =>
                prevPlayerData.map((frontData) => {
                    if (frontData.id === backData.id) {
                        return {
                            ...frontData,
                            totalScore: backData.totalScore,
                            streak: backData.streak,
                            lastCorrectAnswer: backData.lastCorrectAnswer,
                            lastAnswer: backData.lastAnswer,
                            lastAnswerText: backData.lastAnswerText,
                        };
                    }
                    return frontData;
                })
            );
            //Contabiliza el número de jugadores que han respondido a la pregunta en curso:
            setNumberAnswersPerQuestion((prevData) => prevData + 1);
        },
        [setPlayerData, setNumberAnswersPerQuestion]
    );

    const handleAnswerSubmit = useCallback(
        (response) => {
            if (socket) {
                socket.emit('submitAnswer', {
                    quizId,
                    questionId: question.id,
                    questionNumber: question.questionNumber,
                    answer: response,
                    playerId: initialPlayerData[0].id,
                    totalTime: question.questionTime,
                    timeTaken: question.questionTime - timeLeft,
                });
                setIsDisabled(true);

                //Guardo el estado de los botones para recuperar en medio de una pregunta:
                setItemWithExpiry('isDisabled', true, 1);

                setInitialPlayerData((prevData) => {
                    prevData[0].lastAnswerText = response;
                    prevData[0].lastQuestionNumber = question.questionNumber;
                    return [...prevData];
                });
            }
        },
        [
            socket,
            quizId,
            question,
            initialPlayerData,
            timeLeft,
            setIsDisabled,
            setInitialPlayerData,
        ]
    );

    const handleInitialPlayerData = useCallback(() => {
        //El campo no puede estar vacío:
        if (nickName.trim() === '') {
            alert('Por favor, introduce tu nombre de jugador.');
            return;
        }
        //Se guarda en el localStorage para comprobar la recuperación de sesión en caso necesario:
        setItemWithExpiry('playerName', nickName, 2);
        toast.dismiss();

        const initialPlayer = {
            id: playerId,
            name: nickName,
            state: 'online',
            totalScore: 0,
            streak: 0,
            lastCorrectAnswer: 0,
            lastAnswer: '',
            lastAnswerText: '',
            lastQuestionNumber: 0,
        };

        setInitialPlayerData((prevPlayerData) => [
            ...prevPlayerData,
            initialPlayer,
        ]);
        //Guardo el nickName y el id en el socket, para acceder a él en caso necesario:
        socket.Mydata = { name: nickName, id: playerId };
        socket.data = { name: nickName, id: playerId };

        if (socket) {
            socket.emit('joinQuiz', playerId, quizId, initialPlayer);
        }

        setTimeout(() => {
            //Se envía petición para sincronizar los datos, por si el quiz está en curso, pero ha de hacerse en último lugar, para que no cree conflicto con los datos que llegan y se actualizan desde el evento joinQuiz:
            socket.emit('requestRecoveryData', quizId);
        }, 0);
    }, [socket, playerId, nickName, quizId, setInitialPlayerData]);

    const handleStartQuiz = useCallback(() => {
        if (socket) {
            socket.emit('startQuiz', loggedUserId, quizId);
        }
    }, [socket, loggedUserId, quizId]);

    return {
        handleAnswerSubmitted,
        handleAnswerSubmit,
        handleInitialPlayerData,
        handleStartQuiz,
    };
};
