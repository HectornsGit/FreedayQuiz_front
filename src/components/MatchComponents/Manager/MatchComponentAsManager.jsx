'use client';
import TextInput from '@/components/TextInput';
import Accordion from '@/components/Accordion';
import NumberInput from '@/components/NumberInput';
import Clock from '@/components/Clock';
import YellowBgPencil from '@/components/icons/YellowBgPencil';
import { useEffect, useState } from 'react';
import AnswerInputComponent from './AnswerInputComponent';
import ManagerButton from './ManagerButton';

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
        startRandomQuestion,
    } = managerProps;

    // Iconos para las respuestas.
    const answerNames = ['🌞', '🌜', '🌟', '⚡'];

    const disableButton =
        showScores || (isQuestionRunning && timeLeft > 0) ? true : false;
    const disableQuestionsButton = isQuestionRunning ? true : false;

    const [isInput, setIsInput] = useState(false);

    if (!sessionTime) {
        return (
            <>
                <form onSubmit={setSessionTimeHandler}>
                    <label htmlFor="session">
                        Establezca la duración máxima de la sesión (en minutos)
                    </label>
                    <input type="number" id="session" name="session" required />
                    <button>Enviar</button>
                </form>
            </>
        );
    }

    return (
        <section className="w-11/12 mx-2">
            <header className="flex flex-col">
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
                {quizData && (
                    <h1 className="text-3xl font-bold">{quizData?.title}</h1>
                )}
            </header>
            {loggedUserId && loggedUserId == quizData?.owner_id && (
                <section className="flex-col justify-center">
                    {question && (
                        <form
                            id={'questionForm'}
                            onSubmit={updateQuestionDataInBackend}
                            className="flex sm:items-center items-start gap-4 flex-col"
                        >
                            <NumberInput
                                text={'Límite de tiempo (en segundos)'}
                                id={'questionTime'}
                                name={'questionTime'}
                                isInput={isInput}
                                defaultValue={question.questionTime}
                                handleChange={handleQuestionChange}
                            ></NumberInput>
                            {isInput ? (
                                <TextInput
                                    text={'Texto pregunta'}
                                    id={'question'}
                                    name={'question'}
                                    value={findValue(
                                        'question',
                                        shuffledQuestionResponses
                                    )}
                                    handleChange={handleQuestionChange}
                                    isInput={isInput}
                                ></TextInput>
                            ) : (
                                <p>Texto pregunta</p>
                            )}
                            <select
                                className=" sm:w-96 w-full font-bold mb-4  p-2  text-black text-md py-2"
                                onChange={getQuestionFromList}
                                disabled={disableQuestionsButton}
                            >
                                {quizData &&
                                    quizData.list_of_questions?.map(
                                        (question, index) => (
                                            <option
                                                className="font-semibold py-2 selection:bg-slate-400"
                                                key={index}
                                                value={question.number}
                                            >
                                                {`${question.number}. ${question.title}`}
                                            </option>
                                        )
                                    )}
                            </select>
                            <ul className="flex flex-col self-center w-full items-center lg:gap-8 gap-6">
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
                                        isInput={isInput}
                                        id={'correctAnswer'}
                                        updateForm={updateQuestionDataInBackend}
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
                                        isInput={isInput}
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
                                        isInput={isInput}
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
                                        isInput={isInput}
                                        id={'optionC'}
                                    ></AnswerInputComponent>
                                </li>
                            </ul>
                            {isInput && (
                                <button
                                    className="text-black font-extrabold text-lg bg-white px-11 py-2 
    hover:bg-black hover:text-white hover:box-shadow-white mt-5 col-span-2"
                                    type="submit"
                                >
                                    Actualiza la pregunta
                                </button>
                            )}
                        </form>
                    )}
                    <ul className="flex gap-4">
                        <li>
                            <ManagerButton
                                text="Nueva pregunta"
                                isPrimary={false}
                                disabled={false}
                                handleClick={
                                    question
                                        ? nextQuestionHandler
                                        : handleStartQuiz
                                }
                            />
                        </li>
                        <li>
                            <ManagerButton
                                text="Iniciar pregunta"
                                isPrimary={true}
                                disabled={false}
                                handleClick={initQuestion}
                            />
                        </li>
                    </ul>
                    <ManagerButton
                        isPrimary={true}
                        handleClick={showScoresHandler}
                        disabled={true}
                        text="Puntaciones"
                    ></ManagerButton>
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
