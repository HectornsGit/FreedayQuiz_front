'use client';
import TextInput from '@/components/TextInput';
import NumberInput from '@/components/NumberInput';
import Clock from '@/components/Clock';
import ListAnswerInputs from './ListAnswerInputs';
import YellowBgPencil from '@/components/icons/YellowBgPencil';
import { useEffect, useState } from 'react';

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
    } = managerProps;

    const answersInputsProps = [
        {
            text: 'Opción A',
            id: 'optionA',
            name: 'optionA',
            value: findValue('optionA', shuffledQuestionResponses),
            handleChange: handleQuestionChange,
        },
        {
            text: 'Opción B',
            id: 'optionB',
            name: 'optionB',
            value: findValue('optionB', shuffledQuestionResponses),
            handleChange: handleQuestionChange,
        },
        {
            text: 'Opción C',
            id: 'optionC',
            name: 'optionC',
            value: findValue('optionC', shuffledQuestionResponses),
            handleChange: handleQuestionChange,
        },
        {
            text: 'Respuesta Correcta',
            id: 'correctAnswer',
            name: 'correctAnswer',
            value: findValue('correctAnswer', shuffledQuestionResponses),
            handleChange: handleQuestionChange,
        },
    ];
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
        <section>
            <header>
                <ul className="flex justify-between">
                    <li>
                        {sessionTimeLeft && <Clock time={sessionTimeLeft} />}
                    </li>
                    <li>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setIsInput(!isInput);
                            }}
                        >
                            <YellowBgPencil
                                className={'rounded-sm p-1 w-10 h-10'}
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
            {playerData && (
                <section>
                    <h2>Jugadores: {connectedClients}</h2>
                    <ul>
                        {playerData.map((player) => (
                            <li key={player.id}>
                                Nickname: {player.name} Puntos:{' '}
                                {player.totalScore} Streak: {player.streak}
                                Puntos ultima pregunta:
                                {player.lastCorrectAnswer}
                                State: {player.state}
                            </li>
                        ))}
                    </ul>
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
                            text={'Pregunta Siguiente'}
                            id={'question'}
                            name={'question'}
                            value={findValue(
                                'question',
                                shuffledQuestionResponses
                            )}
                            handleChange={handleQuestionChange}
                            isInput={isInput}
                        ></TextInput>

                        <ListAnswerInputs
                            answerPropsList={answersInputsProps}
                        ></ListAnswerInputs>

                        <button
                            className="text-black font-extrabold text-lg bg-white px-11 py-2 
    hover:bg-black hover:text-white hover:box-shadow-white mt-5 col-span-2"
                            type="button"
                            onClick={updateQuestionDataInBackend}
                        >
                            Actualiza la pregunta
                        </button>
                    </form>
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
            <button onClick={signOutHandler}>Cerrar sesión</button>
        </section>
    );
};
export default MatchComponentAsManager;
