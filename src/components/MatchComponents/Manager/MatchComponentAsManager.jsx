'use client';
import TextInput from '@/components/TextInput';
import Accordion from '@/components/Accordion';
import NumberInput from '@/components/NumberInput';
import Clock from '@/components/Clock';
import YellowBgPencil from '@/components/icons/YellowBgPencil';
import { useEffect, useState } from 'react';
import AnswerInputComponent from './AnswerInputComponent';

const MatchComponentAsManager = ({ managerProps }) => {
    const {
        signOutHandler,
        endQuiz,
        findValue,
        handleQuestionChange,
        handleQuizChange,
        updateQuestionDataInBackend,
        updateQuizDataInBackend,
        nextQuestionHandler,
        previousQuestionHandler,
        handleStartQuiz,
        question,
        quizData,
        loggedUserId,
        playerData,
        shuffledQuestionResponses,
        initQuestion,
        timeLeft,
        showScoresHandler,
        connectedClients,
        isQuestionRunning,
        showScores,
        sessionTime,
        setSessionTimeHandler,
        sessionTimeLeft,
        deleteQuestionHandler,
        getQuestionFromList,
    } = managerProps;
    // Iconos para las respuestas.
    const answerNames = ['🌞', '🌜', '🌟', '⚡'];
    const disableButton =
        showScores || (isQuestionRunning && timeLeft > 0) ? true : false;

    const [isInput, setIsInput] = useState(false);

    if (!sessionTime) {
        return (
            <>
                <form onSubmit={setSessionTimeHandler}>
                    <label htmlFor="session">
                        Establezca la duración máxima de la sesión (en minutos)
                    </label>
                    <input type="text" id="session" name="session" required />
                    <button>Enviar</button>
                </form>
            </>
        );
    }

    return (
        <section className="mx-6">
            <header>
                <ul className="flex grow  h-12 items-center justify-between">
                    <li>
                        {sessionTimeLeft > 0 && (
                            <Clock
                                time={sessionTimeLeft}
                                setSessionTimeHandler={setSessionTimeHandler}
                                isInput={isInput}
                            />
                        )}
                    </li>
                    <li>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setIsInput(!isInput);
                            }}
                        >
                            <YellowBgPencil
                                className={'rounded-sm p-1 w-8'}
                            ></YellowBgPencil>
                        </button>
                    </li>
                </ul>
            </header>
            {quizData && (
                <section className="border-red-500 border">
                    <article>
                        <h1 className="text-3xl font-bold">
                            {quizData?.title}
                        </h1>
                    </article>
                </section>
            )}
            {loggedUserId && loggedUserId == quizData?.owner_id && (
                <section className="flex flex-col justify-center">
                    {/* <form className="md:flex-row  justify-center items-center gap-2 flex flex-col">
                        <TextInput
                            text={'Título'}
                            id={'title'}
                            value={quizData?.title}
                            handleChange={handleQuizChange}
                            isInput={isInput}
                        ></TextInput>
                        <TextInput
                            text={'Descripción'}
                            id={'description'}
                            value={quizData?.description}
                            handleChange={handleQuizChange}
                            isInput={isInput}
                        ></TextInput>

                        <button
                            className="text-black font-extrabold text-lg bg-white px-11 py-2 
    hover:bg-black hover:text-white hover:box-shadow-white mt-5"
                            onClick={updateQuizDataInBackend}
                        >
                            Envíar
                        </button>
                    </form> */}
                    {question && (
                        <form className="flex items-start flex-col">
                            <NumberInput
                                text={'Límite de tiempo (en segundos)'}
                                id={'questionTime'}
                                name={'questionTime'}
                                isInput={isInput}
                                value={findValue(
                                    'questionTime',
                                    shuffledQuestionResponses
                                )}
                                handleChange={handleQuestionChange}
                            ></NumberInput>
                            <TextInput
                                text={'Texto pregunta'}
                                id={'question'}
                                name={'question'}
                                value={question?.question}
                                handleChange={handleQuestionChange}
                                isInput={isInput}
                            ></TextInput>
                            <ul className="flex flex-col w-full items-center lg:gap-8 gap-6">
                                <li
                                    key={'correctAnswer'}
                                    className={
                                        'p-[3PX] bg-gradient-to-r  flex items-center    from-indigo-700 from-9% via-sky-500 via-50% to-cyan-400 to-94%'
                                    }
                                >
                                    <AnswerInputComponent
                                        logo={answerNames[0]}
                                        defaultValue={question?.correctAnswer}
                                        handleQuestionChange={
                                            handleQuestionChange
                                        }
                                        id={'correctAnswer'}
                                    ></AnswerInputComponent>
                                </li>
                                <li
                                    key={'optionA'}
                                    className={
                                        'p-[3PX] bg-gradient-to-r  flex items-center    from-indigo-700 from-9% via-sky-500 via-50% to-cyan-400 to-94%'
                                    }
                                >
                                    <AnswerInputComponent
                                        logo={answerNames[1]}
                                        defaultValue={question?.optionA}
                                        handleQuestionChange={
                                            handleQuestionChange
                                        }
                                        id={'optionA'}
                                    ></AnswerInputComponent>
                                </li>
                                <li
                                    key={'optionB'}
                                    className={
                                        'p-[3PX] bg-gradient-to-r  flex items-center    from-indigo-700 from-9% via-sky-500 via-50% to-cyan-400 to-94%'
                                    }
                                >
                                    <AnswerInputComponent
                                        logo={answerNames[2]}
                                        defaultValue={question?.optionB}
                                        handleQuestionChange={
                                            handleQuestionChange
                                        }
                                        id={'optionB'}
                                    ></AnswerInputComponent>
                                </li>
                                <li
                                    key={'optionC'}
                                    className={
                                        'p-[3PX] bg-gradient-to-r  flex items-center    from-indigo-700 from-9% via-sky-500 via-50% to-cyan-400 to-94%'
                                    }
                                >
                                    <AnswerInputComponent
                                        logo={answerNames[3]}
                                        defaultValue={question?.optionC}
                                        handleQuestionChange={
                                            handleQuestionChange
                                        }
                                        id={'optionC'}
                                    ></AnswerInputComponent>
                                </li>
                            </ul>
                            {isInput && (
                                <button
                                    className="text-black font-extrabold text-lg bg-white px-11 py-2 
    hover:bg-black hover:text-white hover:box-shadow-white mt-5 col-span-2"
                                    type="button"
                                    onClick={updateQuestionDataInBackend}
                                >
                                    Actualiza la pregunta
                                </button>
                            )}
                        </form>
                    )}
                    <button
                        className="text-black font-extrabold text-lg bg-white px-11 py-2 
    hover:bg-black hover:text-white hover:box-shadow-white mt-5"
                        onClick={
                            question ? nextQuestionHandler : handleStartQuiz
                        }
                    >
                        Nueva pregunta
                    </button>
                    <button
                        className="text-black font-extrabold text-lg bg-white px-11 py-2 
    hover:bg-black hover:text-white hover:box-shadow-white mt-5"
                        onClick={initQuestion}
                    >
                        Iniciar pregunta para los jugadores
                    </button>
                    <button
                        className="text-black font-extrabold text-lg bg-white px-11 py-2 
    hover:bg-black hover:text-white hover:box-shadow-white mt-5"
                        onClick={showScoresHandler}
                    >
                        Mostrar puntaciones
                    </button>
                    <button
                        className="text-black font-extrabold text-lg bg-white px-11 py-2 
    hover:bg-black hover:text-white hover:box-shadow-white mt-5"
                        onClick={endQuiz}
                    >
                        Finalizar quiz
                    </button>
                </section>
            )}
            <button onClick={signOutHandler}>Cerrar sesión</button>{' '}
            {playerData && (
                <section>
                    <h2>Jugadores: {connectedClients}</h2>
                    <Accordion title={'mostrar jugadores'}>
                        <header>conectados</header>
                        <ul>
                            {playerData
                                .filter((player) => {
                                    return player.state == 'online';
                                })
                                .map((player) => (
                                    <li key={player.id}>
                                        {player.name}:{player.totalScore}
                                    </li>
                                ))}
                        </ul>{' '}
                        <header>desconectados</header>
                        <ul>
                            {playerData
                                .filter((player) => {
                                    return player.state == 'offline';
                                })
                                .map((player) => (
                                    <li key={player.id}>
                                        {player.name}:{player.totalScore}
                                    </li>
                                ))}
                        </ul>
                    </Accordion>
                </section>
            )}
        </section>
    );
};
export default MatchComponentAsManager;
