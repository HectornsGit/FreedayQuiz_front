'use client';
import QuestionTitleInput from './QuestionTitleInput';
import NumberInput from '@/components/NumberInput';
import Clock from '@/components/Clock';
import YellowBgPencil from '@/components/icons/YellowBgPencil';
import { useEffect, useState } from 'react';
import AnswerInputComponent from './AnswerInputComponent';
import ManagerButton from './ManagerButton';
import QuestionImage from '../QuestionImage';
import Accordion from '@/components/Accordion';
import ListPlayerStats from '../listPlayerStats';
import Points from '@/components/icons/Points';
const MatchComponentAsManager = ({ managerProps }) => {
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
        showScores,
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
                        className='font-semibold w-full mb-10  p-2  text-black text-md py-2"'
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
        <section className="lg:w-full lg:items-start lg:grid lg:grid-cols-[0.44fr_1.2fr_0.44fr] lg:grid-rows-[0.2fr_1.3fr_1fr] lg:gap-0 w-11/12 mx-2 flex flex-col  items-center">
            <header className="lg:col-span-3   lg:row-span-1 flex flex-col mb-6 w-full">
                <ul className="flex grow mb-4 h-12 items-center mx-4 lg:justify-around justify-between">
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
            <aside className=" lg:row-span-2 lg:flex hidden w-1/3">
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
                <section className="lg:col-span-1 lg:row-span-2 flex-col justify-center">
                    {question && (
                        <section className="flex flex-col justify-center">
                            <QuestionImage
                                image={question.image}
                            ></QuestionImage>
                            <form
                                id={'questionForm'}
                                onSubmit={updateQuestionDataInBackend}
                                className="flex sm:items-center items-start gap-4 flex-col"
                            >
                                <NumberInput
                                    id={'questionTime'}
                                    name={'questionTime'}
                                    isInput={isInput}
                                    defaultValue={question.questionTime}
                                    handleChange={handleQuestionChange}
                                ></NumberInput>
                                <ul className="flex justify-between sm:w-96 w-full">
                                    <li className="z-10">
                                        {isInput ? (
                                            <QuestionTitleInput
                                                text={'Texto pregunta'}
                                                id={'question'}
                                                name={'question'}
                                                defaultValue={question.question}
                                                handleChange={
                                                    handleQuestionChange
                                                }
                                                isInput={isInput}
                                            />
                                        ) : (
                                            <p>Texto pregunta</p>
                                        )}
                                    </li>
                                    <li>
                                        <button
                                            disabled={disableQuestionsButton}
                                            type="button"
                                            className="text-[--yellow] text-sm"
                                            onClick={deleteQuestionHandler}
                                        >
                                            Elimina la pregunta
                                        </button>
                                    </li>
                                </ul>
                                {isInput === false && (
                                    <select
                                        className=" sm:w-96 w-full font-bold mb-4  p-2  z-10 text-black text-md py-2"
                                        onChange={getQuestionFromList}
                                        disabled={disableQuestionsButton}
                                        value={question.questionNumber}
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
                        <ul className="flex justify-center items-center mt-4 gap-6">
                            <li>
                                <ManagerButton
                                    isPrimary={true}
                                    handleClick={showScoresHandler}
                                    disabled={!isQuestionRunning}
                                    text="Puntaciones"
                                />
                            </li>
                            <li>
                                <ManagerButton
                                    text="Iniciar pregunta"
                                    isPrimary={true}
                                    disabled={isQuestionRunning}
                                    handleClick={initQuestion}
                                />
                            </li>
                        </ul>
                    )}
                    <div className="flex flex-col items-center">
                        <button
                            className="text-[--yellow] font-bold text-lg mt-10 p-1"
                            onClick={handleFinalScore}
                        >
                            <span className="flex flex-row gap-3 hover:bg-gradient">
                                <Points className="w-4" />
                                Mostrar puntuacion final
                                <Points className="w-4" />
                            </span>
                        </button>
                        <button
                            className="text-white font-light text-lg mt-20 px-11 py-2"
                            onClick={endQuiz}
                        >
                            Finalizar quiz
                        </button>
                    </div>
                </section>
            )}
            <aside className="lg:row-span-2 min-w-72   w-1/3"></aside>
        </section>
    );
};
export default MatchComponentAsManager;
