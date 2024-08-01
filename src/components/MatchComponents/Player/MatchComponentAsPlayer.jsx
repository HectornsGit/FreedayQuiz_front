import QuestionComponent from '../QuestionComponent';
import ManagerButton from '../Manager/ManagerButton';
import YellowBgSendPlane from '@/components/icons/YellowBgSendPlane';
import ShowScores from './ShowScores';
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
    } = playerProps;

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
                    <ShowScores playerData={playerData}></ShowScores>
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
                                className={'w-8 p-1'}
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
                                        ></ListAnswersComponents>
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
