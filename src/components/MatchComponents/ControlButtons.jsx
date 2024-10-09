import GenerateCSVButton from '../GenerateCSVButton';
import Exit from '../icons/Exit';
import UsersLogo from '../icons/UsersLogo';
import YellowBgPencil from '../icons/YellowBgPencil';
import ManagerButton from './Manager/ManagerButton';
import ScoreButton from './Manager/ScoreButton';

const ControlButtons = ({
    isInput,
    isAutomaticOn,
    systemPaused,
    isQuestionRunning,
    timeLeft,
    showScoresHandler,
    initQuestion,
    startRandomQuestion,
    handleFinalScore,
    endQuiz,
    resumeQuiz,
    pauseQuiz,
    disableWhenAutomatic,
    isQuizPausedRef,
    playerData,
    isThereAWinner,
    quizData,
    setShowPlayers,
    automatizQuiz,
    handleSwitchOffAutomatic,
    showPlayers,
    setIsInput,
}) => {
    return (
        isInput == false && (
            <ul className="flex flex-col  justify-center items-center mt-8 gap-6">
                <li>
                    {
                        // Botones que controlan el modo de juego
                    }
                    <ul className="flex flex-col sm:flex-row justify-start gap-6 sm:items-center items-start sm:justify-between ">
                        <li>
                            <h3 className="font-semibold  ">Modo de juego:</h3>
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
                                    onClick={handleSwitchOffAutomatic}
                                    disabled={!isAutomaticOn || systemPaused}
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
                                                isPrimary={true}
                                                disabled={isQuestionRunning}
                                                handleClick={initQuestion}
                                            />
                                        </li>
                                        <li>
                                            <ManagerButton
                                                text={'Pregunta aleatoria'}
                                                disabled={isQuestionRunning}
                                                handleClick={
                                                    startRandomQuestion
                                                }
                                            ></ManagerButton>
                                        </li>
                                    </ul>
                                </li>
                                <li className="md:w-5/12 w-full ">
                                    <ScoreButton
                                        handleClick={showScoresHandler}
                                        disabled={
                                            isAutomaticOn
                                                ? disableWhenAutomatic
                                                : !isQuestionRunning ||
                                                  timeLeft > 0
                                        }
                                        text={'Puntuaciones'}
                                    />
                                </li>
                                <li className="md:w-5/12 w-full ">
                                    <div className="flex flex-col items-center">
                                        <ScoreButton
                                            handleClick={handleFinalScore}
                                            disabled={
                                                isAutomaticOn
                                                    ? disableWhenAutomatic
                                                    : !isQuestionRunning ||
                                                      timeLeft > 0
                                            }
                                            primary={true}
                                            text={'Puntuación final'}
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
                                    text={'Reanudar Juego'}
                                    handleClick={resumeQuiz}
                                    isPrimary
                                    disabled={!isQuizPausedRef.current}
                                ></ManagerButton>
                            </li>
                            <li>
                                <ManagerButton
                                    text={'Pausar Juego'}
                                    disabled={isQuizPausedRef.current}
                                    handleClick={pauseQuiz}
                                ></ManagerButton>
                            </li>
                        </ul>
                    </li>
                )}
                <li className="md:w-5/12 w-full ">
                    {playerData.length > 0 && isThereAWinner && (
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
                            <button className="" onClick={endQuiz}>
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
                                    setShowPlayers(!showPlayers);
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
                                    className={'rounded-sm p-2 w-12'}
                                ></YellowBgPencil>
                            </button>
                        </li>
                    </ul>
                </li>
            </ul>
        )
    );
};
export default ControlButtons;
