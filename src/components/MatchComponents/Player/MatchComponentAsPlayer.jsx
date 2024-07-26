import { useState, useEffect } from 'react';
import QuestionComponent from '../QuestionComponent';
import ManagerButton from '../Manager/ManagerButton';
import YellowBgSendPlane from '@/components/icons/YellowBgSendPlane';

const MatchComponentAsPlayer = ({ playerProps }) => {
    const {
        signOutHandler,
        handleInitialPlayerData,
        quizData,
        question,
        playerData,
        shuffledQuestionResponses,
        handleAnswerSubmit,
        socket,
        setNickName,
        isQuestionRunning,
        timeLeft,
        showScores,
        isDisabled,
        initialPlayerData,
        connectedClients,
        sessionRecovery,
        startNewPlayer,
        isNameSetted,
        recoverySession,
        clickedResponses,
    } = playerProps;

    const answerNames = ['🌞', '🌜', '🌟', '⚡'];

    if (sessionRecovery && isNameSetted) {
        return (
            <section className="flex h-[40vh]  pt-20  flex-col justify-center items-center">
                {quizData && (
                    <h1 className="text-xl font-bold mb-12">
                        {quizData?.title}
                    </h1>
                )}
                <ManagerButton
                    text={'Recuperar sesión'}
                    isPrimary={true}
                    handleClick={recoverySession}
                ></ManagerButton>
                <div className=" w-8 h-8 relative top-4 mt-2 bg-[rgb(18,18,18)] rounded-full text-xl">
                    o
                </div>
                <div className="w-[90vw] sm:w-96  border-b mb-6"></div>
                <ManagerButton
                    text={'Nuevo jugador'}
                    handleClick={startNewPlayer}
                ></ManagerButton>
            </section>
        );
    }
    return (
        <section className="flex flex-col items-center">
            {showScores && !isQuestionRunning ? (
                <>
                    <div>
                        <ul>
                            {playerData.map((player) => (
                                <li key={player.id}>
                                    Nickname: {player.name} Puntos:{' '}
                                    {player.totalScore} Streak: {player.streak}
                                    Puntos ultima pregunta:
                                    {player.lastCorrectAnswer}
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <section className="flex flex-col w-[70vw] lg:w-5/6 sm:w-4/6  items-center">
                    <header className="self-center">
                        {quizData && (
                            <h1 className="text-2xl font-bold mb-12">
                                {quizData?.title}
                            </h1>
                        )}
                    </header>

                    {!isQuestionRunning && (
                        <div className="self-center flex flex-col  items-center mb-8">
                            <p className="font-semibold text-md">
                                Esperando que el master inicie el quiz...
                            </p>
                            <ul className="flex w-full justify-center my-8 gap-4">
                                <li>
                                    <div className=" bg-[--yellow] rounded-full w-8 h-8"></div>
                                </li>
                                <li>
                                    <div className='className=" bg-[--cyan] rounded-full w-8 h-8'></div>
                                </li>
                                <li>
                                    <div className="bg-[--yellow] rounded-full w-8 h-8"></div>
                                </li>
                            </ul>
                        </div>
                    )}

                    {!isQuestionRunning && !showScores && (
                        <p className="self-start font-medium mb-10">
                            Jugadores conectados: {connectedClients}
                        </p>
                    )}
                    <form className="flex self-start items-end">
                        <div className="flex flex-col items-start">
                            <label
                                hidden={socket?.Mydata?.name ? true : false}
                                htmlFor="player"
                            >
                                Nombre
                            </label>
                            <input
                                id="player"
                                type="text"
                                className="font-semibold  p-2  text-black text-md py-1"
                                value={
                                    initialPlayerData[0]?.name &&
                                    initialPlayerData[0]?.name
                                }
                                hidden={socket?.Mydata?.name ? true : false}
                                onChange={(e) => setNickName(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleInitialPlayerData}
                            hidden={socket?.Mydata?.name ? true : false}
                        >
                            <YellowBgSendPlane
                                className={'w-8'}
                            ></YellowBgSendPlane>
                        </button>
                    </form>
                    {!isQuestionRunning && initialPlayerData[0]?.name && (
                        <p className="bg-[--yellow] text-lg font-bold w-36 px-4 self-start text-black text-md py-2 ">
                            {initialPlayerData[0]?.name}
                        </p>
                    )}
                    {question && isQuestionRunning && (
                        <section className="flex flex-col  items-center lg:w-5/6 w-screen ">
                            <QuestionComponent
                                question={question}
                                timeLeft={timeLeft}
                            ></QuestionComponent>
                            {shuffledQuestionResponses && (
                                <ul className="flex flex-col self-center w-full items-center lg:gap-8 gap-6">
                                    {shuffledQuestionResponses &&
                                        shuffledQuestionResponses.map(
                                            (response, index) => {
                                                return (
                                                    <li
                                                        key={index}
                                                        className={
                                                            'p-[3PX] bg-gradient-to-r  flex items-center    from-indigo-700 from-9% via-sky-500 via-50% to-cyan-400 to-94%'
                                                        }
                                                    >
                                                        <button
                                                            disabled={
                                                                isDisabled
                                                            }
                                                            onClick={() =>
                                                                handleAnswerSubmit(
                                                                    Object.values(
                                                                        response
                                                                    )[0]
                                                                )
                                                            }
                                                            className="flex items-center  h-full gap-6 text-start text-2xl p-4 sm:w-96  w-[95vw]  hover:bg-inherit bg-black "
                                                        >
                                                            <span className="font-bold">
                                                                {
                                                                    answerNames[
                                                                        index
                                                                    ]
                                                                }
                                                            </span>
                                                            <span
                                                                className={
                                                                    (answerNames[
                                                                        index
                                                                    ].length >
                                                                    50
                                                                        ? ' lg:text-xl md:text-md text-sm'
                                                                        : 'lg:text-2xl md:text-xl text-lg') +
                                                                    ' font-semibold'
                                                                }
                                                            >
                                                                {
                                                                    Object.values(
                                                                        response
                                                                    )[0]
                                                                }
                                                                {clickedResponses[
                                                                    Object.values(
                                                                        response
                                                                    )[0]
                                                                ] &&
                                                                    ` pulsado ${
                                                                        clickedResponses[
                                                                            Object.values(
                                                                                response
                                                                            )[0]
                                                                        ]
                                                                    } veces`}
                                                            </span>
                                                        </button>
                                                    </li>
                                                );
                                            }
                                        )}
                                </ul>
                            )}
                        </section>
                    )}
                </section>
            )}
        </section>
    );
};
export default MatchComponentAsPlayer;
