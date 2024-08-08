import QuestionComponent from '../QuestionComponent';
import ManagerButton from '../Manager/ManagerButton';
import YellowBgSendPlane from '@/components/icons/YellowBgSendPlane';
import ShowScores from './ShowScores';
import ShowWinner from '@/components/ShowWinner';
import ListAnswersComponents from './ListAnswerComponents';

const MatchComponentAsPlayer = ({ playerProps }) => {
    const {
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
        isThereAWinner,
    } = playerProps;

    //Para ordenar puntuacion jugadores (no sé si compensa meter esto en un customhook)
    const orderedPlayersbyScore = [...playerData].sort(
        (a, b) => b.totalScore - a.totalScore
    );
    const winner =
        orderedPlayersbyScore.length > 0 ? orderedPlayersbyScore[0].name : '';

    if (sessionRecovery && isNameSetted) {
        return (
            <section className="flex h-[40vh]  pt-20  flex-col justify-center items-center">
                {quizData && (
                    <h1 className="lg:text-4xl lg:font-black text-xl font-bold mb-12">
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
        <section className="flex flex-col items-center my-12 mx-4">
            {showScores && !isQuestionRunning ? (
                <>
                    {isThereAWinner && <ShowWinner winner={winner} />}
                    <ShowScores
                        orderedPlayersbyScore={orderedPlayersbyScore}
                    ></ShowScores>
                </>
            ) : (
                <>
                    <header className="self-center">
                        {quizData && (
                            <h1 className="lg:mb-12 lg:text-4xl lg:font-black text-3xl font-black mb-3">
                                {quizData?.title}
                            </h1>
                        )}
                    </header>

                    {!isQuestionRunning && (
                        <div className="mb-8">
                            <p className="lg:text-xl font-semibold text-lg ">
                                Esperando que el master inicie el quiz...
                            </p>
                            <ul className="flex w-full justify-center my-8 gap-4">
                                <li>
                                    <div className="bg-[--cyan] rounded-full w-6 h-6 relative left-[28px] top-[10px] animate-ping"></div>
                                </li>
                                <li>
                                    <div className="bg-gradient rounded-full w-10 h-10 animate-ping"></div>
                                </li>
                                <li>
                                    <div className="bg-[--yellow] rounded-full w-6 h-6 relative left-[-28px] top-[10px] animate-ping"></div>
                                </li>
                            </ul>
                        </div>
                    )}

                    {!isQuestionRunning && !showScores && (
                        <p className="self-baseline font-medium mb-10">
                            Jugadores conectados: {connectedClients}
                        </p>
                    )}
                    <form className="flex self-baseline">
                        <div className="flex flex-col items-start">
                            <label
                                hidden={socket?.Mydata?.name ? true : false}
                                htmlFor="player"
                                className="lg:text-lg text-lg"
                            >
                                Nombre
                            </label>
                            <div className="flex">
                                <input
                                    id="player"
                                    type="text"
                                    className="h-10 font-semibold p-2 text-black text-md py-1 my-2"
                                    value={
                                        initialPlayerData[0]?.name &&
                                        initialPlayerData[0]?.name
                                    }
                                    hidden={socket?.Mydata?.name ? true : false}
                                    onChange={(e) =>
                                        setNickName(e.target.value)
                                    }
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={handleInitialPlayerData}
                                    hidden={socket?.Mydata?.name ? true : false}
                                >
                                    <YellowBgSendPlane
                                        className={'w-10 relative p-2'}
                                    ></YellowBgSendPlane>
                                </button>
                            </div>
                        </div>
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
                                <ul className="xl:grid xl:grid-cols-2 xl:gap-y-8 xl:gap-x-6 md:grid md:grid-cols-2 md:gap-y-6 md:gap-x-6 md:mx-1 flex flex-col self-center items-center gap-6">
                                    {shuffledQuestionResponses && (
                                        <ListAnswersComponents
                                            shuffledQuestionResponses={
                                                shuffledQuestionResponses
                                            }
                                            clickedResponses={clickedResponses}
                                            isDisabled={isDisabled}
                                            handleAnswerSubmit={
                                                handleAnswerSubmit
                                            }
                                            initialPlayerData={
                                                initialPlayerData
                                            }
                                            timeLeft={timeLeft}
                                        ></ListAnswersComponents>
                                    )}
                                </ul>
                            )}
                        </section>
                    )}
                </>
            )}
        </section>
    );
};
export default MatchComponentAsPlayer;
