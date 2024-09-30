'use client';
import QuestionTitleInput from './QuestionTitleInput';
import ClockInput from '@/components/ClockInput';
import Clock from '@/components/Clock';
import YellowBgPencil from '@/components/icons/YellowBgPencil';
import { useEffect, useMemo, useRef, useState } from 'react';
import ListAnswerInputs from './ListAnswerInputs';
import ManagerButton from './ManagerButton';
import QuestionImage from '../QuestionImage';
import ListPlayerStats from '../ListPlayerStats';
import GenerateCSVButton from '@/components/GenerateCSVButton';
import TrashCan from '@/components/icons/TrashCan';
import ScoreButton from './ScoreButton';
import Exit from '@/components/icons/Exit';
import UsersLogo from '@/components/icons/UsersLogo';
import CrossLogo from '@/components/icons/crossLogo';
import ListAnswerManagerComponent from './ListAnswerManagerComponent';
import { startRandomAutomaticQuestion } from '@/quizEngine/handlers';
import { countdownTimer } from '@/quizEngine/utils';

const MatchComponentAsManager = ({ managerProps }) => {
    const hiddenTextRef = useRef(null);

    const {
        endQuiz,
        handleQuestionChange,
        updateQuestionDataInBackend,
        handleStartQuiz,
        question,
        quizData,
        loggedUserId,
        initQuestion,
        timeLeft,
        showScoresHandler,
        isQuestionRunning,
        sessionTime,
        setSessionTimeHandler,
        sessionTimeLeft,
        deleteQuestionHandler,
        getQuestionFromList,
        setIsClockInput,
        isClockInput,
        isInput,
        setIsInput,
        playerData,
        requestSetWinnerOn,
        isThereAWinner,
        startRandomQuestion,
        socket,
        setQuestionsExecuted,
        automaticCountDown,
        quizId,
    } = managerProps;

    // Estado para controlar el modal de los jugadores
    const [showPlayers, setShowPlayers] = useState(false);
    const [isAutomaticOn, setIsAutomaticOn] = useState(false);
    const [disableWhenAutomatic, setDisableWhenAutomatic] = useState(false);
    const answersList = useMemo(() => {
        if (question) {
            const answers = [];
            for (const [key, value] of Object.entries(question)) {
                if (value === null || value === undefined) {
                    continue;
                }
                if (key === 'correctAnswer') {
                    answers.push({
                        key: 'optionD',
                        value: value,
                        isCorrect: true,
                    });
                }
                if (['optionA', 'optionB', 'optionC'].includes(key)) {
                    answers.push({ key: key, value: value, isCorrect: false });
                }
            }
            return answers;
        }
    }, [question]);
    // Variable que controla los botones de mostrar puntuaciones
    const disableQuestionsButton = isQuestionRunning ? true : false;

    //Creo este handle para mostrar al PLayer tanto la puntuacion como el ganador a la vez
    const handleFinalScore = (e) => {
        showScoresHandler();
        requestSetWinnerOn(e);
    };

    useEffect(() => {
        if (!question) {
            handleStartQuiz();
        } else {
        }
    }, [sessionTime, question, handleStartQuiz]);

    //Sistema de automatización del quiz:
    const isRunningRef = useRef(false);
    const handleSwitchOffAutomatic = () => {
        setIsAutomaticOn(false);
        isRunningRef.current = false;
        setDisableWhenAutomatic(false);
    };

    const automatizQuiz = async () => {
        let backData;
        let time = 5;

        const atomaticQuizEngine = async () => {
            try {
                socket.emit('startAutomaticCountDown', quizId);
                await countdownTimer(time);

                const automatic = await new Promise((resolve, reject) => {
                    if (!backData) {
                        startRandomQuestion();
                    } else {
                        startRandomAutomaticQuestion(
                            socket,
                            setQuestionsExecuted,
                            backData.executedList,
                            backData.number_of_questions,
                            backData.quizId,
                            JSON.parse(backData.list_of_questions)
                        );
                    }

                    if (socket) {
                        socket.on('questionStarted', (_quizId, automatic) => {
                            resolve(automatic);
                        });

                        socket.on('error', (error) => {
                            reject(error);
                        });
                    } else {
                        reject(new Error('Socket no disponible'));
                    }
                });

                backData = automatic;
                const totalTime = question.questionTime * 1000;

                await new Promise((resolve) => {
                    if (socket) {
                        socket.on('timeUp2', () => {
                            resolve();
                        });
                    }
                    setTimeout(resolve, totalTime);
                });
                if (!isRunningRef.current) {
                    return;
                }
                await new Promise((resolve) => {
                    setTimeout(resolve, 3000);
                });
                showScoresHandler();
            } catch (error) {
                console.error('Error al iniciar la pregunta:', error);
            }
        };

        isRunningRef.current = true;
        setIsAutomaticOn(true);
        setDisableWhenAutomatic(true);

        do {
            if (!isRunningRef.current) {
                break;
            }
            await atomaticQuizEngine();
        } while (backData.validNumbers.length > 1);

        if (isRunningRef.current) {
            handleFinalScore();
            setIsAutomaticOn(false);
        }
    };

    // Antes de marcar el tiempo de sesión.
    if (!sessionTime) {
        return (
            <section>
                {quizData && (
                    <div>
                        <h1 className="text-3xl font-bold my-8">
                            {quizData?.title}
                        </h1>
                    </div>
                )}
                <form
                    className="flex flex-col items-center"
                    onSubmit={setSessionTimeHandler}
                >
                    <label className="text-xl mb-4" htmlFor="session">
                        Duración máxima de la sesión (en minutos)
                    </label>
                    <input
                        className='font-semibold  w-11/12 mb-10  p-2  text-black text-md py-2"'
                        type="number"
                        id="session"
                        name="session"
                        required
                    />
                    <ManagerButton text={'Aceptar'} />
                </form>
            </section>
        );
    }

    return (
        // Sección principal
        <section className=" lg:w-full  lg:items-start lg:grid lg:grid-cols-[0.44fr_1.2fr_0.44fr] lg:grid-rows-[0.2fr_1.3fr_1fr] lg:gap-0 w-11/12 mx-2 flex flex-col  items-center">
            {
                // Encabezado principal
            }
            <header className="lg:col-span-1 lg:col-start-2  items-center  lg:row-span-1 flex flex-col mb-6 w-full">
                {
                    // Reloj con el tiempo de la sesión
                    sessionTimeLeft > 0 && (
                        <Clock
                            time={sessionTimeLeft}
                            setSessionTimeHandler={setSessionTimeHandler}
                            isClockInput={isClockInput}
                            setIsClockInput={setIsClockInput}
                        />
                    )
                }

                {
                    // Título y código de acceso al quiz
                    quizData && (
                        <div className="flex flex-col items-center">
                            <h1 className="text-3xl font-bold">
                                {quizData?.title}
                            </h1>
                            <p className="text-lg text-[--yellow]">
                                PIN: {quizData?.access_code}
                            </p>
                        </div>
                    )
                }
            </header>
            {
                // Lista de jugadores (solo se muestra en pantalla grande)
            }
            <aside
                className={
                    (showPlayers ? 'xl:visible ' : 'xl:invisible ') +
                    ' pb-4 lg:row-span-2 h-[900px] bg-gradient-to-r from-[--yellow] to-[--cyan] lg:row-start-2  xl:flex lg:invisible lg:flex hidden '
                }
            >
                {showPlayers && playerData && (
                    <div className=" overflow-y-clip  flex flex-col items-start bg-zinc-950  h-full w-full mr-2 my-2">
                        <header className="flex justify-between w-full px-6 items-center">
                            <h1 className="text-2xl font-bold text-left self-start pt-8  p-4 mb-4">
                                Jugadores
                            </h1>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowPlayers(false);
                                }}
                            >
                                <div className="bg-black pr-1 pb-1 active:bg-white">
                                    <CrossLogo
                                        className={
                                            'active:bg-black active:fill-white  w-10 h-10 p-2 bg-white fill-black'
                                        }
                                    ></CrossLogo>
                                </div>
                            </button>
                        </header>
                        <div className="w-full pl-2 pr-4">
                            <ListPlayerStats
                                players={playerData}
                            ></ListPlayerStats>
                        </div>
                    </div>
                )}
            </aside>
            {
                // Comprueba que el usuario es el dueño del quiz
                loggedUserId && loggedUserId == quizData?.owner_id && (
                    <section className=" max-w-full lg:col-span-1 lg:row-span-2 lg:row-start-2 flex-col justify-center ">
                        {
                            // Sección de la pregunta
                            question && (
                                <section className="flex flex-col justify-center">
                                    <QuestionImage
                                        image={question.image}
                                    ></QuestionImage>
                                    <form
                                        id={'questionForm'}
                                        onSubmit={updateQuestionDataInBackend}
                                        className="flex sm:items-center items-start  self-center sm:w-5/6 gap-4 flex-col"
                                    >
                                        <ClockInput
                                            id={'questionTime'}
                                            name={'questionTime'}
                                            isInput={isInput}
                                            defaultValue={question.questionTime}
                                            handleChange={handleQuestionChange}
                                            timeLeft={timeLeft}
                                            isQuestionRunning={
                                                isQuestionRunning
                                            }
                                        ></ClockInput>
                                        {
                                            // Versión editable de la pregunta
                                            isInput && (
                                                <QuestionTitleInput
                                                    text={'Pregunta'}
                                                    id={'question'}
                                                    name={'question'}
                                                    defaultValue={
                                                        question.question
                                                    }
                                                    handleChange={
                                                        handleQuestionChange
                                                    }
                                                    isInput={isInput}
                                                />
                                            )
                                        }
                                        {
                                            // Versión no editable de la pregunta
                                            isInput === false && (
                                                <ul className="flex justify-between 2xl:w-4/6  w-full gap-2">
                                                    <li className="justify-self-start grow ">
                                                        <select
                                                            className="sm:5/6s w-full md:w-full  font-bold mb-2  p-2  z-10 text-black text-sm sm:text-md py-2"
                                                            onChange={
                                                                getQuestionFromList
                                                            }
                                                            disabled={
                                                                disableQuestionsButton
                                                            }
                                                            value={
                                                                question.questionNumber
                                                            }
                                                        >
                                                            {quizData &&
                                                                quizData.list_of_questions?.map(
                                                                    (
                                                                        question,
                                                                        index
                                                                    ) => {
                                                                        return (
                                                                            <option
                                                                                className=" whitespace-pre-wrap font-semibold py-2 selection:bg-slate-400"
                                                                                key={
                                                                                    index
                                                                                }
                                                                                value={
                                                                                    question.number
                                                                                }
                                                                            >
                                                                                {window.innerWidth <
                                                                                1280
                                                                                    ? window.innerWidth <
                                                                                      400
                                                                                        ? `${question.number}. ${question.title}`
                                                                                              .length >
                                                                                          26
                                                                                            ? `${question.number}. ${question.title}`.substring(
                                                                                                  0,
                                                                                                  26
                                                                                              ) +
                                                                                              '...'
                                                                                            : `${question.number}. ${question.title}`
                                                                                        : `${question.number}. ${question.title}`
                                                                                                .length >
                                                                                            50
                                                                                          ? `${question.number}. ${question.title}`.substring(
                                                                                                0,
                                                                                                48
                                                                                            ) +
                                                                                            '...'
                                                                                          : `${question.number}. ${question.title}`
                                                                                    : `${question.number}. ${question.title}`}
                                                                            </option>
                                                                        );
                                                                    }
                                                                )}
                                                        </select>
                                                    </li>
                                                    <li
                                                        className={
                                                            (isInput
                                                                ? 'pb-10 '
                                                                : '') +
                                                            'self-center'
                                                        }
                                                    >
                                                        <button
                                                            disabled={
                                                                disableQuestionsButton
                                                            }
                                                            type="button"
                                                            className="text-[--yellow] text-sm"
                                                            onClick={
                                                                deleteQuestionHandler
                                                            }
                                                        >
                                                            <TrashCan
                                                                className={
                                                                    'rounded-sm p-1 w-8  bg-[--yellow]'
                                                                }
                                                            ></TrashCan>
                                                        </button>
                                                    </li>
                                                </ul>
                                            )
                                        }
                                        {
                                            // Párrafo con todo el texto de la pregunta
                                            window.innerWidth < 1280 &&
                                                question.question.length >
                                                    26 && (
                                                    <p
                                                        ref={hiddenTextRef}
                                                        className=" visible xl:invisible h-12 w-full lg:w-80 relative  bg-[yellow] text-left  font-bold mb-4  p-2 z-10 text-black text-xs py-2"
                                                    >
                                                        {question.question}
                                                    </p>
                                                )
                                        }
                                        {
                                            /*Este es el valor de la cuenta atrás antes de que empiece la pregunta automática*/
                                            isAutomaticOn && (
                                                <p className="font-extrabold text-2xl font-freedayquiz ">
                                                    {automaticCountDown}
                                                </p>
                                            )
                                        }
                                        {isAutomaticOn == false && (
                                            <section className="lg:row-span-2 self-center">
                                                {
                                                    // Grid con las respuestas
                                                    isInput
                                                        ? answersList.length >
                                                              0 && (
                                                              <ListAnswerInputs
                                                                  answers={
                                                                      answersList
                                                                  }
                                                              />
                                                          )
                                                        : answersList.length >
                                                              0 && (
                                                              <ListAnswerManagerComponent
                                                                  answers={
                                                                      answersList
                                                                  }
                                                              />
                                                          )
                                                }
                                            </section>
                                        )}
                                        {
                                            // Botones de guardar cambios y volver del modo edición
                                            isInput && (
                                                <div className="flex gap-2 items-center">
                                                    <button
                                                        className="text-black self-center font-extrabold text-lg bg-white px-11 py-2 
    hover:bg-black hover:text-white hover:box-shadow-white mt-5 col-span-2"
                                                        type="submit"
                                                    >
                                                        Guardar
                                                    </button>
                                                    <button
                                                        className="text-black self-center font-extrabold text-lg bg-white px-11 py-2 
    hover:bg-black hover:text-white hover:box-shadow-white mt-5 col-span-2"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setIsInput(
                                                                !isInput
                                                            );
                                                        }}
                                                    >
                                                        Volver
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </form>
                                </section>
                            )
                        }
                        {
                            // Botones de control de la partida
                            isInput == false && (
                                <ul className="flex flex-col  justify-center items-center mt-8 gap-6">
                                    <li>
                                        {
                                            // Botones que controlan el modo de juego
                                        }
                                        <ul className="flex flex-col sm:flex-row justify-start gap-6 sm:items-center items-start sm:justify-between ">
                                            <li>
                                                <h3 className="font-semibold  ">
                                                    Modo de juego:
                                                </h3>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="rounded-full w-5 h-5 border border-white  disabled:bg-white disabled:p-2 flex items-center justify-center ">
                                                    <button
                                                        className="  rounded-full w-4 h-4  disabled:w-3 disabled:h-3 disabled:bg-white"
                                                        onClick={automatizQuiz}
                                                        disabled={isAutomaticOn}
                                                    ></button>
                                                </div>
                                                <span>Automático</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="rounded-full w-5 h-5 border border-white  disabled:bg-white disabled:p-2 flex items-center justify-center ">
                                                    <button
                                                        className="  rounded-full w-4 h-4   disabled:w-3 disabled:h-3 disabled:bg-white"
                                                        onClick={
                                                            handleSwitchOffAutomatic
                                                        }
                                                        disabled={
                                                            !isAutomaticOn
                                                        }
                                                    ></button>
                                                </div>
                                                <span>Manual</span>
                                            </li>
                                        </ul>
                                    </li>
                                    {
                                        // Botones que controlan el modo manual
                                        isAutomaticOn == false && (
                                            <li className=" w-full flex flex-col items-center justify-center gap-2">
                                                <ul className="w-full flex flex-col items-center justify-center gap-4">
                                                    <li>
                                                        <ul className="flex  justify-center items-center mt-4 gap-4">
                                                            <li className="">
                                                                <ManagerButton
                                                                    text="Iniciar pregunta"
                                                                    isPrimary={
                                                                        true
                                                                    }
                                                                    disabled={
                                                                        isQuestionRunning
                                                                    }
                                                                    handleClick={
                                                                        initQuestion
                                                                    }
                                                                />
                                                            </li>
                                                            <li>
                                                                <ManagerButton
                                                                    text={
                                                                        'Pregunta aleatoria'
                                                                    }
                                                                    disabled={
                                                                        isQuestionRunning
                                                                    }
                                                                    handleClick={
                                                                        startRandomQuestion
                                                                    }
                                                                ></ManagerButton>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li className="md:w-5/12 w-full ">
                                                        <ScoreButton
                                                            handleClick={
                                                                showScoresHandler
                                                            }
                                                            disabled={
                                                                isAutomaticOn
                                                                    ? disableWhenAutomatic
                                                                    : !isQuestionRunning ||
                                                                      timeLeft >
                                                                          0
                                                            }
                                                            text={
                                                                'Puntuaciones'
                                                            }
                                                        />
                                                    </li>
                                                    <li className="md:w-5/12 w-full ">
                                                        <div className="flex flex-col items-center">
                                                            <ScoreButton
                                                                handleClick={
                                                                    handleFinalScore
                                                                }
                                                                disabled={
                                                                    isAutomaticOn
                                                                        ? disableWhenAutomatic
                                                                        : !isQuestionRunning ||
                                                                          timeLeft >
                                                                              0
                                                                }
                                                                primary={true}
                                                                text={
                                                                    'Puntuación final'
                                                                }
                                                            />
                                                        </div>
                                                    </li>
                                                </ul>
                                            </li>
                                        )
                                    }
                                    {isAutomaticOn && (
                                        <li className="  w-full flex flex-col items-center justify-center gap-2">
                                            <ul className="w-full flex flex-col items-center justify-center gap-4">
                                                <li>
                                                    <ManagerButton
                                                        text={'Empezar Juego'}
                                                        isPrimary
                                                    ></ManagerButton>
                                                </li>
                                                <li>
                                                    <ManagerButton
                                                        text={'Pausar Juego'}
                                                    ></ManagerButton>
                                                </li>
                                            </ul>
                                        </li>
                                    )}
                                    <li className="md:w-5/12 w-full ">
                                        {playerData.length > 0 &&
                                            isThereAWinner && (
                                                <GenerateCSVButton
                                                    playerData={playerData}
                                                    quizData={quizData}
                                                />
                                            )}
                                    </li>
                                    {
                                        // Botones de abajo
                                    }
                                    <li>
                                        <ul className="flex gap-8">
                                            <li className="">
                                                <button
                                                    className=""
                                                    onClick={endQuiz}
                                                >
                                                    <Exit
                                                        className={
                                                            'rounded-sm  w-12 p-2 bg-[--yellow]'
                                                        }
                                                    ></Exit>
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault;
                                                        setShowPlayers(
                                                            !showPlayers
                                                        );
                                                    }}
                                                >
                                                    <UsersLogo
                                                        className={
                                                            '  rounded-sm px-2 py-2 w-12 h-12  bg-[--yellow]'
                                                        }
                                                    ></UsersLogo>
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setIsInput(!isInput);
                                                    }}
                                                >
                                                    <YellowBgPencil
                                                        className={
                                                            'rounded-sm p-2 w-12'
                                                        }
                                                    ></YellowBgPencil>
                                                </button>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            )
                        }
                    </section>
                )
            }
            {
                // Puntuaciones de los jugadores en pantallas pequeñas
            }
            <article
                className={
                    ' bg-gradient-to-r from-[--yellow] to-[--cyan] sm:w-3/6 lg:w-96 xl:hidden w-screen h-screen z-30 fixed top-0 left-0  py-2 pr-2 ' +
                    (!showPlayers ? 'hidden' : '')
                }
            >
                <div className="bg-black w-full h-full ">
                    <header className="flex p-2 justify-between items-center">
                        <h2 className="p-2 text-2xl font-bold text-left">
                            Jugadores
                        </h2>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setShowPlayers(false);
                            }}
                        >
                            <div className="bg-black pr-1 pb-1 active:bg-white">
                                <CrossLogo
                                    className={
                                        'active:bg-black active:fill-white  w-10 h-10 p-2 bg-white fill-black'
                                    }
                                ></CrossLogo>
                            </div>
                        </button>
                    </header>
                    <ListPlayerStats players={playerData}></ListPlayerStats>
                </div>
            </article>
            {
                // Este div es necesario para la alineación del diseño
            }
            <div className="lg:row-span-2 min-w-72 w-1/3"></div>
        </section>
    );
};
export default MatchComponentAsManager;
