'use client';
import QuestionTitleInput from './QuestionTitleInput';
import ClockInput from '@/components/ClockInput';
import Clock from '@/components/Clock';
import YellowBgPencil from '@/components/icons/YellowBgPencil';
import { useEffect, useRef, useState } from 'react';
import AnswerInputComponent from './AnswerInputComponent';
import ManagerButton from './ManagerButton';
import QuestionImage from '../QuestionImage';
import Accordion from '@/components/Accordion';
import ListPlayerStats from '../ListPlayerStats';
import GenerateCSVButton from '@/components/GenerateCSVButton';
import TrashCan from '@/components/icons/TrashCan';
import ScoreButton from './ScoreButton';
import Exit from '@/components/icons/Exit';

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
    } = managerProps;

    // Iconos para las respuestas.
    const answerNames = ['🌞', '🌜', '🌟', '⚡'];

    const disableQuestionsButton = isQuestionRunning ? true : false;
    const [title, setTitle] = useState();

    //Creo este handle para mostrar al PLayer tanto la puntuacion como el ganador a la vez
    const handleFinalScore = (e) => {
        showScoresHandler();
        requestSetWinnerOn(e);
    };

    useEffect(() => {
        if (!question) {
            handleStartQuiz();
        } else {
            setTitle(question.question);
        }
    }, [sessionTime, question, handleStartQuiz]);
    if (!sessionTime) {
        return (
            <section>
                {quizData && (
                    <h1 className="text-3xl font-bold my-8">
                        {quizData?.title}
                    </h1>
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
        <section className=" lg:w-full lg:items-start lg:grid lg:grid-cols-[0.44fr_1.2fr_0.44fr] lg:grid-rows-[0.2fr_1.3fr_1fr] lg:gap-0 w-11/12 mx-2 flex flex-col  items-center">
            <header className="lg:col-span-1 lg:col-start-2   lg:row-span-1 flex flex-col mb-6 w-full">
                <ul className="flex grow mb-4 h-12 items-center mx-4 lg:justify-around justify-between">
                    <li className="">
                        <button className="" onClick={endQuiz}>
                            <Exit
                                className={'rounded-sm  w-8 fill-[--yellow]'}
                            ></Exit>
                        </button>
                    </li>
                    <li>
                        {sessionTimeLeft > 0 && (
                            <Clock
                                time={sessionTimeLeft}
                                setSessionTimeHandler={setSessionTimeHandler}
                                isClockInput={isClockInput}
                                setIsClockInput={setIsClockInput}
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
                {playerData && (
                    <div className="flex lg:hidden flex-col items-center  mb-4">
                        <Accordion title={'Jugadores'}>
                            <ListPlayerStats
                                players={playerData}
                            ></ListPlayerStats>
                        </Accordion>
                    </div>
                )}
                {quizData && (
                    <h1 className="text-3xl font-bold">{quizData?.title}</h1>
                )}
            </header>
            <aside className=" lg:row-span-2  lg:row-start-2  lg:flex hidden w-1/3">
                {playerData && (
                    <div className="flex flex-col items-center  mb-4">
                        <Accordion title={'Jugadores'}>
                            <ListPlayerStats
                                players={playerData}
                            ></ListPlayerStats>
                        </Accordion>
                    </div>
                )}
            </aside>
            {loggedUserId && loggedUserId == quizData?.owner_id && (
                <section className=" max-w-full lg:col-span-1 lg:row-span-2 lg:row-start-2 flex-col justify-center ">
                    {question && (
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
                                    isQuestionRunning={isQuestionRunning}
                                ></ClockInput>

                                {isInput && (
                                    <QuestionTitleInput
                                        text={'Pregunta'}
                                        id={'question'}
                                        name={'question'}
                                        defaultValue={question.question}
                                        handleChange={handleQuestionChange}
                                        isInput={isInput}
                                    />
                                )}

                                {isInput === false && (
                                    <ul className="flex justify-between 2xl:w-4/6  w-full gap-2">
                                        <li className="justify-self-start grow ">
                                            <select
                                                className="sm:5/6s w-full md:w-full  font-bold mb-2  p-2  z-10 text-black text-sm sm:text-md py-2"
                                                onChange={getQuestionFromList}
                                                disabled={
                                                    disableQuestionsButton
                                                }
                                                value={question.questionNumber}
                                            >
                                                {quizData &&
                                                    quizData.list_of_questions?.map(
                                                        (question, index) => {
                                                            return (
                                                                <option
                                                                    className=" whitespace-pre-wrap font-semibold py-2 selection:bg-slate-400"
                                                                    key={index}
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
                                                (isInput ? 'pb-10 ' : '') +
                                                'self-center'
                                            }
                                        >
                                            <button
                                                disabled={
                                                    disableQuestionsButton
                                                }
                                                type="button"
                                                className="text-[--yellow] text-sm"
                                                onClick={deleteQuestionHandler}
                                            >
                                                <TrashCan
                                                    className={
                                                        'rounded-sm p-1 w-8  bg-[--yellow]'
                                                    }
                                                ></TrashCan>
                                            </button>
                                        </li>
                                    </ul>
                                )}
                                {window.innerWidth < 1280 &&
                                    question.question.length > 26 && (
                                        <p
                                            ref={hiddenTextRef}
                                            className=" visible xl:invisible h-12 w-full lg:w-80 relative  bg-[yellow] text-left  font-bold mb-4  p-2 z-10 text-black text-xs py-2"
                                        >
                                            {question.question}
                                        </p>
                                    )}
                                <ul className="xl:grid xl:grid-cols-2  md:place-items-center   flex flex-col self-center w-full items-center  gap-6">
                                    <li
                                        key={'correctAnswer'}
                                        className={
                                            'xl:place-self-end p-[3PX] md:w-80  sm:w-96 w-[95vw] bg-gradient-to-r   flex items-center    from-green-300  from-9% via-green-400 via-50% to-lime-400 to-94%'
                                        }
                                    >
                                        <AnswerInputComponent
                                            logo={answerNames[0]}
                                            defaultValue={
                                                question?.correctAnswer
                                            }
                                            handleQuestionChange={
                                                handleQuestionChange
                                            }
                                            isInput={isInput}
                                            id={'correctAnswer'}
                                            updateForm={
                                                updateQuestionDataInBackend
                                            }
                                        ></AnswerInputComponent>
                                    </li>
                                    <li
                                        key={'optionA'}
                                        className={
                                            'xl:place-self-start md:w-80  sm:w-96 w-[95vw] p-[3PX] bg-gradient-to-r  flex items-center    from-red-700 from-9% via-pink-500 via-50% to-yellow-400 to-94%'
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
                                            'xl:place-self-end md:w-80  sm:w-96 w-[95vw] p-[3PX] bg-gradient-to-r  flex items-center    from-red-700 from-9% via-pink-500 via-50% to-yellow-400 to-94%'
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
                                            'xl:place-self-start md:w-80  sm:w-96 w-[95vw] p-[3PX] bg-gradient-to-r  flex items-center    from-red-700 from-9% via-pink-500 via-50% to-yellow-400 to-94%'
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
                                        className="text-black self-center font-extrabold text-lg bg-white px-11 py-2 
    hover:bg-black hover:text-white hover:box-shadow-white mt-5 col-span-2"
                                        type="submit"
                                    >
                                        Actualiza la pregunta
                                    </button>
                                )}
                            </form>
                        </section>
                    )}
                    {isInput == false && (
                        <ul className="flex flex-col  justify-center items-center mt-4 gap-6">
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
                                            handleClick={startRandomQuestion}
                                        ></ManagerButton>
                                    </li>
                                </ul>
                            </li>
                            <li className="md:w-5/12 w-full ">
                                <ScoreButton
                                    handleClick={showScoresHandler}
                                    disabled={
                                        !isQuestionRunning || timeLeft > 0
                                    }
                                    text={'Puntuaciones'}
                                />
                            </li>
                            <li className="md:w-5/12 w-full ">
                                <div className="flex flex-col items-center">
                                    <ScoreButton
                                        handleClick={handleFinalScore}
                                        disabled={
                                            !isQuestionRunning || timeLeft > 0
                                        }
                                        primary={true}
                                        text={'Puntuación final'}
                                    />
                                </div>
                            </li>
                            <li className="md:w-5/12 w-full ">
                                {playerData.length > 0 && isThereAWinner && (
                                    <GenerateCSVButton
                                        playerData={playerData}
                                        quizData={quizData}
                                    />
                                )}
                            </li>
                        </ul>
                    )}
                </section>
            )}
            <aside className="lg:row-span-2 min-w-72   w-1/3"></aside>
        </section>
    );
};
export default MatchComponentAsManager;
